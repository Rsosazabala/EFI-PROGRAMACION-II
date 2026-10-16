# Convenciones y guía de estilos — DonaJusto

## Paleta de colores
| Uso | Color |
|---|---|
| Fondo oscuro principal | `#0f172a` (slate-900) |
| Fondo oscuro de tarjetas | `#1e293b` (slate-800) |
| Fondo claro principal | `#f8fafc` (slate-50) |
| Fondo claro de tarjetas | `#ffffff` |
| Primario (acento) | `#10b981` verde esmeralda — hover `#059669` |
| Secundario (acento) | `#f59e0b` ámbar cálido — hover `#d97706` |
| Éxito | `#10b981` |
| Error | `#ef4444` |

El verde esmeralda evoca alimentos frescos y solidaridad; el ámbar da calidez sin competir con el verde como color principal.

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
