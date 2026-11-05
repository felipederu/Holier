---
name: predict
description: Run the prediction step before executing a task. Use only when the owner types /predict, or when the loop in CLAUDE.md reaches step 3 on a Standard or Deep task.
---

# Prediction step

Goal: the owner commits to what he thinks will happen **before** anything runs, so that a wrong prediction becomes the learning target.

1. State the task, its **lane** (A–E), and its **size** (Standard or Deep). If it is Micro or Lane C, say it needs no prediction and stop.
2. Write **1–3 concrete, observable questions** about what will happen. Good ones are things he can later verify with a tool:
   what the terminal will print, which requests will appear in the Network tab, what a query will return, what will break, in what order things will happen.
   Do **not** include or hint at the answers.
3. Ask for each answer **with a confidence from 1 to 5**.
4. **Stop and wait.** Do not run commands, edit files, or explain the expected outcome until he has answered.
   If he says to skip, proceed and add a line to "Predicciones omitidas" in `docs/progress.md`. Do not lecture.
5. After the execution and his observation, come back to the questions: compare each prediction with what happened. For every mismatch ask him to explain _why_ before you do.
   Count hits and misses for the "Predicciones" table in `docs/progress.md` (the `/wrap-up` skill records them).

Reply in Spanish.
