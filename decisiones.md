# Registro de decisiones de arquitectura (ADR) — DonaJusto

> ⚠️ **Regla de autorización obligatoria:** cualquier cambio de framework CSS, de la estructura de secciones, o que borre archivos existentes, requiere confirmación explícita antes de aplicarse.

---

### [ADR-001] · [2026-10-08 10:00] — TailwindCSS v3 vía CDN
- **Estado:** Aprobado
- **Contexto:** se necesita maquetar rápido una interfaz moderna sin configurar herramientas de build.
- **Decisión:** usar TailwindCSS v3 cargado por CDN.
- **Consecuencias:** desarrollo ágil, sin dependencias de Node.js para ver el sitio localmente.

### [ADR-002] · [2026-10-08 10:15] — SPA de una sola página
- **Estado:** Aprobado
- **Contexto:** el sitio necesita 3 vistas (Inicio, Catálogo de comedores, Formulario de contacto/donación) con navegación fluida.
- **Decisión:** todas las vistas viven en `index.html`; `app.js` muestra/oculta secciones sin recargar la página.
- **Consecuencias:** navegación instantánea, compatible con cualquier hosting estático.

### [ADR-003] · [2026-10-08 10:30] — Modal para el detalle de cada comedor
- **Estado:** Aprobado
- **Contexto:** cada tarjeta del catálogo necesita mostrar más información sin salir de la vista actual.
- **Decisión:** ventana modal con fondo semitransparente, cierre con botón, clic afuera y tecla Escape.
- **Consecuencias:** experiencia interactiva con JavaScript liviano, sin librerías externas.

### [ADR-004] · [2026-10-08 10:45] — Sin backend ni base de datos en esta entrega
- **Estado:** Aprobado
- **Contexto:** la consigna de la EFI pide solo frontend, con datos de prueba completos.
- **Decisión:** todos los datos (comedores, necesidades, stock, indicadores) viven en un array de JavaScript dentro de `app.js`.
- **Consecuencias:** el sitio funciona 100% offline/estático; conectar un backend real queda para una fase posterior del proyecto (ver `README.md`).
