# Convenciones y guía de estilos — DonaJusto

## Paleta de colores — "Cálido de barrio" (desde 2026-10-29)
| Uso | Color / Token |
|---|---|
| Fondo de página (claro) | `#fbfaf6` — clase Tailwind custom `bg-crema` |
| Fondo de página (oscuro) | `bg-slate-900` |
| Franja de marca (header, heroes) | `bg-emerald-900` — oscuro: `dark:bg-emerald-950` |
| Footer | `bg-emerald-950` |
| Tarjetas / vales | `bg-white dark:bg-slate-800` |
| Texto principal | `text-slate-900 dark:text-slate-100` |
| Texto secundario | `text-slate-500 dark:text-slate-400` |
| Acento cálido (botones sobre verde) | `bg-amber-400` con `text-emerald-950` |
| Acento urgencia (textos) | `text-amber-600 dark:text-amber-400` |
| Acento "ok" / links | `text-emerald-600 dark:text-emerald-400` |

El verde esmeralda evoca alimentos frescos y solidaridad; el ámbar da calidez sin competir con el verde como color principal.

## Componente VALE
El componente principal del catálogo y del formulario es el "vale de donación":
- Estructura: `article.vale` con `border-2 border-dashed` (ámbar para urgente, esmeralda para normal).
- Dos semicírculos laterales (`-left-3` / `-right-3`, `top-1/2 -translate-y-1/2`) en el color del fondo de página para simular troquelado.
- Hover: `-translate-y-1 -rotate-[0.5deg] shadow-xl`.
- Generado por `renderVale(comedor, index)` en `app.js`.

## Regla de contraste fuerte (EC-003)
Todo botón sólido con fondo de color (verde, ámbar, rojo) debe llevar texto garantizado. Los botones ámbar llevan `text-emerald-950`; los verdes oscuros, `force-text-white`.

## HTML y accesibilidad
- Usar siempre `<button>` para elementos clicables, nunca `<div>`/`<span>` sueltos.
- Atributo `alt` descriptivo en todas las imágenes.
- Jerarquía de encabezados ordenada (`h1` → `h2` → `h3`).
- Formularios con `<label for="...">` vinculado a cada input, y `required` donde corresponda.
- `focus-visible:ring-2 ring-amber-400 ring-offset-2` en todos los elementos interactivos.
- Áreas táctiles mínimas de 44 × 44 px.

## Responsive (mobile-first)
- **Móvil** (< 768px): 1 columna, menú hamburguesa, botones de al menos 44px de alto, hero en `text-5xl`.
- **Tablet** (768–1024px): 2 columnas en el catálogo de comedores.
- **Escritorio** (> 1024px): 3 columnas, navegación horizontal visible.
- Sin scroll horizontal a 360 px de ancho.

## Tipografía
- Títulos: Poppins (`font-heading font-extrabold tracking-tight`).
- Texto: Inter, con interlineado cómodo (`leading-relaxed`).
- Etiquetas pequeñas: `text-[11px] font-bold uppercase tracking-widest`.


## Regla de contraste fuerte
Todo botón sólido con fondo de color (verde, ámbar, rojo) debe llevar texto blanco asegurado (`text-white` o clase `.force-text-white`), tanto en modo claro como en modo oscuro.

## HTML y accesibilidad
- Usar siempre `<button>` para elementos clicables, nunca `<div>`/`<span>` sueltos.
- Atributo `alt` descriptivo en todas las imágenes.
- Jerarquía de encabezados ordenada (`h1` → `h2` → `h3`).
- Formularios con `<label for="...">` vinculado a cada input, y `required` donde corresponda.

## Responsive (mobile-first)
- **Móvil** (< 768px): 1 columna, menú hamburguesa, botones de al menos 44px de alto.
- **Tablet** (768–1024px): 2 columnas en el catálogo de comedores.
- **Escritorio** (> 1024px): 3 columnas, navegación horizontal visible.

## Tipografía
- Títulos: Poppins, negrita.
- Texto: Inter, con interlineado cómodo (`leading-relaxed`).
