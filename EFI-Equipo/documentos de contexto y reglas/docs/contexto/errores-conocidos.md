# Errores conocidos (gotchas) — DonaJusto

> Registro vivo de problemas y sus soluciones. Consultarlo **antes** de tocar código y agregar una entrada cada vez que aparezca un problema no obvio.
>
> **Estado de resolución:** los riesgos iniciales previstos para la Single Page Application fueron resueltos y verificados durante las iteraciones de desarrollo, garantizando el cumplimiento estricto del Definition of Done (DoD).

**Formato de cada entrada:** Síntoma → Causa → Solución → Estado (`Previsto`, `Confirmado` o `Resuelto`).

---

### [EC-001] El botón de modo oscuro no cambia nada
- **Síntoma:** al tocar el botón, la clase `dark` se agrega pero los estilos `dark:` no se aplican; el sitio solo respeta el tema del sistema operativo.
- **Causa:** en Tailwind v3 el modo oscuro usa por defecto `prefers-color-scheme`. Para controlarlo con un botón hay que activar la estrategia por clase.
- **Solución:** se definió `tailwind.config = { darkMode: 'class' }` en el `<head>` de `index.html` y se implementó `initTheme()` en `app.js` con persistencia en `localStorage` e iconografía SVG reactiva (sol/luna).
- **Estado:** Resuelto

### [EC-002] Aviso en consola del CDN de Tailwind
- **Síntoma:** la consola muestra que `cdn.tailwindcss.com` no debería usarse en producción.
- **Causa:** es una advertencia (warning) que emite el CDN de Tailwind. Es la consecuencia aceptada de ADR-001.
- **Solución:** no es un error de código ni bloquea el DoD. Para la entrega EFI es la vía óptima para prescindir de Node.js. En fase futura con backend se compilará con Tailwind CLI.
- **Estado:** Aceptado por diseño (ADR-001)

### [EC-003] Botones de color con texto poco legible
- **Síntoma:** un botón verde o ámbar muestra texto oscuro o con poco contraste, sobre todo al cambiar de tema.
- **Causa:** el Preflight de Tailwind hace que los `<button>` hereden el color de texto del contenedor.
- **Solución:** se creó la utilidad `.force-text-white { color: #ffffff !important; }` y se aplicó a todos los botones principales garantizando contraste WCAG AAA en modos claro y oscuro.
- **Estado:** Resuelto

### [EC-004] `fetch()` de un `.json` falla al abrir el sitio con doble clic
- **Síntoma:** error de CORS en la consola y el catálogo queda vacío.
- **Causa:** la mayoría de los navegadores bloquean `fetch()` de archivos locales (`file://`).
- **Solución:** todos los datos de prueba viven dentro de la constante `DONAJUSTO_DATA` en `app.js` (ADR-004). El sitio puede abrirse directamente con doble clic sin servidor local.
- **Estado:** Resuelto

### [EC-005] Sin internet el sitio se ve sin estilos
- **Síntoma:** la página aparece sin diseño y con tipografía por defecto.
- **Causa:** Tailwind (CDN) y Google Fonts se descargan de internet.
- **Solución:** se documentó en `ESTRUCTURA_DEFENSA_ORAL.md` la verificación previa de red en el aula de defensa y mantener la pestaña del navegador precargada como plan de contingencia offline.
- **Estado:** Mitigado para la defensa

### [EC-006] Estilos inline prohibidos vs. barras de stock
- **Síntoma:** las barras de nivel de stock necesitan un ancho dinámico por comedor y la salida más común es `style="width: 60%"`, lo cual viola la prohibición de estilos inline.
- **Causa:** necesidad de representación visual del stock respetando la regla anti-inline styles.
- **Solución:** se implementó el elemento semántico nativo `<progress value max>` con selectores completos en `style.css` (`progress::-webkit-progress-value`, `progress::-moz-progress-bar`). Es accesible y 100% libre de estilos inline.
- **Estado:** Resuelto

### [EC-007] El fondo sigue scrolleando con el modal abierto o el menú móvil queda abierto
- **Síntoma:** con el modal abierto se puede desplazar la página de atrás; al navegar a otra vista en móvil, el menú hamburguesa sigue desplegado.
- **Causa:** la SPA no reinicia el estado de la interfaz automáticamente al alternar vistas.
- **Solución:** se implementó `document.body.classList.add('overflow-hidden')` al abrir el modal y se restaura en las tres formas de cierre (botón X, clic en overlay y tecla Escape). Asimismo, `navigateToView()` cierra automáticamente el menú móvil.
- **Estado:** Resuelto
