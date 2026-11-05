---
name: retro
description: End-of-slice retrospective. Use only when the owner types /retro. Reviews metrics, runs the self-check and the no-agent task, and proposes adjustments to the method.
---

# Slice retrospective (about 10 minutes, plus the self-check)

Reply in Spanish. The owner answers first; you add observations afterwards.

1. **Check the slice is really done.** Go through the "Done when" list of the slice in `PLAN.md`. Mark what is missing; do not close the slice with gaps unless he decides to.
2. **Self-check.** Ask the slice's self-check questions one at a time, **without the docs**, with a confidence of 1 to 5 before revealing whether he was right.
3. **No-agent task.** Confirm it was done. If it was not, schedule it before the tag. When he did it, review it in Review mode and ask one transfer question.
4. **Look at the data** in `docs/progress.md`: prediction hit-rate, cold-recall accuracy, calibration (confidence vs accuracy), diagnosis times, and the share of sessions spent explaining without building.
   Describe what the numbers show; do not over-interpret small samples.
5. **Ask him five questions** (he answers before you comment):
   - Where did I accept something I could not explain?
   - Where did I waste time without learning?
   - Which concepts did I forget between sessions?
   - How are my predictions and my calibration?
   - What should change: lanes, sizes, number of checks, or the hand-written piece of the next slice?
6. **Propose adjustments** to the method (for example, fading a concept to Lane C, adding or removing checks, changing the review intervals or the 40% alarm).
   Only with his approval, append them to the changelog in `docs/method.md` with the reason.
7. **Next slice.** Detail the next slice card in `PLAN.md` together with him (outcome, Lane A/B, hand-written core, predictions, checks, no-agent task), based on what he learned and the time he has.
8. **Close.** Suggest tagging the commit (`slice-N`) and generating `CONTEXT.md` with the prompt in Appendix E of `PLAN.md`. Do not tag or commit unless he asks.

Rules: do not skip step 2 or step 3 to save time; those are the evidence that the slice taught something.
