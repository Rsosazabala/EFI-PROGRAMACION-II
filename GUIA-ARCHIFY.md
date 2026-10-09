# Guía rápida: diagramas con Archify

[Archify](https://github.com/tt-a1i/archify) es una *skill* de agente, no una app con interfaz gráfica: convierte una descripción en lenguaje natural (o un repositorio real) en un diagrama HTML interactivo, versionable y exportable. Se usa pidiéndoselo al agente de IA dentro del propio editor, no desde una web aparte.

## 1. Instalación

Desde la raíz del repositorio:

```bash
npx skills add tt-a1i/archify -g
```

Esto la deja instalada de forma global. Soporte oficial confirmado por el proyecto: **Claude Code, Cursor, Codex CLI y OpenCode**.

> **Sobre Antigravity:** al momento de escribir esta guía, Antigravity no figura en la lista oficial de agentes soportados por Archify. Como ambos usan el mismo formato de skill (`SKILL.md`) y Antigravity busca skills en `.agents/skills/`, es probable que funcione copiando ahí la carpeta instalada manualmente — pero no está probado ni garantizado por los mantenedores de Archify. Si el equipo trabaja sobre todo con Antigravity, lo más seguro es generar los diagramas "oficiales" del proyecto desde una sesión de **Claude Code**.

## 2. Cómo se usa

No hay comandos que memorizar: se le escribe al agente, en lenguaje natural, qué diagrama se necesita. Archify entiende cinco tipos, cada uno pensado para una pregunta distinta:

| Tipo | Para qué sirve | Ejemplo en DonaJusto |
|---|---|---|
| **Architecture** | Componentes, servicios, almacenamiento, límites | Mapa de módulos del backend + frontend + base de datos |
| **Workflow** | Procesos con pasos, orden y excepciones | El proceso de donación completo (Meta 3 del TP) |
| **Sequence** | Una interacción puntual en el tiempo | Un endpoint de la API consultando la base de datos |
| **Data Flow** | Movimiento de datos y su sensibilidad | Cómo viaja el dato de "personas asistidas" hasta el panel |
| **Lifecycle** | Estados, reintentos, resultados finales | Estados de una donación: pendiente → confirmada → aplicada al stock |

Para DonaJusto, los dos más útiles ahora son **Architecture** y **Workflow**.

## 3. Prompts listos para pegar

### Diagrama de arquitectura (estructura general del sistema)

```
Usá Archify para crear un diagrama de tipo architecture de DonaJusto, a partir
de esta descripción (todavía no hay código, es el diseño objetivo):

- Frontend con tres pantallas principales: perfil del comedor, formulario de
  donación y panel de indicadores para el donante.
- Backend organizado en los módulos auth, comedores, donaciones, stock,
  consumo, asistencia e indicadores.
- Una base de datos PostgreSQL compartida por todos los módulos.
- Tres roles con distintos límites de confianza: donante, comedor y
  administrador.

Mostrá entre 8 y 12 componentes, el camino principal (donante dona → stock
se actualiza → indicadores se recalculan) y marcá los límites de confianza
entre roles. Guardá el resultado en docs/03-diseno/diagramas/.
```

### Diagrama de flujo del proceso de donación (Meta 3 del TP)

```
Usá Archify para crear un diagrama de tipo workflow del proceso de donación
completo de DonaJusto:

1. El donante ve las necesidades y el stock actual de un comedor en su perfil.
2. Elige qué donar según lo que el comedor necesita.
3. Completa el formulario de donación.
4. El comedor recibe la notificación de la donación.
5. El comedor confirma la recepción.
6. El comedor actualiza su stock (se registra como un movimiento de entrada).
7. El sistema recalcula el indicador de insumos más utilizados y actualiza
   el panel del donante.

Incluí los tres participantes (donante, plataforma, comedor), el orden de
los pasos, y qué pasa si el comedor no confirma la recepción en 48 horas
(excepción). Guardá el resultado en docs/03-diseno/diagramas/.
```

## 4. Iterar sobre un diagrama ya generado

Una vez creado, se puede seguir ajustando por chat, por ejemplo:

- "Agregá el rol de administrador como un cuarto participante"
- "Resaltá el camino de lo que pasa cuando el comedor no confirma"
- "Cambiá a tema claro"

## 5. Qué hacer con el resultado

Archify entrega un único archivo `.html` autocontenido: se puede abrir directo en el navegador, compartir o incrustar en una presentación. Conviene:

1. Guardarlo en `docs/03-diseno/diagramas/` con un nombre descriptivo (`arquitectura-general.html`, `flujo-donacion.html`).
2. Commitearlo junto a su fuente (Archify también guarda un JSON tipado que permite reabrir y editar el diagrama más adelante).
3. Enlazarlo desde `docs/03-diseno/` o desde el documento de especificación funcional.

## Referencias

- Repositorio oficial: https://github.com/tt-a1i/archify
- Guía interactiva de tipos de diagrama: https://tt-a1i.github.io/archify/guide.html
