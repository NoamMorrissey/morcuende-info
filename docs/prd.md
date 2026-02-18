# Product Requirements Document — morcuende.info

> **Autor:** Alfonso Morcuende
> **Fecha:** 2026-02-18
> **Version:** 1.0
> **Estado:** FINAL
> **Referencia:** [docs/brief.md](brief.md), [docs/architecture.md](architecture.md)
> **Clasificacion:** Web App | General | Complejidad Baja

---

## 1. Resumen Ejecutivo

### 1.1 Vision

**Consolidar el posicionamiento de Alfonso Morcuende como referente estrategico en DesignOps y Liderazgo de Diseno.**

El sitio no es una busqueda de empleo pasiva ni un portfolio convencional. Es una plataforma de autoridad que opera en tres ejes:

| Eje | Proposito | Como lo demuestra el sitio |
|-----|-----------|---------------------------|
| **Credibilidad Tecnica (DesignOps)** | El sitio en si mismo es el caso de estudio | Design Tokens (W3C DTCG), arquitectura SCSS (ITCSS + Atomic BEM Hibrido), Storybook como documentacion viva, sincronizacion Figma-codigo via Tokens Studio. La implementacion demuestra dominio de escalabilidad y eficiencia operativa |
| **Conversion de Alto Nivel** | Facilitar que VPs y CEOs accedan al contenido protegido de manera fluida | Portfolio Privado con Google Sheets Auth: punto donde se cierra la confianza para consultorias o roles de direccion |
| **Ecosistema de Pensamiento** | Centralizar podcast, articulos y entrevistas como voz experta coherente | Contenido editorial bilingue (ES/EN) que refuerza autoridad en todos los canales |

**Principio MVP:** Toda funcionalidad que no aporte a la percepcion de seniority y excelencia operativa es secundaria. El sitio debe comunicar nivel directivo en cada interaccion: desde el sistema tipografico hasta la arquitectura de componentes auditable.

### 1.2 Diferenciador

El medio es el mensaje. Mientras otros candidatos a Director de Diseno muestran slides, este sitio demuestra ejecucion real: un sistema de diseno tokenizado, documentado en Storybook y desplegado en produccion. Los perfiles tecnicos (Directores de Diseno) pueden auditar el codigo fuente, la arquitectura de componentes y los tokens como evidencia de capacidad. Los perfiles ejecutivos (VPs, CEOs) acceden a metricas reales y resultados estrategicos en el Portfolio Privado.

### 1.3 Embudo de Conversion

El flujo de usuario no es una conversion directa desde la Home. Es un viaje de validacion que construye autoridad antes de solicitar accion.

```
HOME (Escaparate)
  │
  │  Hero de posicionamiento (full screen)
  │  Podcast highlight + Grid de contenido mixto
  │  Nav principal → "Sobre mi" / "About Me"
  │
  ▼
ABOUT ME (Hub de Marca Personal)
  │
  │  Overview: Leadership, Strategy, Scale
  │  Casos publicos + CV + Design System
  │
  ├──────────────────────┬──────────────────────┐
  │                      │                      │
  ▼                      ▼                      ▼
PORTFOLIO PRIVADO    CONTACTO              SUBSTACK
(Decisores)          (Ofertas/Consultoria)  (Retencion)
VPs, CEOs            Alto nivel             Comunidad
Google Sheets Auth   Netlify Forms          Widget embed
```

**Tres puntos de conversion desde About Me:**

| CTA | Audiencia | Ubicacion | Tipo |
|-----|-----------|-----------|------|
| **Acceso Portfolio Privado** | VPs, CEOs (decisores) | CTA prominente en About Me Overview y Casos | Conversion estrategica |
| **Contacto directo** | Headhunters, Directores de Diseno | CTA en About Me para ofertas/consultoria | Conversion profesional |
| **Suscripcion Substack** | Disenadores, Estrategas, comunidad | Footer global + seccion transversal en About Me | Retencion y autoridad |

**Principio:** About Me es la "landing page" de marca personal. La Home dirige hacia ella; las conversiones se producen desde ella.

### 1.4 Clasificacion del Proyecto

| Atributo | Valor |
|----------|-------|
| **Tipo** | Web App (MPA estatica) |
| **Dominio** | General (sitio personal profesional) |
| **Complejidad** | Baja (sin requisitos regulatorios) |
| **Stack** | HTML estatico + SCSS + JS vanilla |
| **Idiomas** | ES/EN (subdirectorios independientes) |

### 1.5 Referencia Visual y Direccion de Diseno

**Referencia principal:** [The Great Discontent](https://thegreatdiscontent.com/) — revista digital de entrevistas a creativos. El sitio de referencia define el tono visual objetivo: editorial de alta gama con tipografia valiente, espaciado generoso y contenido fotografico protagonista.

**Cuatro principios de direccion de diseno:**

| Principio | Descripcion | Implicacion tecnica |
|-----------|-------------|---------------------|
| **Estetica Editorial** | El sitio respira "revista digital de alta gama". Uso valiente de la tipografia (grandes titulares) y gestion del espacio en blanco que permite que el contenido respire. El ritmo visual transmite seniority, no "blog personal" | Escala tipografica responsive con saltos de tamano significativos entre breakpoints. Spacings generosos definidos en tokens (minimo 3em entre secciones en desktop). Titulares hero en escala display (> 48px mobile, > 72px desktop) |
| **Tratamiento de Imagenes** | Las imagenes de fondo en cards y Hero son protagonistas. El sistema soporta imagenes de alta calidad con tratamientos de superposicion (overlays) que garantizan que el texto sea siempre legible, cumpliendo WCAG AA | Overlays de color definidos por tokens. Contraste texto-sobre-imagen >= 4.5:1 (AA). Imagenes servidas en formato optimizado. Aspect ratios consistentes: Hero 16:9, cards coleccion 16:9, podcast 1:1 |
| **Minimalismo Funcional** | La navegacion y los elementos de interfaz son discretos para no competir con el contenido visual y las historias. La UI desaparece en favor del contenido | Nav ligera (tipografia fina, sin fondos de color prominentes). Chrome minimo. Paleta neutra: fondo claro (#F5F5F5 o similar), texto oscuro (#1A1A1A o similar), acentos restringidos a CTAs |
| **Ritmo del Grid** | El flujo de la Home (mezclando cards de ancho completo con grids de dos columnas) genera dinamismo visual, evitando que el sitio parezca un blog estandar. El layout varia intencionalmente el peso visual entre secciones | Grid dinamico con variacion de columnas entre filas (1-col, 2-col, full-bleed). Cards con alturas variables segun contenido. El ritmo crea tension visual que mantiene el scroll |

**Lo que NO es esta referencia:** TGD no define la estructura de contenido ni la estrategia de conversion del sitio. Solo informa el tono visual, la escala tipografica y el tratamiento fotografico. La estrategia de conversion (embudo via About Me, seccion 1.3) y la estructura de pagina (seccion 7.2) son propias de morcuende.info.

---

## 2. Usuarios y Prioridades

### 2.1 Segmentacion por nivel de decision

La audiencia esta segmentada por autoridad y capacidad de decision en procesos de contratacion. Cada perfil tiene necesidades y rutas de navegacion distintas.

| Prioridad | Perfil | Necesidad principal | Ruta critica |
|-----------|--------|--------------------|--------------|
| **Critica** | VPs de Diseno y CEOs | Validar pensamiento estrategico y resultados de negocio | Home → About Me → Portfolio Privado (Google Sheets Auth) |
| **Alta** | Directores de Diseno | Validar rigor tecnico y liderazgo entre pares | Home → About Me → Design System (Storybook) |
| **Alta** | Headhunters y RRHH | Escaneo rapido de trayectoria y experiencia | Home → About Me → CV |
| **Media** | Disenadores y Estrategas | Consumir contenido editorial + seguir pensamiento | Home → Articulos/Podcast → Substack (retencion) |

### 2.2 Implicaciones para requisitos

- **VPs/CEOs:** El flujo de acceso al Portfolio Privado debe completarse en < 3 segundos (login → contenido visible). Cero friccion desde la recepcion de la contrasena hasta la visualizacion del contenido. Tolerancia a errores nula en este flujo.
- **Directores de Diseno:** Storybook (design.morcuende.info) es un entregable obligatorio y debe estar accesible desde la seccion Design System. La documentacion de componentes es auditable.
- **Headhunters/RRHH:** La pagina de CV debe ser accesible en 1 click desde la navegacion de About Me. La arquitectura de informacion debe permitir escanear experiencia en menos de 10 segundos.
- **Disenadores/Estrategas:** El sistema tipografico y la usabilidad editorial (blog, podcast) deben reforzar autoridad en la disciplina. Legibilidad y jerarquia visual son criticas.

---

## 3. Criterios de Exito

Los KPIs se organizan en torno a los 3 ejes de la vision (seccion 1.1). Cada metrica es trazable a un eje estrategico.

### 3.1 Credibilidad Tecnica (DesignOps)

El sitio demuestra dominio operativo. El exito se mide por la calidad tecnica del propio entregable.

| Criterio | Metrica | Umbral |
|----------|---------|--------|
| Performance como seniority signal | Lighthouse Performance score | 90 – 100 (Percepcion de Instantaneidad) |
| Accesibilidad como estandar profesional | Lighthouse Accessibility score | 90 – 100 (WCAG AA) |
| SEO como visibilidad organica | Lighthouse SEO score | 90 – 100 |
| Best Practices como rigor tecnico | Lighthouse Best Practices score | 90 – 100 |
| Paridad Storybook-produccion | Tokens SCSS compartidos entre Storybook y sitio | 100% (misma fuente de verdad) |
| Build pipeline sin errores | Pipeline tokens + SCSS + Storybook | 0 errores, 0 warnings |
| Cobertura Storybook interna (MVP) | % de componentes de produccion con story correspondiente | 100% |
| Storybook como entregable auditable (Fase 2) | Visitas a design.morcuende.info desde referrer About Me | >= 10 visitas/mes desde lanzamiento Fase 2 |

### 3.2 Conversion de Alto Nivel

Facilitar que decisores (VPs, CEOs) completen el flujo de evaluacion hasta el punto de contacto.

| Criterio | Metrica | Umbral |
|----------|---------|--------|
| Acceso al Portfolio Privado sin friccion | Tasa de exito del flujo login → contenido | 100% cuando la contrasena es valida y vigente |
| Conversion portfolio privado | % de contrasenas emitidas que resultan en visita completa | > 70% |
| Generacion de contactos cualificados | Formularios de contacto recibidos/mes | >= 1/mes en Q2 2026; tendencia creciente trimestral |
| Escaneo rapido de trayectoria (Headhunters) | Clicks desde home hasta CV | < 3 clicks |

### 3.3 Ecosistema de Pensamiento

Centralizar contenido editorial como voz experta coherente que refuerza autoridad.

| Criterio | Metrica | Umbral |
|----------|---------|--------|
| Consumo profundo de contenido | Scroll depth medio en articulos | > 60% |
| Posicionamiento como referente | Trafico organico a articulos/podcast | Crecimiento MoM > 5% |
| Retencion via Substack | Suscripciones desde widget del sitio/mes | >= 5/mes desde lanzamiento |
| Coherencia bilingue | Cambio de idioma sin perder contexto de pagina | 100% de las paginas con equivalente |

---

## 4. Alcance del Producto

### 4.1 MVP (Fase 1 — Nucleo de Impacto Estrategico)

**Principio:** Las paginas que cierran la conversion de alto nivel. Todo lo necesario para que un VP, CEO o headhunter evalúe completamente la candidatura en una sola visita. Toda funcionalidad que no aporte directamente a esta percepcion de seniority y excelencia operativa se aplaza a Fase 2.

| Pagina | Entregables | Justificacion |
|--------|-------------|---------------|
| **Home** | Landing bilingue: Hero full screen (posicionamiento), highlight de podcast, grid de contenido mixto (articulos + entrevistas + newsletter), footer global | Puerta de entrada y filtrado. Propuesta de valor en < 3s |
| **About Me (completo)** | Landing de marca personal con todas las subpaginas: Overview (Leadership, Strategy, Scale) + Casos publicos (3) + CV + CTAs a Portfolio Privado y Contacto + widget Substack | Motor principal de confianza. Hub de conversion |
| **Portfolio Privado** | Login funcional (Google Sheets Auth) + 8-10 casos estrategicos con narrativa de negocio, galerias de imagenes de alta resolucion, diagramas de flujo, y tablas de metricas de impacto (EBITDA, facturacion, conversion) | Punto de cierre de confianza para VPs/CEOs. Densidad de contenido equivalente a un dossier ejecutivo |
| **Articulos** | Listado con cards + paginacion + 3 articulos minimo migrados + template de pagina individual optimizado para lectura larga | Ecosistema de pensamiento. Autoridad editorial |
| **Entrevistas** | Listado con cards + 1 entrevista minimo migrada + template de pagina individual (componentes editoriales compartidos con Articulos) | Validacion como referente en la industria |
| **Contacto** | Formulario funcional (Netlify Forms) con validacion frontend y success state | Punto de conversion final para leads de consultoria |
| **Navegacion** | Nav responsive (5 secciones + selector idioma) | Estructura de navegacion completa |
| **Footer** | Footer global con 4 bloques (Informacion, Contenidos, Seguimiento, Legal) + widget Substack + enlaces sociales | Navegacion secundaria + retencion via newsletter |
| **Bilingue** | Estructura ES/EN completa con contenido al menos en ES | SEO y alcance internacional |
| **Substack** | Widget de suscripcion en footer global y About Me | Retencion de comunidad |
| **SEO** | Meta tags, Open Graph (cards visuales de marca), sitemap.xml, robots.txt, hreflang, JSON-LD | Visibilidad organica |
| **Analytics** | Google Analytics 4 con tracking de eventos clave: flujo About Me, acceso Portfolio Privado, contacto, Substack | Medicion de conversion y comportamiento |
| **Legal** | Aviso Legal + Politica de Privacidad + banner de cookies integrado con tokens de marca + licencia CC BY visible en footer y articulos | Cumplimiento normativo (formulario + analytics en ES) |

**Requisito de calidad Fase 1:** Todas las paginas MVP deben ser 100% funcionales, accesibles (WCAG AA) y estar soportadas por sus correspondientes componentes en Storybook (desarrollo interno), aunque la documentacion publica de estos no se lance hasta Fase 2.

**Politica Content-First:** El MVP se lanza con contenido real en todas las secciones core. No se admiten placeholders, lorem ipsum ni contenido ficticio en las areas de conversion (About Me, Portfolio Privado, Contacto). Los componentes y layouts deben diseñarse y validarse con el contenido real que se desplegara en produccion — no con datos de ejemplo.

| Area MVP | Nivel de contenido requerido |
|----------|------------------------------|
| **About Me (completo)** | 100% contenido real: overview, habilidades, narrativa profesional, CTAs con copy definitivo |
| **Portfolio Privado** | 8-10 casos estrategicos completos: narrativa de retos de negocio y metodologia, galerias de imagenes de alta resolucion (ecosistemas digitales, diagramas de flujo), tablas de KPIs de impacto (EBITDA, facturacion, conversion, investigacion cuantitativa), tamanos de equipo y decisiones estrategicas reales. Datos sensibles de corporaciones protegidos bajo acceso autenticado |
| **Casos publicos** | 3 proyectos completos con descripcion, rol, resultados y screenshots reales |
| **CV** | Experiencia profesional real, completa y actualizada |
| **Articulos** | Minimo 3 articulos reales migrados (no textos de prueba) |
| **Entrevistas** | Minimo 1 entrevista real migrada |
| **Contacto** | Copy real en labels, placeholders y mensajes de feedback |
| **Home** | Headline definitivo, copy de posicionamiento real, destacados de contenido real |

**Excepcion:** Se permiten placeholders unicamente en elementos de Fase 2 (Podcast dedicado, Side Projects, Talks, Design System publico) y en contenido EN cuando la traduccion aun no este disponible.

**Escalabilidad:** La arquitectura de componentes editoriales (cards de coleccion, templates de pagina individual) debe soportar la adicion de nuevos articulos y entrevistas sin cambios estructurales. Añadir un nuevo articulo consiste unicamente en crear un archivo HTML que utilice los componentes existentes.

### 4.2 Post-MVP (Fase 2 — Autoridad Tecnica y Escalabilidad)

**Estrategia "Build in Public":** La documentacion del Design System se lanza como evento de visibilidad, demostrando rigor tecnico ante Directores de Diseno y la comunidad.

| Area | Entregables | Justificacion |
|------|-------------|---------------|
| **Design System publico** | Storybook desplegado en design.morcuende.info con documentacion completa: guias de estilo, uso de tokens, principios arquitectonicos, libreria de componentes | Estrategia "Build in Public". Credibilidad tecnica auditable |
| **About Me > Design System** | Pagina de enlace a Storybook publico desde la seccion About Me | Acceso directo para perfiles tecnicos |
| **Podcast (pagina dedicada)** | Listado con cards + pagina individual con embed Spotify. El contenido embed es accesible desde Fase 1 (home, cards), pero la seccion dedicada se lanza en Fase 2 | Contenido audio con landing propia |
| **Side Projects** | Pagina con listado de proyectos paralelos | Profundidad de perfil |
| **Talks** | Pagina con slides embebidas, evento y ano | Historial de conferencias |
| **Contenido EN** | Traduccion completa de articulos y entrevistas al ingles | Escalabilidad internacional |
| **Analytics avanzado** | Dashboard de metricas de conversion portfolio privado | Optimizacion basada en datos |

### 4.3 Vision (Futuro)

| Area | Entregables |
|------|-------------|
| **Busqueda** | Busqueda interna de articulos (JS client-side) |
| **Newsletter avanzada** | Integracion profunda Substack con contenido exclusivo |
| **Dark Mode** | Toggle de tema oscuro con tokens de color alternativos |
| **Micro-interacciones** | Animaciones con tokens de motion |

---

## 5. User Journeys

### 5.1 VP de Diseno evalua candidatura (Prioridad Critica)

Maria, VP de Diseno en una scale-up de 200 personas, recibe un email de Alfonso con un link al sitio y una contrasena temporal para el portfolio privado. Abre el link en el movil durante el commute. La home carga en menos de 2 segundos. Ve un headline que posiciona a Alfonso como Director de Diseno con vision de negocio. El CTA principal de la home la dirige a "Sobre mi". En About Me lee el overview: Leadership, Strategy, Scale. La pagina funciona como una landing de marca personal — las secciones construyen contexto antes de pedir accion. Revisa los 3 casos publicos — le parecen solidos pero quiere ver resultados reales. Ve el CTA de Portfolio Privado integrado en About Me. Introduce la contrasena. El sistema valida contra Google Sheets, confirma vigencia, y desbloquea el contenido en menos de 1 segundo. Maria accede a un portfolio de 8-10 casos estrategicos. Cada caso es un dossier ejecutivo: narrativa de negocio detallada, galerias de imagenes de ecosistemas digitales, y tablas de metricas de impacto (EBITDA, conversion, facturacion). Las imagenes cargan progresivamente sin ralentizar la navegacion. Selecciona 3 casos relevantes para su contexto y los revisa en profundidad. Cierra la pestana convencida. Al dia siguiente, desde el laptop, usa el CTA de Contacto integrado en About Me y propone una entrevista.

**Flujo:** Home → About Me (contexto) → Portfolio Privado (conversion) → Contacto (accion)

**Requisitos revelados:**
- Home debe cargar < 2s en mobile 4G
- Home debe dirigir al usuario hacia About Me como destino primario
- About Me funciona como landing page de marca personal con CTAs hacia Portfolio Privado y Contacto
- Portfolio Privado: flujo login → contenido < 3s total
- Contenido privado debe mostrar metricas, resultados y narrativa estrategica
- Responsive: experiencia completa en mobile y desktop

### 5.2 Director de Diseno audita sistema tecnico (Prioridad Alta — Fase 2)

Carlos, Director de Diseno en una fintech, quiere validar si Alfonso es un par tecnico. Entra al sitio, la home le muestra el headline y articulos recientes. Navega a "Sobre mi" donde About Me le presenta el overview profesional. Desde ahi accede a "Design System" y abre design.morcuende.info. En Storybook navega la sidebar: Atoms > Global, Molecules, Organisms. Inspecciona la story de molecule-card: ve el HTML limpio, los tokens SCSS aplicados, y la tabla de anatomia. Copia el snippet HTML para verificar que el markup es semantico. Abre la consola del navegador en el sitio principal y comprueba que los estilos coinciden con lo documentado en Storybook. Vuelve al sitio y lee 2 articulos sobre DesignOps en el blog. Concluye que Alfonso tiene capacidad tecnica real. Usa el CTA de Contacto desde About Me para proponer una colaboracion.

**Fase:** Este journey se completa al 100% en Fase 2 (cuando Storybook es publico). En Fase 1, la credibilidad tecnica se demuestra a traves de la calidad del sitio en si mismo y los articulos editoriales.

**Flujo:** Home → About Me (contexto) → Design System / Storybook (auditoria) → Contacto (accion)

**Requisitos revelados:**
- About Me como punto de acceso al Design System y Contacto
- Storybook debe estar desplegado y accesible publicamente
- Cada componente en Storybook documentado en 4 secciones (Definition, Usage, Composition, Technical Specs): variantes interactivas, snippet HTML copiable, Technical Specs Table con mapeo CSS → SCSS → Tokens
- Paridad visual 100% entre Storybook y produccion (mismos tokens)
- Articulos deben seguir el sistema tipografico responsive definido en tokens (Noto Serif body, Public Sans headings)
- Link directo Design System → Storybook desde About Me

### 5.3 Headhunter escanea perfil en 30 segundos (Prioridad Alta)

Laura, headhunter de una firma de executive search, tiene 15 tabs abiertos de candidatos. Abre el sitio de Alfonso. En la home identifica el rol (Director de Diseno) en menos de 3 segundos. Hace click en "Sobre mi" > "CV". En la pagina de CV escanea: experiencia (empresas, anos, roles), habilidades core, y logros cuantificados. En menos de 30 segundos tiene suficiente para incluir a Alfonso en su shortlist. Copia la URL del CV para enviarla a su cliente.

**Requisitos revelados:**
- Home debe comunicar rol profesional en < 3 segundos (headline claro)
- CV accesible en maximo 2 clicks desde home (Home → Sobre mi → CV)
- CV estructurado para escaneo rapido: secciones claras, datos cuantificados
- URL de cada pagina compartible (clean URLs)
- Paginas imprimibles (CV especialmente)

### 5.4 Disenador consume contenido editorial (Prioridad Media)

Pablo, disenador senior, descubre un articulo de Alfonso via LinkedIn. Hace click y llega a la pagina del articulo. La tipografia es excelente — Noto Serif para cuerpo, Public Sans para headings. Lee el articulo completo (scroll depth > 80%). Al terminar, ve cards de articulos relacionados. En el footer de la pagina ve un widget de Substack: "Sigue mi pensamiento sobre DesignOps". Se suscribe. Navega al listado de articulos y descubre 2 mas que le interesan. Luego visita la seccion Podcast y reproduce un episodio via el embed de Spotify. La proxima semana recibe un post de Substack y vuelve al sitio.

**Flujo:** Articulo (via LinkedIn) → Contenido editorial → Substack (retencion) → Visita recurrente

**Requisitos revelados:**
- Sistema tipografico responsive: Noto Serif para cuerpo, Public Sans para headings, escala definida en tokens
- Articulo individual: layout de lectura optimizado (ancho maximo 70ch, interlineado 1.5–1.7)
- Cards de contenido relacionado al final de cada articulo
- Listados de contenido con cards consistentes entre secciones
- Embed de Spotify funcional y responsive
- Clean URLs compartibles en redes sociales (Open Graph meta tags)
- Widget de Substack presente en footer global y en secciones editoriales

### 5.5 Resumen de requisitos por journey

| Journey | Flujo | Requisitos clave |
|---------|-------|-----------------|
| VP evalua candidatura | Home → About Me → Portfolio Privado → Contacto | Auth < 3s, About Me como landing, contenido privado con metricas |
| Director audita sistema | Home → About Me → Design System → Contacto | Storybook publico, snippets copiables, paridad tokens |
| Headhunter escanea perfil | Home → About Me → CV | CV en 2 clicks, escaneo < 30s, URLs compartibles |
| Disenador consume contenido | Articulo → Editorial → Substack | Tipografia editorial, cards consistentes, Substack widget |

---

## 6. Requisitos Especificos de Web App

### 6.1 Soporte de Navegadores

| Navegador | Version minima | Prioridad |
|-----------|---------------|-----------|
| Chrome | Ultimas 2 versiones | Alta |
| Safari | Ultimas 2 versiones (incluyendo iOS Safari) | Alta |
| Firefox | Ultimas 2 versiones | Media |
| Edge | Ultimas 2 versiones | Baja |

**Politica evergreen-only:** No se requiere soporte para navegadores legacy. El codigo utiliza estandares modernos de CSS (custom properties, aspect-ratio, grid, clamp()) y JavaScript nativo (ES modules, optional chaining) sin polyfills ni transpilacion. Esto garantiza un bundle minimo que refuerza la percepcion de instantaneidad (seccion 6.3).

### 6.2 Diseno Responsive

| Breakpoint | Min-width | Rango |
|------------|-----------|-------|
| Base (Mobile) | — | 0 – 479px |
| Small Tablet | 480px | 480 – 767px |
| Tablet | 768px | 768 – 1023px |
| Laptop | 1024px | 1024 – 1365px |
| Desktop | 1366px | 1366 – 1919px |
| Large Desktop | 1920px | 1920px+ |

Los breakpoints estan definidos como Design Tokens en `tokens/breakpoints.json` y se consumen via mixin `bp()` en SCSS. Mobile-first: la base CSS es mobile, cada breakpoint amplia progresivamente.

### 6.3 Rendimiento — Percepcion de Instantaneidad

**Principio:** La audiencia principal (VPs, CEOs) tiene agendas saturadas. Un retraso en la carga del About Me o del Portfolio Privado es una friccion inaceptable con perfiles C-Level. El sitio debe cargar de forma casi instantanea. El rendimiento no es una optimizacion posterior — es el resultado directo de la arquitectura limpia (HTML estatico + SCSS + Vanilla JS, sin frameworks pesados). La velocidad viene "de serie" por la calidad del codigo.

**Lighthouse como KPI:**

| Score | Objetivo |
|-------|----------|
| Performance | 90 – 100 |
| Accessibility | 90 – 100 |
| Best Practices | 90 – 100 |
| SEO | 90 – 100 |

**Core Web Vitals (referencia, no metricas rigidas):**

| Metrica | Objetivo | Condicion |
|---------|----------|-----------|
| Largest Contentful Paint (LCP) | < 2.5s | Mobile 4G, primera visita |
| First Input Delay (FID) | < 100ms | Mobile 4G |
| Cumulative Layout Shift (CLS) | < 0.1 | Todas las paginas |
| Time to Interactive (TTI) | < 3.5s | Mobile 4G, primera visita |

**Calidad visual sin penalizacion de velocidad:**

| Requisito | Detalle |
|-----------|---------|
| Formatos modernos | Todas las imagenes servidas en WebP (con fallback) o AVIF. No se admiten PNG/JPG sin comprimir en produccion |
| Carga diferida | Lazy loading (`loading="lazy"`) en todas las imagenes below-the-fold. Solo el Hero y el contenido above-the-fold cargan de inmediato |
| Responsive images | Uso de `<picture>` + `srcset` para servir tamaños adecuados a cada breakpoint |
| Fuentes | Fuentes web cargadas con `font-display: swap` para evitar FOIT |

### 6.4 SEO (Nivel Basico-Profesional)

**Indexacion y rastreo:**

| Requisito | Detalle |
|-----------|---------|
| Sitemap | `sitemap.xml` en raiz con todas las URLs publicas (excluye portfolio privado) |
| Robots | `robots.txt` con directivas para excluir portfolio privado y assets internos |
| URLs | Clean URLs con `/` final (`/es/articulos/`, no `/es/articulos.html`) |
| Headings | Jerarquia semantica h1-h6 en cada pagina |

**Meta tags y Social Sharing:**

| Requisito | Detalle |
|-----------|---------|
| Meta tags | `<title>`, `<meta description>` unicos por pagina. Titles < 60 chars, descriptions < 160 chars |
| Open Graph | `og:title`, `og:description`, `og:image`, `og:url` por pagina. La `og:image` debe ser visualmente coherente con la estetica editorial del sitio (referencia seccion 1.5): imagen de alta calidad, proporcion 1200×630px, tipografia y paleta alineadas con la marca |
| Twitter Card | `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`. Mismos criterios visuales que Open Graph |
| hreflang | Tags `<link rel="alternate" hreflang="es">` / `hreflang="en"` en todas las paginas bilingues |
| Structured Data | JSON-LD para Person (About Me), Article (articulos/entrevistas), BreadcrumbList (todas las paginas) |

**Requisito de coherencia visual:** Al compartir cualquier URL del sitio en LinkedIn o Twitter, la card de preview debe transmitir la misma estetica de alta gama que el sitio. Las imagenes OG no deben ser genericas ni autogeneradas — deben diseñarse como pieza de marca.

**Performance como factor SEO:** Core Web Vitals (seccion 6.3) son requisito indirecto de SEO. El stack Vanilla HTML/JS/CSS sin framework garantiza un baseline de rendimiento superior. Los targets de LCP < 2.5s, FID < 100ms y CLS < 0.1 son obligatorios.

### 6.5 Analitica

| Requisito | Detalle |
|-----------|---------|
| Google Analytics | Integracion de GA4 (Google Analytics 4) en todas las paginas del sitio |
| Eventos clave | Tracking de: flujo Home → About Me, acceso a Portfolio Privado (login exitoso), envio de formulario de contacto, clics en CTA de Substack |
| Conversion tracking | Configuracion de objetivos: visita completa a Portfolio Privado, envio de formulario de contacto, suscripcion Substack |
| Privacy | Banner de cookies/consentimiento conforme a GDPR si se detecta trafico europeo. GA solo se carga tras consentimiento |

### 6.6 Arquitectura de Paginas

Arquitectura MPA (Multi-Page Application). Cada pagina es un archivo HTML independiente. Sin SPA routing ni JavaScript para navegacion.

```
/ (raiz) → Redirect a /es/ (o deteccion de idioma del navegador)
├── /es/                              ← Home ES ............... [MVP]
│   ├── /es/articulos/                ← Listado ............... [MVP]
│   │   └── /es/articulos/{slug}/     ← Individual ............ [MVP]
│   ├── /es/entrevistas/              ← Listado ............... [MVP]
│   │   └── /es/entrevistas/{slug}/   ← Individual ............ [MVP]
│   ├── /es/podcast/                  ← Listado ............... [Fase 2]
│   │   └── /es/podcast/{slug}/       ← Individual ............ [Fase 2]
│   ├── /es/sobre-mi/                 ← Overview .............. [MVP]
│   │   ├── /es/sobre-mi/casos/       ← Portfolio publico ..... [MVP]
│   │   ├── /es/sobre-mi/proyectos/   ← Side Projects ........ [Fase 2]
│   │   ├── /es/sobre-mi/charlas/     ← Talks ................ [Fase 2]
│   │   ├── /es/sobre-mi/cv/          ← Resume ............... [MVP]
│   │   └── /es/sobre-mi/design-system/ ← Link a Storybook .. [Fase 2]
│   ├── /es/portfolio-privado/        ← Login + protegido .... [MVP]
│   ├── /es/contacto/                 ← Formulario ........... [MVP]
│   ├── /es/aviso-legal/              ← Aviso Legal .......... [MVP]
│   └── /es/politica-privacidad/      ← Politica Privacidad .. [MVP]
└── /en/                              ← Espejo completo ...... [MVP estructura, Fase 2 contenido completo]
```

---

## 7. Requisitos Funcionales

Los requisitos funcionales definen el contrato de capacidades del sistema. Cada FR es trazable a un user journey (seccion 5) y verificable con criterios de aceptacion.

### 7.1 Navegacion y Estructura

| ID | Requisito | Origen |
|----|-----------|--------|
| FR-NAV-01 | El usuario puede navegar entre las 5 secciones principales (Articulos, Entrevistas, Podcast, Sobre mi, Contacto) desde cualquier pagina via nav persistente | UJ 5.1, 5.3 |
| FR-NAV-02 | El usuario puede cambiar entre ES y EN desde el selector de idioma en la nav, manteniendo la pagina equivalente en el otro idioma | UJ 5.1 |
| FR-NAV-03 | La nav se colapsa en hamburguesa en mobile y se expande en desktop, con transicion animada | UJ 5.1 |
| FR-NAV-04 | La pagina raiz (`/`) redirige automaticamente a `/es/` (con opcion futura de deteccion de idioma del navegador) | UJ 5.3 |

### 7.2 Home (Landing)

La Home sigue una estructura secuencial de 4 secciones diseñada para comunicar posicionamiento, demostrar actividad editorial y retener via newsletter.

**Estructura y orden de secciones:**

```
┌─────────────────────────────────────────────┐
│  1. HERO (Full Screen — 100vw × 100vh)      │
│     Imagen de fondo cover                    │
│     Titulo + Subtitulo (inferior izquierda)  │
│     Comunica posicionamiento en < 3s         │
├─────────────────────────────────────────────┤
│  2. HIGHLIGHT DE PODCAST                     │
│     ┌──────┬────────────────────────────┐   │
│     │ IMG  │  [Pill #episodio]          │   │
│     │ (1:1)│  Titulo largo del episodio │   │
│     │      │  Parrafo descriptivo       │   │
│     │      │  [CTA → podcast]           │   │
│     └──────┴────────────────────────────┘   │
├─────────────────────────────────────────────┤
│  3. GRID DE CONTENIDO MIXTO                  │
│     Fila 1: [Card img+pill+titulo] [Card]   │
│     Fila 2: [Card ancho completo]            │
│     Fila 3: [Card img] [Card Newsletter]     │
├─────────────────────────────────────────────┤
│  4. FOOTER GLOBAL (ver seccion 7.11)         │
└─────────────────────────────────────────────┘
```

| ID | Requisito | Origen |
|----|-----------|--------|
| FR-HOME-01 | La seccion Hero ocupa la pantalla completa (100vw × 100vh) con imagen de fondo en `cover` y titulo/subtitulo superpuestos en la zona inferior izquierda. Comunica el rol profesional (Director de Diseno) en < 3 segundos de carga | UJ 5.1, 5.3 |
| FR-HOME-02 | La seccion Highlight de Podcast muestra una card horizontal con: pill indicando numero de episodio, imagen cuadrada (ratio 1:1), titulo largo del episodio a la derecha, parrafo descriptivo debajo, y CTA principal a la pagina del podcast | UJ 5.4 |
| FR-HOME-03 | El Grid de Contenido Mixto muestra articulos y entrevistas en un grid dinamico: Fila 1 — 2 columnas con cards (imagen de fondo + pill de categoria en esquina superior izquierda + titulo/subtitulo). Fila 2 — 1 card de ancho completo (mismo estilo visual). Fila 3 — 2 columnas: izquierda card con imagen de fondo, derecha card de Newsletter (estilo minimalista: solo texto, sin imagen de fondo). Toda la superficie de cada card es clicable | UJ 5.4 |
| FR-HOME-04 | Todas las cards con imagen de fondo y el Hero garantizan la legibilidad del texto superpuesto mediante capas de contraste (overlays) definidas por tokens de color, cumpliendo contraste >= 4.5:1 (WCAG AA, ver NFR-A11Y-08) | UJ 5.1, 5.3, 5.4, Seccion 1.5 |
| FR-HOME-05 | El grid de contenido y todas las secciones de la Home son totalmente responsive siguiendo los 5 breakpoints del Design System (480, 768, 1024, 1366, 1920px) | Seccion 6.2 |
| FR-HOME-06 | La card de Newsletter en Fila 3 del grid incluye CTA de suscripcion a Substack con copy orientado a pensamiento estrategico sobre DesignOps (compartido con FR-SUB-01) | UJ 5.4, Seccion 1.3 |

### 7.3 Contenido Editorial (Articulos, Entrevistas, Podcast)

| ID | Requisito | Origen |
|----|-----------|--------|
| FR-EDIT-01 | El usuario puede ver un listado paginado de articulos con cards que muestran: titulo, extracto, fecha y categoria | UJ 5.4 |
| FR-EDIT-02 | El usuario puede leer un articulo individual con layout editorial optimizado para lectura (ancho maximo 70ch, interlineado 1.5–1.7) | UJ 5.4 |
| FR-EDIT-03 | Al final de cada articulo, el usuario ve cards de contenido relacionado (minimo 2) | UJ 5.4 |
| FR-EDIT-04 | Las entrevistas comparten el mismo sistema de listado (cards) y pagina individual (componentes editoriales) que los articulos | Brief 3.4 |
| FR-EDIT-05 | (Fase 2) Los episodios de podcast tienen pagina dedicada con player embebido de Spotify dentro de un contenedor responsive. En Fase 1, el podcast se integra via embed en Home y cards | UJ 5.4, Brief 3.5 |
| FR-EDIT-06 | Los listados de las 3 secciones editoriales usan el mismo componente de card (componentes de coleccion) con variantes minimas por tipo | Brief 3.2 |

### 7.4 About Me

| ID | Requisito | Origen |
|----|-----------|--------|
| FR-ABOUT-01 | About Me funciona como landing page de marca personal: las secciones construyen contexto (Overview → Casos → CV) antes de presentar CTAs de conversion. En Fase 2 se anade Design System | UJ 5.1, 5.2, 5.3 |
| FR-ABOUT-02 | La pagina Overview muestra las habilidades core (Leadership, Strategy, Scale) con layout visual diferenciado | UJ 5.1 |
| FR-ABOUT-03 | La seccion Casos muestra 3 proyectos publicos (sin NDA) con descripcion, rol, resultados y screenshots | UJ 5.1 |
| FR-ABOUT-04 | About Me incluye CTA prominente hacia Portfolio Privado, visible desde Overview y Casos | UJ 5.1 |
| FR-ABOUT-05 | About Me incluye CTA de Contacto directo orientado a ofertas de trabajo y consultorias de alto nivel | UJ 5.1, 5.2 |
| FR-ABOUT-06 | La pagina CV muestra experiencia profesional completa estructurada para escaneo en < 30 segundos: empresa, rol, periodo, logros cuantificados | UJ 5.3 |
| FR-ABOUT-07 | La pagina CV es imprimible con estilos especificos (`@media print`) que mantienen legibilidad | UJ 5.3 |
| FR-ABOUT-08 | (Fase 2) La seccion Design System enlaza directamente a design.morcuende.info (Storybook) en una nueva pestana | UJ 5.2 |

### 7.5 Portfolio Privado (Autenticacion Google Sheets)

| ID | Requisito | Origen |
|----|-----------|--------|
| FR-AUTH-01 | El usuario puede introducir una contrasena en un formulario de login en `/portfolio-privado/` | UJ 5.1 |
| FR-AUTH-02 | El sistema valida la contrasena contra Google Sheets API: comprueba existencia y fecha de caducidad | UJ 5.1, Brief 4.3 |
| FR-AUTH-03 | Si la contrasena es valida y vigente, el contenido protegido se desbloquea en menos de 1 segundo tras la validacion | UJ 5.1 |
| FR-AUTH-04 | Si la contrasena es invalida o expirada, se muestra un mensaje de error claro sin revelar si la contrasena existe o ha expirado | UJ 5.1 |
| FR-AUTH-05 | La sesion se almacena en sessionStorage: persiste durante la navegacion pero expira al cerrar la pestana | Brief 4.3 |
| FR-AUTH-06 | Alfonso gestiona las contrasenas directamente desde Google Sheets. El spreadsheet funciona como panel de control con los campos: contrasena unica generada, fecha de expiracion, email del destinatario, y estado (activa/expirada/revocada). Audiencia objetivo: recruiters en procesos estrategicos activos y clientes potenciales de consultoria de alto nivel | Brief 4.3 |
| FR-AUTH-07 | Si Google Sheets API no responde en 5 segundos, se muestra un mensaje de error con instruccion de reintentar o contactar directamente | UJ 5.1 |
| FR-AUTH-08 | Cuando Alfonso registra una nueva contrasena en Google Sheets (con email y expiracion), el sistema dispara automaticamente un correo electronico al destinatario con la contrasena y el enlace al portfolio privado. La automatizacion se implementa via Google Apps Script vinculado al spreadsheet | UJ 5.1, Brief 4.3 |
| FR-AUTH-09 | Cuando un usuario solicita acceso al portfolio privado (via formulario de contacto o comunicacion directa), Alfonso recibe una notificacion por email que le permite gestionar la solicitud desde Google Sheets | UJ 5.1 |

**Contenido del Portfolio Privado (8-10 casos estrategicos):**

Cada caso de estudio es un dossier ejecutivo denso en informacion. El visor debe soportar una jerarquia de informacion clara donde los datos clave sean legibles y los activos visuales se carguen sin penalizar la percepcion de instantaneidad.

| ID | Requisito | Origen |
|----|-----------|--------|
| FR-PORT-01 | Cada caso privado sigue un template estructurado con 3 bloques de contenido: (a) **Narrativa Estrategica** — textos largos que detallan reto de negocio, metodologia de investigacion y solucion, (b) **Activos Visuales** — galerias de imagenes de alta resolucion, diagramas de flujos complejos y capturas de ecosistemas digitales, (c) **Metricas de Impacto** — tablas de datos con KPIs de negocio (EBITDA, facturacion, conversion) y resultados de investigacion cuantitativa | UJ 5.1, Seccion 4.1 |
| FR-PORT-02 | Las galerias de imagenes dentro de cada caso usan lazy loading (`loading="lazy"`) y formatos optimizados (WebP/AVIF). Solo las imagenes above-the-fold del caso activo cargan de inmediato. Las imagenes de alta resolucion se sirven via `<picture>` + `srcset` adaptadas al viewport | UJ 5.1, NFR-PERF-05..07 |
| FR-PORT-03 | Las tablas de metricas de impacto son responsive: en desktop se muestran como tablas HTML semanticas (`<table>`), en mobile se reorganizan para mantener legibilidad sin scroll horizontal | UJ 5.1, Seccion 6.2 |
| FR-PORT-04 | La arquitectura de casos privados es escalable: añadir un nuevo caso consiste en crear un archivo HTML que reutilice el template de caso y los componentes existentes (galerias, tablas de metricas, bloques de narrativa). Cero cambios en SCSS o JS | UJ 5.1, NFR-MAINT-05 |
| FR-PORT-05 | Todo el contenido del portfolio privado (textos, imagenes, datos corporativos) esta protegido bajo el acceso autenticado (FR-AUTH-01..05). Ningun activo visual ni dato de metricas es accesible sin sesion valida | UJ 5.1, NFR-SEC-03 |

### 7.6 Contacto

| ID | Requisito | Origen |
|----|-----------|--------|
| FR-CONTACT-01 | El formulario de contacto contiene: Nombre (requerido), Email (requerido, validacion de formato), Mensaje (requerido) | UJ 5.1, UJ 5.2, Brief 5.1 |
| FR-CONTACT-02 | La validacion frontend muestra estados visuales diferenciados para error, focus y exito, consistentes con el lenguaje visual del sitio | UJ 5.1, UJ 5.2, Brief 5.1 |
| FR-CONTACT-03 | El envio se procesa via Netlify Forms como servicio externo (sin backend propio, independiente del hosting en Hostalia) | UJ 5.1, UJ 5.2, Brief 5.1 |
| FR-CONTACT-04 | Tras envio exitoso, se muestra un estado de exito (success state) que mantiene la linea visual del sitio | UJ 5.1, UJ 5.2, Brief 5.1 |
| FR-CONTACT-05 | El formulario incluye proteccion contra spam (honeypot field de Netlify) | Requisito de seguridad |

### 7.7 Bilingue (ES/EN)

| ID | Requisito | Origen |
|----|-----------|--------|
| FR-i18n-01 | Cada pagina tiene su equivalente en el otro idioma como archivo HTML independiente | Brief 2.1 |
| FR-i18n-02 | El selector de idioma en la nav enlaza a la pagina equivalente (no a la home del otro idioma) | UJ 5.1 |
| FR-i18n-03 | Las URLs estan localizadas: `/es/articulos/` vs `/en/articles/`, `/es/sobre-mi/` vs `/en/about-me/` | Brief 2.1 |
| FR-i18n-04 | Cada pagina incluye tags hreflang apuntando a su equivalente en el otro idioma | Seccion 6.4 |

### 7.8 Retencion y Comunidad (Substack)

| ID | Requisito | Origen |
|----|-----------|--------|
| FR-SUB-01 | El footer global incluye un widget de suscripcion a Substack con copy orientado a pensamiento estrategico sobre DesignOps | UJ 5.4 |
| FR-SUB-02 | El widget de Substack esta presente de forma no intrusiva pero constante: footer de todas las paginas + seccion dedicada en About Me | UJ 5.4, Seccion 1.3 |
| FR-SUB-03 | El widget se integra via embed oficial de Substack (iframe/script) sin backend propio | Requisito tecnico |

### 7.9 Design System y Storybook

**Fase 1 (MVP):** Storybook funciona como herramienta interna de desarrollo. Todos los componentes de Fase 1 tienen stories con paridad visual. La configuracion de Fase 1 debe estar preparada para exportar como sitio estatico independiente (build-ready para design.morcuende.info sin cambios adicionales).
**Fase 2:** Storybook se despliega publicamente en design.morcuende.info como estrategia "Build in Public".

**Estructura de documentacion obligatoria por componente (4 secciones):**

| Seccion | Contenido |
|---------|-----------|
| **1. Definition** | Que es el componente, su proposito en el sistema, y cuando usarlo. Incluye nombre canonico (Atomic BEM) y clasificacion (atom/molecule/organism, global/contextual) |
| **2. Usage** | Todas las variantes como stories interactivas con soporte para estados forzados (`:hover`, `:focus`, `:active`) verificables desde la interfaz sin interaccion manual. Snippet HTML copiable por variante |
| **3. Composition** | Anatomia visual: elementos que componen el componente, relacion con otros componentes (dependencias), y slots de contenido. Para molecules/organisms: lista de atoms/molecules que lo componen |
| **4. Technical Specs** | **Technical Specs Table** obligatoria: mapeo de propiedades CSS aplicadas → variables SCSS utilizadas → tokens de origen (formato: `CSS property → SCSS variable → Token name`). Incluye breakpoint behavior si aplica |

**Configuracion de Storybook:**

| Requisito de configuracion | Detalle |
|---------------------------|---------|
| Directorio estatico de assets | La carpeta `assets/` se configura como `staticDirs` en Storybook para que imagenes de referencia y recursos visuales esten disponibles en las stories |
| Estados forzados | Soporte para pseudo-estados (`:hover`, `:focus`, `:active`) forzados desde la interfaz de Storybook (addon `@storybook/addon-pseudo-states` o equivalente) |
| Export estatico | `npm run storybook:build` genera `storybook-static/` funcional como sitio independiente, listo para deploy en Fase 2 |

| ID | Requisito | Fase | Origen |
|----|-----------|------|--------|
| FR-DS-01 | Todo componente visible en produccion tiene una story correspondiente en Storybook que cumple la estructura de 4 secciones (Definition, Usage, Composition, Technical Specs). La configuracion incluye `assets/` como directorio estatico | MVP | UJ 5.2, Brief 6.3 |
| FR-DS-02 | Storybook consume los mismos Design Tokens (SCSS) que el sitio de produccion, garantizando paridad visual 100% | MVP | UJ 5.2, Brief 6.3 |
| FR-DS-03 | La seccion Technical Specs de cada componente incluye la **Technical Specs Table** obligatoria con el mapeo completo: CSS property → SCSS variable → Token name. Esta tabla es el contrato tecnico auditable del componente | MVP | UJ 5.2 |
| FR-DS-04 | Storybook se despliega como build estatico en design.morcuende.info, accesible publicamente | Fase 2 | Brief 6.3 |
| FR-DS-05 | La seccion Design System en About Me enlaza directamente a design.morcuende.info en una nueva pestana | Fase 2 | UJ 5.2 |

### 7.10 Footer Global

El footer es un componente global presente en todas las paginas del sitio. Se estructura en 4 bloques tematicos mas una barra legal inferior.

| ID | Requisito | Origen |
|----|-----------|--------|
| FR-FOOTER-01 | El footer se divide en 4 bloques: **Informacion** (About Me, Contacto), **Contenidos** (Articulos, Entrevistas, Podcast), **Seguimiento** (Newsletter, LinkedIn, Instagram), **Legal** (barra inferior: Copyright, Aviso Legal, Politica de Privacidad, licencia CC BY) | Estructura Home, FR-LEGAL-04..05 |
| FR-FOOTER-02 | El bloque Legal se muestra como barra inferior separada visualmente del resto del footer | Estructura Home |
| FR-FOOTER-03 | El bloque Seguimiento incluye el widget de suscripcion a Substack (compartido con FR-SUB-01) y enlaces a perfiles de LinkedIn e Instagram | UJ 5.4, Seccion 1.3 |
| FR-FOOTER-04 | El footer es responsive: en mobile los bloques se apilan verticalmente; en desktop se distribuyen en columnas | Seccion 6.2 |

### 7.11 Content-First

| ID | Requisito | Fase | Origen |
|----|-----------|------|--------|
| FR-CF-01 | Todas las paginas MVP se lanzan con contenido real: textos definitivos, imagenes reales, datos verificados. No se admite lorem ipsum, datos ficticios ni placeholders en areas de conversion (About Me, Portfolio Privado, Contacto, Home) | MVP | Seccion 4.1 |
| FR-CF-02 | Los componentes y layouts se diseñan y validan con contenido real durante el desarrollo. El contenido real es input del proceso de diseno, no un paso posterior al maquetado | MVP | Seccion 4.1 |
| FR-CF-03 | La arquitectura de componentes editoriales (cards de coleccion, template de articulo individual, template de entrevista) permite añadir nuevo contenido creando unicamente un archivo HTML que reutilice los componentes existentes, sin modificaciones estructurales en SCSS ni en otros archivos HTML | MVP | Seccion 4.1 |
| FR-CF-04 | El contenido del CV es exportable: la pagina de CV genera una version imprimible via `@media print` que mantiene la jerarquia visual y la legibilidad | MVP | UJ 5.3, FR-ABOUT-07 |

### 7.12 Analitica y SEO

| ID | Requisito | Origen |
|----|-----------|--------|
| FR-SEO-01 | Cada pagina tiene `<title>` (< 60 chars) y `<meta description>` (< 160 chars) unicos y descriptivos | Seccion 6.4 |
| FR-SEO-02 | Cada pagina incluye tags Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) con imagen OG diseñada como pieza de marca (1200x630px), visualmente coherente con la estetica editorial del sitio (seccion 1.5) | Seccion 6.4 |
| FR-SEO-03 | Cada pagina incluye Twitter Card (`summary_large_image`) con los mismos criterios visuales que Open Graph | Seccion 6.4 |
| FR-SEO-04 | El sitio incluye `sitemap.xml` (URLs publicas, excluye portfolio privado) y `robots.txt` con directivas de exclusion para contenido privado | Seccion 6.4 |
| FR-SEO-05 | Cada pagina incluye datos estructurados JSON-LD: `Person` (About Me), `Article` (articulos/entrevistas), `BreadcrumbList` (todas) | Seccion 6.4 |
| FR-GA-01 | Google Analytics 4 (GA4) esta integrado en todas las paginas del sitio. GA solo se carga tras consentimiento del usuario (banner de cookies conforme a GDPR) | Seccion 6.5 |
| FR-GA-02 | GA4 trackea los siguientes eventos clave: navegacion Home → About Me, acceso exitoso a Portfolio Privado (login completado), envio de formulario de contacto, clic en CTA de Substack | Seccion 6.5, UJ 5.1 |
| FR-GA-03 | GA4 tiene configurados objetivos de conversion: visita completa a Portfolio Privado, envio de formulario de contacto, suscripcion a Substack | Seccion 6.5, Seccion 3.2 |

### 7.13 Legal y Cumplimiento Normativo

Obligatorio por operar con formulario de contacto + Google Analytics en territorio español.

| ID | Requisito | Origen |
|----|-----------|--------|
| FR-LEGAL-01 | El sitio incluye pagina de Aviso Legal (`/es/aviso-legal/`, `/en/legal-notice/`) con: titular del sitio, datos de contacto, condiciones de uso | Normativa LSSI-CE (Espana) |
| FR-LEGAL-02 | El sitio incluye pagina de Politica de Privacidad (`/es/politica-privacidad/`, `/en/privacy-policy/`) con: datos recogidos (formulario de contacto), finalidad, base legal, derechos del usuario, uso de Google Analytics, cookies | Normativa RGPD/GDPR |
| FR-LEGAL-03 | El sitio muestra un banner de cookies funcional antes de activar GA4 o cualquier cookie no esencial. El banner esta diseñado con los tokens de marca del sitio (no es un widget generico de terceros). Ofrece opciones de aceptar/rechazar y enlace a Politica de Privacidad | RGPD, FR-GA-01 |
| FR-LEGAL-04 | Todo el contenido editorial (articulos, entrevistas, podcast) esta sujeto a licencia Creative Commons Attribution (CC BY). La indicacion de licencia es visible en: (a) el footer global dentro del bloque Legal, y (b) al final de cada articulo/entrevista individual | Propiedad intelectual |
| FR-LEGAL-05 | Las paginas legales (Aviso Legal, Politica de Privacidad) son accesibles desde el bloque Legal del footer global en todas las paginas del sitio | FR-FOOTER-01 |
| FR-LEGAL-06 | Las paginas legales estan disponibles en ambos idiomas (ES/EN) como archivos HTML independientes con hreflang cruzado | FR-i18n-01 |

---

## 8. Requisitos No Funcionales

### 8.1 Rendimiento (Fidelidad Tecnica)

**Principio:** El rendimiento no se consigue con parches de optimizacion a posteriori. Es el resultado natural de la arquitectura limpia: HTML estatico + SCSS tokenizado + Vanilla JS sin frameworks. No se aceptaran correcciones de velocidad que comprometan la calidad del codigo. Si una pagina es lenta, el problema esta en la arquitectura, no en la falta de un plugin de cache.

| ID | Requisito | Metodo de medicion |
|----|-----------|-------------------|
| NFR-PERF-01 | Lighthouse Performance score 90-100 en todas las paginas MVP | Lighthouse audit local antes de cada deploy |
| NFR-PERF-02 | Core Web Vitals en zona verde: LCP < 2.5s, FID < 100ms, CLS < 0.1 en mobile 4G | Lighthouse audit local + WebPageTest post-deploy |
| NFR-PERF-03 | CSS total compilado < 50KB (gzipped) | Build pipeline report |
| NFR-PERF-04 | Zero JavaScript en paginas que no requieren interactividad (excluye nav toggle, auth y contact) | Auditoria manual + Lighthouse |
| NFR-PERF-05 | Todas las imagenes servidas en formatos modernos (WebP con fallback, o AVIF). No se admiten PNG/JPG sin comprimir en produccion | Auditoria de assets + build pipeline |
| NFR-PERF-06 | Lazy loading (`loading="lazy"`) en todas las imagenes below-the-fold. Solo Hero y contenido above-the-fold cargan de inmediato | Lighthouse audit + inspeccion HTML |
| NFR-PERF-07 | Responsive images via `<picture>` + `srcset` para servir tamanos adecuados a cada breakpoint | Inspeccion HTML + test visual cross-breakpoint |
| NFR-PERF-08 | Fuentes web cargadas con `font-display: swap` para evitar FOIT (Flash of Invisible Text) | Lighthouse font-display audit |

### 8.2 Accesibilidad (WCAG 2.1 AA)

| ID | Requisito | Metodo de medicion |
|----|-----------|-------------------|
| NFR-A11Y-01 | Cumplimiento WCAG 2.1 nivel AA en todas las paginas publicas | Lighthouse Accessibility >= 95 + axe-core audit |
| NFR-A11Y-02 | Contraste de color minimo 4.5:1 para texto normal, 3:1 para texto grande | Verificacion automatica via tokens de color |
| NFR-A11Y-03 | Navegacion completa por teclado: todos los elementos interactivos son alcanzables via Tab, activables via Enter/Space | Test manual + auditoria |
| NFR-A11Y-04 | Todas las imagenes tienen atributo `alt` descriptivo; imagenes decorativas usan `alt=""` | Lint HTML automatico |
| NFR-A11Y-05 | Formularios con labels asociados, mensajes de error vinculados via `aria-describedby`, y roles ARIA donde sean necesarios | axe-core audit |
| NFR-A11Y-06 | Focus visible en todos los elementos interactivos con estilo definido por Design Tokens | Test manual + tokens audit |
| NFR-A11Y-07 | Estructura semantica correcta: un unico `<h1>` por pagina, jerarquia h1-h6 sin saltos | Lint HTML automatico |
| NFR-A11Y-08 | Texto superpuesto sobre imagenes de fondo mantiene contraste >= 4.5:1 (AA) garantizado por overlays definidos en tokens de color. Aplica a Hero, cards de coleccion y cualquier componente con imagen de fondo | Test de contraste automatico (axe-core) + verificacion manual sobre imagenes representativas |
| NFR-A11Y-09 | El sitio es compatible con lectores de pantalla: uso correcto de landmark regions HTML5 (`<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`), `aria-label` en elementos interactivos sin texto visible (iconos, hamburguesa), `aria-current="page"` en nav activa, y `aria-live` para feedback dinamico (formularios, auth) | Test con VoiceOver (macOS/iOS) + axe-core audit |

**Hito de calidad:** Se realizara una auditoria completa de accesibilidad (QA de accesibilidad) antes del hito de lanzamiento de abril 2026. Esta auditoria incluye: Lighthouse Accessibility >= 95, axe-core sin errores criticos, test manual de navegacion por teclado en todas las paginas MVP, y test con lector de pantalla (VoiceOver) en los 4 flujos criticos (UJ 5.1, 5.2, 5.3, 5.4).

### 8.3 Seguridad

| ID | Requisito | Metodo de medicion |
|----|-----------|-------------------|
| NFR-SEC-01 | HTTPS obligatorio en todas las paginas (redirect HTTP → HTTPS) | Test de deploy |
| NFR-SEC-02 | Headers de seguridad configurados: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin` | Security headers audit |
| NFR-SEC-03 | El contenido HTML del portfolio privado no debe ser indexable: `<meta name="robots" content="noindex, nofollow">` + exclusion en robots.txt y sitemap | SEO audit |
| NFR-SEC-04 | API key de Google Sheets restringida por dominio (HTTP referrer restriction) | Configuracion de Google Cloud Console |
| NFR-SEC-05 | El formulario de contacto incluye honeypot anti-spam (Netlify built-in) | Test funcional |

### 8.4 Mantenibilidad

| ID | Requisito | Metodo de medicion |
|----|-----------|-------------------|
| NFR-MAINT-01 | Todo valor visual proviene de Design Tokens. Cero valores hardcoded en SCSS de componentes | Grep audit (buscar valores hex, px literales en componentes) |
| NFR-MAINT-02 | (MVP) Todo componente en produccion tiene una story correspondiente en Storybook (desarrollo interno). Verificable: el numero de archivos en `scss/4-components/` coincide con el numero de archivos `.stories.js` en `stories/` | Script de validacion local ejecutado antes de cada deploy |
| NFR-MAINT-03 | La arquitectura SCSS sigue ITCSS + Atomic BEM Hibrido documentado en architecture.md | Code review contra docs/architecture.md |
| NFR-MAINT-04 | Build pipeline (tokens + SCSS + Storybook) ejecuta sin errores ni warnings. El comando `npm run build` genera `/dist` y `storybook-static/` correctamente | Ejecucion local del build pipeline antes de cada deploy |
| NFR-MAINT-05 | Añadir un nuevo articulo o entrevista requiere unicamente crear un archivo HTML que reutilice los componentes existentes. Cero cambios en SCSS, JS o configuracion | Verificacion manual: crear articulo de prueba sin tocar otros archivos |

### 8.5 Hosting y Deploy

**Hosting:** Hostalia (hosting compartido con soporte para archivos estaticos). El dominio morcuende.info ya esta configurado y activo en Hostalia. El sitio se despliega como archivos HTML/CSS/JS estaticos generados en la carpeta `/dist` y subidos via FTP/SFTP. No hay CI/CD automatizado — el deploy es un proceso manual controlado.

**Servicios externos (no vinculados al hosting):** Netlify Forms (formulario de contacto) y Google Sheets API (auth portfolio privado) operan como servicios externos independientes del proveedor de hosting.

| ID | Requisito | Metodo de medicion |
|----|-----------|-------------------|
| NFR-HOST-01 | Sitio principal desplegado en Hostalia como archivos estaticos (HTML/CSS/JS). Build output en carpeta `/dist` optimizada para subida directa via FTP/SFTP | Verificacion de deploy: contenido de `/dist` accesible en morcuende.info |
| NFR-HOST-02 | (Fase 2) Storybook desplegado en subdominio design.morcuende.info como build estatico independiente (carpeta `storybook-static/`). La configuracion tecnica de Storybook en Fase 1 debe estar preparada para exportar como sitio estatico independiente sin cambios adicionales | DNS + deploy verification (Fase 2). En Fase 1: `npm run storybook:build` genera `storybook-static/` funcional |
| NFR-HOST-03 | HTTPS obligatorio con certificado SSL configurado en Hostalia. Redirect HTTP → HTTPS | Test de acceso via HTTP y HTTPS |
| NFR-HOST-04 | El proceso de deploy consiste en: (1) `npm run build` genera `/dist`, (2) subida de `/dist` via FTP/SFTP a Hostalia. Documentado en README | Verificacion manual del proceso documentado |
| NFR-HOST-05 | Los servicios externos (Netlify Forms, Google Sheets API, GA4) funcionan independientemente del proveedor de hosting. No requieren configuracion en Hostalia | Test funcional de formulario, auth y analytics en produccion |

### 8.6 Calidad Visual (Direccion de Diseno)

Requisitos derivados de la referencia visual (seccion 1.5). Garantizan que el sitio transmita el tono de "revista digital de alta gama".

| ID | Requisito | Metodo de medicion |
|----|-----------|-------------------|
| NFR-VIS-01 | La escala tipografica del Hero usa tamaños display: >= 48px en mobile, >= 72px en desktop. Los saltos de tamaño entre breakpoints son significativos (no incrementales) | Inspeccion de tokens tipograficos en Storybook + test visual cross-breakpoint |
| NFR-VIS-02 | Spacings entre secciones principales de pagina son generosos: minimo equivalente a 3em en desktop (definidos via tokens de spacing). El contenido "respira" | Verificacion visual en Storybook + auditoria de tokens de spacing |
| NFR-VIS-03 | Aspect ratios de imagen consistentes: Hero 16:9, cards de coleccion 16:9, podcast highlight 1:1. Definidos via CSS aspect-ratio o contenedores con padding-ratio | Test visual en Storybook por componente |
| NFR-VIS-04 | Paleta de color restringida a neutros: fondo claro, texto oscuro, acentos limitados a CTAs y pills. Los valores exactos se definen en tokens de color | Auditoria de tokens: contar colores unicos, verificar que no excedan la paleta definida |
| NFR-VIS-05 | La navegacion y elementos de interfaz (nav, footer, pills) son visualmente discretos: tipografia ligera, sin fondos de color prominentes, sin bordes gruesos. La UI no compite con el contenido | Verificacion visual + review de tokens de nav |

---

## 9. Alcance y Limitaciones Tecnicas

### 9.1 Stack confirmado (no negociable)

| Decision | Valor | Razon |
|----------|-------|-------|
| Markup | HTML estatico manual | Control total, sin dependencias runtime |
| Estilos | SCSS (ITCSS + Atomic BEM Hibrido) | Escalabilidad, tokens, especificidad controlada |
| Tokens | W3C DTCG JSON → SCSS via Token Engine | Fuente de verdad unica Figma ↔ codigo |
| Documentacion | Storybook (HTML framework) | Living Style Guide auditable |
| JS | Vanilla (modulos especificos) | Sin framework; solo nav toggle, auth, contact |
| Formulario | Netlify Forms (servicio externo) | Zero backend, gratuito, independiente del hosting |
| Auth privado | Google Sheets API + Google Apps Script (servicio externo) | Gestion directa por Alfonso, sin admin panel. Apps Script automatiza envio de contrasenas por email |
| Retencion | Substack (embed widget) | Sin newsletter propia; Substack gestiona suscriptores |
| Analitica | Google Analytics 4 (GA4) | Medicion de conversion, flujos clave, comportamiento |
| Hosting | Hostalia (hosting estatico, FTP/SFTP) | Deploy manual de `/dist`. Servicios externos no dependen del hosting |
| Build output | Carpeta `/dist` | HTML/CSS/JS optimizados listos para subida directa |

### 9.2 Fuera de alcance

- CMS o generador de sitios estaticos
- Framework JavaScript (React, Vue, etc.)
- Base de datos propia
- Backend propio (servidor, API, etc.)
- Admin panel para gestion de contrasenas (Google Sheets es el panel)
- Busqueda full-text (aplazado a Vision)
- Newsletter propia (Substack widget cubre retencion basica; integracion avanzada aplazada a Vision)
- Dark mode (aplazado a Vision)

---

## 10. Trazabilidad

Mapa de trazabilidad entre user journeys, ejes estrategicos, requisitos funcionales, NFRs y criterios de exito:

| User Journey | Eje Estrategico | Fase | Flujo | Requisitos Funcionales | NFRs | Criterio de Exito |
|--------------|----------------|------|-------|----------------------|------|-------------------|
| UJ 5.1 — VP evalua candidatura | Conversion de Alto Nivel | MVP | Home → About Me → Portfolio Privado → Contacto | FR-HOME-01..06, FR-FOOTER-01..04, FR-ABOUT-01..05, FR-AUTH-01..09, FR-PORT-01..05, FR-CONTACT-01..04, FR-CF-01..02 | NFR-PERF-01..08, NFR-SEC-03..04, NFR-A11Y-08..09, NFR-VIS-01..05 | Conversion portfolio privado > 70% |
| UJ 5.2 — Director audita sistema | Credibilidad Tecnica | Fase 2 | Home → About Me → Design System → Contacto | FR-ABOUT-08, FR-DS-04..05, FR-CONTACT-01..04 | NFR-MAINT-01..02, NFR-A11Y-01, NFR-VIS-01..05 | Visitas a design.morcuende.info >= 10/mes |
| UJ 5.3 — Headhunter escanea perfil | Conversion de Alto Nivel | MVP | Home → About Me → CV | FR-HOME-01..06, FR-FOOTER-01..04, FR-ABOUT-01..06..07, FR-CF-04, FR-NAV-01 | NFR-PERF-01..02, NFR-VIS-05 | CV en < 3 clicks, escaneo < 30s |
| UJ 5.4 — Disenador consume contenido | Ecosistema de Pensamiento | MVP | Articulo → Editorial → Substack | FR-EDIT-01..04..06, FR-HOME-02..03..06, FR-FOOTER-03, FR-SUB-01..03, FR-CF-03 | NFR-A11Y-01..08, NFR-PERF-01..08, NFR-MAINT-05, NFR-VIS-01..05 | Scroll depth > 60%, suscripciones Substack >= 5/mes |
| Transversal — Content-First | Los 3 ejes | MVP | Todas las paginas MVP | FR-CF-01..04 | NFR-MAINT-05 | 100% paginas MVP con contenido real al lanzamiento |
| Transversal — Calidad Visual | Credibilidad Tecnica | MVP | Todas las paginas | FR-HOME-04 | NFR-A11Y-08, NFR-VIS-01..05 | Tono "revista digital de alta gama" verificado en review visual |
| Transversal — Rendimiento | Los 3 ejes | MVP | Todas las paginas | — | NFR-PERF-01..08 | Lighthouse Performance 90-100, Core Web Vitals en zona verde |
| Transversal — SEO y Analitica | Los 3 ejes | MVP | Todas las paginas | FR-SEO-01..05, FR-GA-01..03 | NFR-PERF-01..08 | Lighthouse SEO 90-100, GA4 operativo con objetivos configurados |
| Transversal — Legal y Cumplimiento | Los 3 ejes | MVP | Todas las paginas (footer) | FR-LEGAL-01..06 | NFR-SEC-01..02 | Aviso Legal, Privacidad y CC BY publicados y accesibles |
| Transversal — Hosting y Deploy | Los 3 ejes | MVP | Todas las paginas | — | NFR-HOST-01..05 | Deploy funcional en Hostalia via FTP/SFTP, servicios externos operativos |

---

## Apendice A — Glosario

| Termino | Definicion |
|---------|-----------|
| **Design Tokens** | Valores de diseno (colores, espaciado, tipografia) en formato JSON (W3C DTCG) que alimentan tanto Figma como SCSS |
| **Token Engine** | Script Node.js que transforma tokens JSON en variables SCSS |
| **ITCSS** | Inverted Triangle CSS — metodologia de organizacion SCSS por especificidad creciente |
| **Atomic BEM Hibrido** | Sistema de nombrado que combina Atomic Design (atom/molecule/organism) con BEM (block__element--modifier) |
| **Storybook** | Herramienta de desarrollo y documentacion de componentes UI aislados |
| **Tokens Studio** | Plugin de Figma para gestionar Design Tokens con sincronizacion bidireccional con codigo |
| **Living Style Guide** | Documentacion interactiva de componentes que refleja el estado real del codigo |
| **Google Sheets Auth** | Mecanismo de autenticacion que usa Google Sheets como base de datos de contrasenas temporales |
| **Hostalia** | Proveedor de hosting compartido donde se despliega el sitio como archivos estaticos via FTP/SFTP |
| **Technical Specs Table** | Tabla obligatoria en cada story de Storybook que documenta la anatomia tecnica: CSS property → SCSS variable → Token name |
| **SSOT** | Single Source of Truth — principio de tener una unica fuente de verdad para cada tipo de dato |
