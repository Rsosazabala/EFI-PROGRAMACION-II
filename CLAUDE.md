# CLAUDE.md

Este proyecto comparte sus reglas entre todos los agentes de IA en `AGENTS.md`. Leé ese archivo siempre antes de proponer o modificar código.

@AGENTS.md

## Notas específicas para Claude Code

- Comandos habituales: `make dev`, `make test`, `make lint`, `make migrate`. *(Solo fase futura: la EFI no tiene Makefile ni backend.)*
- Antes de dar una tarea por terminada, correr `make test` y `make lint`. *(Solo fase futura.)* En la EFI, repasar el checklist de `docs/contexto/flujo-de-trabajo.md`.
- Para cambios que toquen más de un módulo o el esquema de base de datos, proponer primero un plan breve y esperar confirmación antes de escribir código.
- Para diagramas de arquitectura o de proceso, usar la skill de Archify (ver `GUIA-ARCHIFY.md`) en vez de describir la arquitectura solo en texto.
