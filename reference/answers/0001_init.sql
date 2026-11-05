-- 0001_init.sql
-- Phase 1 schema: profiles, check_ins, stones.
-- Principles:
--   * Row Level Security on every table, from day one.
--   * DB stores neutral keys ('peace', 'struggle', 'relapse'), never UI labels.
--   * Least privilege: only create policies for operations the UI actually uses.
--     Phase 1 entries are append-only + delete (no UPDATE policy).

-- ---------------------------------------------------------------------------
-- profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text
    check (display_name is null or char_length(display_name) <= 60),
  ui_locale text not null default 'en'
    check (ui_locale in ('en', 'es')),
  -- Decision D-1 chooses the English default. 'kjv' is allowed in case it wins over 'web'.
  bible_translation text not null default 'web'
    check (bible_translation in ('web', 'kjv', 'rv1909')),
  -- null = follow the system preference
  theme text
    check (theme is null or theme in ('light', 'dark')),
  show_numbers boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- check_ins (the daily log)
-- created_at = exact moment (UTC). logged_on = the user's LOCAL calendar date,
-- computed on the client. Never derive the "day" from created_at: a check-in at
-- 8 pm in Bogota is already "tomorrow" in UTC.
-- ---------------------------------------------------------------------------
create table public.check_ins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  state text not null
    check (state in ('peace', 'struggle', 'relapse')),
  emotion text
    check (emotion is null or emotion in
      ('peace', 'gratitude', 'joy', 'anxiety', 'sadness', 'temptation')),
  note text
    check (note is null or char_length(note) <= 500),
  logged_on date not null,
  created_at timestamptz not null default now()
);

create index check_ins_user_recent_idx
  on public.check_ins (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- stones (Ebenezer stones: moments where the user saw God's faithfulness)
-- ---------------------------------------------------------------------------
create table public.stones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  body text not null
    check (char_length(body) between 1 and 300),
  logged_on date not null,
  created_at timestamptz not null default now()
);

create index stones_user_recent_idx
  on public.stones (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Privileges: nothing for anon, RLS gates everything for authenticated.
-- ---------------------------------------------------------------------------
revoke all on public.profiles, public.check_ins, public.stones from anon;

alter table public.profiles enable row level security;
alter table public.check_ins enable row level security;
alter table public.stones enable row level security;

-- profiles: read + update own row. No insert policy (created by trigger below),
-- no delete policy (removed by cascade when the auth user is deleted).
create policy "profiles_select_own" on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);

create policy "profiles_update_own" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- check_ins: read, insert, delete own rows.
create policy "check_ins_select_own" on public.check_ins
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "check_ins_insert_own" on public.check_ins
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "check_ins_delete_own" on public.check_ins
  for delete to authenticated
  using ((select auth.uid()) = user_id);

-- stones: read, insert, delete own rows.
create policy "stones_select_own" on public.stones
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "stones_insert_own" on public.stones
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "stones_delete_own" on public.stones
  for delete to authenticated
  using ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- Auto-create a profile when a user signs up.
-- SECURITY DEFINER runs with the function owner's rights (it must write to
-- public.profiles before the new user has any policy-granted access);
-- `set search_path = ''` prevents search-path hijacking, so every object is
-- schema-qualified.
-- ---------------------------------------------------------------------------
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    nullif(left(new.raw_user_meta_data ->> 'display_name', 60), '')
  );
  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
