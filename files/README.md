# DonaJusto

> Plataforma digital que conecta a quienes quieren donar con comedores y merenderos comunitarios, mostrando qué necesita cada lugar para que la ayuda llegue donde realmente hace falta.

**Estado:** 📋 En planificación y diseño — repositorio preparado para arrancar el desarrollo.
**Origen:** proyecto académico (Tecnicatura Superior en Desarrollo de Software, Instituto Tecnológico Río Cuarto) que pasa a desarrollarse como producto real.

---

## Índice

- [El problema](#el-problema)
- [Qué resuelve DonaJusto](#qué-resuelve-donajusto)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Primeros pasos](#primeros-pasos)
- [Módulos del sistema](#módulos-del-sistema)
- [Flujo de trabajo en Git](#flujo-de-trabajo-en-git)
- [Documentación del proyecto](#documentación-del-proyecto)
- [Diagramas (Archify)](#diagramas-archify)
- [Agentes de IA en este repo](#agentes-de-ia-en-este-repo)
- [Equipo](#equipo)
- [Licencia](#licencia)

## El problema

Muchas personas quieren colaborar con comedores y merenderos, pero no saben con precisión qué necesita cada lugar en cada momento: suelen donar lo que tienen a mano, generando excedentes de algunos productos y faltantes de otros. Del lado de los comedores, el registro de donaciones y stock suele hacerse en cuadernos o por WhatsApp, lo que dificulta comunicar necesidades con claridad, priorizar los insumos que más se usan y llevar un registro confiable de cuánta gente asiste a cada lugar.

El resultado es desperdicio en algunos casos, faltantes en otros, y una distribución poco eficiente de las donaciones entre los comedores de la red.

## Qué resuelve DonaJusto

- Muestra en tiempo real qué necesita y qué stock tiene cada comedor.
- Orienta las donaciones hacia necesidades reales en lugar de excedentes.
- Identifica qué insumos se usan o transforman más, para priorizarlos.
- Registra cuántas personas asiste cada lugar: un dato clave para planificar y para mostrar impacto a quienes donan.

## Estructura del repositorio

```
donajusto/
├── README.md
├── AGENTS.md                 # reglas para agentes de IA (Antigravity, Claude Code, etc.)
├── CLAUDE.md                 # punto de entrada específico para Claude Code
├── GUIA-ARCHIFY.md           # cómo generar diagramas del proyecto con Archify
├── .gitignore
├── .env.example
├── docker-compose.yml
├── Makefile
│
├── docs/
│   ├── 00-proyecto/          # documento inicial, objetivos, alcance, cronograma
│   ├── 01-relevamiento/      # informe de comedores y merenderos relevados
│   ├── 02-especificacion/    # requerimientos funcionales e historias de usuario
│   ├── 03-diseno/            # diagramas de flujo y diseños preliminares de pantallas
│   │   └── diagramas/        # salidas HTML generadas con Archify
│   ├── adr/                  # decisiones de arquitectura (Architecture Decision Records)
│   └── api/                  # documentación de la API (OpenAPI)
│
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── comedores/
│   │   │   ├── donaciones/
│   │   │   ├── stock/
│   │   │   ├── consumo/
│   │   │   ├── asistencia/
│   │   │   └── indicadores/
│   │   ├── shared/
│   │   ├── config/
│   │   └── database/
│   │       ├── migrations/
│   │       └── seeds/
│   ├── tests/
│   │   ├── unit/
│   │   └── integration/
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── features/
│   │   ├── components/
│   │   ├── services/
│   │   └── hooks/
│   ├── public/
│   ├── tests/
│   └── Dockerfile
│
├── infra/
│   ├── ci/
│   └── scripts/
│
└── .github/
    ├── workflows/
    └── PULL_REQUEST_TEMPLATE.md
```

## Primeros pasos

### Requisitos
- Node.js 20+ (ajustar si el equipo define otro runtime)
- Docker y Docker Compose
- Cuenta de Figma (para los diseños de `docs/03-diseno/`)

### Instalación local
```bash
git clone <url-del-repo>
cd donajusto
cp .env.example .env
docker compose up -d
```

### Scripts disponibles (Makefile)

| Comando | Qué hace |
|---|---|
| `make dev` | Levanta backend y frontend en modo desarrollo |
| `make test` | Corre los tests de backend y frontend |
| `make lint` | Corre el linter y el formateador |
| `make migrate` | Aplica las migraciones de base de datos pendientes |
| `make seed` | Carga datos de prueba (nunca datos reales de comedores) |

> Estos comandos son un punto de partida: ajustarlos cuando el equipo defina el stack final.

## Módulos del sistema

| Módulo | Responsabilidad | Meta del TP relacionada |
|---|---|---|
| `auth` | Usuarios y roles (donante, comedor, administrador) | — |
| `comedores` | Perfil, ubicación y necesidades declaradas de cada lugar | Meta 2 |
| `donaciones` | Registro de donaciones por ítem y por lugar | Meta 2 |
| `stock` | Inventario actual de cada comedor, calculado por movimientos | Meta 2 |
| `consumo` | Insumos más utilizados o transformados | Meta 2 |
| `asistencia` | Conteo de personas asistidas por lugar | Meta 2 |
| `indicadores` | Panel de métricas para quien dona | Metas 2 y 4 |

## Flujo de trabajo en Git

- **Ramas:** `main` (estable) ← `develop` (integración) ← `feature/nombre-corto`, `fix/nombre-corto`
- **Commits:** [convencionales](https://www.conventionalcommits.org/es/v1.0.0/) (`feat:`, `fix:`, `docs:`, `test:`, `chore:`)
- **Pull requests:** obligatorios para mergear a `develop` o `main`, con al menos 1 revisión aprobada
- **CI:** cada PR corre lint + tests antes de poder mergearse

## Documentación del proyecto

| Carpeta | Contenido | Meta del TP |
|---|---|---|
| `docs/00-proyecto/` | Documento inicial, objetivos, alcance, cronograma | — |
| `docs/01-relevamiento/` | Informe de relevamiento de comedores y merenderos | Meta 1 |
| `docs/02-especificacion/` | Historias de usuario y requerimientos funcionales | Meta 2 |
| `docs/03-diseno/` | Diagramas de flujo y diseños preliminares de pantallas | Metas 3 y 4 |
| `docs/adr/` | Registro de decisiones técnicas | — |

## Diagramas (Archify)

Los diagramas de arquitectura y de proceso se generan con [Archify](https://github.com/tt-a1i/archify), una skill de agente que convierte una descripción en un diagrama HTML interactivo y versionable, en vez de dibujarlo a mano. Ver **`GUIA-ARCHIFY.md`** para instalación y prompts ya armados para DonaJusto.

## Agentes de IA en este repo

Este repositorio incluye reglas para agentes de IA (Antigravity, Claude Code, Cursor, etc.) en **`AGENTS.md`**. Cualquier agente que proponga o modifique código acá debe leer ese archivo primero. **`CLAUDE.md`** es un punto de entrada corto que importa `AGENTS.md` para Claude Code.

## Equipo

| Rol | Integrante |
|---|---|
| Líder de proyecto / PM | Altamirano, Julián |
| Analista funcional | Rodríguez, Matías |
| Diseñador/a UX-UI | Heredia, Santiago |
| Analista de datos | López Ruiz, Ignacio |
| Responsable de comunicación y documentación | Sosa Zabala, Rodrigo |

## Licencia

Por definir. Mientras tanto, este código es de uso interno del equipo. *(Si en algún momento deciden abrirlo, MIT es una opción simple y permisiva.)*
