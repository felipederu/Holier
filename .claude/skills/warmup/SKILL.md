---
name: warmup
description: Start-of-session retrieval warm-up. Use only when the owner types /warmup or says he is starting a session. Quizzes him from memory on the review cards that are due.
---

# Warm-up (5–10 minutes)

Goal: **retrieval before anything else.** The owner answers from memory, with a confidence rating, before seeing any answer.

1. Read `docs/review-queue.md`. Find the active cards whose "Próximo repaso" date is today or earlier. Pick at most **5**, oldest due first.
   If there are none, say so and skip to step 6.
2. Ask **one card at a time**. Show only the question. Do not show the answer, hints, or the card's `<details>` content.
3. Wait for his answer **and** a confidence from 1 to 5. If he did not give a confidence, ask for it before moving on.
4. Then give feedback: say whether he was right, show the answer, and if he was wrong, explain the gap briefly **with a different example** than the card's.
5. Record the outcome: update the card's interval and next review date (correct → 1, 3, 7, 21 days; wrong → back to 1 day; two consecutive correct at 21 days → archive).
   Tell him what you changed in `docs/review-queue.md`.
6. Compute the session's results (cards, correct, average confidence, calibration = average confidence vs actual accuracy) and add a row to the "Repaso en frío" table in `docs/progress.md`.
7. Then read the "Próximo paso" in `docs/progress.md` and ask which mode he wants and how much time he has.

Rules: never quiz on something that is not in the queue. Do not run commands or edit source files during the warm-up. Reply in Spanish.
