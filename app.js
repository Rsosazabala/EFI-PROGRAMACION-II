/**
 * app.js - Lógica SPA, Búsqueda, Filtros y Datos de Prueba para DonaJusto
 * Proyecto EFI de Programación II 2026
 * 
 * Reglas seguidas:
 * - ADR-001 / ADR-002: SPA client-side sin recargas de página.
 * - ADR-003: Modal interactivo para detalle de comedores.
 * - ADR-004: Datos 100% ficticios en memoria local, sin llamadas fetch() a JSON.
 * - EC-001: Modo oscuro mediante clase 'dark' en el elemento html con SVG icons.
 * - EC-006: Barras de nivel de stock con <progress> sin estilos inline.
 * - EC-007: Bloqueo de scroll en body al abrir modal y cierre de menú móvil al navegar.
 */

// ==========================================================================
// 1. ICONOS VECTORIALES SVG REUTILIZABLES
// ==========================================================================

const SVG_ICONS = {
    sun: `<svg class="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`,
    moon: `<svg class="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>`,
    location: `<svg class="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
    users: `<svg class="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
    clock: `<svg class="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    package: `<svg class="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`,
    alert: `<svg class="w-3.5 h-3.5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
    alertRed: `<svg class="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
    arrowRight: `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>`,
    search: `<svg class="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>`,
    categoryMilk: `<svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
    categoryGrain: `<svg class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18m0-18l4 4m-4-4L8 7m4 5l4 4m-4-4l-4 4m4 5l4-4m-4 4l-4-4"/></svg>`,
    categoryOil: `<svg class="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`
};

// ==========================================================================
// 2. DATOS DE PRUEBA (100% FICTICIOS)
// ==========================================================================

const DONAJUSTO_DATA = {
    indicadores: {
        totalPersonas: 790,
        comedoresActivos: 6,
        donacionesMes: 154,
        insumosCriticos: [
            { nombre: "Leche en polvo / entera", porcentajeUso: 92, categoria: "Lácteos", iconoType: "milk" },
            { nombre: "Harina 000 y Leudante", porcentajeUso: 84, categoria: "Secos", iconoType: "grain" },
            { nombre: "Arroz y Legumbres", porcentajeUso: 78, categoria: "Secos", iconoType: "grain" },
            { nombre: "Aceite de girasol", porcentajeUso: 70, categoria: "Aceites", iconoType: "oil" }
        ]
    },
    comedores: [
        {
            id: "rincon-de-luz",
            nombre: "Rincón de Luz",
            tipo: "Comedor Comunitario",
            barrio: "Barrio Esperanza Norte (Ficticio)",
            direccion: "Av. Las Acacias 450",
            personasAsistidas: 160,
            necesidadPrincipal: "Leche en polvo y azúcar",
            nivelUrgencia: "Alta",
            descripcion: "Brinda almuerzo diario y apoyo escolar a más de 40 familias del barrio en situación vulnerable.",
            horario: "Lunes a Viernes de 11:30 a 14:00",
            necesidades: [
                { item: "Leche en polvo", requerido: "30 kg", prioridad: "Urgente" },
                { item: "Azúcar común", requerido: "25 kg", prioridad: "Alta" },
                { item: "Cacao soluble", requerido: "15 kg", prioridad: "Media" }
            ],
            stock: [
                { item: "Fideos secos guiseros", actual: 45, maximo: 50, unidad: "kg" },
                { item: "Arroz blanco largo fino", actual: 30, maximo: 40, unidad: "kg" },
                { item: "Leche en polvo", actual: 3, maximo: 35, unidad: "kg" },
                { item: "Aceite de girasol", actual: 12, maximo: 20, unidad: "L" }
            ]
        },
        {
            id: "sonrisas-del-manana",
            nombre: "Sonrisas del Mañana",
            tipo: "Merendero Infantil",
            barrio: "Barrio Sol Naciente (Ficticio)",
            direccion: "Calle Los Ceibos 1220",
            personasAsistidas: 110,
            necesidadPrincipal: "Harina leudante y cacao",
            nivelUrgencia: "Alta",
            descripcion: "Espacio de contención para meriendas, talleres recreativos y merienda reforzada para niños y niñas.",
            horario: "Lunes, Miércoles y Viernes de 16:30 a 18:30",
            necesidades: [
                { item: "Harina leudante", requerido: "40 kg", prioridad: "Urgente" },
                { item: "Cacao en polvo", requerido: "20 kg", prioridad: "Alta" },
                { item: "Galletitas dulces", requerido: "30 paquetes", prioridad: "Media" }
            ],
            stock: [
                { item: "Té y Mate Cocido", actual: 80, maximo: 100, unidad: "cajas" },
                { item: "Harina leudante", actual: 4, maximo: 45, unidad: "kg" },
                { item: "Azúcar", actual: 20, maximo: 30, unidad: "kg" },
                { item: "Leche larga vida", actual: 18, maximo: 60, unidad: "L" }
            ]
        },
        {
            id: "manos-unidas",
            nombre: "Manos Unidas",
            tipo: "Comedor y Merendero",
            barrio: "Villa Las Flores (Ficticio)",
            direccion: "Pasaje Primavera 89",
            personasAsistidas: 185,
            necesidadPrincipal: "Carne picada y verduras frescas",
            nivelUrgencia: "Media",
            descripcion: "Ofrece viandas nutricionales integrales para familias y personas mayores en soledad.",
            horario: "Martes, Jueves y Sábados de 12:00 a 14:30",
            necesidades: [
                { item: "Carne picada / pollo", requerido: "25 kg", prioridad: "Alta" },
                { item: "Papas y cebollas", requerido: "50 kg", prioridad: "Alta" },
                { item: "Puré de tomate", requerido: "40 unidades", prioridad: "Baja" }
            ],
            stock: [
                { item: "Puré de tomate", actual: 35, maximo: 40, unidad: "unid." },
                { item: "Lentejas secas", actual: 28, maximo: 30, unidad: "kg" },
                { item: "Verduras de estación", actual: 10, maximo: 60, unidad: "kg" },
                { item: "Fideos tallarines", actual: 40, maximo: 50, unidad: "kg" }
            ]
        },
        {
            id: "panza-llena",
            nombre: "Panza Llena Corazón Contento",
            tipo: "Comedor Comunitario",
            barrio: "Barrio San Jorge (Ficticio)",
            direccion: "Calle Moreno 2340",
            personasAsistidas: 130,
            necesidadPrincipal: "Aceite comestible y condimentos",
            nivelUrgencia: "Media",
            descripcion: "Comedor vecinal autogestionado con cocina comunitaria y huerta agroecológica propia.",
            horario: "Lunes a Sábado de 12:00 a 13:30",
            necesidades: [
                { item: "Aceite de girasol", requerido: "20 L", prioridad: "Alta" },
                { item: "Sal gruesa y condimentos", requerido: "10 kg", prioridad: "Media" },
                { item: "Arroz", requerido: "25 kg", prioridad: "Baja" }
            ],
            stock: [
                { item: "Arroz", actual: 22, maximo: 30, unidad: "kg" },
                { item: "Harina común 000", actual: 35, maximo: 40, unidad: "kg" },
                { item: "Aceite", actual: 4, maximo: 25, unidad: "L" },
                { item: "Legumbres secas", actual: 18, maximo: 20, unidad: "kg" }
            ]
        },
        {
            id: "el-buen-sembrador",
            nombre: "El Buen Sembrador",
            tipo: "Merendero y Apoyo",
            barrio: "Barrio Los Aromos (Ficticio)",
            direccion: "Bv. Los Alerces 710",
            personasAsistidas: 95,
            necesidadPrincipal: "Leche líquida y mermeladas",
            nivelUrgencia: "Alta",
            descripcion: "Merendero barrial que brinda copa de leche, talleres de lectura y recreación.",
            horario: "Martes y Jueves de 17:00 a 19:00",
            necesidades: [
                { item: "Leche larga vida", requerido: "45 L", prioridad: "Urgente" },
                { item: "Mermelada / Dulces", requerido: "15 kg", prioridad: "Media" },
                { item: "Pan fresco / galletas", requerido: "20 kg", prioridad: "Alta" }
            ],
            stock: [
                { item: "Té en saquitos", actual: 50, maximo: 60, unidad: "cajas" },
                { item: "Azúcar", actual: 15, maximo: 20, unidad: "kg" },
                { item: "Leche larga vida", actual: 6, maximo: 50, unidad: "L" },
                { item: "Harina", actual: 20, maximo: 25, unidad: "kg" }
            ]
        },
        {
            id: "corazones-calientes",
            nombre: "Corazones Calientes",
            tipo: "Comedor Solidario",
            barrio: "Barrio Bella Vista Sur (Ficticio)",
            direccion: "Calle Ombú 55",
            personasAsistidas: 110,
            necesidadPrincipal: "Polenta, salsa de tomate y legumbres",
            nivelUrgencia: "Media",
            descripcion: "Iniciativa de vecinas que cocinan viandas calientes nocturnas para personas en situación de calle.",
            horario: "Miércoles y Domingos de 19:00 a 21:00",
            necesidades: [
                { item: "Polenta instantánea", requerido: "20 kg", prioridad: "Alta" },
                { item: "Salsa de tomate", requerido: "30 cajas", prioridad: "Media" },
                { item: "Lentejas y porotos", requerido: "15 kg", prioridad: "Media" }
            ],
            stock: [
                { item: "Fideos guiseros", actual: 30, maximo: 35, unidad: "kg" },
                { item: "Polenta", actual: 4, maximo: 25, unidad: "kg" },
                { item: "Arroz", actual: 25, maximo: 30, unidad: "kg" },
                { item: "Aceite", actual: 10, maximo: 15, unidad: "L" }
            ]
        }
    ]
};

let currentFilter = 'all';
let currentSearchTerm = '';

// ==========================================================================
// 3. CONTROLADOR DE LA APLICACIÓN (SPA)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initNavigation();
    initCatalogFilters();
    renderImpactIndicators();
    renderCatalog();
    populateFormComedoresSelect();
    initModal();
    initForm();
    initSpotlightButton();
    animateCounters();
});

// ==========================================================================
// 4. MODO OSCURO / CLARO CON ICONOS SVG (EC-001)
// ==========================================================================

function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
    const themeIconContainer = document.getElementById('theme-icon-container');
    const themeIconContainerMobile = document.getElementById('theme-icon-container-mobile');
    
    const savedTheme = localStorage.getItem('donajusto-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
        updateThemeIcons(true);
    } else {
        document.documentElement.classList.remove('dark');
        updateThemeIcons(false);
    }

    function toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('donajusto-theme', isDark ? 'dark' : 'light');
        updateThemeIcons(isDark);
    }

    function updateThemeIcons(isDark) {
        const iconSvg = isDark ? SVG_ICONS.sun : SVG_ICONS.moon;
        if (themeIconContainer) themeIconContainer.innerHTML = iconSvg;
        if (themeIconContainerMobile) themeIconContainerMobile.innerHTML = iconSvg;
    }

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);
}

// ==========================================================================
// 5. NAVEGACIÓN SPA & MENÚ MÓVIL (ADR-002, EC-007)
// ==========================================================================

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

function initNavigation() {
    const navLinks = document.querySelectorAll('[data-target]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            if (targetId) {
                navigateToView(targetId);
            }
        });
    });

    const brandLogo = document.getElementById('brand-logo');
    if (brandLogo) {
        brandLogo.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToView('view-home');
        });
    }
}

function navigateToView(viewId) {
    const views = document.querySelectorAll('.view-section');
    views.forEach(view => {
        view.classList.add('hidden');
        view.classList.remove('fade-in');
    });

    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.remove('hidden');
        targetView.classList.add('fade-in');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (viewId === 'view-home') {
            animateCounters();
        }
    }

    // EC-007: Cerrar menú móvil al navegar
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }

    // Actualizar estilos activos SOLAMENTE en los enlaces del navbar
    document.querySelectorAll('.nav-link').forEach(navLink => {
        if (navLink.getAttribute('data-target') === viewId) {
            navLink.classList.add('text-emerald-500', 'font-semibold');
        } else {
            navLink.classList.remove('text-emerald-500', 'font-semibold');
        }
    });
}

function initSpotlightButton() {
    const spotlightBtn = document.getElementById('hero-spotlight-btn');
    if (spotlightBtn) {
        spotlightBtn.addEventListener('click', () => {
            const select = document.getElementById('comedor-select');
            if (select) {
                select.value = 'rincon-de-luz';
            }
            navigateToView('view-form');
        });
    }
}

// ==========================================================================
// 6. INDICADORES DE IMPACTO & CONTADORES ANIMADOS
// ==========================================================================

function renderImpactIndicators() {
    const container = document.getElementById('impact-indicators');
    if (!container) return;

    const ind = DONAJUSTO_DATA.indicadores;

    container.innerHTML = `
        <!-- Métricas numéricas -->
        <div class="modern-card p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col justify-between">
            <div>
                <div class="flex items-center justify-between mb-6">
                    <span class="text-xs uppercase tracking-wider font-bold text-slate-400">Resumen Comunitario</span>
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Datos en vivo
                    </span>
                </div>
                <div class="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                    <div class="p-3 sm:p-5 bg-slate-50/80 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <span class="text-2xl sm:text-4xl font-heading font-extrabold text-emerald-500 counter-element" data-target="${ind.totalPersonas}">0</span>
                        <span class="block text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Personas asistidas</span>
                    </div>
                    <div class="p-3 sm:p-5 bg-slate-50/80 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <span class="text-2xl sm:text-4xl font-heading font-extrabold text-emerald-500 counter-element" data-target="${ind.comedoresActivos}">0</span>
                        <span class="block text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Espacios en red</span>
                    </div>
                    <div class="p-3 sm:p-5 bg-slate-50/80 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <span class="text-2xl sm:text-4xl font-heading font-extrabold text-amber-500 counter-element" data-target="${ind.donacionesMes}">0</span>
                        <span class="block text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Aportes del mes</span>
                    </div>
                </div>
            </div>
            <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                ${SVG_ICONS.location}
                <span>Distribución coordinada en comedores barriales de Río Cuarto.</span>
            </div>
        </div>

        <!-- Insumos más demandados -->
        <div class="modern-card p-6 sm:p-8 rounded-3xl shadow-sm">
            <div class="flex items-center justify-between mb-6">
                <span class="text-xs uppercase tracking-wider font-bold text-slate-400">Demanda Crítica de Insumos</span>
                <span class="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">Prioridad de entrega</span>
            </div>
            <div class="space-y-4">
                ${ind.insumosCriticos.map(item => {
                    let catIcon = SVG_ICONS.categoryGrain;
                    if (item.iconoType === 'milk') catIcon = SVG_ICONS.categoryMilk;
                    if (item.iconoType === 'oil') catIcon = SVG_ICONS.categoryOil;

                    return `
                        <div>
                            <div class="flex justify-between items-center text-xs sm:text-sm font-semibold mb-1.5">
                                <span class="flex items-center gap-2">
                                    <span>${catIcon}</span>
                                    <span>${item.nombre}</span>
                                    <span class="text-[10px] text-slate-400 font-normal">(${item.categoria})</span>
                                </span>
                                <span class="text-amber-500 font-bold">${item.porcentajeUso}% demanda</span>
                            </div>
                            <progress value="${item.porcentajeUso}" max="100" class="h-2.5" aria-label="${item.nombre}"></progress>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter-element');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        let current = 0;
        const increment = Math.ceil(target / 25);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = current;
            }
        }, 30);
    });
}

// ==========================================================================
// 7. CATÁLOGO: BÚSQUEDA Y FILTRADO EN TIEMPO REAL
// ==========================================================================

function initCatalogFilters() {
    const searchInput = document.getElementById('catalog-search');
    const filterChips = document.querySelectorAll('.filter-chip');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.toLowerCase().trim();
            renderCatalog();
        });
    }

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilter = chip.getAttribute('data-filter');
            renderCatalog();
        });
    });
}

function getFilteredComedores() {
    return DONAJUSTO_DATA.comedores.filter(comedor => {
        let matchesFilter = true;
        if (currentFilter === 'urgente') {
            matchesFilter = (comedor.nivelUrgencia === 'Alta');
        } else if (currentFilter === 'Comedor') {
            matchesFilter = comedor.tipo.toLowerCase().includes('comedor');
        } else if (currentFilter === 'Merendero') {
            matchesFilter = comedor.tipo.toLowerCase().includes('merendero');
        }

        let matchesSearch = true;
        if (currentSearchTerm) {
            const inNombre = comedor.nombre.toLowerCase().includes(currentSearchTerm);
            const inBarrio = comedor.barrio.toLowerCase().includes(currentSearchTerm);
            const inNecesidad = comedor.necesidadPrincipal.toLowerCase().includes(currentSearchTerm);
            const inItems = comedor.necesidades.some(n => n.item.toLowerCase().includes(currentSearchTerm));
            matchesSearch = (inNombre || inBarrio || inNecesidad || inItems);
        }

        return matchesFilter && matchesSearch;
    });
}

function renderCatalog() {
    const grid = document.getElementById('catalog-grid');
    const countElement = document.getElementById('catalog-count');
    if (!grid) return;

    const filtered = getFilteredComedores();

    if (countElement) {
        countElement.textContent = `Mostrando ${filtered.length} de ${DONAJUSTO_DATA.comedores.length} comedores`;
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-16 px-4 modern-card rounded-3xl">
                <div class="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
                    ${SVG_ICONS.search}
                </div>
                <h4 class="font-heading text-lg font-bold mb-2">No se encontraron comedores</h4>
                <p class="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
                    No hay resultados para "${currentSearchTerm || currentFilter}". Probá con otro término como "leche", "arroz" o limpiá el filtro.
                </p>
                <button id="btn-reset-filters" class="bg-emerald-500 hover:bg-emerald-600 force-text-white font-medium py-2.5 px-6 rounded-xl transition-colors text-sm min-h-[44px]">
                    Mostrar todos los comedores
                </button>
            </div>
        `;

        const resetBtn = document.getElementById('btn-reset-filters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                currentSearchTerm = '';
                currentFilter = 'all';
                const searchInput = document.getElementById('catalog-search');
                if (searchInput) searchInput.value = '';
                document.querySelectorAll('.filter-chip').forEach(c => {
                    c.classList.toggle('active', c.getAttribute('data-filter') === 'all');
                });
                renderCatalog();
            });
        }
        return;
    }

    grid.innerHTML = filtered.map(comedor => {
        const isUrgent = comedor.nivelUrgencia === 'Alta';
        const badgeClass = isUrgent
            ? 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20 pulse-badge'
            : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';

        const urgencyIcon = isUrgent ? SVG_ICONS.alertRed : SVG_ICONS.alert;
        const bannerColor = comedor.tipo.toLowerCase().includes('merendero')
            ? 'from-amber-500/10 to-amber-500/5 text-amber-600 dark:text-amber-400'
            : 'from-emerald-500/10 to-emerald-500/5 text-emerald-600 dark:text-emerald-400';

        return `
            <article class="modern-card rounded-3xl overflow-hidden flex flex-col justify-between hover:border-emerald-500/40">
                <!-- Mini banner superior temático -->
                <div class="bg-gradient-to-r ${bannerColor} px-6 py-3 border-b border-slate-100 dark:border-slate-800/80 flex justify-between items-center text-xs font-semibold">
                    <span>${comedor.tipo}</span>
                    <span class="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-normal">
                        ${SVG_ICONS.clock} ${comedor.horario.split('de')[0].trim()}
                    </span>
                </div>

                <div class="p-6 flex-grow flex flex-col justify-between">
                    <div>
                        <!-- Cabecera de la Card -->
                        <div class="flex justify-between items-start gap-2 mb-4">
                            <span class="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${badgeClass}">
                                ${urgencyIcon}
                                <span>Urgencia ${comedor.nivelUrgencia}</span>
                            </span>
                            <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-2.5 py-1 rounded-full">
                                ${SVG_ICONS.users}
                                <span>${comedor.personasAsistidas} pers.</span>
                            </span>
                        </div>

                        <!-- Título y Localización -->
                        <div class="mb-3">
                            <h3 class="font-heading text-xl font-bold tracking-tight mb-1 text-slate-900 dark:text-white">
                                ${comedor.nombre}
                            </h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                ${SVG_ICONS.location}
                                <span>${comedor.barrio}</span>
                            </p>
                        </div>
                        
                        <p class="text-xs text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                            ${comedor.descripcion}
                        </p>

                        <!-- Necesidad Inmediata Destacada -->
                        <div class="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/15 dark:to-teal-500/15 p-3.5 rounded-2xl border border-emerald-500/20 mb-5">
                            <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block mb-1">
                                Necesidad inmediata:
                            </span>
                            <span class="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                ${SVG_ICONS.package}
                                <span>${comedor.necesidadPrincipal}</span>
                            </span>
                        </div>
                    </div>

                    <!-- Botón de Acción -->
                    <button 
                        class="btn-ver-detalle w-full bg-emerald-500 hover:bg-emerald-600 force-text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-150 min-h-[44px] shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 group cursor-pointer"
                        data-comedor-id="${comedor.id}"
                        aria-label="Ver detalles y stock de ${comedor.nombre}">
                        <span>Ver detalles y stock</span>
                        <span class="inline-block transition-transform duration-150 group-hover:translate-x-0.5">${SVG_ICONS.arrowRight}</span>
                    </button>
                </div>
            </article>
        `;
    }).join('');

    document.querySelectorAll('.btn-ver-detalle').forEach(btn => {
        btn.addEventListener('click', () => {
            const comedorId = btn.getAttribute('data-comedor-id');
            openModal(comedorId);
        });
    });
}

function populateFormComedoresSelect() {
    const select = document.getElementById('comedor-select');
    if (!select) return;

    select.innerHTML = `<option value="">Seleccione un comedor o merendero...</option>` +
        DONAJUSTO_DATA.comedores.map(c => `
            <option value="${c.id}">${c.nombre} (${c.barrio})</option>
        `).join('');
}

// ==========================================================================
// 8. MODAL DE DETALLE (ADR-003, EC-006, EC-007)
// ==========================================================================

let activeModalComedorId = null;

function initModal() {
    const modal = document.getElementById('detail-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalActionBtn = document.getElementById('modal-action-btn');

    if (!modal) return;

    function closeModal() {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        activeModalComedorId = null;
    }

    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    if (modalActionBtn) {
        modalActionBtn.addEventListener('click', () => {
            if (activeModalComedorId) {
                const select = document.getElementById('comedor-select');
                if (select) {
                    select.value = activeModalComedorId;
                }
            }
            closeModal();
            navigateToView('view-form');
        });
    }
}

function openModal(comedorId) {
    const comedor = DONAJUSTO_DATA.comedores.find(c => c.id === comedorId);
    if (!comedor) return;

    activeModalComedorId = comedorId;

    const modal = document.getElementById('detail-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalContent = document.getElementById('modal-content');

    modalTitle.textContent = comedor.nombre;
    if (modalSubtitle) {
        modalSubtitle.textContent = `${comedor.tipo} • ${comedor.barrio}`;
    }

    modalContent.innerHTML = `
        <div class="space-y-6">
            <!-- Datos Generales -->
            <div class="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                    <p class="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        ${SVG_ICONS.location} <span class="font-medium">${comedor.direccion}</span>
                    </p>
                    <p class="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        ${SVG_ICONS.clock} <span>${comedor.horario}</span>
                    </p>
                    <p class="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        ${SVG_ICONS.users} <span class="font-medium">Asiste a ${comedor.personasAsistidas} personas</span>
                    </p>
                    <p class="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        ${comedor.nivelUrgencia === 'Alta' ? SVG_ICONS.alertRed : SVG_ICONS.alert}
                        <span class="font-medium">Prioridad: Urgencia ${comedor.nivelUrgencia}</span>
                    </p>
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-3">
                    ${comedor.descripcion}
                </p>
            </div>

            <!-- Necesidades Prioritarias -->
            <div class="bg-amber-50/80 dark:bg-amber-950/20 p-5 rounded-2xl border border-amber-200/80 dark:border-amber-800/80">
                <div class="flex items-center justify-between mb-3">
                    <h4 class="font-heading text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                        ${SVG_ICONS.alert}
                        <span>Insumos prioritarios solicitados</span>
                    </h4>
                    <span class="text-[10px] text-amber-700 dark:text-amber-300 font-semibold uppercase">Requerido hoy</span>
                </div>
                <ul class="space-y-2.5">
                    ${comedor.necesidades.map(n => `
                        <li class="flex justify-between items-center text-xs bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl border border-amber-200/50 dark:border-amber-800/40">
                            <span class="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                <span>${n.item}</span>
                            </span>
                            <div class="flex items-center gap-2">
                                <span class="text-slate-500 dark:text-slate-400 font-medium">${n.requerido}</span>
                                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                                    n.prioridad === 'Urgente' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'
                                }">${n.prioridad}</span>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <!-- Estado de Stock con Barras <progress> sin estilos inline (EC-006) -->
            <div>
                <div class="flex items-center justify-between mb-4">
                    <h4 class="font-heading text-sm font-bold flex items-center gap-2">
                        ${SVG_ICONS.package}
                        <span>Nivel de stock actual en depósito</span>
                    </h4>
                    <span class="text-[11px] text-slate-400 font-normal">Capacidad operativa</span>
                </div>
                <div class="space-y-3.5">
                    ${comedor.stock.map(s => {
                        const porcentaje = Math.round((s.actual / s.maximo) * 100);
                        const isCritical = porcentaje < 25;
                        const alertaColor = isCritical ? 'text-red-500 font-bold' : 'text-slate-600 dark:text-slate-300';
                        return `
                            <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
                                <div class="flex justify-between text-xs mb-1.5">
                                    <span class="font-semibold">${s.item}</span>
                                    <span class="${alertaColor}">
                                        ${s.actual} / ${s.maximo} ${s.unidad} (${porcentaje}%) ${isCritical ? '• Crítico' : ''}
                                    </span>
                                </div>
                                <progress value="${s.actual}" max="${s.maximo}" class="h-2.5" aria-label="${s.item}"></progress>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;

    document.body.classList.add('overflow-hidden');
    modal.classList.remove('hidden');
}

// ==========================================================================
// 9. FORMULARIO DE DONACIÓN Y NOTIFICACIÓN TOAST (DoD)
// ==========================================================================

function initForm() {
    const form = document.getElementById('donation-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const donorName = document.getElementById('donor-name').value.trim();
        const select = document.getElementById('comedor-select');
        const comedorNombre = select.options[select.selectedIndex]?.text || "el comedor seleccionado";

        if (!donorName) return;

        showToast(`¡Muchas gracias ${donorName}! Tu donación coordinada para ${comedorNombre} fue registrada.`);

        form.reset();
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;

    toast.classList.remove('translate-y-[150%]', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-[150%]', 'opacity-0');
    }, 4000);
}
