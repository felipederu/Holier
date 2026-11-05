# Método de trabajo (v1.0)

Este documento explica **cómo trabajamos y por qué**. El agente lo lee junto con `CLAUDE.md`. Tú lo lees cuando quieras recordar la lógica o ajustarla.

**Meta:** construir un buen software y, a la vez, desarrollar una comprensión transferible: explicar las decisiones, diagnosticar problemas,
evaluar soluciones y aplicar lo aprendido en otros proyectos, incluso sin un agente de IA al lado.

**Una advertencia honesta:** nadie ha probado este protocolo exacto (un agente que ejecuta mientras tú predices, explicas y verificas).
Es una extrapolación razonable de varias líneas de evidencia. Lo tratamos como una **hipótesis que medimos en ti** y ajustamos (ver "Revisión del método").

---

## 1. Qué sabemos y qué no

**Más sólido (revisiones sistemáticas y metaanálisis, sobre todo en educación general):**

- Practicar recordando de memoria rinde más que releer (Dunlosky 2013; Adesope 2017, 118 estudios).
- Espaciar los repasos mejora la retención, y el intervalo ideal crece con el tiempo que quieres recordar (Cepeda 2006; la evidencia es sobre recuerdo verbal).
- Pedirte que te autoexpliques mejora el aprendizaje (g ≈ 0,55, Bisra 2018), y recibir una explicación ajena rinde menos que generarla.
- Para principiantes, los ejemplos resueltos ayudan; con la experiencia pueden dejar de ayudar o estorbar (efecto de inversión por experiencia), por eso la ayuda debe desvanecerse.
- Descubrir por cuenta propia _sin guía_ rinde peor que la instrucción explícita; con guía y retroalimentación rinde mejor (Alfieri 2011).
- Intercalar conceptos parecidos ayuda de forma moderada, pero depende del material (Brunmair y Richter 2019).

**Preliminar (pocos estudios, muestras pequeñas o contextos distintos al tuyo):**

- Estudio de Anthropic (Shen y Tamkin, 2026, 52 desarrolladores): quienes usaron IA para aprender una librería puntuaron 17% menos en comprensión, con la mayor brecha en depuración.
  Los patrones que preservaron el aprendizaje fueron pedir explicaciones o hacer preguntas conceptuales. Límites: muestra pequeña, quiz inmediato, un chat y no un agente (los autores esperan que con agentes el efecto sea mayor),
  y los patrones de interacción no prueban causalidad. Lo publicó la empresa que fabrica Claude: léelo con esa cautela.
- Bastani et al. (PNAS 2025): estudiantes con GPT-4 sin salvaguardas rindieron peor en el examen sin IA; un tutor con salvaguardas mitigó el daño (matemáticas, un colegio).
- Prather et al. (ICER 2024): la IA puede reforzar dificultades metacognitivas en novatos (21 participantes).
- Fernandes et al. (2025): con IA, las personas sobreestiman su desempeño (razonamiento lógico, no programación).
- PRIMM (Sentance et al. 2019): leer y predecir código antes de escribirlo; 493 escolares, grupo control, beneficios reportados sobre todo por docentes.
- Fracaso productivo (Sinha y Kapur 2021): intentar antes de recibir instrucción mostró efectos fuertes, con limitaciones y debate abierto; requiere conocimiento previo.

**Opinión de la práctica (no son hallazgos):** Addy Osmani y otros advierten que dejar que la IA escriba mientras te saltas el aprendizaje cambia capacidad futura por velocidad presente.

**Lo que no sabemos:** si este protocolo preserva el aprendizaje con un agente. Por eso medimos.

---

## 2. Principios

1. **El agente ejecuta; tú haces el trabajo cognitivo:** predecir, explicar, verificar, diagnosticar, decidir.
2. **Predice antes, explica después.** Una predicción fallida enseña más que una explicación que recibes ya digerida.
3. **Comprobación objetiva y calibrada.** "¿Entendiste?" no sirve (con IA tendemos a sobreestimarnos). Usamos recuperación sin ayuda y confianza anotada _antes_ de saber si acertaste.
4. **Dificultad deseable, no gratuita.** La profundidad es para lo que la merece; la ayuda se desvanece cuando demuestras dominio.
5. **Errores reales.** Depurar es la habilidad más frágil; la practicamos a propósito.
6. **Escribes a mano lo que carga el aprendizaje:** una pieza pequeña por slice, y una tarea sin agente para calibrarte.
7. **Espaciar.** Repasos cortos y frecuentes en lugar de maratones.
8. **Documentar solo lo que el código no dice.**

---

## 3. Carriles

| Carril                             | Qué es                                            | Ejemplos en Holier                                                                                                                                                                                                                                                 |
| ---------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **A. Comprender a fondo**          | Debes poder explicarlo y defenderlo               | RLS y sesión/JWT; modelado de datos (claves neutras, `logged_on` vs `created_at`, constraints); caché e invalidación en TanStack Query; máquina de estados del check-in; reglas de i18n; qué ocurre en `npm run dev`, `build` y el despliegue; TypeScript estricto |
| **B. Conocer y saber consultar**   | Basta saber que existe y dónde buscarlo           | opciones de ESLint/Vite/Tailwind, API de Radix, sintaxis de GitHub Actions, flags del CLI de Supabase, configuración de Vercel                                                                                                                                     |
| **C. Mecánico (agente)**           | Lo ejecuta el agente con una frase de explicación | scaffolding, `tsconfig`, CI, `vercel.json`, tipos generados, instalar dependencias, boilerplate repetido tras tu primera instancia                                                                                                                                 |
| **D. Decisión tuya**               | Requiere tu criterio                              | modelo de privacidad, tono de la respuesta de gracia, qué entra en la Fase 1, versículos y traducciones, copy en español, compromisos de accesibilidad                                                                                                             |
| **E. Verificado por herramientas** | Lo comprueba una herramienta, no una opinión      | lint, typecheck, tests, `rls:check`, axe/Lighthouse, paridad de claves `en`/`es`, CI                                                                                                                                                                               |

Un concepto pasa de A a C cuando lo has demostrado dos veces (ver "Desvanecer la ayuda").

---

## 4. Modos de trabajo

| Modo                        | Quién escribe          | Cuándo                                              |
| --------------------------- | ---------------------- | --------------------------------------------------- |
| **Guiado** (predeterminado) | el agente              | la mayoría de las sesiones                          |
| **Escrito a mano**          | tú                     | la pieza central de cada slice (lista en `PLAN.md`) |
| **Revisión**                | tú, y el agente revisa | después de escribir algo a mano                     |
| **Sin agente**              | tú, solo               | una tarea de transferencia al cerrar cada slice     |
| **Rápido**                  | el agente              | cambios triviales                                   |

Tú declaras el modo al empezar cada sesión.

---

## 5. El flujo por tarea

| Paso                              | Micro                    | Estándar                                       | Profundo                                    |
| --------------------------------- | ------------------------ | ---------------------------------------------- | ------------------------------------------- |
| 1. Contexto y objetivo            | 1 línea                  | 3 líneas                                       | 3 líneas + diagrama                         |
| 2. Teoría justo a tiempo          | no                       | ≤ 5 min                                        | ≤ 10 min + modelo mental                    |
| 3. Predicción (con confianza 1–5) | no                       | 1–2                                            | 3, por escrito                              |
| 4. Ejecución                      | el agente resume el diff | pasos pequeños; tú lees cada diff              | igual; y tú escribes la pieza central       |
| 5. Observación                    | tests o terminal         | tú verificas en navegador, DevTools o terminal | igual, más "rómpelo"                        |
| 6. Explicación                    | no                       | tú primero, luego el agente completa           | igual, comparando con tu predicción         |
| 7. Comprobación                   | no                       | 1                                              | 2–3                                         |
| 8. Consolidación                  | no                       | 2–3 tarjetas                                   | 3–5 tarjetas + nota de errores conceptuales |
| 9. Siguiente paso                 | seguir                   | puerta de avance                               | puerta estricta                             |

**Tipos de comprobación** (nunca "¿entendido?"): variación ("¿qué cambia si…?"), trazar a mano un caso nuevo, encontrar un error plantado, explicárselo a un junior ingenuo, predecir el siguiente cambio.

**Puerta de avance:** avanzas si resuelves **al menos 2 de 3** comprobaciones sin pistas. Si no, el agente enseña de nuevo **con otro ejemplo** (no repite la misma explicación).

**Desvanecer la ayuda:** si aciertas tus predicciones de un concepto **3 veces seguidas**, ese concepto pasa a carril C o la ayuda se reduce (el agente deja huecos para que los llenes tú).

**Errores plantados:** solo cuando los pides. El agente introduce un fallo realista sin decirte dónde, y lo diagnosticas con herramientas y razonamiento antes de pedir ayuda.

_(Todos los números de este documento —2 de 3, 3 seguidas, 40%, intervalos 1/3/7/21— son heurísticas de partida, no resultados probados. Se ajustan en las retros.)_

---

## 6. Repaso espaciado

- Al final de cada sesión, el agente propone **tarjetas** para los conceptos del carril A y las guarda en `docs/review-queue.md`.
- Al inicio de la siguiente sesión (`/warmup`): respondes **de memoria**, anotas tu confianza (1–5), y solo entonces ves la respuesta.
- **Intervalos:** 1 → 3 → 7 → 21 días. Si fallas una tarjeta, vuelve al día 1. Una tarjeta con 21 días acertada dos veces se archiva.
- **Calibración:** compara tu confianza media con tu acierto real. Si te sobreestimas, el método te está mintiendo bien y toca más comprobaciones objetivas.

---

## 7. Qué medimos (ligero)

Se registra en `docs/progress.md`:

| Métrica                | Cómo                                                            | Para qué                                                 |
| ---------------------- | --------------------------------------------------------------- | -------------------------------------------------------- |
| Aciertos de predicción | predicciones acertadas / hechas, por concepto                   | ver qué modelo mental ya tienes (candidato a desvanecer) |
| Recuperación en frío   | % correcto de las tarjetas, a 1 semana y a 1 mes, con confianza | retención real y calibración                             |
| Diagnóstico de errores | minutos antes de pedir ayuda                                    | la habilidad que más se daña con la delegación           |
| Tarea sin agente       | resultado y tiempo al cerrar cada slice                         | transferencia: ¿puedes sin mí?                           |
| Mini-entrevista        | las preguntas de autoevaluación del slice, en voz alta          | explicar y defender decisiones                           |

---

## 8. Cómo evitar la dependencia y la lentitud

**Dependencia:**

- Una pieza escrita a mano por slice y una tarea sin agente.
- Nunca aceptas un diff que no puedas resumir.
- El agente no revela el resultado esperado antes de tu predicción.
- Cuando atascado en una pieza tuya: escalera de ayuda (esperar, intentar, pista, esqueleto con huecos, solución al final).

**Lentitud:**

- Carriles: la profundidad solo donde importa. Lo mecánico (carril C) se hace sin ceremonia.
- Teoría con tope de tiempo (≤ 10 min).
- Flujo "micro" para lo trivial.
- Aceleración por desvanecimiento.
- Señal de alarma: si más de ~40% de una sesión es explicación sin construir, el método te frena y hay que ajustarlo.

---

## 9. Documentación sin redundancia

El código y los commits dicen **qué** se hizo. Los documentos solo guardan lo que el código no puede decir.

| Documento                                   | Contiene                                                  | No contiene                            |
| ------------------------------------------- | --------------------------------------------------------- | -------------------------------------- |
| `docs/decisions/`                           | por qué se eligió algo, con alternativas                  | descripciones de lo que hace el código |
| `docs/review-queue.md`                      | tarjetas de repaso con fechas (se archivan al dominarlas) | resúmenes de teoría                    |
| `docs/battle-log.md`                        | sorpresas y errores conceptuales corregidos               | cada bug trivial                       |
| `docs/progress.md`                          | siguiente paso, métricas, carriles, ideas aparcadas       | historia detallada                     |
| `CONTEXT.md` (se genera al cerrar un slice) | estado del repo para chats de planificación               | nada escrito a mano                    |

Las predicciones viven en la sesión; solo se anotan cuando **fallan**.

---

## 10. Cómo se activa en Claude Code

Sigue la documentación actual de Claude Code (verifica nombres y versiones, que cambian):

1. Copia esta carpeta a la raíz del repo, incluida la carpeta oculta `.claude/`.
2. **Estilo de salida:** el archivo `.claude/output-styles/tutor.md` define un estilo propio. Se elige con `/output-style tutor`; el comando ignora mayúsculas y guarda la elección
   en `.claude/settings.local.json`. Claude Code lee los archivos de estilo al arrancar, así que reinícialo si los agregaste con una sesión abierta.
   Según la documentación, el campo `keep-coding-instructions` solo tiene efecto con el prompt de sistema completo; si tu instalación usa el corto, la documentación indica configurar la variable `CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT` en `0`.
3. **Skills del proyecto** (en `.claude/skills/`, cada una invocable con `/nombre`): `/warmup`, `/predict`, `/wrap-up`, `/retro`.
4. **Un estilo es una instrucción, no una garantía.** Si el agente se desvía (por ejemplo, ejecuta antes de tu predicción), dilo: "vuelve al método". Para lo que deba ocurrir siempre, la alternativa son los _hooks_; no los usamos todavía.
5. Comprueba que funciona: escribe `/` y verifica que aparecen las cuatro skills, y pide una tarea Estándar para ver si el agente espera tu predicción.

---

## 11. Ejemplo de sesión: Slice 0, Vite (≈ 55 min, tarea Estándar con modelo mental profundo)

1. **Contexto (30 s).** "Vamos a crear el esqueleto. Vite sirve tu código al navegador mientras desarrollas y lo empaqueta para producción."
2. **Teoría justo a tiempo (8 min).** El navegador no entiende `.tsx` ni imports como `react`. En el servidor de desarrollo de Vite los módulos se sirven bajo demanda como ES modules y las dependencias se preempaquetan una vez; para producción sigue haciendo falta empaquetar.
   El agente dibuja el flujo (navegador → petición → Vite transforma el archivo → respuesta) y verifica en la documentación qué empaquetador usa la versión instalada, porque cambió entre versiones.
3. **Predicción (3 min, por escrito, con confianza).** (a) ¿Qué archivo pide primero el navegador? (b) ¿Verás una sola petición JS (un bundle) o muchas? (c) Si edito un componente, ¿se recarga toda la página o un módulo?
4. **Ejecución (10 min).** El agente anuncia los comandos (crear el proyecto, instalar, `npm run dev`), explica qué archivos aparecen y por qué, y ejecuta paso a paso.
5. **Observación (10 min, conduces tú).** DevTools → Network: qué piden `index.html` y `main.tsx`, y qué responde el servidor (JS, no TSX). Editas un texto y observas el HMR.
6. **Explicación (8 min).** Tú explicas por qué el navegador recibe JavaScript aunque el archivo sea `.tsx`. Después el agente compara con tu predicción; las discrepancias son lo que hay que aprender.
7. **Comprobación (10 min).** Variación: importar una librería y explicar qué cambia en Network. Error plantado: el agente rompe una ruta de import y tú lo diagnosticas. Transferencia: qué cambia entre `npm run dev` y `npm run build`, y por qué importa para Vercel.
8. **Consolidación (5 min).** Tarjetas: por qué Vite no empaqueta en desarrollo; qué ocurre cuando el navegador pide `/src/main.tsx`; diferencias entre dev y build.
9. **Siguiente paso.** Con 2 de 3 comprobaciones sin pistas, pasas a `tsconfig` (carril C con explicación breve). Si no, 10 minutos más con un ejemplo distinto.

---

## 12. Retrospectiva de slice (10 min; `/retro`)

1. ¿Dónde acepté algo que no podía explicar?
2. ¿Dónde perdí tiempo sin aprender?
3. ¿Qué conceptos se me olvidaron entre sesiones (según el repaso)?
4. ¿Cómo van mis aciertos de predicción y mi calibración?
5. ¿Qué ajusto: carriles, tamaños, número de comprobaciones, pieza a mano del siguiente slice?

Los cambios aprobados se anotan abajo.

## 13. Registro de cambios del método

| Versión | Fecha        | Cambio                                                                                                                     | Motivo                                                 |
| ------- | ------------ | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| 1.0     | octubre 2026 | Versión inicial acordada: carriles, flujo por tamaños, puertas, repaso espaciado, pieza a mano por slice, tarea sin agente | Diseño a partir de la investigación y de tus objetivos |

---

## Fuentes

- Dunlosky, Rawson, Marsh, Nathan y Willingham (2013). _Improving Students' Learning With Effective Learning Techniques._ Psychological Science in the Public Interest. doi:10.1177/1529100612453266
- Adesope, Trevisan y Sundararajan (2017). _Rethinking the Use of Tests: A Meta-Analysis of Practice Testing._ Review of Educational Research. doi:10.3102/0034654316689306
- Cepeda, Pashler, Vul, Wixted y Rohrer (2006). _Distributed Practice in Verbal Recall Tasks._ Psychological Bulletin. doi:10.1037/0033-2909.132.3.354
- Bisra, Liu, Nesbit et al. (2018). _Inducing Self-Explanation: a Meta-Analysis._ Educational Psychology Review.
- Alfieri, Brooks, Aldrich y Tenenbaum (2011). _Does Discovery-Based Instruction Enhance Learning?_ Journal of Educational Psychology. doi:10.1037/a0021017
- Brunmair y Richter (2019). _Similarity Matters: A Meta-Analysis of Interleaved Learning._ Psychological Bulletin. doi:10.1037/bul0000209
- Kalyuga (2007). _Expertise Reversal Effect and Its Implications for Learner-Tailored Instruction._ Educational Psychology Review. doi:10.1007/s10648-007-9054-3
- Sinha y Kapur (2021). _When Problem Solving Followed by Instruction Works._ Review of Educational Research. doi:10.3102/00346543211019105
- Sentance, Waite y Kallia (2019). _Teaching computer programming with PRIMM._ Computer Science Education. doi:10.1080/08993408.2019.1608781
- Shen y Tamkin (2026). _How AI Impacts Skill Formation._ arXiv:2601.20245; resumen: https://www.anthropic.com/research/AI-assistance-coding-skills
- Bastani et al. (2025). _Generative AI without guardrails can harm learning._ PNAS. doi:10.1073/pnas.2422633122
- Prather et al. (2024). _The Widening Gap._ ICER 2024. arXiv:2405.17739
- Fernandes et al. _AI Makes You Smarter, But None The Wiser._ arXiv:2409.16708
- METR (2025). _Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity._ https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
- Documentación de Claude Code: estilos de salida (https://code.claude.com/docs/en/output-styles) y skills (https://code.claude.com/docs/en/skills)
