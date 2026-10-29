/**
 * app.js - SPA logic, data, rendering for DonaJusto
 * EFI Programación II 2026
 *
 * Rules:
 * - ADR-001/ADR-002: Client-side SPA, no page reloads.
 * - ADR-003: Interactive modal for comedor detail.
 * - ADR-004: 100% fictitious in-memory data, no fetch().
 * - EC-001: Dark mode via 'dark' class on <html>.
 * - EC-003: Colored buttons always have guaranteed text color.
 * - EC-004: No fetch() calls.
 * - EC-006: Stock bars use <progress> with CSS-only styling.
 * - EC-007: Body scroll locked when modal is open; mobile menu closed on navigate.
 */

// ==========================================================================
// 1. SVG ICONS
// ==========================================================================

const SVG_ICONS = {
    sun: `<svg class="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`,
    moon: `<svg class="w-5 h-5 text-emerald-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`,
    location: `<svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
    users: `<svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
    clock: `<svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    search: `<svg class="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>`
};

// ==========================================================================
// 2. DATA (100% FICTITIOUS — EC-004)
// ==========================================================================

const DONAJUSTO_DATA = {
    indicadores: {
        totalPersonas: 790,
        comedoresActivos: 6,
        donacionesMes: 154,
        insumosCriticos: [
            { nombre: "Leche en polvo / entera", porcentajeUso: 92, categoria: "Lácteos" },
            { nombre: "Harina 000 y Leudante",   porcentajeUso: 84, categoria: "Secos" },
            { nombre: "Arroz y Legumbres",        porcentajeUso: 78, categoria: "Secos" },
            { nombre: "Aceite de girasol",        porcentajeUso: 70, categoria: "Aceites" }
        ]
    },
    comedores: [
        {
            id: "rincon-de-luz",
            nombre: "Rincón de Luz",
            tipo: "Comedor Comunitario",
            barrio: "Barrio Esperanza Norte",
            direccion: "Av. Las Acacias 450",
            personasAsistidas: 160,
            necesidadPrincipal: "Leche en polvo y azúcar",
            nivelUrgencia: "Alta",
            descripcion: "Brinda almuerzo diario y apoyo escolar a más de 40 familias del barrio en situación vulnerable.",
            horario: "Lunes a Viernes de 11:30 a 14:00",
            necesidades: [
                { item: "Leche en polvo",  requerido: "30 kg",      prioridad: "Urgente" },
                { item: "Azúcar común",    requerido: "25 kg",      prioridad: "Alta" },
                { item: "Cacao soluble",   requerido: "15 kg",      prioridad: "Media" }
            ],
            stock: [
                { item: "Fideos secos guiseros",   actual: 45, maximo: 50, unidad: "kg" },
                { item: "Arroz blanco largo fino", actual: 30, maximo: 40, unidad: "kg" },
                { item: "Leche en polvo",          actual:  3, maximo: 35, unidad: "kg" },
                { item: "Aceite de girasol",       actual: 12, maximo: 20, unidad: "L"  }
            ]
        },
        {
            id: "sonrisas-del-manana",
            nombre: "Sonrisas del Mañana",
            tipo: "Merendero Infantil",
            barrio: "Barrio Sol Naciente",
            direccion: "Calle Los Ceibos 1220",
            personasAsistidas: 110,
            necesidadPrincipal: "Harina leudante y cacao",
            nivelUrgencia: "Alta",
            descripcion: "Espacio de contención para meriendas, talleres recreativos y merienda reforzada para niños y niñas.",
            horario: "Lunes, Miércoles y Viernes de 16:30 a 18:30",
            necesidades: [
                { item: "Harina leudante",    requerido: "40 kg",        prioridad: "Urgente" },
                { item: "Cacao en polvo",     requerido: "20 kg",        prioridad: "Alta" },
                { item: "Galletitas dulces",  requerido: "30 paquetes",  prioridad: "Media" }
            ],
            stock: [
                { item: "Té y Mate Cocido",  actual: 80, maximo: 100, unidad: "cajas" },
                { item: "Harina leudante",   actual:  4, maximo:  45, unidad: "kg" },
                { item: "Azúcar",            actual: 20, maximo:  30, unidad: "kg" },
                { item: "Leche larga vida",  actual: 18, maximo:  60, unidad: "L" }
            ]
        },
        {
            id: "manos-unidas",
            nombre: "Manos Unidas",
            tipo: "Comedor y Merendero",
            barrio: "Villa Las Flores",
            direccion: "Pasaje Primavera 89",
            personasAsistidas: 185,
            necesidadPrincipal: "Carne picada y verduras frescas",
            nivelUrgencia: "Media",
            descripcion: "Ofrece viandas nutricionales integrales para familias y personas mayores en soledad.",
            horario: "Martes, Jueves y Sábados de 12:00 a 14:30",
            necesidades: [
                { item: "Carne picada / pollo",  requerido: "25 kg",       prioridad: "Alta" },
                { item: "Papas y cebollas",      requerido: "50 kg",       prioridad: "Alta" },
                { item: "Puré de tomate",        requerido: "40 unidades", prioridad: "Baja" }
            ],
            stock: [
                { item: "Puré de tomate",      actual: 35, maximo: 40, unidad: "unid." },
                { item: "Lentejas secas",       actual: 28, maximo: 30, unidad: "kg" },
                { item: "Verduras de estación", actual: 10, maximo: 60, unidad: "kg" },
                { item: "Fideos tallarines",    actual: 40, maximo: 50, unidad: "kg" }
            ]
        },
        {
            id: "panza-llena",
            nombre: "Panza Llena Corazón Contento",
            tipo: "Comedor Comunitario",
            barrio: "Barrio San Jorge",
            direccion: "Calle Moreno 2340",
            personasAsistidas: 130,
            necesidadPrincipal: "Aceite comestible y condimentos",
            nivelUrgencia: "Media",
            descripcion: "Comedor vecinal autogestionado con cocina comunitaria y huerta agroecológica propia.",
            horario: "Lunes a Sábado de 12:00 a 13:30",
            necesidades: [
                { item: "Aceite de girasol",         requerido: "20 L",  prioridad: "Alta" },
                { item: "Sal gruesa y condimentos",  requerido: "10 kg", prioridad: "Media" },
                { item: "Arroz",                     requerido: "25 kg", prioridad: "Baja" }
            ],
            stock: [
                { item: "Arroz",            actual: 22, maximo: 30, unidad: "kg" },
                { item: "Harina común 000", actual: 35, maximo: 40, unidad: "kg" },
                { item: "Aceite",           actual:  4, maximo: 25, unidad: "L" },
                { item: "Legumbres secas",  actual: 18, maximo: 20, unidad: "kg" }
            ]
        },
        {
            id: "el-buen-sembrador",
            nombre: "El Buen Sembrador",
            tipo: "Merendero y Apoyo",
            barrio: "Barrio Los Aromos",
            direccion: "Bv. Los Alerces 710",
            personasAsistidas: 95,
            necesidadPrincipal: "Leche líquida y mermeladas",
            nivelUrgencia: "Alta",
            descripcion: "Merendero barrial que brinda copa de leche, talleres de lectura y recreación.",
            horario: "Martes y Jueves de 17:00 a 19:00",
            necesidades: [
                { item: "Leche larga vida",   requerido: "45 L",  prioridad: "Urgente" },
                { item: "Mermelada / Dulces", requerido: "15 kg", prioridad: "Media" },
                { item: "Pan / galletas",     requerido: "20 kg", prioridad: "Alta" }
            ],
            stock: [
                { item: "Té en saquitos",   actual: 50, maximo: 60, unidad: "cajas" },
                { item: "Azúcar",           actual: 15, maximo: 20, unidad: "kg" },
                { item: "Leche larga vida", actual:  6, maximo: 50, unidad: "L" },
                { item: "Harina",           actual: 20, maximo: 25, unidad: "kg" }
            ]
        },
        {
            id: "corazones-calientes",
            nombre: "Corazones Calientes",
            tipo: "Comedor Solidario",
            barrio: "Barrio Bella Vista Sur",
            direccion: "Calle Ombú 55",
            personasAsistidas: 110,
            necesidadPrincipal: "Polenta, salsa de tomate y legumbres",
            nivelUrgencia: "Media",
            descripcion: "Iniciativa de vecinas que cocinan viandas calientes nocturnas para personas en situación de calle.",
            horario: "Miércoles y Domingos de 19:00 a 21:00",
            necesidades: [
                { item: "Polenta instantánea", requerido: "20 kg",   prioridad: "Alta" },
                { item: "Salsa de tomate",     requerido: "30 cajas",prioridad: "Media" },
                { item: "Lentejas y porotos",  requerido: "15 kg",   prioridad: "Media" }
            ],
            stock: [
                { item: "Fideos guiseros", actual: 30, maximo: 35, unidad: "kg" },
                { item: "Polenta",         actual:  4, maximo: 25, unidad: "kg" },
                { item: "Arroz",           actual: 25, maximo: 30, unidad: "kg" },
                { item: "Aceite",          actual: 10, maximo: 15, unidad: "L" }
            ]
        }
    ],
    equipo: [
        {
            nombre: "Julián Altamirano",
            rol: "Líder de Proyecto / PM & UI Architect",
            descripcion: "Coordinación general del equipo, arquitectura técnica frontend y control de calidad bajo metodología SDD y seminario Antigravity.",
            avatarColor: "bg-emerald-500 text-white",
            iniciales: "JA"
        },
        {
            nombre: "Matías Rodríguez",
            rol: "Analista Funcional",
            descripcion: "Relevamiento territorial con comedores y merenderos, análisis de stock y definición de historias de usuario con impacto social.",
            avatarColor: "bg-amber-400 text-emerald-950",
            iniciales: "MR"
        },
        {
            nombre: "Santiago Heredia",
            rol: "Diseñador UX/UI",
            descripcion: "Diseño centrado en el usuario, paleta institucional, contrastes WCAG accesibles, modo claro/oscuro y maquetado mobile-first.",
            avatarColor: "bg-emerald-800 text-white",
            iniciales: "SH"
        },
        {
            nombre: "Ignacio López Ruiz",
            rol: "Analista de Datos",
            descripcion: "Modelado de datos de prueba ficticios, cálculo de demanda crítica y diseño de métricas de impacto comunitario en tiempo real.",
            avatarColor: "bg-amber-500 text-white",
            iniciales: "ILR"
        },
        {
            nombre: "Rodrigo Sosa Zabala",
            rol: "Comunicación y Documentación",
            descripcion: "Redacción técnica del documento de investigación, estrategia de difusión en redes sociales y coordinación del guion de defensa oral.",
            avatarColor: "bg-emerald-600 text-white",
            iniciales: "RSZ"
        }
    ]
};

// ==========================================================================
// 3. STATE
// ==========================================================================

let currentFilter = 'all';
let currentSearchTerm = '';
let activeModalComedorId = null;
let previouslyFocusedElement = null;
let activeCounterTimers = [];

// ==========================================================================
// 4. INIT
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initNavigation();
    initCatalogFilters();
    renderHome();
    renderCatalog();
    renderTeam();
    populateFormComedoresSelect();
    initModal();
    initForm();
    // Animate counters on first load (home view is visible)
    animateCounters();
});

// ==========================================================================
// 5. THEME (EC-001)
// ==========================================================================

function initTheme() {
    const saved = localStorage.getItem('donajusto-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (!saved && prefersDark);
    document.documentElement.classList.toggle('dark', isDark);
    updateThemeIcons(isDark);

    document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
    document.getElementById('theme-toggle-mobile')?.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('donajusto-theme', isDark ? 'dark' : 'light');
    updateThemeIcons(isDark);
}

function updateThemeIcons(isDark) {
    const icon = isDark ? SVG_ICONS.sun : SVG_ICONS.moon;
    const c1 = document.getElementById('theme-icon-container');
    const c2 = document.getElementById('theme-icon-container-mobile');
    if (c1) c1.innerHTML = icon;
    if (c2) c2.innerHTML = icon;
}

// ==========================================================================
// 6. NAVIGATION (ADR-002, EC-007)
// ==========================================================================

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => {
        const isOpen = !menu.classList.contains('hidden');
        menu.classList.toggle('hidden', isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));
    });
}

function initNavigation() {
    document.querySelectorAll('[data-target]').forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            const target = el.getAttribute('data-target');
            if (target) navigateToView(target);
        });
    });
}

function navigateToView(viewId) {
    document.querySelectorAll('.view-section').forEach(v => {
        v.classList.add('hidden');
        v.classList.remove('fade-in');
    });

    const target = document.getElementById(viewId);
    if (target) {
        target.classList.remove('hidden');
        // Trigger reflow so animation replays
        void target.offsetWidth;
        target.classList.add('fade-in');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // EC-007: close mobile menu on navigate
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('mobile-menu-btn');
    if (menu) menu.classList.add('hidden');
    if (btn) btn.setAttribute('aria-expanded', 'false');

    // Update active nav links
    document.querySelectorAll('header .nav-link').forEach(link => {
        const isActive = link.getAttribute('data-target') === viewId;
        link.classList.toggle('text-white', isActive);
        link.classList.toggle('border-b-2', isActive);
        link.classList.toggle('border-amber-400', isActive);
        link.classList.toggle('text-emerald-100/80', !isActive);
    });

    // Animate counters when entering home
    if (viewId === 'view-home') {
        animateCounters();
    }

    // Skeleton effect when entering catalog
    if (viewId === 'view-catalog') {
        showCatalogSkeleton();
        setTimeout(() => renderCatalog(), 400);
    }
}

// ==========================================================================
// 7. VALE COMPONENT
// ==========================================================================

/**
 * Renders a vale (donation voucher) article element.
 * @param {Object} comedor - Comedor data object
 * @param {number} index - Zero-based index in DONAJUSTO_DATA.comedores
 * @returns {string} HTML string
 */
function renderVale(comedor, index) {
    const isUrgent = comedor.nivelUrgencia === 'Alta';
    const borderColor  = isUrgent ? 'border-amber-400/70'   : 'border-emerald-400/70';
    const estadoLabel  = isUrgent ? 'Urgente'                : 'Esta semana';
    const estadoColor  = isUrgent
        ? 'text-amber-600 dark:text-amber-400'
        : 'text-emerald-600 dark:text-emerald-400';

    const valeNum = String(index + 1).padStart(3, '0');

    // Most critical stock item: lowest actual/maximo ratio
    const criticalItem = comedor.stock.reduce((worst, s) =>
        (s.actual / s.maximo) < (worst.actual / worst.maximo) ? s : worst
    );
    const faltan = criticalItem.maximo - criticalItem.actual;

    // Strip "(Ficticio)" from barrio label
    const barrioLabel = comedor.barrio.replace(/\s*\(ficticio\)/i, '').trim();

    return `
    <article class="vale group relative rounded-2xl bg-white dark:bg-slate-800 border-2 border-dashed ${borderColor} p-5 flex flex-col gap-3 transition-transform duration-300 hover:-translate-y-1 hover:-rotate-[0.5deg] hover:shadow-xl hover:shadow-emerald-900/10">
        <span class="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-crema dark:bg-slate-900 border-2 border-dashed ${borderColor}" aria-hidden="true"></span>
        <span class="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-crema dark:bg-slate-900 border-2 border-dashed ${borderColor}" aria-hidden="true"></span>

        <div class="flex justify-between text-[11px] font-bold uppercase tracking-widest">
            <span class="${estadoColor}">${estadoLabel}</span>
            <span class="text-slate-400">Vale Nº ${valeNum}</span>
        </div>

        <h3 class="font-heading font-extrabold text-xl text-slate-900 dark:text-white">${comedor.nombre}</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">${comedor.descripcion}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400">${comedor.tipo} · ${barrioLabel} · ${comedor.personasAsistidas} personas</p>

        <div class="border-t border-dashed border-slate-200 dark:border-slate-700 pt-3 flex justify-between items-center">
            <span class="text-sm font-semibold text-slate-800 dark:text-slate-100">${criticalItem.item}</span>
            <span class="font-heading font-extrabold ${estadoColor}">faltan ${faltan} ${criticalItem.unidad}</span>
        </div>

        <button
            class="btn-ver-detalle mt-1 min-h-[44px] rounded-full bg-emerald-900 dark:bg-emerald-700 force-text-white text-sm font-semibold transition-colors hover:bg-emerald-800 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
            data-comedor-id="${comedor.id}"
            aria-label="Ver qué necesita ${comedor.nombre}">
            Ver qué necesita →
        </button>
    </article>`;
}

// ==========================================================================
// 8. HOME VIEW
// ==========================================================================

function renderHome() {
    renderMarquee();
    renderHomeVales();
    renderHomeInsumos();
}

function renderMarquee() {
    const container = document.getElementById('marquee-content');
    if (!container) return;

    const items = DONAJUSTO_DATA.comedores.map(c => {
        const color = c.nivelUrgencia === 'Alta'
            ? 'text-amber-300'
            : 'text-emerald-50';
        return `<span class="${color}">● ${c.necesidades[0].item} · ${c.nombre}</span>`;
    }).join('');

    // Duplicate for continuous loop
    container.innerHTML = items + items;
}

function renderHomeVales() {
    const grid = document.getElementById('home-vales-grid');
    if (!grid) return;

    // Top 3: Alta first, then sorted by lowest stock ratio
    const sorted = [...DONAJUSTO_DATA.comedores].sort((a, b) => {
        if (a.nivelUrgencia === 'Alta' && b.nivelUrgencia !== 'Alta') return -1;
        if (b.nivelUrgencia === 'Alta' && a.nivelUrgencia !== 'Alta') return 1;
        const ratioA = Math.min(...a.stock.map(s => s.actual / s.maximo));
        const ratioB = Math.min(...b.stock.map(s => s.actual / s.maximo));
        return ratioA - ratioB;
    });

    const top3 = sorted.slice(0, 3);
    grid.innerHTML = top3.map(c => {
        const originalIndex = DONAJUSTO_DATA.comedores.indexOf(c);
        return renderVale(c, originalIndex);
    }).join('');

    attachValeListeners(grid);
}

function renderHomeInsumos() {
    const container = document.getElementById('home-insumos-list');
    if (!container) return;

    container.innerHTML = DONAJUSTO_DATA.indicadores.insumosCriticos.map(item => {
        const isHigh = item.porcentajeUso >= 80;
        const progressClass = isHigh ? 'progress-ambar' : 'progress-verde';
        const numColor = isHigh
            ? 'text-amber-600 dark:text-amber-400'
            : 'text-emerald-600 dark:text-emerald-400';

        return `
        <div class="border-b border-dashed border-slate-200 dark:border-slate-700 pb-4 last:border-0 last:pb-0">
            <div class="flex justify-between items-baseline mb-2">
                <div>
                    <span class="text-sm font-semibold text-slate-800 dark:text-slate-100">${item.nombre}</span>
                    <span class="text-xs text-slate-400 ml-2">${item.categoria}</span>
                </div>
                <span class="font-heading font-extrabold ${numColor}">${item.porcentajeUso}%</span>
            </div>
            <progress value="${item.porcentajeUso}" max="100" class="${progressClass}" aria-label="${item.nombre}"></progress>
        </div>`;
    }).join('');
}

// ==========================================================================
// 9. CATALOG VIEW
// ==========================================================================

function initCatalogFilters() {
    const searchInput = document.getElementById('catalog-search');
    const chips = document.querySelectorAll('.filter-chip');

    searchInput?.addEventListener('input', e => {
        currentSearchTerm = normalizeText(e.target.value);
        renderCatalog();
    });

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilter = chip.getAttribute('data-filter');
            renderCatalog();
        });
    });
}

/** Normalize for accent-insensitive, case-insensitive search */
function normalizeText(str) {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function getFilteredComedores() {
    return DONAJUSTO_DATA.comedores.filter(c => {
        let matchesFilter = true;
        if (currentFilter === 'urgente') {
            matchesFilter = c.nivelUrgencia === 'Alta';
        } else if (currentFilter === 'Comedor') {
            matchesFilter = c.tipo.toLowerCase().includes('comedor');
        } else if (currentFilter === 'Merendero') {
            matchesFilter = c.tipo.toLowerCase().includes('merendero');
        }

        let matchesSearch = true;
        if (currentSearchTerm) {
            const fields = [
                c.nombre, c.barrio, c.necesidadPrincipal,
                ...c.necesidades.map(n => n.item)
            ].map(normalizeText).join(' ');
            matchesSearch = fields.includes(currentSearchTerm);
        }

        return matchesFilter && matchesSearch;
    });
}

function showCatalogSkeleton() {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return;
    grid.innerHTML = Array(3).fill(`
        <div class="rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-5 flex flex-col gap-3">
            <div class="h-4 w-1/2 rounded-full skeleton"></div>
            <div class="h-6 w-3/4 rounded-full skeleton"></div>
            <div class="h-3 w-full rounded-full skeleton"></div>
            <div class="h-3 w-2/3 rounded-full skeleton"></div>
            <div class="h-10 rounded-full skeleton mt-2"></div>
        </div>`).join('');
}

function renderCatalog() {
    const grid = document.getElementById('catalog-grid');
    const countEl = document.getElementById('catalog-count');
    if (!grid) return;

    const filtered = getFilteredComedores();

    if (countEl) {
        countEl.textContent = `Mostrando ${filtered.length} de ${DONAJUSTO_DATA.comedores.length}`;
    }

    if (filtered.length === 0) {
        const query = currentSearchTerm || currentFilter;
        grid.innerHTML = `
            <div class="col-span-full">
                <div class="relative rounded-2xl bg-white dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 p-10 text-center">
                    <p class="text-slate-500 dark:text-slate-400 mb-4">No encontramos comedores con «${query}».</p>
                    <button id="btn-reset-filters" class="rounded-full bg-emerald-900 force-text-white px-6 py-2.5 text-sm font-semibold hover:bg-emerald-800 min-h-[44px] transition-colors focus-visible:ring-2 focus-visible:ring-amber-400">
                        Limpiar búsqueda
                    </button>
                </div>
            </div>`;
        document.getElementById('btn-reset-filters')?.addEventListener('click', () => {
            currentSearchTerm = '';
            currentFilter = 'all';
            const input = document.getElementById('catalog-search');
            if (input) input.value = '';
            document.querySelectorAll('.filter-chip').forEach(c => {
                c.classList.toggle('active', c.getAttribute('data-filter') === 'all');
            });
            renderCatalog();
        });
        return;
    }

    grid.innerHTML = filtered.map(c => {
        const idx = DONAJUSTO_DATA.comedores.indexOf(c);
        return renderVale(c, idx);
    }).join('');

    attachValeListeners(grid);
}

function attachValeListeners(container) {
    container.querySelectorAll('.btn-ver-detalle').forEach(btn => {
        btn.addEventListener('click', () => {
            previouslyFocusedElement = btn;
            openModal(btn.getAttribute('data-comedor-id'));
        });
    });
}

// ==========================================================================
// 10. TEAM VIEW
// ==========================================================================

function renderTeam() {
    const grid = document.getElementById('team-grid');
    if (!grid) return;

    grid.innerHTML = DONAJUSTO_DATA.equipo.map((member, i) => {
        const isLast = i === DONAJUSTO_DATA.equipo.length - 1;
        const isOdd = DONAJUSTO_DATA.equipo.length % 3 !== 0;
        const centerClass = (isLast && isOdd) ? 'lg:col-start-2' : '';

        return `
        <div class="rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:-translate-y-1 transition-transform ${centerClass}">
            <!-- Credential top strip -->
            <div class="h-14 bg-emerald-900 flex items-center justify-center">
                <span class="w-12 h-2 rounded-full bg-emerald-950/60" aria-hidden="true"></span>
            </div>
            <!-- Avatar -->
            <div class="flex flex-col items-center text-center px-6 pb-6">
                <div class="w-20 h-20 -mt-10 rounded-full ${member.avatarColor} flex items-center justify-center font-heading font-extrabold text-lg ring-4 ring-white dark:ring-slate-800 select-none">
                    ${member.iniciales}
                </div>
                <h3 class="font-heading font-extrabold text-lg text-slate-900 dark:text-white mt-3">${member.nombre}</h3>
                <span class="inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300">
                    ${member.rol}
                </span>
                <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-3">${member.descripcion}</p>
            </div>
        </div>`;
    }).join('');
}

// ==========================================================================
// 11. FORM & CONFIRMATION (DoD states)
// ==========================================================================

function populateFormComedoresSelect() {
    const select = document.getElementById('comedor-select');
    if (!select) return;
    select.innerHTML = `<option value="">Seleccione un comedor o merendero...</option>` +
        DONAJUSTO_DATA.comedores.map(c =>
            `<option value="${c.id}">${c.nombre} (${c.barrio})</option>`
        ).join('');
}

function initForm() {
    const form = document.getElementById('donation-form');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        if (!validateForm()) return;

        const donorName = document.getElementById('donor-name').value.trim();
        const select    = document.getElementById('comedor-select');
        const comedorId = select.value;
        const comedorNombre = select.options[select.selectedIndex]?.text.split('(')[0].trim() || 'el comedor';

        const submitBtn   = document.getElementById('submit-btn');
        const submitLabel = document.getElementById('submit-label');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitLabel.innerHTML = `<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Enviando…`;
        }

        setTimeout(() => {
            const valeNum = 'DJ-' + String(Math.floor(1000 + Math.random() * 9000));
            showFormConfirmation(donorName, comedorNombre, valeNum, comedorId);
            showToast(`¡Gracias, ${donorName}! Tu propuesta fue registrada.`);
        }, 1200);
    });
}

function validateForm() {
    let valid = true;
    const fields = [
        { id: 'donor-name',       errorId: 'error-name',    msg: 'Ingresá tu nombre y apellido.' },
        { id: 'donor-contact',    errorId: 'error-contact',  msg: 'Ingresá tu email o WhatsApp.' },
        { id: 'comedor-select',   errorId: 'error-comedor',  msg: 'Seleccioná un comedor.' },
        { id: 'donation-message', errorId: 'error-message',  msg: 'Describí tu donación.' }
    ];

    fields.forEach(({ id, errorId, msg }) => {
        const input = document.getElementById(id);
        const error = document.getElementById(errorId);
        if (!input || !error) return;
        const isEmpty = !input.value.trim();
        error.textContent = isEmpty ? msg : '';
        error.classList.toggle('hidden', !isEmpty);
        input.classList.toggle('border-red-500', isEmpty);
        if (isEmpty) valid = false;
    });

    return valid;
}

function showFormConfirmation(name, comedor, valeNum, comedorId) {
    const container = document.getElementById('form-container');
    if (!container) return;

    container.innerHTML = `
    <div class="vale relative rounded-2xl bg-white dark:bg-slate-800 border-2 border-dashed border-emerald-400/70 p-8 flex flex-col gap-4 text-center">
        <span class="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-crema dark:bg-slate-900 border-2 border-dashed border-emerald-400/70" aria-hidden="true"></span>
        <span class="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-crema dark:bg-slate-900 border-2 border-dashed border-emerald-400/70" aria-hidden="true"></span>

        <div class="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 self-end">${valeNum}</div>

        <div class="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mx-auto">
            <svg class="w-7 h-7 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>

        <h2 class="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">¡Gracias, ${name}!</h2>
        <p class="text-slate-500 dark:text-slate-400 leading-relaxed">Tu propuesta para <strong>${comedor}</strong> quedó registrada. Te van a contactar pronto.</p>

        <button id="btn-nueva-donacion" class="rounded-full bg-emerald-900 force-text-white font-bold px-6 py-3 min-h-[44px] hover:bg-emerald-800 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 mt-2">
            Hacer otra donación
        </button>
    </div>`;

    document.getElementById('btn-nueva-donacion')?.addEventListener('click', () => {
        restoreForm();
    });
}

function restoreForm() {
    const container = document.getElementById('form-container');
    if (!container) return;
    container.innerHTML = `
    <div class="vale relative rounded-2xl bg-white dark:bg-slate-800 border-2 border-dashed border-emerald-400/70 p-6 flex flex-col gap-5">
        <span class="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-crema dark:bg-slate-900 border-2 border-dashed border-emerald-400/70" aria-hidden="true"></span>
        <span class="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-crema dark:bg-slate-900 border-2 border-dashed border-emerald-400/70" aria-hidden="true"></span>
        <div class="flex justify-between text-[11px] font-bold uppercase tracking-widest">
            <span class="text-emerald-600 dark:text-emerald-400">Tu donación</span>
            <span class="text-slate-400">Vale de propuesta</span>
        </div>
        <form id="donation-form" class="space-y-4" novalidate>
            <div>
                <label for="donor-name" class="block text-sm font-semibold mb-1.5 text-slate-900 dark:text-white">Nombre y apellido</label>
                <input type="text" id="donor-name" required placeholder="Ej: María Gómez" class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/60 p-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm transition-colors">
                <p id="error-name" class="hidden text-sm text-red-600 mt-1"></p>
            </div>
            <div>
                <label for="donor-contact" class="block text-sm font-semibold mb-1.5 text-slate-900 dark:text-white">Email o WhatsApp</label>
                <input type="text" id="donor-contact" required placeholder="Ej: maria@email.com o 3584123456" class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/60 p-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm transition-colors">
                <p id="error-contact" class="hidden text-sm text-red-600 mt-1"></p>
            </div>
            <div>
                <label for="comedor-select" class="block text-sm font-semibold mb-1.5 text-slate-900 dark:text-white">Comedor o merendero</label>
                <select id="comedor-select" required class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/60 p-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm transition-colors">
                    <option value="">Seleccione un comedor...</option>
                </select>
                <p id="error-comedor" class="hidden text-sm text-red-600 mt-1"></p>
            </div>
            <div>
                <label for="donation-message" class="block text-sm font-semibold mb-1.5 text-slate-900 dark:text-white">Detalle de la donación</label>
                <textarea id="donation-message" required rows="3" placeholder="Ej: 10 paquetes de fideos y 5 litros de leche" class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/60 p-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm transition-colors resize-none"></textarea>
                <p id="error-message" class="hidden text-sm text-red-600 mt-1"></p>
            </div>
            <button type="submit" id="submit-btn" class="rounded-full bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold w-full min-h-[48px] transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center justify-center gap-2">
                <span id="submit-label">Enviar propuesta →</span>
            </button>
        </form>
    </div>`;
    populateFormComedoresSelect();
    initForm();
}

// ==========================================================================
// 12. MODAL (ADR-003, EC-007)
// ==========================================================================

function initModal() {
    const modal     = document.getElementById('detail-modal');
    const overlay   = document.getElementById('modal-overlay');
    const closeBtn  = document.getElementById('modal-close');
    const actionBtn = document.getElementById('modal-action-btn');
    if (!modal) return;

    overlay?.addEventListener('click', closeModal);
    closeBtn?.addEventListener('click', closeModal);

    window.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });

    actionBtn?.addEventListener('click', () => {
        if (activeModalComedorId) {
            const select = document.getElementById('comedor-select');
            if (select) select.value = activeModalComedorId;
        }
        closeModal();
        navigateToView('view-form');
    });
}

function openModal(comedorId) {
    const comedor = DONAJUSTO_DATA.comedores.find(c => c.id === comedorId);
    if (!comedor) return;
    activeModalComedorId = comedorId;

    const modal  = document.getElementById('detail-modal');
    const panel  = document.getElementById('modal-panel');
    const band   = document.getElementById('modal-header-band');
    const status = document.getElementById('modal-status-badge');
    const title  = document.getElementById('modal-title');
    const sub    = document.getElementById('modal-subtitle');
    const meta   = document.getElementById('modal-meta');
    const body   = document.getElementById('modal-content');

    const isUrgent = comedor.nivelUrgencia === 'Alta';
    const borderColor = isUrgent ? 'border-amber-400/70' : 'border-emerald-400/70';

    // Update border on panel
    panel.className = panel.className.replace(/border-\S+/g, '');
    panel.classList.add('relative', 'w-full', 'max-w-2xl', 'max-h-[90vh]', 'flex', 'flex-col',
        'overflow-y-auto', 'rounded-3xl', 'bg-white', 'dark:bg-slate-800',
        'border-2', 'border-dashed', borderColor);

    status.textContent = isUrgent ? 'Urgente' : 'Esta semana';
    status.className = isUrgent
        ? 'text-amber-300 text-[11px] font-bold uppercase tracking-widest block'
        : 'text-emerald-300 text-[11px] font-bold uppercase tracking-widest block';

    title.textContent = comedor.nombre;
    sub.textContent   = `${comedor.tipo} · ${comedor.barrio.replace(/\s*\(ficticio\)/i, '').trim()}`;
    meta.innerHTML = `
        <span class="flex items-center gap-1">${SVG_ICONS.clock} ${comedor.horario}</span>
        <span class="flex items-center gap-1">${SVG_ICONS.location} ${comedor.direccion}</span>
        <span class="flex items-center gap-1">${SVG_ICONS.users} ${comedor.personasAsistidas} personas</span>`;

    // Needs section
    const needsHtml = comedor.necesidades.map(n => {
        let chipClass;
        if (n.prioridad === 'Urgente') {
            chipClass = 'bg-amber-500 text-white';
        } else if (n.prioridad === 'Alta') {
            chipClass = 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300';
        } else {
            chipClass = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300';
        }
        return `
        <li class="flex justify-between items-center text-sm py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
            <span class="font-semibold text-slate-800 dark:text-slate-100">${n.item}</span>
            <div class="flex items-center gap-2">
                <span class="text-slate-500 dark:text-slate-400">${n.requerido}</span>
                <span class="px-2 py-0.5 rounded-full text-[11px] font-bold ${chipClass}">${n.prioridad}</span>
            </div>
        </li>`;
    }).join('');

    // Stock section
    const stockHtml = comedor.stock.map(s => {
        const pct = Math.round((s.actual / s.maximo) * 100);
        const isCritical = pct < 30;
        const progressClass = isCritical ? 'progress-ambar' : 'progress-verde';
        const criticalLabel = isCritical ? ' · crítico' : '';
        const numColor = isCritical
            ? 'text-amber-600 dark:text-amber-400'
            : 'text-emerald-600 dark:text-emerald-400';
        return `
        <div>
            <div class="flex justify-between text-xs mb-1">
                <span class="font-semibold text-slate-800 dark:text-slate-100">${s.item}</span>
                <span class="${numColor} font-semibold">${s.actual} / ${s.maximo} ${s.unidad}${criticalLabel}</span>
            </div>
            <progress value="${s.actual}" max="${s.maximo}" class="${progressClass}" aria-label="${s.item}"></progress>
        </div>`;
    }).join('');

    body.innerHTML = `
        <div>
            <h4 class="font-heading font-bold text-sm text-slate-900 dark:text-white mb-3">Necesita</h4>
            <ul class="space-y-1">${needsHtml}</ul>
        </div>
        <div>
            <h4 class="font-heading font-bold text-sm text-slate-900 dark:text-white mb-3">Stock actual</h4>
            <div class="space-y-3">${stockHtml}</div>
        </div>`;

    document.body.classList.add('overflow-hidden');
    modal.classList.remove('hidden');

    // Focus management (a11y)
    const panel2 = document.getElementById('modal-panel');
    if (panel2) panel2.focus();
}

function closeModal() {
    const modal = document.getElementById('detail-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    activeModalComedorId = null;
    if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
        previouslyFocusedElement = null;
    }
}

// ==========================================================================
// 13. COUNTERS
// ==========================================================================

function animateCounters() {
    activeCounterTimers.forEach(clearInterval);
    activeCounterTimers = [];

    // Hero counter
    const heroCounter = document.getElementById('hero-counter');
    if (heroCounter) {
        animateSingleCounter(heroCounter, 790);
    }

    // Section counters
    document.querySelectorAll('.counter-element').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (!isNaN(target)) animateSingleCounter(el, target);
    });
}

function animateSingleCounter(el, target) {
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
        current = Math.min(current + increment, target);
        el.textContent = current;
        if (current >= target) clearInterval(timer);
    }, 25);
    activeCounterTimers.push(timer);
}

// ==========================================================================
// 14. TOAST
// ==========================================================================

function showToast(message) {
    const toast = document.getElementById('toast');
    const msg   = document.getElementById('toast-message');
    if (!toast || !msg) return;

    msg.textContent = message;
    toast.classList.remove('translate-y-[150%]', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-[150%]', 'opacity-0');
    }, 3000);
}
