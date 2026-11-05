# 0001 — Linter: `oxlint` en vez de ESLint

- **Fecha:** 2026-11-04
- **Slice:** 0
- **Carril:** D (decisión del owner)

## Contexto

`PLAN.md` asumía ESLint + Prettier (ver tabla "Decisiones ya tomadas" y Slice 0, carril C). Al correr `npm create vite@latest -- --template react-ts`
en noviembre 2026, el scaffold oficial trae `oxlint` por defecto en vez de ESLint. `oxlint` es un linter escrito en Rust, mucho más rápido,
pero no formatea código (no reemplaza a Prettier) y es una herramienta más nueva, con menos ejemplos y documentación acumulada que ESLint.

## Opciones consideradas

1. Mantener `oxlint` (lo que trae el scaffold) + agregar Prettier solo para formateo.
2. Reemplazar `oxlint` por ESLint + Prettier, como decía el plan original.

## Decisión

**Opción 1.** Nos quedamos con `oxlint` + Prettier.

## Consecuencias

- `npm run lint` corre `oxlint` en vez de ESLint; no hay `eslintrc` ni plugins de ESLint en el proyecto.
- Hace falta instalar y configurar Prettier aparte (no viene en el scaffold).
- `PLAN.md` queda desactualizado en ese punto; no se edita el archivo (es el mapa original), pero esta decisión prevalece.
