# Arquitectura del proyecto — DonaJusto

## Visión general
- **Nombre:** DonaJusto
- **Propósito:** sitio web (solo frontend) que conecta donantes con comedores y merenderos comunitarios, mostrando qué necesita y qué stock tiene cada lugar.
- **Tipo:** Single Page Application (SPA) del lado del cliente, sin recargas de página.

## Stack tecnológico
- **Markup:** HTML5 semántico (`header`, `nav`, `main`, `section`, `article`, `footer`).
- **Estilos:** TailwindCSS v3 vía CDN + `style.css` para microinteracciones puntuales.
- **Lógica:** JavaScript vanilla (ES6+) en `app.js`, organizado en funciones claras.
- **Tipografía:** Google Fonts — Poppins (títulos) + Inter (texto).
- **Datos:** datos de prueba en un array/JSON dentro de `app.js` (comedores, necesidades, stock, indicadores). Sin base de datos real.

## Estructura de archivos
```text
donajusto-sitio/
├── index.html
├── app.js
├── style.css
├── GEMINI.md
├── .agents/
│   └── rules/
│       └── antigravity_global_rules.md
└── docs/
    └── contexto/
        ├── arquitectura.md
        ├── convenciones.md
        ├── decisiones.md
        ├── glosario.md
        ├── flujo-de-trabajo.md
        └── errores-conocidos.md
```

## Tecnologías prohibidas en esta entrega
- Frameworks JS pesados (React, Vue, Angular, Svelte, Next.js).
- Backend de servidor (Node.js, Express, Python, Django, PHP).
- Bases de datos reales (SQL, MongoDB, Firebase, Supabase).
- Estilos inline (`style="..."`).

> **Nota:** el equipo tiene además un plan de producto más amplio, con backend y base de datos, pensado para una etapa posterior (ver `README.md`, sección "Fase futura"). Ese plan no es parte de esta entrega EFI.
