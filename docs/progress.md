# Progreso

## Próximo paso

> Se escribe al final de cada sesión (`/wrap-up` propone un borrador y tú lo corriges), tan concreto que mañana puedas empezar sin pensar.
> Ejemplo: "Escribir el test de `localDateISO` para el caso de las 9:30 pm en UTC-5. Todavía no hay función."

**Slice actual:** 0 — Setup y modelo mental de la herramienta
**Modo de la próxima sesión:** Guiado
**Próximo paso:** Crear el repo en GitHub y el proyecto `holier-dev` en Supabase; copiar este paquete a la raíz del repo (incluida la carpeta oculta `.claude/`);
abrir Claude Code, activar `/output-style tutor` y pedir la tarea del Slice 0 (sesión de Vite, ver `docs/method.md` sección 11).

**Horas disponibles por semana (D-6):** _por definir_

## Tablero de carriles

Qué conceptos del carril A tienes, y en qué punto de la ayuda desvanecida están.
Estados: `sin empezar` → `predicho` → `demostrado 1×` → `demostrado 2× (pasa a carril C)`.

| Concepto (carril A) | Slice | Estado | Notas |
|---|---|---|---|
| Servidor de desarrollo de Vite y diferencia dev/build | 0 | sin empezar | |
| TypeScript `strict` | 0 | sin empezar | |
| Sesión y JWT de Supabase | 1 | sin empezar | |
| RLS (`using` vs `with check`) | 1 | sin empezar | |
| `logged_on` vs `created_at` | 1 | sin empezar | |
| TanStack Query (query, mutation, invalidación) | 1 | sin empezar | |
| Rutas protegidas y estado "cargando sesión" | 1 | sin empezar | |
| Máquina de estados del check-in | 4 | sin empezar | |
| Triggers y `security definer` | 4 | sin empezar | |
| Paginación (`range` vs cursor) | 5 | sin empezar | |
| Reglas de i18n | 7 | sin empezar | |

## Métricas

### Predicciones

| Fecha | Slice | Predicciones hechas | Acertadas | Concepto principal |
|---|---|---|---|---|
| | | | | |

### Repaso en frío (`/warmup`)

| Fecha | Tarjetas | Acertadas | Confianza media (1–5) | Calibración (confianza vs acierto) |
|---|---|---|---|---|
| | | | | |

### Diagnóstico de errores y tareas sin agente

| Fecha | Slice | Tipo (error plantado / bug real / tarea sin agente) | Minutos hasta diagnosticar o terminar | ¿Pediste ayuda? |
|---|---|---|---|---|
| | | | | |

## Predicciones omitidas y delegaciones fuera del método

Para ser honestos con nosotros mismos. Si algo se omite o se delega aunque no estaba previsto, se anota aquí y se revisa en la retro.

-

## Estacionamiento de ideas

Cosas brillantes que aparecen a mitad de una sesión. Se anotan aquí y se vuelve a la tarea. Se revisan al cerrar cada slice.

-

## Historial de sesiones

| Fecha | Slice | Modo | Duración | Qué quedó funcionando | % de la sesión en explicación sin construir (aprox.) |
|---|---|---|---|---|---|
| | | | | | |

## Slices cerrados

- [ ] Slice 0 — Setup y modelo mental de la herramienta
- [ ] Slice 1 — Walking skeleton (`slice-1`)
- [ ] Slice 2 — Go live early
- [ ] Slice 3 — Design system y shell
- [ ] Slice 4 — Today y check-in real
- [ ] Slice 5 — Journal y piedras
- [ ] Slice 6 — Profile y ajustes
- [ ] Slice 7 — i18n y español
- [ ] Slice 8 — Hardening y lanzamiento

## Prompts de arranque para Claude Code

**Primera sesión (Slice 0):**

> Read CLAUDE.md, docs/method.md, PLAN.md and docs/progress.md. Mode: Guided. We're starting Slice 0. Classify the first task by lane and size, run the loop,
> and wait for my predictions before running anything. Respond in Spanish.

**Cualquier sesión normal:**

> /warmup
> (después) Mode: <Guiado | Escrito a mano | Revisión | Sin agente>. I have about <N> minutes. We're on <slice>, <step>. Respond in Spanish.

**Cierre de sesión:**

> /wrap-up

**Cierre de slice:**

> /retro
