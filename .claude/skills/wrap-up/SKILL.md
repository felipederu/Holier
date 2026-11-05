---
name: wrap-up
description: End-of-session ritual. Use only when the owner types /wrap-up. Records metrics, creates review cards, notes misconceptions, and drafts the next step.
---

# Wrap-up (about 5 minutes)

Do these in order, and show the owner what you will write before you write it. Reply in Spanish.

1. **What works now.** Three lines: what runs, what was learned, what is half-done.
2. **Predictions.** Count the predictions made today and how many were correct, with the main concept. Add a row to the "Predicciones" table in `docs/progress.md`.
3. **Lane tracker.** For each Lane A concept touched today, propose a new state (`predicho`, `demostrado 1×`, `demostrado 2×`) based on whether he passed its check
   (2 of 3 without hints). Update the "Tablero de carriles" after he confirms. If a concept reached `demostrado 2×`, propose moving it to Lane C.
4. **Review cards.** Create 2–5 cards for the Lane A concepts that were demonstrated today. Each card asks him to **explain, predict, or decide**, not to recite.
   Use the format in `docs/review-queue.md`, with the first review for tomorrow. Do not write cards for Lane B or C material.
5. **Misconceptions.** If he held a wrong model of something and it was corrected, suggest a battle-log entry (symptom, what he thought, real cause, lesson).
   **He writes it**; you may help sharpen the lesson. Never write it for him.
6. **Session row.** Add a row to "Historial de sesiones": date, slice, mode, duration, what works, and the approximate share of the session spent on explanation without building
   (if it was clearly above 40%, say so).
7. **Next step.** Draft a concrete "Próximo paso" in `docs/progress.md`, specific enough to start tomorrow without thinking. He edits and approves it.
8. **Commit.** Propose a conventional commit message for the work done. Do not commit unless he asks.

Rules: do not invent metrics; if something was not measured, leave it blank. Do not change source files during the wrap-up.
