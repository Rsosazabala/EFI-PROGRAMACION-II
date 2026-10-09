# Errores conocidos (gotchas) — DonaJusto

> Registro vivo de problemas y sus soluciones. Consultarlo **antes** de tocar código y agregar una entrada cada vez que aparezca un problema no obvio.
>
> **Estado inicial:** todavía no hay código, así que las primeras entradas son **riesgos previstos** del stack elegido (Tailwind CDN + JS vanilla + SPA), no incidentes ocurridos. Cuando alguno se confirme en el proyecto, cambiar su estado a "Confirmado" y completar la solución real.

**Formato de cada entrada:** Síntoma → Causa → Solución → Estado (`Previsto`, `Confirmado` o `Resuelto`).

---

### [EC-001] El botón de modo oscuro no cambia nada
- **Síntoma:** al tocar el botón, la clase `dark` se agrega pero los estilos `dark:` no se aplican; el sitio solo respeta el tema del sistema operativo.
- **Causa:** en Tailwind v3 el modo oscuro usa por defecto `prefers-color-scheme`. Para controlarlo con un botón hay que activar la estrategia por clase.
- **Solución:** definir `tailwind.config = { darkMode: 'class' }` en un `<script>` **después** de la etiqueta que carga el CDN, y alternar la clase `dark` en `<html>`.
- **Estado:** Previsto

### [EC-002] Aviso en consola del CDN de Tailwind
- **Síntoma:** la consola muestra que `cdn.tailwindcss.com` no debería usarse en producción.
- **Causa:** es una advertencia (warning) que emite el CDN de Tailwind. Es la consecuencia aceptada de ADR-001.
- **Solución:** no es un error del DoD, no hay que "arreglarlo" en la EFI. Para una fase de producción hay que compilar Tailwind con su CLI.
- **Estado:** Previsto

### [EC-003] Botones de color con texto poco legible
- **Síntoma:** un botón verde o ámbar muestra texto oscuro o con poco contraste, sobre todo al cambiar de tema.
- **Causa:** el Preflight de Tailwind hace que los `<button>` hereden el color de texto del contenedor.
- **Solución:** aplicar `text-white` o `.force-text-white` a todo botón sólido de color (regla de contraste fuerte de `convenciones.md`).
- **Estado:** Previsto

### [EC-004] `fetch()` de un `.json` falla al abrir el sitio con doble clic
- **Síntoma:** error de CORS en la consola y el catálogo queda vacío.
- **Causa:** la mayoría de los navegadores bloquean `fetch()` de archivos locales (`file://`).
- **Solución:** mantener los datos de prueba dentro de `app.js`, como define ADR-004. No mover los datos a un `.json` externo.
- **Estado:** Previsto

### [EC-005] Sin internet el sitio se ve sin estilos
- **Síntoma:** la página aparece sin diseño y con tipografía por defecto.
- **Causa:** Tailwind (CDN) y Google Fonts se descargan de internet. Contradice la nota de ADR-004 de que el sitio funciona "100% offline": los datos sí son locales, pero los estilos no.
- **Solución:** probar la demo de la defensa **con la conexión del lugar** o tener una copia de respaldo (capturas o video). Evaluar con el equipo si vale la pena guardar copias locales de las fuentes; cambiar Tailwind a una copia local requiere confirmación (guarda de producto).
- **Estado:** Previsto

### [EC-006] Estilos inline prohibidos vs. barras de stock
- **Síntoma:** las barras de nivel de stock necesitan un ancho distinto por comedor y la salida más directa es `style="width: 60%"`, que `arquitectura.md` prohíbe.
- **Causa:** el ancho es dinámico (sale de los datos de prueba) y los estilos inline están prohibidos en esta entrega.
- **Solución propuesta (a validar con el equipo):** usar el elemento `<progress value max>` estilizado en `style.css`: es accesible y no depende de cómo Tailwind genere las clases. Alternativa: clases de valor arbitrario (`w-[60%]`) armadas desde JS; con el CDN, que lee el DOM en vivo, en principio funcionan, pero dejarían de funcionar con una build compilada de Tailwind. Si se elige una técnica, registrarla en un ADR.
- **Estado:** Previsto

### [EC-007] El fondo sigue scrolleando con el modal abierto o el menú móvil queda abierto
- **Síntoma:** con el modal abierto se puede desplazar la página de atrás; al navegar a otra vista en móvil, el menú hamburguesa sigue desplegado.
- **Causa:** en una SPA nada reinicia el estado de la interfaz al cambiar de vista, y el modal no bloquea el scroll por sí solo.
- **Solución:** bloquear el scroll del `<body>` al abrir el modal y restaurarlo en **todas** las formas de cierre (botón, clic afuera y Escape). Cerrar el menú móvil dentro de la función que cambia de vista.
- **Estado:** Previsto
