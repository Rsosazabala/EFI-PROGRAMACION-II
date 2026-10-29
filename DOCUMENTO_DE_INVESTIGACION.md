# Documento de Investigación — DonaJusto
## Proyecto Final Integrador (EFI) — Programación II 2026
**Tecnicatura Superior en Desarrollo de Software — Instituto Tecnológico Río Cuarto (ITEC)**

---

## 1. Resumen de la Idea

**DonaJusto** es una plataforma digital comunitaria diseñada para conectar donantes particulares y empresas con comedores y merenderos comunitarios, resolviendo el desacople entre lo que se dona y lo que realmente se necesita.

En la actualidad, las donaciones de alimentos suelen organizarse de manera intuitiva o informal (vía grupos de mensajería o colectas espontáneas), lo que genera sobreabundancia de ciertos insumos no perecederos (fideos, sal) y escasez crítica de insumos frescos o esenciales (leche, aceite, verduras, proteínas). DonaJusto visibiliza en tiempo real las **necesidades declaradas** y el **estado de stock** de cada comedor, permitiendo que la ayuda se dirija con justicia y eficiencia hacia donde verdaderamente hace falta.

---

## 2. Datos de la Organización

- **Nombre:** DonaJusto (Iniciativa Social / Red Comunitaria).
- **A qué se dedica:** Articulación y gestión tecnológica para la optimización de donaciones alimentarias, visibilización del trabajo comunitario de comedores y merenderos, y medición de impacto social local.
- **¿Ya tiene un sitio o aplicación?** No. El proyecto nace como una solución digital nueva para superar la gestión manual en planillas y cuadernos físicos.
- **Datos Principales de Contacto:**
  - **Domicilio Legal / Centro de Operaciones:** Av. Italia 1350, Río Cuarto, Córdoba, Argentina.
  - **Teléfono de contacto:** +54 (358) 465-9800
  - **Correo electrónico institucional:** contacto.donajusto@gmail.com
- **Identidad Visual:**
  - **Icono para tiendas, apps y favicon (Favicon / App Icon):** Isotipo "Pin del comedor": un pin de mapa en degradé verde esmeralda institucional (`#10b981` a `#047857`) que contiene un plato servido, del que sube un corazón ámbar (`#f59e0b`) en lugar de vapor. El pin expresa la idea central de la plataforma: mostrar dónde está cada comedor y qué necesita; el plato y el corazón hablan del alimento compartido y de la solidaridad. Para tiendas de apps se usa una versión con fondo esmeralda a sangre y el pin en blanco (`assets/brand/icono-app.svg`, exportado en PNG de 1024, 512, 192 y 180 px).
  - **Logotipo y formatos:**
    - Isologotipo horizontal: isotipo a la izquierda y el nombre "DonaJusto" en Poppins ExtraBold, con "Dona" en Slate-900 y "Justo" en Verde Esmeralda (`#10b981`). El texto está convertido a trazos para que se vea igual aunque la fuente no esté instalada.
    - Formatos provistos (carpeta `assets/brand/`):
      - Isotipo color, monocromo negro y monocromo blanco (`isotipo.svg`, `isotipo-negro.svg`, `isotipo-blanco.svg`).
      - Logo horizontal para fondo claro, para fondo oscuro y monocromo (`logo-horizontal*.svg`).
      - Logo vertical para fondo claro y oscuro (`logo-vertical*.svg`).
      - Ícono de app cuadrado y redondeado (`icono-app.svg`, `icono-app-redondeado.svg`).
      - Favicon en SVG (`assets/logo.svg`), PNG de 16, 32 y 48 px y `favicon.ico`; `apple-touch-icon` y manifiesto web (`site.webmanifest`) para instalar el sitio como app.

---

## 3. Requerimientos de Software Frontend y Defensa Técnica

### 3.1. Framework y Estructura CSS: TailwindCSS v3 (vía CDN)
- **Defensa:** TailwindCSS proporciona un enfoque de clases utilitarias de bajo nivel que agiliza el maquetado visual sin generar deuda técnica por sobreescritura de reglas CSS complejas.
- **Ventajas:**
  - Desarrollo ágil sin necesidad de tooling o transpiladores pesados de Node.js en la fase estática.
  - Soporte nativo para modo claro y oscuro controlado por selectores de clase (`darkMode: 'class'`).
  - Mobile-first responsivo fluido mediante breakpoints (`sm:`, `md:`, `lg:`).
  - Facilidad de estandarización sobre la paleta de colores institucional (Emerald, Amber, Slate).

### 3.2. Hosting Propuesto y Análisis de Costos
- **Proveedor seleccionado:** Vercel / GitHub Pages.
- **Defensa:** Al tratarse de una Single Page Application (SPA) pura client-side construida con HTML5, CSS y JS vanilla, no requiere servidor dinámico con Node.js, PHP o bases de datos en runtime.
- **Costo:**
  - **Capa inicial / Académica:** **USD $0 / mes** (plan Hobby gratuito con ancho de banda ilimitado, certificado SSL automático Let's Encrypt y despliegue continuo vía CDN global).
  - **Escala de producción (fase futura con API serverless):** Plan Pro a USD $20 / mes por desarrollador o infraestructura propia mediante VPS Linux básico (USD $5 - $10 / mes en Hetzner o DigitalOcean).

### 3.3. Dominio y Costo (nic.ar)
- **Dominio elegido:** `donajusto.org.ar` (opción institucional sin fines de lucro) o `donajusto.com.ar`.
- **Costo vigente en NIC Argentina:** 
  - Arancel de registro anual para dominios `.com.ar` / `.org.ar`: **$8.500 a $12.000 ARS anuales** (según tabla de aranceles oficial de la Secretaría Legal y Técnica).
- **Defensa:** Un dominio bajo la zona `.ar` aporta identidad geográfica local, legitimidad institucional frente a donantes particulares y entidades gubernamentales, y costos fijos en moneda nacional accesibles para una ONG.

---

## 4. Estrategia de Social Media y Canales de Comunicación

Para garantizar la difusión, credibilidad y canalización de consultas:

| Canal | Cuenta / Identificador | Objetivo principal |
|---|---|---|
| **GMail** | `contacto.donajusto@gmail.com` | Recepción formal de solicitudes de comedores y consultas de donantes corporativos. |
| **Instagram** | `@donajusto.arg` | Canal principal hacia donantes jóvenes y familias: historias con necesidades urgentes del día, fotos de entregas comunitarias y agradecimientos. |
| **Facebook** | `facebook.com/donajusto.arg` | Articulación con comisiones barriales, grupos comunitarios y centros vecinales locales. |
| **YouTube** | `@DonaJustoOficial` | Publicación de testimonios de los comedores, tutoriales sobre cómo donar y videos institucionales de rendición de cuentas e impacto social. |
| **Google Form** | Formulario de Relevamiento y Feedback Comunitario | Formulario externo para que nuevos comedores soliciten ingresar a la red y para medir la satisfacción de los donantes con la experiencia del sitio. |

---

## 5. Valor Agregado frente a Alternativas Existentes

| Enfoque Tradicional / Alternativas Libres | Propuesta de Valor de DonaJusto |
|---|---|
| **Grupos de WhatsApp o Facebook:** Mensajes dispersos, desactualizados rápidamente y sin trazabilidad de stock. | **Catálogo visual unificado en tiempo real:** Cada lugar muestra con claridad su stock actual y qué insumo específico tiene en estado crítico. |
| **Planillas de cálculo en Google Drive:** Complejas de interpretar para un donante casual desde el celular, propensas a edición accidental. | **Experiencia de usuario intuitiva (Mobile-First):** Acceso instantáneo en menos de 3 clics, con barras visuales de progreso y badges de urgencia. |
| **Donación ciega:** El donante entrega lo que le sobra, provocando acumulaciones innecesarias en el comedor. | **Direccionalidad con justicia distributiva:** La plataforma incentiva la donación informada basada en faltantes reales y cálculo de insumos más demandados. |

---

## 6. Alcance de la Versión 1.0 (Entrega EFI)

### 6.1. Incluido en esta versión (Frontend SPA)
1. **Página de Inicio (Hero & Impacto):**
   - Presentación de la misión y propuesta de valor.
   - Panel de indicadores de impacto de la red (total de personas asistidas, comedores adheridos, donaciones registradas en el mes e insumos más demandados).
2. **Catálogo de Comedores y Merenderos:**
   - Grilla responsive (1 columna en móvil, 2 en tablet, 3 en escritorio).
   - Tarjetas con información básica, cantidad de personas atendidas y badge de urgencia.
   - Ventana modal interactiva con detalle completo, dirección ficticia, horarios de atención, listado discriminado de necesidades y nivel de stock visual.
3. **Formulario de Donación y Contacto:**
   - Selección dinámica del comedor a apoyar.
   - Validación nativa de datos obligatorios.
   - Confirmación mediante componente visual flotante (Toast) sin recargar la página.
4. **Diseño y Accesibilidad:**
   - Selector de Modo Claro y Modo Oscuro con memoria local.
   - Botones con área táctil accesible (mínimo 44px de altura) y contraste garantizado (texto blanco en botones sólidos).
   - Animaciones y microinteracciones fluidas.

### 6.2. No incluido en esta versión (Reservado para fase futura)
- Módulo de autenticación con inicio de sesión y gestión de roles (Administrador, Comedor, Donante).
- Backend con base de datos relacional para persistencia multi-usuario.
- Pasarela de cobro o transferencias monetarias (el foco actual es exclusivamente donación de insumos físicos).
- Geolocalización con mapas interactivos dinámicos de GPS.

---

## 7. Detalle de Contenidos y Características Técnicas

- **Arquitectura:** Single Page Application (SPA) pura sin recargas.
- **Archivos:**
  - `index.html`: Marcado semántico HTML5 estructurado.
  - `style.css`: Control de animaciones de entrada, microinteracciones y estilización de barras de nivel `<progress>`.
  - `app.js`: Datos de prueba integrados en JSON local, enrutamiento por vistas en el DOM, sincronización de modo oscuro y control del modal.
- **Tipografía:** Google Fonts — Poppins (encabezados de jerarquía) e Inter (cuerpo de lectura).
- **Paleta Institucional:** Slate (`#0f172a` / `#1e293b` / `#f8fafc`), Esmeralda (`#10b981` / hover `#059669`) y Ámbar (`#f59e0b` / hover `#d97706`).

---

## 8. Estrategia de Sostenibilidad y Modelo de Monetización

DonaJusto es un proyecto con propósito social sin fines de lucro; sin embargo, requiere un modelo de financiamiento para sostener su infraestructura y crecimiento:

1. **Convenios de Responsabilidad Social Empresaria (RSE):**
   - Acuerdos con cadenas de supermercados, distribuidoras mayoristas y empresas de alimentos que deseen canalizar excedentes o partidas de mercadería próximas a vencer de forma transparente. Las empresas obtienen reportes certificados de impacto social y visibilidad como sponsors éticos.
2. **Subsidios y Fondos Concursables de Innovación Social:**
   - Postulación a programas municipales, provinciales o nacionales de modernización tecnológica e impacto comunitario.
3. **Membresías Voluntarias de Empresas Donantes:**
   - Opción para que donantes corporativos aporten una contribución mensual voluntaria destinada al mantenimiento de servidores y logística de transporte.
4. **Cero Comisión a los Comedores:**
   - El uso de la herramienta para los comedores y merenderos es y será siempre 100% gratuito.

---

## 9. Equipo de Trabajo
> A los donantes y comedores les brinda confianza y transparencia conocer al equipo técnico detrás del desarrollo de DonaJusto. Cada integrante aporta su especialidad para hacer realidad este proyecto con impacto social local.

### 9.1. Tabla General de Roles

| Integrante | Rol / Cargo | Responsabilidad Principal |
|---|---|---|
| **Julián Altamirano** | Líder de Proyecto / Project Manager | Coordinación general, arquitectura de frontend, planificación de entregas y control del Definition of Done. |
| **Matías Rodríguez** | Analista Funcional | Relevamiento de procesos de stock en comedores, definición de historias de usuario y especificación de requerimientos. |
| **Santiago Heredia** | Diseñador UX/UI | Diseño de interfaz visual, definición de paleta de colores, maquetado responsive y accesibilidad visual. |
| **Ignacio López Ruiz** | Analista de Datos | Modelado de datos de prueba, indicadores de demanda de insumos y métricas de impacto de la red. |
| **Rodrigo Sosa Zabala** | Responsable de Comunicación y Documentación | Redacción del documento de investigación, estrategia de social media y preparación de la defensa oral. |

### 9.2. Perfil Individual de los Integrantes

#### 1. Julián Altamirano
- **Cargo:** Líder de Proyecto / Project Manager & UI Architect
- **Foto / Avatar:** `assets/team/julian.svg`
- **Breve descripción:** Estudiante avanzado de la Tecnicatura Superior en Desarrollo de Software en ITEC Río Cuarto. Encargado de articular las etapas de planificación y desarrollo, asegurar la calidad del código mediante la metodología SDD y liderar la integración con el ecosistema de agentes Antigravity.

#### 2. Matías Rodríguez
- **Cargo:** Analista Funcional
- **Foto / Avatar:** `assets/team/matias.svg`
- **Breve descripción:** Especializado en análisis de procesos organizacionales y relevamiento de requerimientos. Su foco en el proyecto fue diagnosticar las dinámicas reales de acopio y faltantes en comedores comunitarios para traducirlas en requerimientos funcionales claros.

#### 3. Santiago Heredia
- **Cargo:** Diseñador UX/UI
- **Foto / Avatar:** `assets/team/santiago.svg`
- **Breve descripción:** Apasionado por la accesibilidad web y el diseño visual intuitivo. Responsable de la conceptualización gráfica, paleta de colores inclusiva, microinteracciones y de garantizar que la experiencia sea fluida tanto en dispositivos móviles como en computadoras de escritorio.

#### 4. Ignacio López Ruiz
- **Cargo:** Analista de Datos y Métricas de Impacto
- **Foto / Avatar:** `assets/team/ignacio.svg`
- **Breve descripción:** Con formación en modelado y análisis de datos. Tuvo a su cargo la estructuración de los datos de prueba del inventario, la simulación de stock por movimientos y el diseño algorítmico de los indicadores de demanda crítica de alimentos.

#### 5. Rodrigo Sosa Zabala
- **Cargo:** Responsable de Comunicación y Documentación
- **Foto / Avatar:** `assets/team/rodrigo.svg`
- **Breve descripción:** Enfocado en la comunicación técnica y estratégica del proyecto. Desarrolló el documento integral de investigación, estructuró la presencia en canales sociales y coordinó la narrativa y tiempos del guion para la defensa oral de 20 minutos.

