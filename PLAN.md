# PLAN.md — A map, not a recipe

**See His faithfulness. Respond in obedience.**

A devotional companion web app, built slowly and deliberately. **The agent executes; the owner predicts, explains, verifies, decides, and writes
one deliberate piece by hand per slice.** Rules of engagement: `CLAUDE.md`. Reasoning and evidence: `docs/method.md`.

## How we build

- **Vertical slices.** Each ends with something that works end to end. Ugly first, beautiful later. There is always something running,
  which is the best defense against abandoning the project.
- **Only the next slice is detailed.** Slices 0 and 1 are fully specified; the rest are cards to be detailed when the previous one closes.
- **Every slice card has the same parts:** outcome · Lane A concepts (understand deeply) · Lane B (look up) · owner decisions (D) · **hand-written core** ·
  what the agent executes · predictions · checks · break-it · **no-agent task** · self-check questions · done when.
- **Sessions of 45–90 minutes**, regularly. Each starts with `/warmup` and ends with `/wrap-up` (which writes the "Next step").
- **Pace:** the estimates below are guesses. We re-baseline after Slice 1 using real data from `docs/progress.md`.
- **Work only on the personal computer.** This repo is never opened from the employer's machine.

## Files in this package

| File                   | Use                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `CLAUDE.md`            | how the agent behaves (lanes, modes, loop, gates)                                         |
| `docs/method.md`       | the methodology, its evidence, and how to activate it in Claude Code                      |
| `PLAN.md`              | this map                                                                                  |
| `DESIGN.md`            | tokens, layout, components, screens (**reference from Slice 3**)                          |
| `design/`              | the mock (to look at, not to copy) and the UI copy decks (`copy/en.json`, `copy/es.json`) |
| `docs/progress.md`     | next step, metrics, lane tracker, parking lot, session history                            |
| `docs/review-queue.md` | spaced-repetition cards                                                                   |
| `docs/battle-log.md`   | surprises and corrected misconceptions                                                    |
| `.claude/`             | the output style and skills that support the method                                       |
| `reference/`           | **answer keys; open only to compare something you wrote by hand**                         |

## Decisions already made

| Area            | Decision                                                                                                             |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| App type        | Web app (SPA), mobile-first, responsive; not a native app                                                            |
| Build / routing | Vite + React + TypeScript (`strict`); React Router, one route per tab                                                |
| Data            | Supabase (Postgres, Auth, RLS); `supabase-js` + TanStack Query                                                       |
| Client state    | React Context for session and theme only                                                                             |
| Forms           | plain React in Slice 1; React Hook Form + Zod from Slice 4 (refactor on purpose)                                     |
| Styling         | Tailwind CSS v4 with CSS-variable tokens (from Slice 3)                                                              |
| i18n            | react-i18next, set up in Slice 0, used from Slice 1. English default, Spanish available                              |
| UI primitives   | Radix (Dialog, Switch) for accessibility                                                                             |
| Tests / quality | Vitest + Testing Library; ESLint, Prettier, `tsc --noEmit`, GitHub Actions                                           |
| Hosting         | Vercel + two Supabase projects (dev, prod)                                                                           |
| Principle       | No streaks. Optional counts, off by default. A fall gets grace, not a reset (see `DESIGN.md`)                        |
| Entries         | Append-only + delete; no editing in the first version                                                                |
| Profile data    | Only what is needed: display name, locale, Bible translation, theme, show-numbers                                    |
| Method          | Tutor-executor with lanes, predictions, gates, spaced review, one hand-written piece and one no-agent task per slice |

## Open decisions (Lane D, the owner decides)

| ID  | Decision                                                                                                                       | Needed by |
| --- | ------------------------------------------------------------------------------------------------------------------------------ | --------- |
| D-1 | English Bible translation: WEB or KJV (both public domain). Check how each renders the divine name and which fits your reading | Slice 4   |
| D-2 | App name (working name "Holier"; changing it costs almost nothing)                                                             | anytime   |
| D-3 | Email confirmation on sign-up: recommended on in production, optional in dev                                                   | Slice 2   |
| D-4 | Approve the verse lists in Appendix C                                                                                          | Slice 4   |
| D-5 | Custom domain (optional; `*.vercel.app` is fine)                                                                               | Slice 8   |
| D-6 | Hours per week available (calibrates session length and review cadence)                                                        | Slice 0   |

---

## Slice 0 — Setup and the mental model of the toolchain

**Outcome:** a healthy empty repo where Slice 1 can start, and you can explain what `npm run dev` and `npm run build` do.

**Lane A (understand deeply):** how Vite serves code to the browser (dev vs build); what TypeScript `strict` catches; what the lint, typecheck, test, and CI pipeline protects.
**Lane B (look up):** ESLint rule options, Vite config options, GitHub Actions syntax, Supabase CLI flags.
**Lane C (the agent executes):** scaffolding, `tsconfig`, ESLint/Prettier, scripts, Vitest with one trivial test, GitHub Actions, `.env.example`/`.gitignore`, Supabase CLI link,
react-i18next bootstrap (`en` and `es`; language detection from `navigator.language`; `<html lang>` kept in sync; namespaces from `design/copy/`).
**Owner tasks:** create the GitHub repo; create the Supabase project `holier-dev` and put its URL and anon key in `.env.local` (never share or commit the `service_role` key);
copy this package into the repo root; enable the method (`docs/method.md`, section 10).
**Hand-written core:** none. This is the only slice with no hand-written piece.

**Predictions (Deep, on the Vite session):** which file the browser requests first; one bundle or many requests; what a component edit reloads. See the worked example in `docs/method.md` (section 11).
**Checks:** a variation (import a library), a planted bug (a broken import path), a transfer question (dev vs build and why it matters for Vercel).
**No-agent task:** none yet.
**Done when:** `npm run dev` shows a page; lint, typecheck, test, and build pass locally and in CI; the repo is pushed; you pass the Vite checks (2 of 3 without hints); the first review cards exist.
**Estimate:** 2–3 sessions.

---

## Slice 1 — Walking skeleton (fully specified)

### Outcome

In your browser, locally: create an account, sign in, choose how you are today (one of three states), optionally write a note, save it,
and see your list of past entries, newest first. A second account cannot read, insert-as, or delete the first account's entries, and **you prove it yourself**.
It is plain HTML: no styling, verses, or dark mode. But **every visible string goes through `t()`.**

### Scope

**In:** `/auth` (one plain form with a sign-in / sign-up toggle); `/today` (protected: three state buttons, a note field, save, the list, sign out); one table, `check_ins`, with RLS; a tested local-date helper.
**Out (later slices):** profiles table, styling, emotions UI, verses and the grace response, delete, pagination (limit 50), deployment, React Hook Form and Zod.

### Concepts

**Lane A (understand deeply):**

- The Supabase Auth session lifecycle: `getSession`, `onAuthStateChange`, what a JWT is and where it lives.
- The `anon` key vs the `service_role` key, and why only one may be in the browser.
- Row Level Security: policies, `auth.uid()`, `using` vs `with check`, `to authenticated`, what "no policy" means.
- Data modeling: constraints and defaults; **`logged_on` (local calendar date) vs `created_at` (UTC instant)**.
- TanStack Query: queries, mutations, query keys, invalidation.
- Protected routes and the "session is still loading" state.

**Lane B (look up):** React Router API details, i18next interpolation options, `Intl.DateTimeFormat` options, Supabase CLI commands.

### Division of work

| Piece                                                                                    | Who                                                                      | Lane |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---- |
| **RLS policies and constraints for `check_ins`** (SQL)                                   | **You write it** (Hand-written mode)                                     | A    |
| **`localDateISO` tests first, then the function**                                        | **You write it**                                                         | A    |
| **The first query hook and the first mutation hook** (`useCheckIns`, `useCreateCheckIn`) | **You write them**                                                       | A    |
| Supabase client wiring, generated types                                                  | Agent executes                                                           | C    |
| Auth: provider, protected route, `/auth` page                                            | Agent executes (Guided, Deep): you predict, explain, and pass the checks | A    |
| Components and `t()` usage                                                               | Agent executes; you read every diff                                      | C    |
| `npm run rls:check` script, if you want one                                              | Agent executes; you read it                                              | E    |

### The `check_ins` contract (you write the SQL, in `supabase/migrations/`)

| Column       | Type        | Rules                                                                                                       |
| ------------ | ----------- | ----------------------------------------------------------------------------------------------------------- |
| `id`         | uuid        | primary key, generated by the database                                                                      |
| `user_id`    | uuid        | required; references the auth user and is deleted with them; **defaults to the caller's id**                |
| `state`      | text        | required; only `peace`, `struggle`, `relapse`                                                               |
| `emotion`    | text        | optional; only `peace`, `gratitude`, `joy`, `anxiety`, `sadness`, `temptation` (the UI does not use it yet) |
| `note`       | text        | optional; at most 500 characters                                                                            |
| `logged_on`  | date        | required; the user's **local** calendar date, set by the client                                             |
| `created_at` | timestamptz | required; defaults to now                                                                                   |

One index for "my newest entries" (you choose the columns and order, and be ready to justify them). RLS **enabled**; a user can **select, insert, and delete only their own rows**;
no update; nothing for `anon`. Constraints live in the database even though the UI will also validate. You decide where each of `using` and `with check` is needed.

### Read first (30–45 minutes, before the first prediction)

Supabase docs: Row Level Security; Auth and sessions. TanStack Query: Queries, Mutations, Invalidation. React Router: route protection. MDN: `Date` (local vs UTC getters).

### Predictions (written before any code, with confidence 1–5)

1. With RLS on and **zero** policies, what does `select` return for a signed-in user? For an anonymous one?
2. `user_id` defaults to `auth.uid()` and the insert omits it: what is stored? What if you send someone else's id?
3. When does `onAuthStateChange` fire if you reload a page that already has a session?
4. At 9:30 pm in Bogotá, what does `new Date().toISOString().slice(0, 10)` return? Why might that be a bug?
5. After a successful insert, does the list update by itself? Why or why not?

### Steps

1. **Predict** (above) and `/predict` for each Deep step.
2. **You write the migration** (Hand-written mode), apply it to dev, and compare with the answer key _only afterwards_.
3. **Agent wires the client and types**; you explain what the typed client buys you.
4. **Agent builds auth (Guided, Deep).** Checks: where is the session stored (DevTools → Application)? what happens on reload? a planted bug (a redirect that fires before the session finishes loading).
5. **You write `localDateISO`: tests first.** Cases: a late evening in a UTC-5 zone; just after local midnight; zero-padding of month and day; December 31st at 23:59.
   **Think about this:** your tests must _fail against the naive `toISOString()` version on any machine and in CI_ (which runs in UTC). How will you make them deterministic regardless of the machine's timezone?
6. **You write the query and mutation hooks.** The insert must omit `user_id`; it sends `state`, `note`, and `logged_on`, then refreshes the list.
7. **Agent builds the plain UI**; you read every diff and verify with the keyboard.
8. **Prove isolation by hand (you drive).** Create accounts A and B (two browser profiles). B's list must be empty. Then, from B, **replay the HTTP request the app makes** (DevTools → Network → copy as cURL, adjust) to ask for _all_ rows,
   try inserting a row with A's `user_id`, try deleting one of A's rows, and repeat the read with **only the anon key** and no user token. Write down what each returned.
9. **Break it** (predict the result first, then run it): disable RLS and repeat the attack; drop the insert policy and try to save; change the system timezone and recheck `logged_on`;
   remove the invalidation after saving; paste a 501-character note (which layer rejects it, and what does the error look like?); delete the stored session in DevTools and keep using the app.
10. **No-agent task:** show "entries logged today" in the list header by filtering on `logged_on`, writing the query and its test yourself, with the agent silent until you say you are done (then Review mode).
11. **Close:** `/retro`, self-check questions, tag `slice-1`.

### Self-check (answer aloud or in writing, without the docs)

1. What exactly happens when a table has RLS enabled and no policies?
2. Difference between `using` and `with check`. Which of your policies needs which, and why?
3. Why is shipping the anon key in the browser acceptable? What would be catastrophic to ship?
4. Why is `logged_on` separate from `created_at`? Give a concrete example with a time and a place.
5. After an insert, why does the list not update itself, and what does invalidation do?
6. What does `onAuthStateChange` give you that a one-time `getSession()` does not?
7. Why a CHECK constraint in the database if the UI also validates?
8. You could filter "my entries" with `.eq('user_id', …)` in the client or rely on RLS. Why is only one of them a security measure?

### Done when

- [ ] You wrote the migration, the `localDateISO` tests and function, and the two hooks; the agent did not.
- [ ] Two accounts exist; B cannot read, insert-as, or delete A's data, verified through the UI **and** a replayed request.
- [ ] Your `localDateISO` tests fail against the naive implementation.
- [ ] Every visible string comes from `t()`; no `any`; lint, typecheck, tests pass; CI is green.
- [ ] You passed the gates for the Lane A concepts (2 of 3 checks without hints).
- [ ] At least three "break it" exercises are done, with predictions made first.
- [ ] The no-agent task is done.
- [ ] Review cards exist for the Lane A concepts; `docs/progress.md` is updated; the commit is tagged `slice-1`.

**Estimate:** 5–7 sessions (guess; re-baseline afterwards).

---

## Slices 2–8 (cards; each is detailed when the previous one closes)

**Slice 2 — Go live early.** _Outcome:_ the skeleton on a public URL with a prod database.
_A:_ environments and build-time env vars; SPA rewrites; Auth redirect URLs; why dev and prod are separate. _B:_ Vercel and CLI flags.
_D:_ D-3 (email confirmation). _Hand-written core:_ **you apply the migration to prod and configure the Auth URLs yourself** (guided). _Agent:_ `vercel.json`, CI wiring.
_Break it:_ a wrong redirect URL; a missing env var. _No-agent:_ add a new env var end to end (local, CI, Vercel). _(2 sessions)_

**Slice 3 — Design system and shell.** _Outcome:_ the tokens, dark mode, responsive shell, primitives, and the SOS dialog.
_A:_ CSS variables → Tailwind utilities; breakpoints; focus management; accessible modals. _B:_ Tailwind utilities, Radix API.
_Hand-written core:_ **the `AppShell` responsive layout** (top bar + bottom nav ↔ sidebar). _Agent:_ token CSS, the other primitives from `DESIGN.md`, the SOS dialog.
_Break it:_ remove the focus ring and tab through; zoom to 200%; enable reduced motion. _No-agent:_ build a `Chip`-like component from the spec. _(4–6 sessions)_

**Slice 4 — Today and the real check-in.** _Outcome:_ the verse of the day, the full check-in with grace response, recent reflections, the empty state, and `profiles`.
_A:_ state machines; form libraries and schemas; triggers and `security definer`; deterministic selection (verse of the day). _D:_ D-1, D-4.
_Hand-written core:_ **the check-in state machine and its Zod schema** (a refactor of the plain-React form from Slice 1), and **the `profiles` migration and trigger** (SQL).
_Agent:_ verse content from a public-domain source (Appendix C; owner spot-checks five verses), UI wiring. _Break it:_ kill the network while saving; drop the trigger and sign up.
_No-agent:_ add the emotion chips. _(6–8 sessions; may split into 4a and 4b)_

**Slice 5 — Journal and stones.** _Outcome:_ paginated journal, delete with confirmation, stones.
_A:_ pagination trade-offs (`range` vs cursor); cache invalidation; destructive-action UX.
_Hand-written core:_ **the `stones` migration and RLS, written without looking at your Slice 1 notes** (a transfer test; fading evidence for RLS). _Agent:_ the rest.
_Break it:_ two tabs open, delete in one. _No-agent:_ a "delete stone" with confirmation. _(3–4 sessions)_

**Slice 6 — Profile and settings.** _Outcome:_ persisted dark mode, show-numbers, sign out, saved preferences applied after login.
_A:_ optimistic vs pessimistic updates. _Hand-written core:_ **`useUpdateProfile` and the cache update**. _No-agent:_ persist a new preference. _(2 sessions)_

**Slice 7 — i18n and Spanish.** _Outcome:_ the whole UI in two languages, Bible translation switch (Spanish: Reina-Valera 1909), locale-aware references and dates.
_A:_ i18n pitfalls (concatenation, plurals, text expansion); why UI language and Bible translation are separate. _D:_ your review of the Spanish copy.
_Hand-written core:_ **the `en`/`es` key-parity test and the language-switch logic**. _Break it:_ delete a key; a long Spanish string at 390px. _(3–4 sessions)_

**Slice 8 — Hardening and launch.** _Outcome:_ accessibility pass, error boundary and 404, `/privacy` in plain language, README with screenshots, final deploy, an honest list of known gaps.
_A:_ what automated accessibility tools can and cannot see. _Hand-written core:_ **a keyboard-only accessibility pass and the README**. _Agent:_ axe/Lighthouse runs, boilerplate. _(3–4 sessions)_

## Definition of done for Phase 1

You have used the deployed app daily for a week; you pass each slice's self-check without help; you completed each slice's no-agent task;
and you can tell the story of at least three real bugs you diagnosed.

---

## Appendix A — Approved dependencies (anything else: ask first)

Slices 0–2: `react`, `react-dom`, `react-router`, `@tanstack/react-query`, `@supabase/supabase-js`, `i18next`, `react-i18next`, `i18next-browser-languagedetector`;
dev: `vite`, `@vitejs/plugin-react`, `typescript`, `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`,
`eslint`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`, an i18n lint plugin, `prettier`, the `supabase` CLI, `tsx`.
Later: Slice 3 `tailwindcss`, `@tailwindcss/vite`, `prettier-plugin-tailwindcss`, `clsx`, Radix packages (Dialog, Switch), `lucide-react`, `@fontsource-variable/inter`, `@fontsource-variable/source-serif-4`.
Slice 4 `react-hook-form`, `zod`, `@hookform/resolvers`. Verify each package name and current major version against its docs before installing.

## Appendix B — Target structure (folders appear when a slice needs them; do not pre-create)

```
src/
├── app/            router, providers, AppShell
├── features/       auth, today, check-in, journal, stones, sos, profile, study   (features do not import each other)
├── shared/         ui/, lib/ (supabase client, dates), types/database.ts
├── content/        verse-refs.ts, verses.ts, verses/<translation>.json          (Slice 4)
├── i18n/           init + locales/<lng>/<namespace>.json
└── styles/         index.css (tokens)                                           (Slice 3)
supabase/migrations/    your SQL, one file per change
docs/                   method, progress, review-queue, battle-log, decisions/
```

## Appendix C — Verse content (for Slice 4)

Scripture is **data**. Refs look like `psalms.119.18` or `lamentations.3.22-23`; book display names come from the `books` keys in the i18n files.
Text lives in `src/content/verses/<translation>.json` as `{ "source": "<name, URL, date fetched>", "verses": { "<ref id>": "<text>" } }`.
**Fetch it from a public-domain source; never type it from memory.** The agent lists five random verses afterward so you can verify them.

Proposed lists (D-4: you approve or edit):

- **Daily pool** (short; God's faithfulness and knowing God): Lamentations 3:22–23, Psalm 36:5, Psalm 89:1, Psalm 100:5, Psalm 119:18, Psalm 119:105,
  Psalm 143:8, Psalm 63:1, Deuteronomy 7:9, 1 Corinthians 1:9, 1 Thessalonians 5:24, 2 Timothy 2:13, Hebrews 10:23, Philippians 1:6, Jeremiah 9:23–24.
- **Grace response by state:** `peace`: Psalm 136:1, Philippians 4:6–7. `struggle`: 1 Corinthians 10:13, Hebrews 4:15–16, Psalm 46:1, James 4:7–8.
  `relapse`: 1 John 1:9, Lamentations 3:22–23, Romans 8:1, Micah 7:8.
- **Fixed:** SOS dialog = Psalm 46:1; stones section = 1 Samuel 7:12; auth screen = Lamentations 3:22–23.
- **Selection rules (pure functions, unit-tested):** the verse of the day is `pool[dayIndex % pool.length]` using the user's **local** date;
  the grace verse is picked from the state's list with a seed so it stays stable for that submission.

## Appendix D — Out of scope for Phase 1, and what comes next

Out: AI features, RAG, the guided devotional (Study stays a placeholder), streaks, community, notifications, social login, analytics, PWA install,
editing entries, account deletion and data export (flagged as debt for Phase 1.5; they need a server-side function with elevated rights).
Next: **Phase 2** corpus ingestion and pgvector (the LLM key lives only in Supabase Edge Functions); **Phase 3** the guided devotional
(`reading → observation → application → prayer`) with a "step of obedience" and a gentle next-day follow-up, never scored; **Phase 4** personalization from your own history (with explicit consent) and an evaluation harness.
While building Phase 1, keep ids stable and keys neutral, and keep every Supabase call behind feature-level hooks; nothing here will block those phases.

## Appendix E — Prompt for generating `CONTEXT.md` (at the end of each slice, in a new planning chat)

> Generate a `CONTEXT.md` at the repo root, reading the code directly (assume nothing from memory): current slice and what works; the relevant folder tree;
> the database schema as it exists today; decisions taken and why (including alternatives rejected); open items and TODOs; installed versions.
> Be concise. Someone with no memory of this project should be able to read it and know where everything is.
