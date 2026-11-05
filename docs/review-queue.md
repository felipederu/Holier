# Cola de repaso

Tarjetas de **recuperación en frío** para los conceptos del carril A. Las crea el agente en `/wrap-up`; las repasas tú al inicio de cada sesión con `/warmup`.

## Cómo se repasa

1. El agente elige las tarjetas **cuya fecha de repaso ya llegó** (máximo 5 por sesión) y te hace una pregunta a la vez.
2. Tú respondes **de memoria**, sin mirar nada, y dices tu **confianza de 1 a 5**.
3. Solo entonces se muestra la respuesta. Marcas `✔` (acerté) o `✘` (fallé).
4. **Intervalos:** acertada → siguiente intervalo (1 → 3 → 7 → 21 días). Fallada → vuelve al día 1.
   Una tarjeta acertada dos veces seguidas en el intervalo de 21 días se archiva.
5. Los resultados se anotan en `docs/progress.md` (tabla "Repaso en frío").

*(Los intervalos son una heurística de partida; se ajustan en las retros.)*

## Qué es una buena tarjeta

- Pide **explicar, predecir o decidir**, no recitar. Ejemplo: "Un usuario con sesión hace `select` en una tabla con RLS activado y sin políticas: ¿qué devuelve y por qué?"
- Una sola idea por tarjeta.
- Si la respuesta cabe en una definición de diccionario, probablemente es de carril B y no necesita tarjeta.

## Formato

Cada tarjeta es un bloque. La respuesta va plegada para que no la veas antes de intentar.

```
### [ID] Concepto: pregunta
- Slice: N · Creada: AAAA-MM-DD · Próximo repaso: AAAA-MM-DD · Intervalo actual: N días · Racha de aciertos: N

<details>
<summary>Respuesta</summary>

Respuesta breve y precisa (2–4 líneas) y, si aplica, un puntero a la documentación oficial.

</details>
```

## Tarjetas activas

<!-- El agente agrega las tarjetas aquí al cerrar cada sesión. -->

## Archivadas

<!-- Tarjetas dominadas (acertadas dos veces seguidas en el intervalo de 21 días). -->
