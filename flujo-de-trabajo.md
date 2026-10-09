# Flujo de trabajo y control de calidad — DonaJusto

> Este documento define **cómo se trabaja** (metodología), **cuándo algo está terminado** (Definition of Done) y **qué hay que entregar** en la EFI de Programación II 2026. El stack y las tecnologías prohibidas están en `arquitectura.md`; la paleta y la accesibilidad, en `convenciones.md`.

## 1. Metodología (SDD adaptado)

### ¿Vía rápida o flujo completo?
| Tipo de cambio | Qué hacer |
|---|---|
| Toca **1 archivo** | Aplicar directo, respetando el DoD (vía rápida). |
| Toca **2 o más archivos** | Flujo completo: explorar → proponer → tareas → aplicar → verificar. |
| Cambia el framework CSS, la paleta, la estructura de secciones o **borra archivos** | Explicar el impacto y **pedir confirmación** antes de aplicar (ver `decisiones.md`). |

### Pasos del flujo completo
1. **Explorar:** leer `docs/contexto/` antes de tocar código.
2. **Proponer:** definir qué se va a construir o cambiar y validar que no use tecnología prohibida.
3. **Tareas:** dividir el trabajo en pasos chicos y concretos.
4. **Aplicar:** escribir HTML semántico → estilos con Tailwind → interactividad en JS.
5. **Verificar:** repasar la checklist de la sección 3 y dejar constancia en `REPORTE_VERIFICACION_SDD.md` (sección 4).

## 2. Orden sugerido de construcción
1. Estructura HTML5 de las 3 vistas (Inicio, Catálogo, Formulario) + navbar + footer.
2. Estilos con TailwindCSS: paleta, tipografía y responsive. Configurar acá el modo oscuro (ver `errores-conocidos.md`).
3. Datos de prueba en `app.js` (comedores, necesidades, stock, indicadores). Ver requisitos en la sección 3.
4. Interactividad: navegación SPA, modal, menú móvil, modo claro/oscuro, formulario con toast.
5. Animaciones en los elementos principales (hover en tarjetas, transición entre vistas, apertura del modal, aparición del toast).
6. Verificación final (sección 3) y `REPORTE_VERIFICACION_SDD.md`.

## 3. Checklist de "listo" (Definition of Done)

**Funcionalidad**
- [ ] El sitio abre sin errores en el navegador (también con doble clic, sin servidor).
- [ ] Los 3 bloques funcionan: Inicio, Catálogo (con modal) y Formulario.
- [ ] La navegación entre vistas no recarga la página.
- [ ] El modal cierra con el botón, con clic afuera y con la tecla Escape.
- [ ] El formulario valida (`required`, `label for`) y muestra un aviso visual (toast) al enviarse.

**Diseño y experiencia**
- [ ] Responsive probado (F12 → modo responsive): móvil < 768 px (1 columna + menú hamburguesa), tablet 768–1024 px (2 columnas), escritorio > 1024 px (3 columnas). Sin scroll horizontal roto y con botones de al menos 44 px de alto.
- [ ] El botón de modo claro/oscuro cambia la paleta y el texto se sigue leyendo bien; los botones sólidos de color llevan texto blanco en ambos modos.
- [ ] Hay animaciones en los elementos principales y ninguna impide usar el sitio.
- [ ] Los 4 estados de UI donde aplique: Loading, Empty (sin resultados), Error, Success.

**Datos de prueba** (requisito de la EFI: "datos de prueba completos")
- [ ] Hay suficientes comedores como para llenar la grilla de 3 columnas sin huecos (sugerencia: 6 o 9) y cada uno tiene necesidades, stock y cantidad de personas asistidas.
- [ ] Hay datos de indicadores (insumos más usados, personas asistidas) y se muestran en alguna de las 3 vistas.
- [ ] Todo es **ficticio**: nombres, ubicaciones y números (regla de `AGENTS.md`: nunca datos reales de comedores ni personas).

**Calidad de código**
- [ ] Cero errores en la consola (F12 → Console). El aviso del CDN de Tailwind es una advertencia esperada, no un error (ver `errores-conocidos.md`).
- [ ] Sin estilos inline (`style="..."`), sin código muerto y sin archivos temporales.
- [ ] Sin tecnología prohibida (ver `arquitectura.md`).
- [ ] Accesibilidad básica: `<button>` para lo clicable, `alt` descriptivo, encabezados en orden h1 → h2 → h3.
- [ ] Hay una justificación breve de la solución elegida (en el PR, el commit o el reporte).

## 4. Reporte de verificación

Al cerrar cada tarea de 2 o más archivos, agregar una entrada en `REPORTE_VERIFICACION_SDD.md` (raíz del proyecto, junto a `index.html`). Plantilla:

```markdown
## [AAAA-MM-DD] — Nombre de la tarea
- **Qué se hizo:** ...
- **Por qué esta solución:** ...
- **Archivos tocados:** ...
- **Checklist DoD:** ✅ / ⚠️ / ❌ por cada grupo (Funcionalidad, Diseño, Datos, Calidad)
- **Pendientes o riesgos:** ...
```

## 5. Contexto vivo y memoria
- Si una tarea cambia una decisión, un término o descubre un problema, actualizar en el mismo cambio el documento que corresponda: `decisiones.md` (ADR), `glosario.md` o `errores-conocidos.md`.
- Guardar en la memoria activa (Engram) las decisiones y los gotchas relevantes a medida que ocurren, y resumir la sesión al cerrar.

## 6. Entrega EFI — Programación II 2026

### Parte 1 — Documento de investigación
El documento en sí no está en este repositorio; esta tabla indica qué material de base hay para cada sección que pide la consigna.

| # | Sección que pide la consigna | Qué hay en el repo | Qué falta definir |
|---|---|---|---|
| 1 | Resumen de la idea | `README.md` (El problema, Qué resuelve DonaJusto) | Adaptarlo a una versión corta |
| 2 | Datos de la empresa: nombre, icono de apps y tiendas, logos en distintos formatos, datos principales (domicilio, teléfono, mail), a qué se dedica, si ya tiene sitio o app | Nombre y descripción de DonaJusto | Icono, logos, datos de contacto y si existe un sitio previo |
| 3 | Requerimientos de software con defensa: framework CSS, hosting y costo, dominio y costo (nic.ar) | ADR-001 (Tailwind) y ADR-002 (SPA, compatible con hosting estático) | Hosting y dominio: elegir, investigar el costo vigente y registrar el ADR |
| 4 | Social media: Gmail, Facebook, Instagram, canal de YouTube, Google Form de contacto o feedback | — | Todo |
| 5 | Valor agregado frente a opciones gratuitas o libres | `README.md` (Qué resuelve DonaJusto) | Contrastarlo con alternativas reales |
| 6 | Alcance de la primera versión (incluido y no incluido) | Incluido: las 3 vistas frontend. No incluido: backend y base de datos (ADR-004, `arquitectura.md`) | Redactarlo con el detalle que pide la consigna |
| 7 | Detalle de los contenidos (listado de características) | `arquitectura.md`, `glosario.md`, `convenciones.md` | Armar el listado |
| 8 | Cómo monetizar la app | — | Todo |
| 9 | Equipo: nombre, cargo, foto y breve descripción | `README.md` (Equipo: nombres y roles) | Foto y descripción de cada integrante |

### Parte 2 — Producción
- Sitio frontend hecho con Antigravity, con framework CSS, responsive (móvil y escritorio), modo claro y oscuro y animaciones: se verifica con la sección 3.
- Datos de prueba completos: se verifica con la sección 3.
- Presentación y defensa oral: **máximo 20 minutos por equipo**, de forma clara y técnica. Ensayarla con cronómetro.

**Pasos del seminario de Antigravity.** La consigna pide realizarlos todos. Lo que ya está en el repo:

| Paso | Dónde está |
|---|---|
| Reglas globales siempre activas | `.agents/rules/antigravity_global_rules.md` (`trigger: always_on`) |
| Conector maestro de contexto | `GEMINI.md` |
| Contexto vivo (6 documentos) | `docs/contexto/` |
| Metodología SDD y reporte | Este documento y `REPORTE_VERIFICACION_SDD.md` |
| Memoria activa (Engram) | Regla en `antigravity_global_rules.md`, sección 6 |

Si el seminario incluye otros pasos que no figuran en la tabla, agregarlos. Conviene guardar capturas o registros de las sesiones de Antigravity como evidencia para la defensa.

### Estructura de carpetas de la entrega final
```text
EFI-Equipo/
├── Sitio_Web.zip                    # index.html, app.js, style.css y assets
├── documentos de contexto y reglas/ # GEMINI.md, .agents/rules/ y los 6 docs de docs/contexto/
└── presentación/                    # archivo de la presentación
```
> **A confirmar con la cátedra:** la consigna no indica en qué carpeta va el Documento de investigación (Parte 1). Hasta saberlo, ponerlo en la raíz de `EFI-Equipo/`.
