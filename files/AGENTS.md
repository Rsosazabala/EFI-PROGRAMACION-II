# AGENTS.md

Reglas para cualquier agente de IA (Antigravity, Claude Code, Cursor, Codex u otro) que lea, proponga o modifique código en este repositorio. Antigravity y la mayoría de los agentes modernos leen este archivo automáticamente desde la raíz del proyecto; Claude Code lo recibe a través de `CLAUDE.md`.

## 1. Contexto del proyecto

DonaJusto conecta donantes con comedores y merenderos comunitarios: muestra qué necesita y qué stock tiene cada lugar, para que la ayuda se oriente a necesidades reales en vez de excedentes.

- Fuente de verdad del negocio: `docs/02-especificacion/` (historias de usuario) y `docs/00-proyecto/` (documento inicial).
- Etapa actual: pasando de planificación académica a desarrollo real. No asumas que existe código salvo que lo encuentres en el repo.
- Datos sensibles: el sistema maneja datos de personas en situación de vulnerabilidad (asistencia a comedores). Tratalos siempre como sensibles.

## 2. Reglas de oro

### Siempre

- Respetar la estructura de carpetas de `README.md`. Si hace falta una carpeta nueva en la raíz, proponerla antes de crearla, no crearla directamente.
- Seguir el patrón de módulo para toda funcionalidad nueva del backend: `controller` → `service` → `repository` → `model` → `dto` → `test`, un módulo por dominio dentro de `backend/src/modules/`.
- Escribir o actualizar tests junto con el código: unitarios para lógica de negocio, de integración para endpoints.
- Validar los datos de entrada (DTOs) antes de que lleguen a la lógica de negocio.
- Modelar el stock como una serie de **movimientos** (entradas y salidas), nunca sobrescribir una cantidad "actual" directamente. Esto preserva el historial y alimenta el indicador de insumos más usados.
- Usar variables de entorno para toda configuración y secreto. Nunca hardcodear credenciales ni URLs de producción.
- Generar una migración para todo cambio de esquema de base de datos. Nunca editar a mano una migración ya aplicada.
- Explicar el "por qué" en los mensajes de commit, no solo el "qué".
- Si una decisión técnica no es obvia (una librería, un patrón, un proveedor), proponer un ADR corto en `docs/adr/` antes de implementarla.
- Pedir aclaración cuando una historia de usuario sea ambigua o esté incompleta, en vez de asumir en silencio.
- Guardar los diagramas generados con Archify en `docs/03-diseno/diagramas/` (ver `GUIA-ARCHIFY.md`).

### Nunca

- No commitear `.env`, credenciales, tokens, ni datos reales de comedores, donantes o personas asistidas — ni siquiera en datos de prueba.
- No hacer push directo a `main`; todo cambio pasa por un pull request con al menos 1 revisión.
- No agregar una dependencia nueva sin justificarla en el PR.
- No inventar endpoints, tablas o campos que no estén en `docs/02-especificacion/`; si falta algo documentado, señalarlo en el PR en vez de improvisarlo.
- No generar seeds con nombres, DNIs o ubicaciones reales de personas o comedores — usar siempre datos ficticios.
- No modificar contenido de `docs/00-proyecto/` a `docs/03-diseno/` sin avisar al responsable de esa meta (ver tabla de roles en `README.md`).

## 3. Convenciones de código

| Elemento | Convención |
|---|---|
| Carpetas y archivos | kebab-case |
| Clases | PascalCase |
| Variables y funciones | camelCase |
| Tablas de base de datos | snake_case, en plural (`donaciones`, `comedores`) |
| Ramas de Git | `feature/nombre-corto`, `fix/nombre-corto` |
| Commits | convencionales: `feat:`, `fix:`, `docs:`, `test:`, `chore:` |

## 4. Testing y CI

- Ningún PR se mergea sin que pasen lint + tests.
- Priorizar cobertura en `stock` y `donaciones`: son los módulos más críticos del negocio.
- Antes de marcar una tarea como terminada, correr `make test` y `make lint` localmente.

## 5. Documentación

- Toda decisión arquitectónica relevante se documenta como ADR en `docs/adr/` (una por archivo: contexto → decisión → consecuencias).
- Si un cambio afecta cómo se instala o se levanta el proyecto, actualizar `README.md` en el mismo PR.

## 6. Cuando falta contexto

1. Buscar primero en `docs/02-especificacion/`.
2. Si no está documentado, preguntar al equipo en vez de asumir.
3. Si de todas formas hay que avanzar, dejar un comentario `// TODO:` explicando el supuesto y por qué se tomó.

## 7. Nota para Antigravity

Este archivo cubre las reglas generales del proyecto. Si el proyecto crece, se puede dividir en reglas por carpeta dentro de `.agents/rules/` (por ejemplo `.agents/rules/backend.md`, `.agents/rules/frontend.md`), que Antigravity lee automáticamente por workspace. Mientras el proyecto sea chico, conviene mantener todo acá para evitar reglas duplicadas o desactualizadas.
