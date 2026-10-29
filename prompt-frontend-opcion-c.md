# Prompt para Antigravity: frontend DonaJusto, opción C "Cálido de barrio"

**Cómo usarlo**
1. Abrí el repo `Proyecto-DonaJusto` en Antigravity, en una rama nueva (por ejemplo `feat/frontend-calido-de-barrio`).
2. Copiá **todo el bloque del Prompt 1** (lo que está entre las líneas `=====`) y pegalo en una sola conversación con el agente.
3. Cuando termine, pegá el **Prompt 2** para que verifique el resultado contra la lista de control.
4. Si algo no quedó igual, usá los prompts cortos de ajuste del final.

> Ningún agente garantiza un resultado idéntico píxel por píxel. Por eso el prompt fija las clases de Tailwind, los textos y la estructura exacta de cada componente: así el resultado sale prácticamente igual a la maqueta. La referencia visual es la pestaña **C · Cálido de barrio** de la maqueta: https://claude.ai/artifact/6iMRQ9hnzXH1jMSEE8MUiz

---

## Prompt 1: rediseño completo

```
=====
Rol: Senior Product Engineer & UI Architect. Vas a rediseñar el frontend de DonaJusto con la dirección visual "Cálido de barrio". Antes de escribir código, leé GEMINI.md, .agents/rules/antigravity_global_rules.md y los 6 documentos de docs/contexto/. Respetá todas sus reglas: SPA en index.html + app.js + style.css, TailwindCSS v3 por CDN, JavaScript vanilla, sin frameworks, sin backend y sin estilos inline.

Esto es un cambio de 3 archivos o más, así que seguí la metodología: explorar → proponer un plan breve (máximo 10 líneas) → tareas → aplicar → verificar. Yo YA CONFIRMO el cambio de estructura visual descrito acá: no hace falta pedir permiso por la guarda de producto, porque la paleta y el framework CSS NO cambian.

## 1. Idea de diseño (no la cambies)
Menos "empresa tech" y más "comedor del barrio". Hay una franja verde oscura (emerald-900) con titulares enormes, una cinta animada con lo que falta hoy y cada comedor se muestra como un "VALE DE DONACIÓN" con borde troquelado punteado. Fuera de la franja, el fondo es crema cálido.

PROHIBIDO: fondo de puntos (dot-pattern), manchas o blobs de gradiente, gradientes violeta o azul, glassmorphism, avatares azules o violetas, emojis como íconos y tarjetas blancas idénticas con sombra en todo el sitio. Si hoy existen en style.css o index.html, eliminalos.

## 2. Tokens (exactos)
- Tailwind config en el <head> (mantené darkMode: 'class', EC-001):
  tailwind.config = { darkMode: 'class', theme: { extend: {
    colors: { crema: '#fbfaf6' },
    fontFamily: { sans: ['Inter','system-ui','sans-serif'], heading: ['Poppins','system-ui','sans-serif'] } } } }
- Fuentes de Google Fonts: Inter 400/500/600/700 y Poppins 600/700/800.
- Colores, todos de Tailwind por defecto:
  · Franja de marca: bg-emerald-900 (modo oscuro: dark:bg-emerald-950). Fondo del footer: bg-emerald-950.
  · Fondo de página: bg-crema / dark:bg-slate-900. Tarjetas: bg-white / dark:bg-slate-800.
  · Texto: text-slate-900 / dark:text-slate-100. Texto secundario: text-slate-500 / dark:text-slate-400.
  · Acento cálido: amber-400 (botones sobre verde, con texto text-emerald-950) y amber-600 / dark:amber-400 (textos de urgencia).
  · Acento verde: emerald-600 / dark:emerald-400 para links y estados "ok".
- Tipografía: los títulos van en font-heading font-extrabold tracking-tight. Las etiquetas pequeñas van en text-[11px] font-bold uppercase tracking-widest. El cuerpo va en leading-relaxed.
- Bordes: el vale usa border-2 border-dashed. Los radios son rounded-2xl en tarjetas y rounded-full en botones y chips. NO uses sombras grandes salvo en hover.
- Logo: usá assets/logo.svg (el isotipo "Pin del comedor", ya existe) a 32px. Al lado va la palabra "Dona" en text-white y "Justo" en text-amber-400, en font-heading font-extrabold text-xl. No toques la carpeta assets/brand/.

## 3. Estructura general (index.html)
<header> sticky top-0 z-40 bg-emerald-900 dark:bg-emerald-950, con altura h-16 y contenido max-w-6xl mx-auto px-4 sm:px-8 flex justify-between items-center:
- Izquierda: un <button> con el logo que navega a Inicio.
- Derecha en desktop (md:flex): botones de navegación "Inicio", "Comedores", "Equipo" en text-sm text-emerald-100/80 hover:text-white. El activo va en text-white con un subrayado de 2px amber-400 (border-b-2). Después va el botón "Donar →" en text-amber-300 font-semibold y el botón de tema: rounded-full border border-emerald-700, 44x44, con ícono SVG de sol o luna en text-emerald-100.
- En mobile, un botón hamburguesa de 44x44 abre un panel bg-emerald-900 con los mismos 4 links en bloque (min-h-[44px]). El panel se cierra al navegar (EC-007).

<main>: sus 4 secciones .view-section, cada una CERRADA con su </section> (verificá el anidamiento: antes, la vista Equipo quedó adentro del formulario y aparecía vacía).

<footer> bg-emerald-950 text-emerald-100/80, max-w-6xl, en 3 columnas en desktop y 1 en mobile:
- Columna 1: logo, la descripción "Plataforma digital para conectar donantes particulares y empresas con las necesidades reales y stock en tiempo real de comedores comunitarios de Río Cuarto, Córdoba." y la dirección y teléfono "Av. Italia 1350, Río Cuarto, Córdoba · +54 (358) 465-9800".
- Columna 2: el título "Canales" y los links contacto.donajusto@gmail.com, @donajusto.arg (Instagram), facebook.com/donajusto.arg, @DonaJustoOficial (YouTube), cada uno con ícono SVG de línea.
- Columna 3: el título "¿Tenés un comedor?", el texto "Completá el formulario de relevamiento para sumarte a la red." y un link al Google Form actual (reutilizá la URL que ya existe en index.html), con estilo rounded-full border border-amber-400 text-amber-300 px-5 py-2.5.
- Línea final con border-t border-emerald-800: "© 2026 DonaJusto · Entrega Final Integrador (EFI) de Programación II · ITEC Río Cuarto".

## 4. Componente clave: el VALE (usalo en Inicio y en Comedores)
Generalo desde app.js con una función renderVale(comedor, indice). Esta es la estructura exacta:

<article class="vale group relative rounded-2xl bg-white dark:bg-slate-800 border-2 border-dashed {BORDE} p-5 flex flex-col gap-3 transition-transform duration-300 hover:-translate-y-1 hover:-rotate-[0.5deg] hover:shadow-xl hover:shadow-emerald-900/10">
  <span class="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-crema dark:bg-slate-900 border-2 border-dashed {BORDE}" aria-hidden="true"></span>
  <span class="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-crema dark:bg-slate-900 border-2 border-dashed {BORDE}" aria-hidden="true"></span>
  <div class="flex justify-between text-[11px] font-bold uppercase tracking-widest">
    <span class="{COLOR_ESTADO}">{ESTADO}</span><span class="text-slate-400">Vale Nº {NNN}</span>
  </div>
  <h3 class="font-heading font-extrabold text-xl text-slate-900 dark:text-white">{nombre}</h3>
  <p class="text-sm text-slate-500 dark:text-slate-400">{descripcion}</p>
  <p class="text-xs text-slate-500 dark:text-slate-400">{tipo} · {barrio sin "(Ficticio)"} · {personasAsistidas} personas</p>
  <div class="border-t border-dashed border-slate-200 dark:border-slate-700 pt-3 flex justify-between items-center">
    <span class="text-sm font-semibold text-slate-800 dark:text-slate-100">{item más crítico}</span>
    <span class="font-heading font-extrabold {COLOR_ESTADO}">faltan {maximo - actual} {unidad}</span>
  </div>
  <button class="mt-1 min-h-[44px] rounded-full bg-emerald-900 dark:bg-emerald-700 force-text-white text-sm font-semibold" data-id="{id}">Ver qué necesita →</button>
</article>

Reglas del vale:
- Si nivelUrgencia === "Alta": ESTADO = "Urgente", BORDE = border-amber-400/70 y COLOR_ESTADO = text-amber-600 dark:text-amber-400.
- Si es "Media": ESTADO = "Esta semana", BORDE = border-emerald-400/70 y COLOR_ESTADO = text-emerald-600 dark:text-emerald-400.
- {NNN} es el número correlativo con 3 dígitos según el orden en DONAJUSTO_DATA.comedores (001 a 006).
- "Item más crítico": el elemento de stock con menor actual/maximo. Por ejemplo, Rincón de Luz muestra "Leche en polvo — faltan 32 kg".
- El botón abre el modal de detalle.

## 5. Vista INICIO (#view-home)
1) HERO, pegado al header y con el mismo fondo (bg-emerald-900 dark:bg-emerald-950, text-emerald-50). Contenido en max-w-6xl, con grid lg:grid-cols-[1.4fr_1fr] gap-8 items-end pt-8 pb-12:
   - h1 en font-heading font-extrabold text-5xl sm:text-7xl leading-[0.95] tracking-tight: "Hoy en Río Cuarto <span class="text-amber-400">{TOTAL} personas</span> comen en un comedor." {TOTAL} es la suma de personasAsistidas (790) y se anima contando de 0 a 790 al entrar a la vista.
   - Columna derecha: el párrafo text-emerald-100/80 "Vos podés hacer que no falte nada. Mirá qué necesita cada lugar y llevá exactamente eso." y el botón rounded-full bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-6 py-3.5 "Ver qué falta hoy", que navega a Comedores.
   - A la franja se le aplica -mx-4 sm:-mx-8 o un wrapper de ancho completo, para que el verde ocupe todo el ancho de la pantalla.
2) CINTA "lo que falta hoy", dentro de la misma franja: border-t border-emerald-700/60 bg-emerald-950/40 py-3 overflow-hidden. Adentro va un div .marquee con flex gap-10 whitespace-nowrap w-max font-heading font-semibold text-sm, con un item por comedor: "● {necesidades[0].item} · {nombre}". Los de urgencia Alta van en text-amber-300 y el resto en text-emerald-50. La lista se duplica para que el loop sea continuo. En style.css:
   .marquee { animation: marquee 28s linear infinite; } .marquee:hover { animation-play-state: paused; }
   @keyframes marquee { to { transform: translateX(-50%); } }
   @media (prefers-reduced-motion: reduce) { .marquee { animation: none; } }
3) "Vales de esta semana": encabezado con flex justify-between items-end, el h2 font-heading font-extrabold text-2xl y el link "Ver los 6 →" (text-emerald-700 dark:text-emerald-400 font-semibold) que va a Comedores. Debajo, una grilla md:grid-cols-3 gap-5 con los 3 comedores más urgentes (primero los de Alta y, entre ellos, los que tienen menor % de stock).
4) "Cómo funciona": 3 pasos en fila (md:grid-cols-3) separados por un borde punteado vertical (md:border-l-2 md:border-dashed border-amber-300 md:pl-6). Cada paso lleva un número grande font-heading font-extrabold text-6xl text-amber-400, un título text-lg font-bold y el texto. Pasos: 1 "Mirá qué falta": "Cada comedor publica qué le falta hoy y cuánto stock le queda." 2 "Elegí qué llevar": "Ofrecé exactamente el insumo que necesitan, no lo que sobra." 3 "Coordinamos la entrega": "El comedor te contacta para recibir la donación. Sin intermediarios."
5) "Lo que más falta en la red": una tarjeta estilo LISTA DE MANDADOS, bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700. Cada insumo de indicadores.insumosCriticos es una fila con border-b border-dashed: el nombre y la categoría en text-xs, la barra <progress> (EC-006, sin estilos inline) y el % en font-heading font-extrabold. Si el % es ≥ 80, la barra y el número van en ámbar; si no, en esmeralda. Al lado, en desktop, 3 cifras grandes en columna (790 personas asistidas, 6 espacios en red, 154 aportes del mes) en font-heading font-extrabold text-5xl text-emerald-900 dark:text-emerald-300 con un label text-sm. Todas animan su conteo al entrar a la vista.

## 6. Vista COMEDORES (#view-catalog)
- Cabecera en una franja bg-emerald-900 dark:bg-emerald-950 de ancho completo, py-10. Lleva la etiqueta "Red comunitaria" (text-amber-300, estilo de etiqueta pequeña), el h1 "Comedores y merenderos" (text-4xl sm:text-5xl text-white) y el párrafo "Conocé qué necesita cada espacio y doná exactamente lo que hace falta hoy." (text-emerald-100/80).
- Barra de búsqueda y filtros: un input rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-5 py-3 con ícono de lupa, label accesible (sr-only) y placeholder "Buscá por nombre, barrio o alimento (ej: leche)". Debajo, chips de filtro (<button>, rounded-full, px-4 py-2 text-sm font-semibold): "Todos", "Urgentes", "Comedores", "Merenderos". El chip activo va en bg-emerald-900 text-white y los inactivos en bg-white dark:bg-slate-800 border. A la derecha va el contador "Mostrando X de 6".
- Grilla de vales: grid gap-6, 1 columna en mobile, md:grid-cols-2 y lg:grid-cols-3. La búsqueda filtra en vivo por nombre, barrio, necesidadPrincipal y los items de necesidades, sin distinguir mayúsculas ni tildes.
- Estado vacío: un vale gris punteado con el texto "No encontramos comedores con «{búsqueda}»." y un botón "Limpiar búsqueda".
- Estado de carga: al entrar a la vista se muestran 3 vales esqueleto (animate-pulse, bg-slate-200 dark:bg-slate-700) durante 400 ms y después los reales.

## 7. MODAL de detalle (ADR-003)
- Overlay fixed inset-0 bg-emerald-950/70 backdrop-blur-sm. El panel es un vale grande: max-w-2xl rounded-3xl bg-white dark:bg-slate-800 border-2 border-dashed (ámbar o esmeralda según urgencia), max-h-[90vh] overflow-y-auto.
- Arriba, una franja bg-emerald-900 rounded-t-3xl p-6 text-white con la etiqueta de ESTADO, el nombre (text-3xl font-heading font-extrabold), el tipo y el barrio, más 3 datos en línea: horario, dirección y personas, cada uno con ícono SVG.
- Sección "Necesita": lista de necesidades con un chip de prioridad. Urgente va en bg-amber-500 text-white; Alta, en bg-amber-100 text-amber-800 (modo oscuro: dark:bg-amber-500/20 dark:text-amber-300); Media y Baja, en bg-emerald-100 text-emerald-800 (dark:bg-emerald-500/20 dark:text-emerald-300). Muestra el item y la cantidad requerida.
- Sección "Stock actual": cada item lleva una barra <progress value=actual max=maximo> y el texto "actual / maximo unidad". Si el % es < 30, la barra es ámbar y se agrega el texto "crítico"; si no, la barra es esmeralda.
- Pie: el botón "Donar a este comedor" (rounded-full bg-amber-400 text-emerald-950 font-bold, min-h-[44px]) navega a Donar con el select ya en ese comedor.
- Se cierra con el botón X (con aria-label), con clic en el overlay y con Escape. Al abrir se agrega overflow-hidden al body y al cerrar se quita (EC-007). El foco va al panel al abrir y vuelve al botón de origen al cerrar.

## 8. Vista EQUIPO (#view-team)
- Cabecera en una franja verde igual a la de Comedores, con la etiqueta "Quiénes lo hacen", el h1 "Equipo de desarrollo" y el párrafo "Estudiantes de la Tecnicatura Superior en Desarrollo de Software (ITEC Río Cuarto) que diseñan y construyen DonaJusto como proyecto integrador con impacto comunitario."
- Cada integrante es una CREDENCIAL: rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700. Arriba lleva una tira h-14 bg-emerald-900 con una ranura centrada (w-12 h-2 rounded-full bg-emerald-950/60, simula el agujero de la cinta). El avatar es un círculo w-20 h-20 -mt-10 mx-auto con las iniciales en font-heading font-extrabold y ring-4 ring-white dark:ring-slate-800. Los colores de los avatares, SOLO de la marca, van alternados así: bg-emerald-500 text-white, bg-amber-400 text-emerald-950, bg-emerald-800 text-white, bg-amber-500 text-white, bg-emerald-600 text-white. Debajo van el nombre, el rol en un chip rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 y la descripción text-sm.
- Grilla: sm:grid-cols-2 lg:grid-cols-3 gap-6; la quinta credencial queda centrada en desktop (lg:col-start-2 cuando corresponda). Hover: hover:-translate-y-1 transition.
- Integrantes (guardalos en DONAJUSTO_DATA.equipo y renderizalos desde app.js):
  1. Julián Altamirano — Líder de Proyecto / PM & UI Architect — "Coordinación general del equipo, arquitectura técnica frontend y control de calidad bajo metodología SDD y seminario Antigravity."
  2. Matías Rodríguez — Analista Funcional — "Relevamiento territorial con comedores y merenderos, análisis de stock y definición de historias de usuario con impacto social."
  3. Santiago Heredia — Diseñador UX/UI — "Diseño centrado en el usuario, paleta institucional, contrastes WCAG accesibles, modo claro/oscuro y maquetado mobile-first."
  4. Ignacio López Ruiz — Analista de Datos — "Modelado de datos de prueba ficticios, cálculo de demanda crítica y diseño de métricas de impacto comunitario en tiempo real."
  5. Rodrigo Sosa Zabala — Comunicación y Documentación — "Redacción técnica del documento de investigación, estrategia de difusión en redes sociales y coordinación del guion de defensa oral."

## 9. Vista DONAR (#view-form)
- Cabecera en una franja verde con la etiqueta "Compromiso comunitario", el h1 "Ofrecé tu donación" y el párrafo "Dejá tu propuesta y el comedor coordina la entrega directamente con vos."
- Grid lg:grid-cols-[1fr_1.3fr] gap-8:
  · Izquierda: un panel rounded-2xl bg-emerald-900 text-emerald-50 p-6 con el título "¿Por qué donar por acá?" y 3 razones con check ámbar: "Evitás excedentes: tu ayuda va a lo que falta hoy." "Contacto humano: te escribe la persona que cocina." "Seguimiento: tu aporte suma al stock del comedor." Debajo, un aviso rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 dark:bg-amber-500/10 p-5 con el título "Solo insumos, no dinero" y el texto "En esta etapa DonaJusto coordina únicamente alimentos secos, frescos e insumos de higiene."
  · Derecha: un formulario dentro de un vale grande (mismo estilo de borde punteado esmeralda con los dos semicírculos laterales). Campos, cada uno con <label for> y required: Nombre y apellido (text), Email o WhatsApp (text), Comedor o merendero (select con los 6 comedores), Detalle de la donación (textarea, placeholder "Ej: 10 paquetes de fideos y 5 litros de leche").
  · Botón submit "Enviar propuesta →" rounded-full bg-amber-400 text-emerald-950 font-bold w-full min-h-[48px].
- Estados (DoD): los errores se muestran por campo en text-sm text-red-600 con borde rojo. Durante el envío, el botón se deshabilita y muestra un spinner con el texto "Enviando…" durante 1,2 s, simulado con setTimeout. Al terminar con éxito, el formulario se reemplaza por un VALE DE CONFIRMACIÓN con el título "¡Gracias, {nombre}!", el texto "Tu propuesta para {comedor} quedó registrada. Te van a contactar pronto.", un número "Vale Nº DJ-{4 dígitos al azar}" y el botón "Hacer otra donación", que resetea el formulario. Además aparece un toast abajo a la derecha, bg-emerald-900 text-white rounded-full, durante 3 s.

## 10. Comportamiento global (app.js)
- Navegación SPA con navigateToView(id). Hace scroll al tope, actualiza el link activo, cierra el menú mobile y aplica a la vista la clase .fade-in (keyframes con opacity de 0 a 1 y translateY de 12px a 0, 0.4s; respetá prefers-reduced-motion).
- Tema: initTheme() lee localStorage ('donajusto-theme') o, si no hay valor guardado, prefers-color-scheme. Pone o saca la clase "dark" en <html> y cambia el ícono sol/luna.
- Datos: mantené DONAJUSTO_DATA tal cual (indicadores y los 6 comedores) y agregale "equipo". Nada de fetch (EC-004). Todo el contenido dinámico se renderiza desde estos datos.
- Barras: siempre con <progress>, estilizadas en style.css con ::-webkit-progress-bar, ::-webkit-progress-value y ::-moz-progress-bar, más dos clases .progress-ambar y .progress-verde (EC-006).
- Botones con fondo de color: texto blanco o text-emerald-950 garantizado (EC-003). Los botones ámbar llevan text-emerald-950; los verdes, force-text-white.
- Accesibilidad: <button> para todo lo clicable, alt en imágenes, jerarquía h1→h2→h3 por vista, focus visible (focus-visible:ring-2 ring-amber-400 ring-offset-2) y áreas táctiles ≥ 44px.

## 11. Responsive
- Mobile (< 768px): 1 columna. El hero baja a text-5xl y los vales ocupan el ancho completo. La cinta sigue animada. El menú es hamburguesa.
- Tablet: 2 columnas de vales. Desktop: 3 columnas y navegación horizontal.
- Ningún elemento puede generar scroll horizontal (probá a 360px de ancho).

## 12. Al terminar
- Actualizá docs/contexto/convenciones.md: agregá el color crema #fbfaf6, la franja emerald-900 y el componente "vale".
- Agregá una entrada en docs/contexto/decisiones.md (ADR) explicando el rediseño "Cálido de barrio" y por qué.
- Si aparece un problema no obvio, registralo en docs/contexto/errores-conocidos.md con el formato existente.
- Verificá el DoD: cero errores en consola; estados Loading, Empty, Error y Success; prueba en mobile y desktop, en modo claro y oscuro.
- Mostrame capturas de: Inicio en desktop claro, Inicio en mobile oscuro, Comedores con búsqueda vacía, Modal abierto, Equipo y Donar con el vale de confirmación.
=====
```

---

## Prompt 2: verificación

```
=====
Revisá el sitio contra esta lista y corregí todo lo que no cumpla. Mostrame la lista marcada con ✅/❌ y qué cambiaste:
1. El header y el hero comparten el fondo emerald-900 y la franja ocupa todo el ancho de la pantalla.
2. El h1 del Inicio dice "Hoy en Río Cuarto 790 personas comen en un comedor." con "790 personas" en amber-400 y el conteo animado.
3. La cinta de faltantes se mueve en loop sin saltos, se pausa con hover y se detiene con prefers-reduced-motion.
4. Los vales tienen borde punteado, dos semicírculos laterales del color de fondo (también en modo oscuro), número "Vale Nº 00X" y "faltan N unidad" calculado del stock.
5. No hay dot-pattern, blobs de gradiente, colores azul o violeta, ni estilos inline (buscá style=" en index.html y app.js).
6. Las 4 vistas cierran su </section> y ninguna vista está anidada dentro de otra (Equipo se ve completa).
7. Búsqueda sin tildes ni mayúsculas, chips de filtro, contador, esqueleto de carga y estado vacío con "Limpiar búsqueda".
8. El modal cierra con X, overlay y Escape, bloquea el scroll del body y "Donar a este comedor" preselecciona el select.
9. El formulario valida por campo, muestra "Enviando…" con spinner y termina en el vale de confirmación con número DJ-XXXX y toast.
10. El modo oscuro funciona con el botón y se recuerda al recargar; todos los textos se leen en ambos temas.
11. Sin scroll horizontal a 360px; botones y links de al menos 44px de alto.
12. Cero errores en la consola (el aviso del CDN de Tailwind está aceptado, EC-002).
=====
```

---

## Ajustes rápidos (si hace falta)

- **Si el agente vuelve a poner tarjetas blancas genéricas:** "Los comedores tienen que verse como el VALE de la sección 4 del prompt, con borde punteado y semicírculos laterales. Rehacé renderVale() copiando esa estructura exacta."
- **Si la franja verde queda encajonada:** "La franja emerald-900 del hero y de las cabeceras tiene que ocupar el 100% del ancho de la ventana; el contenido sigue en max-w-6xl adentro."
- **Si los semicírculos se ven blancos en modo oscuro:** "Los semicírculos del vale usan bg-crema en claro y dark:bg-slate-900 en oscuro, igual que el fondo de la página."
- **Si el título del hero rompe en mobile:** "En mobile el h1 del hero va en text-5xl con leading-[0.95]; desde sm, text-7xl."
