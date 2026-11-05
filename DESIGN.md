# DESIGN.md

Design system and screen specs. The visual source of truth is the mockup at
`design/holier-webapp-mockup.jsx` (a single-file React mock). Read it to see the intended look,
spacing, and behavior. **Do not copy its CSS or structure verbatim**: translate it to Tailwind v4 with the
tokens below, as real components.

## 1. Design principles

1. **Start from God's faithfulness, not the user's performance.** Today opens with Scripture. No streaks, no counters by default.
2. **Scripture is serif; tools are sans-serif.** Serif is reserved for Scripture text only (the wordmark, headings, and UI are sans).
3. **A fall receives grace, not a reset.** The response to "I fell today" is a verse and a gospel-shaped message. Nothing is "lost".
4. **Numbers are optional and off by default** (Profile → "Show numbers").
5. **Help is always one tap away.** The "I'm struggling now" button is in the top bar on every screen.
6. **Calm and unhurried.** One memorable element per screen (the verse on Today). Everything else is quiet. Motion only in response to a user action.
7. **Night is a first-class mode.** Dark mode is designed, not inverted.

## 2. Tokens

### Colors (CSS variables; the `.dark` class on `<html>` swaps them)

| Token        | Light     | Dark      | Use                                             |
| ------------ | --------- | --------- | ----------------------------------------------- |
| `bg`         | `#FAF7F2` | `#14191E` | page background                                 |
| `surface`    | `#F2EDE3` | `#1B2229` | sidebar, selected option, subtle panels         |
| `ink`        | `#1F2933` | `#EDE8DF` | primary text                                    |
| `ink-soft`   | `#5A6570` | `#A3ADB5` | secondary text, dates, hints                    |
| `line`       | `#E0D8CA` | `#2A333B` | decorative dividers between list items          |
| `edge`       | `#928D83` | `#5C6770` | borders of interactive controls (≥3:1 contrast) |
| `primary`    | `#2F4A5A` | `#9DBBCC` | buttons, links, active nav, focus ring          |
| `on-primary` | `#FAF7F2` | `#14191E` | text on primary                                 |
| `sage`       | `#5B7B6A` | `#8DB09C` | "walking in peace" mark (never for small text)  |
| `gold`       | `#B08D57` | `#C9A46B` | **only** Ebenezer stones (never for text)       |

Rules: `line` is decoration only; any border a user must perceive to operate a control uses `edge`.
State is never conveyed by color alone (marks differ in shape and always have a text label).

### `src/styles/index.css` (starting point; verify syntax against current Tailwind v4 docs)

```css
@import 'tailwindcss';
@import '@fontsource-variable/inter';
@import '@fontsource-variable/source-serif-4';

/* Only needed if you ever use dark: variants; tokens below already switch with .dark */
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --bg: #faf7f2;
  --surface: #f2ede3;
  --ink: #1f2933;
  --ink-soft: #5a6570;
  --line: #e0d8ca;
  --edge: #928d83;
  --primary: #2f4a5a;
  --on-primary: #faf7f2;
  --sage: #5b7b6a;
  --gold: #b08d57;
}

.dark {
  --bg: #14191e;
  --surface: #1b2229;
  --ink: #ede8df;
  --ink-soft: #a3adb5;
  --line: #2a333b;
  --edge: #5c6770;
  --primary: #9dbbcc;
  --on-primary: #14191e;
  --sage: #8db09c;
  --gold: #c9a46b;
}

/* Map the variables to utilities: bg-bg, text-ink, border-edge, bg-primary, ... */
@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-ink: var(--ink);
  --color-ink-soft: var(--ink-soft);
  --color-line: var(--line);
  --color-edge: var(--edge);
  --color-primary: var(--primary);
  --color-on-primary: var(--on-primary);
  --color-sage: var(--sage);
  --color-gold: var(--gold);
}

@theme {
  --font-sans: 'Inter Variable', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-serif: 'Source Serif 4 Variable', 'Iowan Old Style', 'Palatino Linotype', Georgia, serif;

  /* Match the mock's thresholds (the mock used container widths; the app uses the viewport) */
  --breakpoint-sm: 600px; /* tablet: more side padding, centered modal */
  --breakpoint-lg: 900px; /* desktop: sidebar replaces bottom nav */
  --breakpoint-xl: 1100px; /* wide: two-column Today and Journal */
}
```

Confirm the exact font-family names the Fontsource packages register (for variable fonts they are
typically `"Inter Variable"` and `"Source Serif 4 Variable"`). Prevent a theme flash with a tiny inline
script in `index.html` that reads the saved theme (or `prefers-color-scheme`) and sets `.dark` on `<html>`
before first paint.

### Typography

| Role                                   | Font      | Size / line-height          | Notes                                  |
| -------------------------------------- | --------- | --------------------------- | -------------------------------------- |
| Verse, hero                            | serif 400 | 31/1.25 → 36 (sm) → 40 (lg) | `tracking-tight`, `text-wrap: balance` |
| Verse, large (modal, study intro)      | serif 400 | 25/1.32                     |                                        |
| Verse, medium (grace response, stones) | serif 400 | 19/1.45                     |                                        |
| Reference under a verse                | sans 400  | 14, `ink-soft`              | e.g. "Psalm 119:18"                    |
| Page title (h1)                        | sans 600  | 20 → 24 (lg)                | `tracking-tight`                       |
| Section title (h2)                     | sans 600  | 16/1.3                      | sentence case                          |
| Body                                   | sans 400  | 16/1.55                     |                                        |
| Entry text                             | sans 400  | 15/1.5                      |                                        |
| Secondary / dates / hints              | sans 400  | 13–14, `ink-soft`           |                                        |
| Counter                                | sans 400  | 12, `ink-soft`              |                                        |

Rules: sentence case everywhere; **no all-caps labels, no letter-spaced eyebrows above headings**;
no middle-dot separators; no arrows appended to buttons; line length ≤ 80 characters.
Form inputs are 16px minimum (prevents iOS zoom).

### Shape and spacing

- Radius by role: controls (buttons, options, inputs, textareas) `rounded-xl` (12px); chips `rounded-full`;
  modal `rounded-[20px]` on ≥sm and `rounded-t-[28px]` as a bottom sheet below sm; switch `rounded-full`.
  (Arbitrary values are allowed here only if you register them as theme tokens first.)
- Page padding: 24px (mobile) → 48px (sm) → 56px (lg). Section gap: 44px.
- Single-column content: max width 640px, left-aligned with the page title.
- Two-column (Today, Journal) from `xl`: max width 1040px, side column 320px, gap 56px,
  side column has `border-l border-line pl-10`.

## 3. Layout (AppShell)

- **Below `lg`**: top bar (title + SOS button) / scrolling content / bottom navigation (4 items, icon above label).
- **From `lg`**: left sidebar 232px (`bg-surface`, `border-r border-line`) containing the wordmark, 4 nav links, and the user's email at the bottom;
  the bottom nav disappears. The top bar and content sit to the right.
- Top bar: left = `h1` (on Today: greeting + full date below in `ink-soft`; elsewhere: the section name);
  right = SOS pill button (anchor icon + label, `edge` border, 38px high).
- Navigation items: Today (`Sunrise` icon), Study (`BookOpen`), Journal (`PenLine`), Profile (`User`) from `lucide-react`.
  Active item: `text-primary`, heavier stroke, `aria-current="page"`.
- Routes: `/today`, `/study`, `/journal`, `/profile`, plus `/auth`, `/privacy`, and a 404.
- SOS dialog: **Radix Dialog** (focus trap, Esc, scroll lock). Bottom sheet below `sm`, centered modal from `sm` (max width 540px).
  Enter animation 200–260ms; disabled under `prefers-reduced-motion`.

## 4. Components

Build these in `src/shared/ui/` (generic) or inside the feature that owns them.

| Component                    | Spec                                                                                                                                                                                                                                            |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                     | variants `primary` (bg primary, text on-primary), `secondary` (transparent, `edge` border), `link` (primary, underlined, offset 3px). 14px 20px padding, 12px radius, 600 weight, ≥44px tall. `primary` disabled = 45% opacity + `not-allowed`. |
| `OptionButton`               | full-width, left-aligned, `StateMark` + label, `edge` border. `aria-pressed` true → `border-primary bg-surface` + 1px inner primary ring.                                                                                                       |
| `Chip`                       | pill, `edge` border, 14px text. `aria-pressed` true → `bg-primary text-on-primary`.                                                                                                                                                             |
| `Switch`                     | Radix Switch, 46×28, `edge` border, thumb 20px; checked = primary track.                                                                                                                                                                        |
| `TextField`, `Textarea`      | `edge` border, 12px radius, transparent bg, 16px text, placeholder `ink-soft`. Textarea has a right-aligned `n/500` counter below.                                                                                                              |
| `ScriptureBlock`             | props: `variant` (`hero` / `lg` / `md`), text, reference. Serif text + sans reference. The only place serif is used.                                                                                                                            |
| `StateMark`                  | 14px SVG. `peace` = filled sage circle; `struggle` = ring with left half filled in primary; `relapse` = ring in `ink-soft`. Decorative (`aria-hidden`); a text label always accompanies it.                                                     |
| `StoneMark`                  | small hand-drawn-feeling stone outline in `gold`. Decorative.                                                                                                                                                                                   |
| `EntryList` / `EntryRow`     | 2-col grid: 76px date column (13px `ink-soft`) + body. Row 1: `StateMark` + "{{state}}, with {{emotion}}" (15px, 500). Row 2: note (15px), clamped to 3 lines on Today, full in Journal. Rows separated by a `line` top border.                 |
| `Steps`                      | vertical list with a connecting 1px `edge` line and hollow primary dots (this _is_ a sequence, so markers are appropriate). Used in Study.                                                                                                      |
| `NavItem` (bottom + sidebar) | see Layout.                                                                                                                                                                                                                                     |
| `ConfirmDialog`              | Radix Dialog for deletions: title, body, destructive-confirm (`primary` styling is fine; no red needed), cancel.                                                                                                                                |

Focus: `:focus-visible` outline 2px `primary`, offset 2px, on everything interactive.

## 5. Screens

Copy for every screen is in `design/copy/en.json` and `es.json`. Do not invent or reword UI text; if something is missing, add a key to both files.

### Today (`/today`)

1. **Hero**: the verse of the day (`ScriptureBlock hero`) → reference → primary button "Start devotional" (goes to `/study`) → hint line.
   Button is full-width below `lg`, auto-width from `lg`. The verse is deterministic per calendar day (see `PLAN.md`).
2. **Check-in** (`id="checkin"`, scroll target): see state machine below.
3. **Recent reflections**: last 3 entries, "See the whole journal" link.
   On `xl` this section moves to the right-hand column.
   **Empty state** (new user, no entries): heading "Your story with God starts here" + one sentence. No empty charts or placeholders that feel like homework.
4. If `profile.show_numbers` is on and there are entries: one quiet line of counts under the list. Never shown by default.

**Check-in state machine** (`idle → choose → form → done`):

- `idle` with no entry today: show the three `OptionButton`s (phase behaves as `choose`).
- `idle` with an entry today: one line "You checked in today: {{state}}." + link "Add another entry".
- Selecting an option → `form`: options stay visible (selected one highlighted, changeable); below them: emotion chips (single select, optional), note textarea (max 500, optional), "Save entry" primary + "Cancel" link.
- Save → `done`: show the grace response: verse for that state (medium scripture) + reference + the grace sentence + "Done" button. "Done" returns to `idle`.
- Save failure: keep the typed text, show `checkIn.saveError` inline with `role="alert"`.
- A fall never shows red, a warning, or the word "reset". The response is the verse and the grace sentence.

### Study (`/study`) — placeholder in Phase 1

Large verse-styled sentence "The guided devotional is coming soon." (serif `lg` is acceptable here as it is the one editorial line; if that feels like a rule break, use sans 600 24px and record the decision), the 4-step list (Read, Observe, Apply, Pray), and a "Back to Today" secondary button.

### Journal (`/journal`)

- Left/main: "Entries" list, newest first, 20 per page with a "Load more" button, full notes, each row has a delete action (opens `ConfirmDialog`).
- Right (from `xl`; stacked below on smaller): **Ebenezer stones**: title, the 1 Samuel 7:12 verse (`ScriptureBlock md`), intro sentence, list of stones (`StoneMark` + text + date), add field + "Add" button (Enter also adds), delete per stone.
- Empty states are sentences, not illustrations.

### Profile (`/profile`)

"Signed in as {{email}}", then rows separated by `line` borders: Dark mode (Switch), Show numbers (Switch, default off), Language (English / Español — autonyms, never translated),
Bible translation (select), and a secondary "Sign out" button. Changes persist to `profiles` and apply immediately.

### SOS dialog (all screens)

Verse Psalm 46:1 (`ScriptureBlock lg`) → short line → prayer as a blockquote (left 2px primary rule marks "say this aloud") → "reach out to someone you trust" →
primary "Log how I'm doing" (closes dialog, navigates to `/today`, scrolls to `#checkin`) + secondary "Close". Static content in Phase 1.

### Auth (`/auth`) — **not in the mock; design it as follows**

Single centered column, max width 400px, generous top padding. Order: wordmark (sans 600) → one verse in serif
(Lamentations 3:22–23, `ScriptureBlock md`) → the slogan in sans (`ink-soft`) → form.
Form: email, password (+ hint), name (sign-up only, optional), primary submit, link to switch sign-in/sign-up, and the one-line privacy note.
After sign-up (if email confirmation is on): replace the form with "Check your email" + body.
Errors inline under the field or form with `role="alert"`; error text uses `ink`, not a red color (use an icon + text, keep it calm).
New users land on `/today` (the empty state above) after confirming.

### 404

Calm sentence + "Go to Today". Same copy keys under `errors`.

## 6. What NOT to carry over from the mock

The fake browser chrome and URL bar; the "mockup controls" bar (width, view, theme); `@container` queries (use `@media` via the breakpoints above);
the CSS-in-a-string; the sample entries and stones; hard-coded verses and Spanish-only copy; the phase/draft state living in one giant component
(split into features); the working-in-memory data (use Supabase).
