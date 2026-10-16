# Reporte de Verificación SDD — DonaJusto

Registro continuo del cumplimiento del Definition of Done (DoD) y la metodología de desarrollo.

---

## [2026-10-08] — Implementación base de SPA, Catálogo y Datos de Prueba (Pasos 1 a 5)
- **Qué se hizo:** 
  - Se estructuró el documento HTML5 semántico (`index.html`) con las 3 vistas requeridas: Inicio, Catálogo y Formulario de donación.
  - Se configuró TailwindCSS v3 vía CDN con modo oscuro por clase (`darkMode: 'class'`) mitigando el riesgo EC-001.
  - Se definieron los datos de prueba 100% ficticios en `app.js` (6 comedores y merenderos para grilla de 3 columnas completa, e indicadores de impacto de la red).
  - Se implementó la navegación client-side (SPA) sin recargas, con transiciones fluidas.
  - Se implementó el modal interactivo con barras de stock dinámicas usando `<progress>` sin estilos inline prohibidos (EC-006) y bloqueo/restauración de scroll en `body` (EC-007).
  - Se implementó menú hamburguesa móvil accesible con cierre al navegar.
  - Se implementó formulario con validación nativa y notificación flotante (toast) con temporizador.
  - Se incorporaron animaciones en hover de tarjetas, transiciones de vistas y entrada del modal en `style.css`.
- **Por qué esta solución:** Responde exactamente a las restricciones de la entrega EFI (frontend puro, sin Node.js/build tools, compatible con apertura directa por doble clic vía `file://` al prescindir de llamadas externas `fetch`).
- **Archivos tocados:** 
  - `index.html`
  - `style.css`
  - `app.js`
- **Checklist DoD:**
  - Funcionalidad: ✅ (3 vistas, navegación sin recarga, modal con 3 vías de cierre, formulario con toast).
  - Diseño y experiencia: ✅ (Mobile-first con responsive 1/2/3 columnas, modo claro/oscuro con botones forzados en texto blanco, animaciones y estados).
  - Datos de prueba: ✅ (6 comedores ficticios completos con necesidades, stock y personas asistidas; indicadores globales).
  - Calidad de código: ✅ (HTML5 semántico, accesibilidad con botones y labels, sin estilos inline prohibidos, sin frameworks prohibidos).
- **Pendientes o riesgos:** 
  - La advertencia esperada del CDN de Tailwind en consola (EC-002, riesgo aceptado según ADR-001).
  - Elaborar el Documento de Investigación (Parte 1 de la EFI) y la presentación oral (Completado: ver DOCUMENTO_DE_INVESTIGACION.md y ESTRUCTURA_DEFENSA_ORAL.md).

---

## [2026-10-08] — Iteración de Diseño Visual, Dinamismo y Búsqueda en Tiempo Real
- **Qué se hizo:** 
  - Se incorporaron mallas y orbes ambientales difusos (`blur-3xl`) con tonos esmeralda y ámbar para eliminar la sensación plana/monocromática.
  - Se aplicó glassmorphism con desenfoque de fondo en el navbar (`glass-header`), modal, tarjetas y panel de filtros.
  - Se agregó una barra de controles al catálogo con buscador en tiempo real por nombre, barrio e insumos, y chips interactivos de filtro rápido ("Todos", "Urgencia Alta", "Comedores", "Merenderos").
  - Se implementaron contadores numéricos animados con JavaScript para las métricas de impacto de la red en la pantalla de inicio.
  - Se enriquecieron las tarjetas y el modal con iconografía temática (alimentos, ubicación, personas, horarios) y microanimación de pulso en comedores con urgencia crítica.
- **Por qué esta solución:** Eleva la calidad visual del sitio a un nivel profesional manteniendo 100% de cumplimiento con las restricciones (cero dependencias externas adicionales, estricto respeto a la paleta de `convenciones.md` y sin estilos inline).
- **Archivos tocados:** 
  - `index.html`
  - `style.css`
  - `app.js`
- **Checklist DoD:**
  - Funcionalidad: ✅ (Búsqueda en tiempo real, filtros dinámicos, reset de filtros, contadores animados).
  - Diseño y experiencia: ✅ (Glassmorphism, mallas de luz ambiental, microinteracciones en hover, estado vacío enriquecido).
  - Datos de prueba: ✅ (Los datos soportan búsqueda por múltiples criterios).
  - Calidad de código: ✅ (Código ES6 limpio, sin estilos inline prohibidos, accesibilidad preservada).
- **Pendientes o riesgos:** 
  - Ninguno en el frontend. El sitio está listo para la presentación.

---

## [2026-10-09] — Corrección de Estabilidad del Logo de Marca e Iconografía Vectorial Profesional
- **Qué se hizo:** 
  - Se identificó y resolvió la causa por la cual el texto del logo "Dona" cambiaba a verde en Inicio y volvía a color base en las otras vistas: el contenedor del logo compartía la clase `.nav-link`, provocando que el script de enrutamiento le aplicara la clase activa de enlace. Se desacopló el botón de marca (`#brand-logo`), fijando su tipografía (`text-slate-900 dark:text-white` para "Dona" y `text-emerald-500` para "Justo").
  - Se diseñó un logotipo vectorial SVG personalizado para DonaJusto (plato/cuenco solidario con brote nutricional en ámbar sobre fondo esmeralda) disponible como asset en `assets/logo.svg` e integrado inline.
  - Se eliminaron por completo todos los emojis informales del sitio (🌱, 🌙, ☀️, 🔍, 🔥, 🍲, 🥛, 👥, 📍, 📦, ⚠️, etc.) y se sustituyeron por un set homogéneo de iconos vectoriales SVG limpios y accesibles.
- **Por qué esta solución:** Proporciona un acabado visual profesional de nivel de producto comercial, erradica comportamientos visuales erráticos en la navegación y garantiza renderizado nítido en cualquier resolución.
- **Archivos tocados:** 
  - `assets/logo.svg`
  - `index.html`
  - `app.js`
  - `REPORTE_VERIFICACION_SDD.md`
- **Checklist DoD:**
  - Funcionalidad: ✅ (El logo navega a Inicio sin alterar sus colores en ninguna vista).
  - Diseño y experiencia: ✅ (Iconografía homogénea SVG, modo oscuro con sol/luna vectoriales, logo propio).
  - Datos de prueba: ✅ (Sin emojis en descripciones de datos).
  - Calidad de código: ✅ (Código semántico, libre de dependencias externas).

---

## [2026-10-09] — Rediseño y Modernización Integral de la Interfaz (UI/UX)
- **Qué se hizo:** 
  - **Hero de alto impacto en 2 columnas:** se integró un Hero asimétrico en escritorio con copy dinámico a la izquierda y una tarjeta interactiva en vivo (*spotlight card*) a la derecha que destaca el comedor con necesidad más crítica hoy ("Rincón de Luz"), con barra de stock en tiempo real y botón de acción directa.
  - **Fila de indicadores de confianza:** se añadieron etiquetas de garantía ("100% Ayuda directa", "Stock por movimientos", "Cero burocracia").
  - **Sección "¿Cómo funciona?":** se implementó un flujo visual en 3 pasos claros (Identificá la necesidad → Elegí tu donación → Coordinación directa) con tarjetas modernas que aportan narrativa y estructura al producto.
  - **Textura y profundidad ambiental:** se aplicó un patrón sutil de micropuntos (`dot-pattern`) y tarjetas estilo `modern-card` con bordes sutiles y sombras de elevación suaves.
  - **Catálogo renovado:** tarjetas con mini-banners temáticos por tipo (Comedor / Merendero), badges de horario, contador en vivo de resultados de búsqueda ("Mostrando X de Y comedores").
  - **Formulario dividido en 2 columnas:** columna lateral informativa con pautas de donación ética y no monetaria, junto al formulario de contacto estilizado.
- **Por qué esta solución:** Transforma el sitio de una maquetación estática básica a una experiencia web moderna, fluida y con peso de producto real, cumpliendo 100% de las consignas de la EFI.
- **Archivos tocados:** 
  - `index.html`
  - `style.css`
  - `app.js`
  - `REPORTE_VERIFICACION_SDD.md`
- **Checklist DoD:**
  - Funcionalidad: ✅ (Navegación fluida, spotlight interactivo, contador dinámico).
  - Diseño y experiencia: ✅ (Hero en 2 columnas, patrón de micropuntos, tarjetas con banners, layout de formulario 2 columnas).
  - Datos de prueba: ✅ (Comedores y necesidades integrados en todos los componentes).
  - Calidad de código: ✅ (Sin estilos inline, sin librerías pesadas, mobile-first preservado).

---

## [2026-10-09] — Corrección y Estabilización de Efectos Hover
- **Qué se hizo:** 
  - Se diagnosticó y corrigió el selector global `article:hover` en `style.css`: al aplicarse sobre la etiqueta semántica `<article>`, hacía que las secciones enteras de "¿Cómo funciona?" y de "Impacto" saltaran 5px hacia arriba con sombra gigante al pasar el cursor sobre cualquier texto. Se acotó la regla exclusivamente a las tarjetas individuales del catálogo (`#catalog-grid article:hover`) con un desplazamiento suave de apenas 2px.
  - Se eliminaron los saltos verticales de botón (`hover:-translate-y-0.5`), reemplazándolos por transiciones estables de color de fondo y sombra.
  - Se ajustó el estado `:hover` de los chips de filtrado para que no altere el color de texto del chip activo (`.filter-chip:hover:not(.active)`).
- **Por qué esta solución:** Elimina vibraciones visuales no deseadas (layout shifts) y brinda una respuesta táctil sólida, predecible y profesional.
- **Archivos tocados:** 
  - `style.css`
  - `index.html`
  - `app.js`
  - `REPORTE_VERIFICACION_SDD.md`
- **Checklist DoD:**
  - Funcionalidad: ✅ (Interacciones estables sin saltos involuntarios de contenedores).
  - Diseño y experiencia: ✅ (Microinteracciones suaves y consistentes).
  - Calidad de código: ✅ (Selectores CSS específicos y limpios).

---

## [2026-10-15] — Normalización Estructural de Contexto Vivo y Reglas Globales (Fase 1)
- **Qué se hizo:** 
  - Se crearon los directorios `.agents/rules/` y `docs/contexto/`.
  - Se movió `antigravity_global_rules.md` a `.agents/rules/antigravity_global_rules.md`.
  - Se movieron los 6 documentos del Master Context (`arquitectura.md`, `convenciones.md`, `decisiones.md`, `glosario.md`, `flujo-de-trabajo.md`, `errores-conocidos.md`) a `docs/contexto/`.
  - Se verificó la consistencia de las directivas `@` en `GEMINI.md`, `AGENTS.md` y `CLAUDE.md`.
- **Por qué esta solución:** Resuelve la inconsistencia crítica de rutas no encontradas en el conector maestro de Antigravity (`GEMINI.md`) y alinea el repositorio con el estándar oficial definido en `arquitectura.md` y el seminario Antigravity.
- **Archivos tocados:** 
  - `.agents/rules/antigravity_global_rules.md`
  - `docs/contexto/arquitectura.md`
  - `docs/contexto/convenciones.md`
  - `docs/contexto/decisiones.md`
  - `docs/contexto/glosario.md`
  - `docs/contexto/flujo-de-trabajo.md`
  - `docs/contexto/errores-conocidos.md`
  - `REPORTE_VERIFICACION_SDD.md`
- **Checklist DoD:**
  - Funcionalidad: ✅ (Los agentes cargan el contexto vivo sin enlaces rotos).
  - Estructura y arquitectura: ✅ (100% de coincidencia con arquitectura.md).
  - Calidad de código: ✅ (Árbol de directorios ordenado y limpio).

---

## [2026-10-15] — Cumplimiento de Consignas de Cátedra: Equipo, Social Media e Identidad Visual (Fase 2)
- **Qué se hizo:** 
  - Se crearon 5 avatares vectoriales SVG personalizados en `assets/team/` (`julian.svg`, `matias.svg`, `santiago.svg`, `ignacio.svg`, `rodrigo.svg`).
  - Se completó `DOCUMENTO_DE_INVESTIGACION.md` incorporando las fichas individuales con foto referenciada, cargo y perfil profesional de cada uno de los 5 integrantes (Punto 9 de la consigna).
  - Se sincronizó la descripción textual de la identidad visual en el documento de investigación con el logotipo real (`assets/logo.svg`).
  - Se vinculó el Favicon SVG y la etiqueta `meta name="description"` en el `<head>` de `index.html`.
  - Se implementó la vista navegable `view-team` en la SPA de `index.html`, con tarjetas responsive de los 5 integrantes adaptadas a modo claro y oscuro.
  - Se rediseñó el `<footer>` con los canales requeridos en el Punto 4 (GMail, Instagram, Facebook, YouTube) y el acceso directo al Formulario de Relevamiento y Feedback Comunitario.
- **Por qué esta solución:** Garantiza cumplimiento estricto de las pautas 2.2, 2.3, 4 y 9 del documento de consignas de la EFI, ofreciendo una experiencia integral y transparente al usuario.
- **Archivos tocados:** 
  - `assets/team/julian.svg`
  - `assets/team/matias.svg`
  - `assets/team/santiago.svg`
  - `assets/team/ignacio.svg`
  - `assets/team/rodrigo.svg`
  - `DOCUMENTO_DE_INVESTIGACION.md`
  - `index.html`
  - `REPORTE_VERIFICACION_SDD.md`
- **Checklist DoD:**
  - Funcionalidad: ✅ (Navegación fluida a la vista de Equipo, enlaces de redes sociales y formulario de feedback funcionales).
  - Diseño y experiencia: ✅ (Tarjetas de equipo responsive 1/2/3 columnas con avatares SVG nítidos y footer moderno).
  - Consignas cumplidas: ✅ (Puntos 2, 4 y 9 de la EFI integrados tanto en documentación como en la app web).
  - Calidad de código: ✅ (Cero frameworks pesados, SVG limpios, accesibilidad en links y contraste preservado).

---

## [2026-10-15] — Calidad Técnica, Sincronización de Estados y Limpieza (Fase 3)
- **Qué se hizo:** 
  - Se corrigió el enlace hardcodeado a `/home/julian/...` en `ESTRUCTURA_DEFENSA_ORAL.md` sustituyéndolo por un enlace relativo a `docs/contexto/errores-conocidos.md`.
  - Se actualizaron todos los estados de riesgos conocidos en `docs/contexto/errores-conocidos.md` de `Previsto` a `Resuelto` (EC-001 a EC-007) documentando la solución exacta implementada.
  - Se actualizó la sección 6 de `docs/contexto/flujo-de-trabajo.md` reflejando que la investigación oficial está consolidada y completa en `DOCUMENTO_DE_INVESTIGACION.md`.
  - Se optimizó `animateCounters()` en `app.js` mediante `activeCounterTimers` para limpiar intervalos previos y evitar acumulación de timers concurrentes en transiciones rápidas.
  - Se eliminó el archivo residual de 276 KB `Proyecto-DonaJusto-master (2).zip` de la raíz del proyecto.
- **Por qué esta solución:** Erradica inconsistencias documentales internas, previene pérdidas de rendimiento por eventos concurrentes y mantiene el repositorio limpio y portable para cualquier entorno o evaluador.
- **Archivos tocados:** 
  - `ESTRUCTURA_DEFENSA_ORAL.md`
  - `docs/contexto/errores-conocidos.md`
  - `docs/contexto/flujo-de-trabajo.md`
  - `app.js`
  - `REPORTE_VERIFICACION_SDD.md`
- **Checklist DoD:**
  - Portabilidad: ✅ (Cero enlaces absolutos rotos entre entornos locales).
  - Rendimiento: ✅ (Contadores numéricos limpios y sin fugas de timers).
  - Consistencia documental: ✅ (Estados sincronizados entre código, reporte SDD y errores conocidos).
  - Limpieza: ✅ (Sin archivos temporales ni zips huérfanos).

---

## [2026-10-15] — Presentación Interactiva y Estructuración de Entrega Final EFI-Equipo (Fase 4)
- **Qué se hizo:** 
  - Se diseñó y construyó la presentación web interactiva en `presentacion/index.html` con 10 diapositivas adaptadas al guion de 20 minutos de `ESTRUCTURA_DEFENSA_ORAL.md`, control por teclado y temporizador integrado.
  - Se creó la carpeta oficial de entrega `EFI-Equipo/` con la estructura exacta exigida por el PDF de la cátedra:
    - `Sitio_Web.zip` (código fuente limpio: html, css, js, assets, investigación y reporte SDD).
    - `documentos de contexto y reglas/` (`GEMINI.md`, `.agents/rules/` y los 6 docs de `docs/contexto/`).
    - `presentación/` (`index.html` y `GUION_DEFENSA_ORAL.md`).
- **Por qué esta solución:** Completa al 100% todos los requisitos de entrega y defensa oral de la EFI de Programación II 2026 sin dejar cabos sueltos ni dependencias rotas.
- **Archivos tocados:** 
  - `presentacion/index.html`
  - `presentacion/GUION_DEFENSA_ORAL.md`
  - `EFI-Equipo/Sitio_Web.zip`
  - `EFI-Equipo/documentos de contexto y reglas/`
  - `EFI-Equipo/presentación/`
  - `REPORTE_VERIFICACION_SDD.md`
- **Checklist DoD:**
  - Cumplimiento de consignas: ✅ (Partes 1 y 2, seminario Antigravity y entrega final cubiertas al 100%).
  - Defensa oral preparada: ✅ (Diapositivas listas con temporizador de 20 min).
  - Empaquetado oficial: ✅ (Estructura de carpetas idéntica a la solicitada por los profesores).


