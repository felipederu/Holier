# reference/ — answer keys

**Do not open anything in this folder until you have written your own version of the piece.**

These files are the "answers at the back of the book". Their value comes from comparing them with something you wrote yourself by hand
(the **hand-written core** of each slice in `PLAN.md`). Opened too early, they turn a lesson into copy-paste.

## When to open them

1. You wrote your version (and it runs), or you are truly stuck after the help ladder in `CLAUDE.md`.
2. You have made your predictions and noted what actually happened.
3. Now compare in **Review mode**: where does the key differ from yours? Is the difference a mistake, a preference, or something you had not considered?
   Note the interesting differences in `docs/battle-log.md`.

The agent will not open this folder unless you ask it to compare.

## Contents

- `answers/0001_init.sql`: the end-state schema for several slices at once (profiles, check_ins, stones, RLS, and the new-user trigger).
  **Your migrations are split by slice**, and each is a hand-written core:
  - Slice 1: `check_ins` (table, constraints, index, RLS)
  - Slice 4: `profiles` and the trigger (migration 0002)
  - Slice 5: `stones` (migration 0003), written without looking at your Slice 1 notes

  Compare each of your migrations only with the matching section of the key.

The key is one reasonable answer, not the only one. If yours differs and you can defend the difference, that is a good sign.
