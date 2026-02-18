# Arquitectura del Proyecto — morcuende.info

> **Rol:** @Architect
> **Fecha:** 2026-02-17
> **Version:** 1.6
> **Referencia:** [docs/brief.md](brief.md)
> **Changelog:** v1.6 — Exportacion de Codigo HTML (source panel, Copy HTML, Snippet HTML, directriz Story-First)
> **Changelog:** v1.5 — Documentacion de Anatomia y Medicion (addon-measure, addon-outline, grid 4px)
> **Changelog:** v1.4 — Responsive Strategy con 5 breakpoints oficiales, viewports Storybook sincronizados
> **Changelog:** v1.3 — Visual Regression Testing con Playwright + reg-cli
> **Changelog:** v1.2 — Normativa de Documentacion de Componentes, configuracion Storybook 10
> **Changelog:** v1.1 — Sistema de nombrado Atomic BEM Hibrido, overrides via tokens, reestructuracion SCSS

---

## 1. Principios Arquitectonicos

1. **Token-First:** Todo valor visual (color, espaciado, tipografia, motion) proviene de Design Tokens. Cero hardcoded.
2. **SSOT (Single Source of Truth):** `/docs` para decisiones, `tokens/*.json` para valores de diseno, SCSS generado es derivado.
3. **Plan Before Code:** No se implementa sin brief y architecture aprobados.
4. **Mobile-First:** Base CSS es mobile, breakpoints amplian progresivamente.
5. **Component-Driven:** Figma → Storybook → HTML. Los componentes se validan aislados antes de integrar.
6. **Atomic BEM Hibrido:** Nomenclatura `[layer]-[block]--[modifier]` con distincion global/contextual y overrides via tokens.

---

## 1.1 Responsive Strategy — Breakpoints Oficiales

### Fuente de verdad

Los breakpoints del proyecto estan definidos en `tokens/breakpoints.json` (W3C DTCG) y son la unica fuente de verdad para SCSS, Storybook y Visual Regression Testing:

| Token | Nombre | Ancho | Columnas | Gutters | Uso |
|-------|--------|-------|----------|---------|-----|
| `opt.breakpoints.mobile` | Mobile | 480px | 2 | 16px | Base mobile-first, smartphones |
| `opt.breakpoints.tablet` | Tablet | 768px | 8 | 8px | Tablets verticales, smartphones horizontales |
| `opt.breakpoints.laptop` | Laptop | 1024px | 12 | 24px | Tablets horizontales, laptops pequenos |
| `opt.breakpoints.desktop` | Desktop | 1366px | 16 | 12px | Laptops, monitores estandar |
| `opt.breakpoints.wide` | Wide | 1920px | 16 | 12px | Monitores grandes, pantallas Full HD+ |

### Estrategia Mobile-First

El CSS base aplica a **todos los anchos** (mobile). Los breakpoints amplian progresivamente:

```scss
// Base: mobile (< 480px y 480px+)
.atom-link-nav {
    padding: map.get(mapOpt.$opt-dimensions, 80);
}

// Tablet: 768px+
@include mix.bp('tablet') {
    .atom-link-nav { padding: map.get(mapOpt.$opt-dimensions, 60); }
}

// Laptop: 1024px+
@include mix.bp('laptop') { ... }

// Desktop: 1366px+
@include mix.bp('desktop') { ... }

// Wide: 1920px+
@include mix.bp('wide') { ... }
```

### Viewports en Storybook

Los viewports en `.storybook/preview.js` coinciden exactamente con los tokens. Ademas incluyen viewports **edge-case** (1px antes de cada salto) para verificar el comportamiento justo antes de un breakpoint:

| Viewport Storybook | Ancho | Proposito |
|---------------------|-------|-----------|
| Mobile (Token) | 480px | Breakpoint oficial |
| Pre-Tablet | 767px | Justo antes del salto a tablet |
| Tablet (Token) | 768px | Breakpoint oficial |
| Pre-Laptop | 1023px | Justo antes del salto a laptop |
| Laptop (Token) | 1024px | Breakpoint oficial |
| Pre-Desktop | 1365px | Justo antes del salto a desktop |
| Desktop (Token) | 1366px | Breakpoint oficial |
| Pre-Wide | 1919px | Justo antes del salto a wide |
| Wide (Token) | 1920px | Breakpoint oficial |

**Default viewport:** Mobile (480px) — todo componente se visualiza inicialmente en mobile.

### Vinculacion con Visual Regression Testing

Los 5 breakpoints oficiales son los viewports obligatorios para las pruebas de regresion visual (seccion 12). El script `scripts/screenshot.js` captura cada story en los 5 viewports x 2 temas = **10 capturas por story**.

Los viewports edge-case (pre-*) son para uso manual en Storybook durante el desarrollo. Permiten verificar como el contenido editorial (articulos, entrevistas) se adapta justo antes y justo despues de cada salto de breakpoint.

---

## 2. Sistema de Nombrado — Atomic BEM Hibrido

### 2.1 Sintaxis

```
[layer]-[block]--[modifier]       → Bloque con modificador
[layer]-[block]__[element]        → Elemento interno de un bloque
[layer]-[block]__[element]--[mod] → Elemento interno con modificador
```

| Fragmento | Descripcion | Ejemplo |
|-----------|-------------|---------|
| `layer` | Capa atomica: `atom`, `molecule`, `organism` | `atom-` |
| `block` | Nombre semantico del componente | `link`, `button`, `card`, `nav` |
| `--modifier` | Variante del bloque (doble guion estricto) | `--body`, `--small`, `--primary` |
| `__element` | Parte interna de un bloque compuesto | `__image`, `__content`, `__title` |
| `.is-[state]` | Estado dinamico (controlado por JS) | `.is-open`, `.is-hidden`, `.is-active` |

**Regla de encadenamiento:** Los modificadores se encadenan: `atom-link--body--small` (link de tipo body en variante small).

### 2.2 Global vs Contextual

El sistema distingue dos tipos de componentes:

| Tipo | Proporcion | Criterio | Archivo SCSS | Ejemplo de clase |
|------|-----------|----------|-------------|-----------------|
| **Global** | ~80% | Reutilizable en cualquier contexto | `atoms/global/` | `.atom-link--body`, `.atom-button--primary` |
| **Contextual** | ~20% | Rol unico en un contexto especifico | `atoms/contextual/` | `.atom-link-nav`, `.atom-logo-nav` |

**Regla de decision:**
- Si el componente se usa en 2+ organismos → **Global**
- Si el componente existe SOLO para un organismo concreto → **Contextual**
- En caso de duda → **Global** (siempre se puede restringir despues, nunca al reves)

### 2.3 Inventario de componentes actuales

Clasificacion del codigo existente bajo el nuevo sistema:

| Componente actual | Clasificacion | Clase CSS | Archivo SCSS |
|-------------------|--------------|-----------|-------------|
| `.btn` | Global | `.atom-button--nav`, `.atom-button--primary` | `_atom-button.scss` |
| `.atom-link-nav` | Contextual | `.atom-link-nav` (sin cambio) | `_atom-link-nav.scss` |
| `.atom-logo-nav` | Contextual | `.atom-logo-nav` (sin cambio) | `_atom-logo-nav.scss` |
| `.atom-lang-nav` | Contextual | `.atom-lang-nav` (sin cambio) | `_atom-lang-nav.scss` |
| `.atom-pill-card` | Contextual | `.atom-pill-card--base`, `.atom-pill-card--hover` | `_atom-pill-card.scss` |
| `.molecule-card` | Global | `.molecule-card` | `_molecule-card.scss` |
| `.molecule-link-nav` | Contextual | `.molecule-link-nav` (sin cambio) | `_molecule-link-nav.scss` |
| `.molecule-logo-nav` | Contextual | `.molecule-logo-nav` (sin cambio) | `_molecule-logo-nav.scss` |
| `.organism-nav` | Contextual | `.organism-nav` (sin cambio) | `_organism-nav.scss` |

**Nuevos componentes previstos (global):**

| Componente | Tipo | Clase CSS |
|-----------|------|-----------|
| Link de cuerpo | Global | `.atom-link--body` |
| Link de cuerpo pequeno | Global | `.atom-link--body--small` |
| Heading | Global | `.atom-heading--h1` ... `--h6` |
| Tag/Badge | Global | `.atom-tag--default`, `.atom-tag--active` |
| Input | Global | `.atom-input--text`, `.atom-input--textarea` |
| Card editorial | Global | `.molecule-card-editorial` |
| Card proyecto | Global | `.molecule-card-project` |
| Footer | Global | `.organism-footer` |
| Hero | Global | `.organism-hero` |
| Article layout | Global | `.organism-article` |
| Contact form | Global | `.organism-contact-form` |

### 2.4 Elementos internos (`__element`)

Los bloques compuestos (moleculas y organismos) usan `__element` para sus partes internas:

```scss
// Molecula card con elementos internos
.molecule-card {
    // Bloque raiz

    &__link {                    // .molecule-card__link
        text-decoration: none;
        color: inherit;
        display: block;
    }

    &__image {                   // .molecule-card__image
        width: 100%;
        aspect-ratio: map.get(mapOpt.$opt-ratio, landscape-md);
        object-fit: cover;
        border-radius: map.get(mapOpt.$opt-radius, 40);
    }

    &__content {                 // .molecule-card__content
        padding: map.get(mapOpt.$opt-dimensions, 80);
    }

    &__title {                   // .molecule-card__title
        @include mix.text-style('headlines-regular-h5');
    }

    &__description {             // .molecule-card__description
        @include mix.text-style('body-regular');
    }
}
```

**Regla:** Un `__element` NUNCA existe fuera de su bloque padre. Si necesita ser independiente, es un atomo propio.

### 2.5 Logica de Overrides via Tokens

**Principio fundamental:** No se crea un atomo nuevo si el cambio es solo de color, espaciado o tipografia. El organismo hace override del atomo global usando tokens.

```scss
// === INCORRECTO: crear un atomo nuevo para cada contexto ===
// .atom-link-footer { color: neutral-100; }  // NO

// === CORRECTO: override via contexto del organismo ===
.organism-footer {
    .atom-link--body {
        color: map.get(mapCol.$opt-colors, 'neutral', '100');

        &:hover {
            color: map.get(mapCol.$opt-colors, 'primary', '300');
        }
    }
}
```

**Jerarquia de override:**

```
1. Atomo global define estilos base        → .atom-link--body { color: neutral-900; }
2. Organismo overridea via anidado         → .organism-footer .atom-link--body { color: neutral-100; }
3. Modificador del atomo para variantes    → .atom-link--body--small { font-size: ... }
4. Estado dinamico (JS)                    → .atom-link--body.is-active { ... }
```

**Cuando SI crear un componente contextual:**
- Layout completamente diferente (no solo color/spacing)
- Estructura HTML distinta
- Comportamiento JS propio
- Ejemplo valido: `.atom-link-nav` tiene layout, padding y estados especificos de navegacion que no aplican a ningun otro contexto

### 2.6 Arbol de decision para nombrar un componente

```
Nuevo componente?
    │
    ├─ Se usa en 2+ organismos? → GLOBAL
    │   └─ Nombre: atom-[semantica]--[variante]
    │      Carpeta: atoms/global/
    │
    └─ Solo vive dentro de 1 organismo?
        │
        ├─ Es solo cambio de color/spacing? → OVERRIDE en el organismo
        │   └─ No crear archivo nuevo
        │
        └─ Layout/estructura/JS propios? → CONTEXTUAL
            └─ Nombre: atom-[semantica]-[contexto]
               Carpeta: atoms/contextual/
```

---

## 3. Estructura de Carpetas

```
morcuende-info/
│
├── docs/                              ← SSOT del proyecto
│   ├── brief.md                       ← Requisitos y decisiones (v1.0)
│   └── architecture.md                ← Este documento (v1.1)
│
├── tokens/                            ← Fuente de verdad: Design Tokens (W3C DTCG)
│   ├── options.json                   ← Dimensiones, motion, radius, elevation, font base
│   ├── colors.json                    ← Paleta de colores + opacidad
│   ├── breakpoints.json               ← Breakpoints, columns, gutters
│   └── typography.json                ← Estilos tipograficos responsive (4 breakpoints)
│
├── token-engine/                      ← Generador JSON → SCSS
│   └── build.js                       ← Node.js script (npm run tokens)
│
├── scss/                              ← ITCSS (Inverted Triangle CSS)
│   ├── 1-settings/                    ← GENERADOS por Token Engine (NO editar)
│   │   ├── _options.scss
│   │   ├── _opt-colors.scss
│   │   ├── _opt-breakpoints.scss
│   │   └── _opt-typography.scss
│   │
│   ├── 2-tools/                       ← Mixins y funciones
│   │   ├── _functions.scss            ← to-rem()
│   │   └── _mixins.scss               ← bp(), apply-style(), text-style()
│   │
│   ├── 3-generic/                     ← Reset y estilos base
│   │   ├── _normalize.scss
│   │   └── _base.scss
│   │
│   ├── 4-components/                  ← Atomic BEM Hibrido
│   │   ├── _utilities.scss
│   │   ├── _grid.scss
│   │   │
│   │   ├── atoms/
│   │   │   ├── global/                ← Reutilizables en cualquier contexto (~80%)
│   │   │   │   ├── _atom-button.scss        ← .atom-button, --nav, --primary
│   │   │   │   ├── _atom-link.scss          ← NUEVO: .atom-link--body, --body--small
│   │   │   │   ├── _atom-heading.scss       ← NUEVO: .atom-heading--h1 a --h6
│   │   │   │   ├── _atom-tag.scss           ← NUEVO: .atom-tag--default, --active
│   │   │   │   ├── _atom-input.scss         ← NUEVO: .atom-input--text, --textarea
│   │   │   │   └── (nuevos atomos globales)
│   │   │   │
│   │   │   └── contextual/           ← Roles unicos en un contexto especifico (~20%)
│   │   │       ├── _atom-link-nav.scss      ← .atom-link-nav (navegacion primaria)
│   │   │       ├── _atom-logo-nav.scss      ← .atom-logo-nav
│   │   │       ├── _atom-lang-nav.scss      ← .atom-lang-nav
│   │   │       ├── _atom-pill-card.scss     ← .atom-pill-card--base, --hover
│   │   │       └── (nuevos atomos contextuales)
│   │   │
│   │   ├── molecules/
│   │   │   ├── global/                ← Moleculas reutilizables
│   │   │   │   ├── _molecule-card.scss           ← .molecule-card, __link, __image, __content
│   │   │   │   ├── _molecule-card-editorial.scss ← NUEVO: .molecule-card-editorial
│   │   │   │   ├── _molecule-card-project.scss   ← NUEVO: .molecule-card-project
│   │   │   │   └── (nuevas moleculas globales)
│   │   │   │
│   │   │   └── contextual/           ← Moleculas de contexto unico
│   │   │       ├── _molecule-link-nav.scss  ← .molecule-link-nav
│   │   │       ├── _molecule-logo-nav.scss  ← .molecule-logo-nav
│   │   │       └── (nuevas moleculas contextuales)
│   │   │
│   │   └── organisms/
│   │       ├── global/                ← Organismos reutilizables
│   │       │   ├── _organism-footer.scss    ← NUEVO: .organism-footer
│   │       │   ├── _organism-hero.scss      ← NUEVO: .organism-hero
│   │       │   ├── _organism-article.scss   ← NUEVO: .organism-article
│   │       │   ├── _organism-contact-form.scss ← NUEVO: .organism-contact-form
│   │       │   └── (nuevos organismos globales)
│   │       │
│   │       └── contextual/           ← Organismos de contexto unico
│   │           ├── _organism-nav.scss       ← .organism-nav (navegacion primaria)
│   │           └── (nuevos organismos contextuales)
│   │
│   └── styles.scss                    ← Punto de entrada SCSS
│
├── css/                               ← Output compilado
│   ├── styles.css
│   └── styles.css.map
│
├── assets/                            ← Recursos estaticos
│   ├── fonts/
│   │   ├── Public_Sans/
│   │   └── Noto_Serif/
│   ├── images/
│   │   ├── flags/
│   │   ├── web_images/
│   │   └── portfolio/                 ← Imagenes de casos y proyectos
│   └── js/                            ← JavaScript del sitio
│       ├── main.js                    ← Nav toggle (existente)
│       ├── auth.js                    ← Google Sheets Auth
│       └── contact.js                 ← Validacion formulario
│
├── components/                        ← Fragmentos HTML de referencia
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
│
├── .storybook/                        ← Configuracion Storybook
│   ├── main.js
│   ├── preview.js                     ← Carga SCSS/tokens en preview
│   └── manager.js
│
├── stories/                           ← Stories de Storybook (ver seccion 7)
│   ├── atoms/
│   │   ├── global/
│   │   └── contextual/
│   ├── molecules/
│   │   ├── global/
│   │   └── contextual/
│   ├── organisms/
│   │   ├── global/
│   │   └── contextual/
│   └── pages/
│
├── es/                                ← Contenido en espanol
│   ├── index.html                     ← Home ES (landing)
│   ├── articulos/
│   │   ├── index.html                 ← Listado
│   │   └── {slug}/index.html          ← Articulo individual
│   ├── entrevistas/
│   │   ├── index.html
│   │   └── {slug}/index.html
│   ├── podcast/
│   │   ├── index.html
│   │   └── {slug}/index.html
│   ├── sobre-mi/
│   │   ├── index.html                 ← Overview
│   │   ├── casos/
│   │   │   ├── index.html             ← Listado casos publicos
│   │   │   └── {slug}/index.html
│   │   ├── proyectos/index.html       ← Side Projects
│   │   ├── charlas/index.html         ← Talks
│   │   ├── cv/index.html              ← Resume
│   │   └── design-system/index.html   ← Link a Storybook
│   ├── portfolio-privado/
│   │   ├── index.html                 ← Login + gate
│   │   └── {slug}/index.html          ← Caso privado (protegido)
│   └── contacto/index.html
│
├── en/                                ← Contenido en ingles (espejo de /es/)
│   ├── index.html
│   ├── articles/
│   ├── interviews/
│   ├── podcast/
│   ├── about-me/
│   │   ├── index.html
│   │   ├── cases/
│   │   ├── projects/
│   │   ├── talks/
│   │   ├── resume/
│   │   └── design-system/
│   ├── private-portfolio/
│   └── contact/
│
├── index.html                         ← Redirect raiz → /es/ (o deteccion idioma)
├── package.json
├── .gitignore
├── CLAUDE.md                          ← Instrucciones para agentes IA
└── _bmad-output/                      ← Artefactos BMAD
    ├── project-context.md
    ├── planning-artifacts/
    └── implementation-artifacts/
```

---

## 4. Convenciones de Nombrado

### 4.1 Archivos SCSS

| Tipo | Patron de archivo | Carpeta | Ejemplo |
|------|-------------------|---------|---------|
| Atomo global | `_atom-[block].scss` | `atoms/global/` | `_atom-button.scss` |
| Atomo contextual | `_atom-[block]-[context].scss` | `atoms/contextual/` | `_atom-link-nav.scss` |
| Molecula global | `_molecule-[block].scss` | `molecules/global/` | `_molecule-card.scss` |
| Molecula contextual | `_molecule-[block]-[context].scss` | `molecules/contextual/` | `_molecule-link-nav.scss` |
| Organismo global | `_organism-[block].scss` | `organisms/global/` | `_organism-footer.scss` |
| Organismo contextual | `_organism-[block]-[context].scss` | `organisms/contextual/` | `_organism-nav.scss` |

### 4.2 Clases CSS — Tabla completa de patrones

```
BLOQUES
  .atom-button                    → Atomo base
  .atom-button--nav               → Atomo con modificador
  .atom-link--body--small         → Atomo con modificadores encadenados

ELEMENTOS
  .molecule-card__image           → Elemento interno de molecula
  .molecule-card__title           → Elemento interno de molecula
  .organism-nav__toggle           → Elemento interno de organismo

ELEMENTOS CON MODIFICADOR
  .molecule-card__image--rounded  → Elemento con modificador

CONTEXTUALES
  .atom-link-nav                  → Atomo contextual (navegacion)
  .atom-pill-card--base           → Atomo contextual con modificador
  .molecule-link-nav              → Molecula contextual

ESTADOS (via JS)
  .is-open                        → Estado abierto
  .is-hidden                      → Estado oculto
  .is-active                      → Estado activo
  .is-loading                     → Estado de carga
  .is-disabled                    → Estado deshabilitado (visual)
```

### 4.3 Reglas estrictas de nombrado

1. **Solo kebab-case:** `atom-link--body`, nunca `atom-linkBody` ni `atom_link_body`
2. **Modificador = doble guion:** `--modifier`, nunca `-modifier` ni `_modifier`
3. **Elemento = doble guion bajo:** `__element`, nunca `-element`
4. **Layer obligatorio:** Toda clase de componente empieza por `atom-`, `molecule-` u `organism-`
5. **Excepcion historica:** `.btn` (atomo button actual) migrara a `.atom-button` cuando se refactorice; mientras tanto conviven
6. **Estados separados:** Los estados `.is-*` son clases independientes, nunca BEM modifiers

### 4.4 Archivos HTML

- Paginas: `{seccion}/index.html` (clean URLs)
- Slugs: kebab-case (`mi-articulo-sobre-diseno`)
- Bilingue: misma estructura pero con nombres localizados (`/es/articulos/` vs `/en/articles/`)

### 4.5 Imports SCSS (estandarizado)

```scss
@use 'sass:map';
@use '../../2-tools/functions'          as mapFun;
@use '../../2-tools/mixins'             as mix;
@use '../../1-settings/options'         as mapOpt;
@use '../../1-settings/opt-colors'      as mapCol;
@use '../../1-settings/opt-typography'  as mapTyp;
```

Las rutas relativas varian segun la profundidad (`global/` y `contextual/` anaden un nivel):

```scss
// Desde atoms/global/ o atoms/contextual/
@use '../../../1-settings/options' as mapOpt;

// Desde atoms/ (nivel actual, componentes existentes antes de migrar)
@use '../../1-settings/options' as mapOpt;
```

---

## 5. Ejemplos SCSS — Patrones de referencia

### 5.1 Atomo global con modificadores

```scss
// Archivo: scss/4-components/atoms/global/_atom-link.scss

.atom-link {
    // Base compartida por todos los links
    text-decoration: none;
    cursor: pointer;
    transition: color map.get(mapOpt.$opt-movement-duration, medium)
                      map.get(mapOpt.$opt-movement-easing, in-out);

    // --body: link de cuerpo de texto
    &--body {
        @include mix.text-style('body-regular');
        color: map.get(mapCol.$opt-colors, 'primary', '500');

        &:hover {
            color: map.get(mapCol.$opt-colors, 'primary', '700');
        }

        // --body--small: variante pequena
        &--small {
            @include mix.text-style('body-small');
        }
    }

    // --cta: link call-to-action
    &--cta {
        @include mix.text-style('button-s');
        font-weight: map.get(mapOpt.$opt-font-weights, 'semi-bold');
        color: map.get(mapCol.$opt-colors, 'primary', '500');

        &:hover {
            color: map.get(mapCol.$opt-colors, 'primary', '700');
            text-decoration: underline;
        }
    }
}
```

### 5.2 Molecula global con `__element`

```scss
// Archivo: scss/4-components/molecules/global/_molecule-card-editorial.scss

.molecule-card-editorial {
    display: flex;
    flex-direction: column;
    border-radius: map.get(mapOpt.$opt-radius, 50);
    overflow: hidden;
    background: map.get(mapCol.$opt-colors, 'base', 'white');

    // Elemento: imagen
    &__image {
        width: 100%;
        aspect-ratio: map.get(mapOpt.$opt-ratio, landscape-md);
        object-fit: cover;
    }

    // Elemento: contenido
    &__content {
        padding: map.get(mapOpt.$opt-dimensions, 100);
        display: flex;
        flex-direction: column;
        gap: map.get(mapOpt.$opt-dimensions, 60);
    }

    // Elemento: titulo (tipografia via token)
    &__title {
        @include mix.text-style('headlines-regular-h5');
        color: map.get(mapCol.$opt-colors, 'neutral', '900');
    }

    // Elemento: extracto
    &__excerpt {
        @include mix.text-style('body-regular');
        color: map.get(mapCol.$opt-colors, 'neutral', '600');
    }

    // Elemento: meta (fecha, categoria)
    &__meta {
        @include mix.text-style('overline');
        color: map.get(mapCol.$opt-colors, 'neutral', '500');
        text-transform: uppercase;
    }

    // --- TABLET ---
    @include mix.bp('tablet') {
        &__content {
            padding: map.get(mapOpt.$opt-dimensions, 120);
        }
    }
}
```

### 5.3 Override de atomo global desde un organismo

```scss
// Archivo: scss/4-components/organisms/global/_organism-footer.scss

.organism-footer {
    background-color: map.get(mapCol.$opt-colors, 'neutral', '900');
    padding: map.get(mapOpt.$opt-dimensions, 200) 0;

    // Override: link global cambia de color en footer oscuro
    .atom-link--body {
        color: map.get(mapCol.$opt-colors, 'neutral', '100');

        &:hover {
            color: map.get(mapCol.$opt-colors, 'primary', '300');
        }
    }

    // Override: heading global en footer
    .atom-heading--h6 {
        color: map.get(mapCol.$opt-colors, 'base', 'white');
    }

    // Elementos propios del organismo
    &__column {
        display: flex;
        flex-direction: column;
        gap: map.get(mapOpt.$opt-dimensions, 60);
    }

    &__copyright {
        @include mix.text-style('body-small');
        color: map.get(mapCol.$opt-colors, 'neutral', '500');
        margin-top: map.get(mapOpt.$opt-dimensions, 160);
    }
}
```

### 5.4 Atomo contextual (navegacion)

```scss
// Archivo: scss/4-components/atoms/contextual/_atom-link-nav.scss
// CONTEXTUAL: layout, padding y estados especificos de la nav primaria.
// No se reutiliza fuera de organism-nav.

.atom-link-nav {
    @include mix.text-style('headlines-regular-h6');

    text-align: left;
    cursor: pointer;
    display: block;
    color: map.get(mapCol.$opt-colors, 'neutral', '900');
    border-radius: map.get(mapOpt.$opt-radius, 40);
    padding: map.get(mapOpt.$opt-dimensions, 80);
    white-space: nowrap;
    text-decoration: none;
    transition: color map.get(mapOpt.$opt-movement-duration, medium)
                      map.get(mapOpt.$opt-movement-easing, in-out);

    &:hover {
        color: map.get(mapCol.$opt-colors, 'primary', '500');
        background-color: map.get(mapCol.$opt-colors, 'base', 'white');
    }

    // Modificadores del atomo contextual
    &--active {
        background: map.get(mapCol.$opt-colors, 'neutral', '300');
    }

    &--disabled {
        cursor: not-allowed;
        color: map.get(mapCol.$opt-colors, 'neutral', '400');
        pointer-events: none;
    }

    // Responsive (breakpoints propios de la nav)
    @include mix.bp('tablet') { /* ... */ }
    @include mix.bp('laptop') { /* ... */ }
}
```

### 5.5 Patron anti — lo que NO hacer

```scss
// ❌ INCORRECTO: crear atomos duplicados por contexto visual
.atom-link-footer { ... }          // NO — usar override en .organism-footer
.atom-link-sidebar { ... }         // NO — usar override en .organism-sidebar
.atom-button-hero { ... }          // NO — usar .atom-button--primary + override

// ❌ INCORRECTO: modificador con guion simple
.atom-link-body { ... }            // NO — es .atom-link--body

// ❌ INCORRECTO: elemento sin bloque padre
.card__image { ... }               // NO — es .molecule-card__image

// ❌ INCORRECTO: estado como BEM modifier
.atom-link--active { ... }         // NO — es .atom-link.is-active (si es via JS)
                                   //       o &--active (si es CSS-only variant)

// ❌ INCORRECTO: override con !important
.organism-footer .atom-link--body {
    color: white !important;       // NO — si hay conflicto, revisar especificidad
}
```

---

## 6. Pipelines de Build

### 6.1 Pipeline actual (conservado)

```bash
npm run tokens    # tokens/*.json → scss/1-settings/*.scss
npm run sass      # Watch mode (desarrollo)
npm run build     # tokens + compilacion SCSS (produccion)
```

### 6.2 Pipeline extendido (propuesto)

```json
{
  "scripts": {
    "tokens": "node token-engine/build.js",
    "sass": "sass scss/styles.scss:css/styles.css --watch --load-path=node_modules",
    "sass:build": "sass scss/styles.scss:css/styles.css --load-path=node_modules --style=compressed",
    "build": "npm run tokens && npm run sass:build",
    "storybook": "storybook dev -p 6006",
    "storybook:build": "storybook build -o storybook-static",
    "screenshot": "node scripts/screenshot.js",
    "screenshot:baseline": "node scripts/screenshot.js --baseline",
    "screenshot:compare": "reg-cli screenshots/actual screenshots/expected screenshots/diff --report screenshots/report.html --json screenshots/report.json --matchingThreshold 0.01",
    "test:visual": "npm run screenshot && npm run screenshot:compare"
  }
}
```

### 6.3 Flujo de tokens completo

```
Figma (Tokens Studio)
        ↕ sync bidireccional
tokens/*.json (W3C DTCG)
        ↓ npm run tokens
scss/1-settings/*.scss (generados)
        ↓ npm run build
css/styles.css (produccion)
        ↓
HTML pages (es/, en/)
        +
Storybook (consume mismos tokens)
```

---

## 7. Storybook — Configuracion, Documentacion y Normativa

### 7.1 Integracion con el proyecto

- **Framework:** `@storybook/html-vite` (Storybook 10 + Vite)
- **SCSS:** Storybook consume `scss/styles.scss` completo via Vite (SCSS nativo)
- **Tokens:** Al compartir el mismo SCSS, los componentes en Storybook son identicos a produccion
- **Autodocs:** Activado globalmente — cada story genera documentacion automatica
- **Despliegue:** Subdominio `design.morcuende.info` (build estatico via `storybook build`)

### 7.2 Estructura de stories — espejo de SCSS

Las stories replican exactamente la jerarquia `global/contextual` del SCSS:

```
stories/
├── atoms/
│   ├── global/
│   │   ├── Button.stories.js          ← .atom-button + variantes --nav, --primary
│   │   ├── Link.stories.js            ← .atom-link--body, --body--small, --cta
│   │   ├── Heading.stories.js         ← .atom-heading--h1 a --h6
│   │   ├── Tag.stories.js             ← .atom-tag--default, --active
│   │   └── Input.stories.js           ← .atom-input--text, --textarea
│   │
│   └── contextual/
│       ├── LinkNav.stories.js         ← .atom-link-nav + --active, --disabled
│       ├── LogoNav.stories.js         ← .atom-logo-nav
│       ├── LangNav.stories.js         ← .atom-lang-nav
│       └── PillCard.stories.js        ← .atom-pill-card--base, --hover
│
├── molecules/
│   ├── global/
│   │   ├── Card.stories.js            ← .molecule-card + __elements
│   │   ├── CardEditorial.stories.js   ← .molecule-card-editorial + __elements
│   │   └── CardProject.stories.js     ← .molecule-card-project + __elements
│   │
│   └── contextual/
│       ├── LinkNav.stories.js         ← .molecule-link-nav
│       └── LogoNav.stories.js         ← .molecule-logo-nav
│
├── organisms/
│   ├── global/
│   │   ├── Footer.stories.js          ← .organism-footer (incluye override demos)
│   │   ├── Hero.stories.js            ← .organism-hero
│   │   ├── Article.stories.js         ← .organism-article
│   │   └── ContactForm.stories.js     ← .organism-contact-form
│   │
│   └── contextual/
│       └── Nav.stories.js             ← .organism-nav (mobile + desktop)
│
└── pages/
    ├── Home.stories.js                ← Composicion completa landing
    ├── Article.stories.js             ← Pagina de articulo
    └── Contact.stories.js             ← Pagina de contacto
```

### 7.3 Normativa de Documentacion de Componentes

Todo componente en Storybook DEBE cumplir con los siguientes estandares:

#### 7.3.1 Control de Estados Interactivos

Es **obligatorio** incluir stories para todos los estados interactivos del componente:

| Estado | Descripcion | Ejemplo de story |
|--------|-------------|-----------------|
| `default` | Estado base sin interaccion | `export const Default = () => ...` |
| `hover` | Puntero encima | Story con clase forzada o decorador |
| `active` | Click presionado | Story con estado `:active` |
| `focus` | Foco de teclado | Story con estado `:focus` |
| `disabled` | Deshabilitado | Story con atributo/clase `disabled` |
| Modificadores CSS | Variantes `--modifier` | Una story por cada modificador |
| Estados JS | `.is-open`, `.is-active`, etc. | Una story por cada estado dinamico |

**Implementacion:** Los estados pseudo (`:hover`, `:active`, `:focus`) se controlan via el parametro `pseudo` en la story:

```js
export const Hover = {
  render: () => `<a href="#" class="atom-link-nav">Link</a>`,
  parameters: { pseudo: { hover: true } },
};

export const Focus = {
  render: () => `<a href="#" class="atom-link-nav">Link</a>`,
  parameters: { pseudo: { focus: true } },
};
```

#### 7.3.2 Estructura de Autodocs

Cada story file debe incluir documentacion estructurada mediante el meta `tags: ['autodocs']` y JSDoc. La pagina de Docs autogenerada debe contener:

**A. Definicion y Uso**
```js
export default {
  title: 'Atoms/Contextual/LinkNav',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## Definicion y Uso

**Contexto de negocio:** Link de navegacion primaria del sitio. Aparece en el menu principal
tanto en mobile (vertical) como en desktop (horizontal flotante).

**Contexto de diseno:** Tipografia headlines-regular-h6 con transiciones de color suaves.
Radius redondeado, padding responsive por breakpoint.

## Composicion (Atomic BEM Hibrido)

- **Capa:** Atom
- **Tipo:** Contextual (solo vive dentro de organism-nav)
- **Clase base:** \`.atom-link-nav\`
- **Modificadores:** \`--active\`, \`--disabled\`
- **Estados JS:** Ninguno (estados son CSS-only)
- **Override:** No aplica (es contextual, no se overridea)
        `,
      },
    },
  },
};
```

**B. Tabla de Especificaciones Tecnicas**

Cada componente documentado debe incluir una tabla de mapeo **Propiedad CSS ↔ Variable SCSS ↔ Design Token** como parte de la descripcion del componente o como story dedicada:

```js
export const Specs = {
  render: () => `
    <table style="width:100%; border-collapse:collapse; font-family:monospace; font-size:13px;">
      <thead>
        <tr style="border-bottom:2px solid #333; text-align:left;">
          <th style="padding:8px;">Propiedad CSS</th>
          <th style="padding:8px;">Variable SCSS</th>
          <th style="padding:8px;">Design Token</th>
          <th style="padding:8px;">Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid #ddd;">
          <td style="padding:8px;">color</td>
          <td style="padding:8px;">mapCol.$opt-colors, 'neutral', '900'</td>
          <td style="padding:8px;">opt.colors.neutral.900</td>
          <td style="padding:8px;">#1A1A2E</td>
        </tr>
        <tr style="border-bottom:1px solid #ddd;">
          <td style="padding:8px;">border-radius</td>
          <td style="padding:8px;">mapOpt.$opt-radius, 40</td>
          <td style="padding:8px;">opt.radius.40</td>
          <td style="padding:8px;">4px</td>
        </tr>
        <tr style="border-bottom:1px solid #ddd;">
          <td style="padding:8px;">padding</td>
          <td style="padding:8px;">mapOpt.$opt-dimensions, 80</td>
          <td style="padding:8px;">opt.dimensions.80</td>
          <td style="padding:8px;">16px</td>
        </tr>
        <tr style="border-bottom:1px solid #ddd;">
          <td style="padding:8px;">transition-duration</td>
          <td style="padding:8px;">mapOpt.$opt-movement-duration, medium</td>
          <td style="padding:8px;">opt.movement.duration.medium</td>
          <td style="padding:8px;">300ms</td>
        </tr>
      </tbody>
    </table>
  `,
  parameters: {
    docs: {
      description: { story: 'Mapeo completo de propiedades CSS a Design Tokens.' },
    },
  },
};
```

#### 7.3.3 Gestion de Assets

Las rutas de imagenes en stories deben ser relativas a la carpeta `/assets/` del proyecto:

- **Configuracion Vite:** El directorio `assets/` se expone como `staticDirs` en `.storybook/main.js`
- **Rutas en stories:** Usar `/images/portfolio/...` (relativas al staticDir)
- **Placeholder:** Cuando no hay imagen real, usar `https://placehold.co/400x300` como fallback

```js
// CORRECTO: ruta relativa al staticDir configurado
export const WithImage = () => `<img src="/images/web_images/example.jpg" alt="...">`;

// INCORRECTO: ruta relativa al archivo story
export const Wrong = () => `<img src="../../assets/images/example.jpg" alt="...">`;
```

### 7.4 Convencion de stories — Resumen

Cada story file DEBE incluir:

1. **`tags: ['autodocs']`** en el meta para generar pagina de Docs automatica
2. **`description.component`** con Definicion/Uso y Composicion (Atomic BEM)
3. **Story `Default`** con el estado base del componente
4. **Stories de estados** para hover, active, focus, disabled (segun aplique)
5. **Stories de modificadores** — una por cada `--modifier`
6. **Story `Specs`** con la tabla de Especificaciones Tecnicas (CSS ↔ SCSS ↔ Token)
7. **Tabla `Anatomia Espacial`** con los tokens de padding, margin y gap por breakpoint
8. **Override demos** (solo en organismos) mostrando como afectan a atomos globales
9. **`## Snippet HTML`** con un bloque de codigo HTML listo para copiar (ver 7.5)

```js
// Ejemplo completo: stories/atoms/contextual/LinkNav.stories.js
export default {
  title: 'Atoms/Contextual/LinkNav',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '...',  // Definicion, Uso, Composicion
      },
    },
  },
};

export const Default = () => `<a href="#" class="atom-link-nav">Link</a>`;
export const Active = () => `<a href="#" class="atom-link-nav atom-link-nav--active">Link</a>`;
export const Disabled = () => `<a href="#" class="atom-link-nav atom-link-nav--disabled">Link</a>`;
export const Hover = {
  render: () => `<a href="#" class="atom-link-nav">Link</a>`,
  parameters: { pseudo: { hover: true } },
};
export const Focus = {
  render: () => `<a href="#" class="atom-link-nav">Link</a>`,
  parameters: { pseudo: { focus: true } },
};
export const Specs = { render: () => `<table>...</table>` };
```

### 7.5 Exportacion de Codigo HTML — Copy & Paste

Storybook es la **fuente de snippets HTML** del proyecto. Todo markup que se use en las paginas finales (`/es/`, `/en/`) debe provenir de las Stories.

#### 7.5.1 Panel de Codigo (Show Code)

Cada story muestra un boton **"Show code"** en la pagina de Docs que despliega el HTML renderizado. Esta configurado globalmente en `preview.js` con:

- **`docs.source.type: 'dynamic'`** — captura el HTML renderizado del componente
- **`docs.source.language: 'html'`** — syntax highlighting HTML
- **`docs.source.transform`** — limpia el wrapper del decorator pseudo-state y dedenta el codigo

El panel de codigo incluye un **boton de copia integrado** de Storybook.

#### 7.5.2 Seccion Snippet HTML

Cada story file incluye una seccion `## Snippet HTML` en `description.component` con un bloque de codigo HTML fenced (` ```html `) que muestra el markup canonico del componente. Este bloque tiene un **boton "Copy HTML"** inyectado automaticamente via `preview-head.html`.

```js
// En description.component:
component: `
## Snippet HTML

\`\`\`html
<article class="molecule-card molecule-card--bg molecule-card--rectangle-vertical">
  <a href="#" class="molecule-card--link">
    ...
  </a>
</article>
\`\`\`
`,
```

#### 7.5.3 Boton Copy HTML

El boton se inyecta automaticamente en todos los bloques `<pre><code class="language-html">` dentro de las descripciones de Docs. Implementado via `MutationObserver` en `.storybook/preview-head.html`. No afecta a los bloques de codigo nativos de Storybook (Source panel), que ya tienen su propio boton de copia.

### 7.6 Directriz Story-First — HTML de las Stories como Estandar de Implementacion

> **El HTML generado en las Stories es el Estandar de Implementacion del sitio.**

**Regla:** Cualquier cambio en el markup HTML del sitio (`/es/`, `/en/`) DEBE seguir este flujo:

```
1. Modificar la Story en Storybook
   └─ Actualizar render() con el nuevo markup

2. Validar en Storybook
   ├─ Visual: el componente se ve correctamente
   ├─ A11y: panel Accessibility sin violations criticas
   ├─ Specs: tabla tecnica actualizada
   └─ Source: "Show code" muestra HTML limpio

3. Copiar el HTML validado a las paginas finales
   └─ Usar "Copy HTML" o "Show code" → copiar al archivo .html

4. Ejecutar Visual Regression Testing
   └─ npm run test:visual
```

**Prohibiciones:**

- **NO** escribir markup directamente en paginas HTML sin tener la Story correspondiente actualizada
- **NO** divergir el HTML de produccion del HTML de la Story (la Story es la fuente de verdad)
- **NO** modificar clases CSS en paginas finales sin reflejar el cambio en la Story

**Beneficios:**

- Consistencia garantizada entre Storybook y produccion
- Documentacion siempre actualizada (el snippet ES el codigo real)
- Deteccion temprana de regresiones via visual testing
- Onboarding simplificado: nuevos desarrolladores copian de Storybook

---

## 8. Arquitectura JavaScript

El sitio es estatico sin framework JS. Se usan modulos vanilla especificos:

| Modulo | Archivo | Responsabilidad |
|--------|---------|-----------------|
| **Nav Toggle** | `assets/js/main.js` | Hamburguesa ↔ X, clase `.is-open` (existente) |
| **Auth** | `assets/js/auth.js` | Validacion contra Google Sheets API, gestion de sesion |
| **Contact** | `assets/js/contact.js` | Validacion de formulario frontend |

### 8.1 Auth — Google Sheets (detalle)

```
assets/js/auth.js
├── fetchPasswords()        ← GET Google Sheets API (o Apps Script web app)
├── validatePassword(input) ← Compara contra lista + verifica caducidad
├── grantAccess()           ← Guarda sesion en sessionStorage
├── checkAccess()           ← Verifica sesion existente al cargar pagina protegida
└── revokeAccess()          ← Limpia sesion (logout o cierre de pestana)
```

**Proteccion del contenido privado:**
- Las paginas en `/portfolio-privado/{slug}/` cargan `auth.js`
- Al abrir, `checkAccess()` verifica si hay sesion valida
- Si no hay sesion → muestra formulario de login (UI definida en SCSS)
- Si hay sesion → renderiza el contenido (oculto por defecto con CSS `display: none`, revelado por JS)
- sessionStorage expira al cerrar la pestana → acceso temporal por visita

**Consideracion de seguridad:** Este sistema ofrece proteccion contra acceso casual, no contra inspeccion del codigo fuente. Para contenido truly confidencial, el HTML protegido podria servirse desde un endpoint externo (Apps Script) solo tras validacion, en vez de estar embebido en el HTML estatico. Esta decision queda abierta para la fase de implementacion.

---

## 9. Dependencias Nuevas

| Paquete | Tipo | Uso |
|---------|------|-----|
| `storybook` | devDependency | CLI y core de Storybook v10 |
| `@storybook/html-vite` | devDependency | Framework Storybook para HTML con Vite |
| `@storybook/addon-docs` | devDependency | Paginas de documentacion (autodocs) |
| `@storybook/addon-a11y` | devDependency | Auditoria de accesibilidad automatica (axe-core) |
| `playwright` | devDependency | Automatizacion de screenshots para visual regression |
| `reg-cli` | devDependency | Comparacion visual de screenshots (diff pixel a pixel) |
| `@storybook/addon-measure` | devDependency | Herramienta de medicion de espaciado en canvas |
| `@storybook/addon-outline` | devDependency | Visualizacion de contornos de elementos (layout debug) |
| `@storybook/addon-backgrounds` | devDependency | Fondos personalizados y rejilla base (grid 4px) |

No se anaden dependencias de produccion. El sitio final sigue siendo HTML + CSS + JS vanilla.

---

## 10. Resumen de reglas — Quick Reference

| Regla | Ejemplo correcto | Ejemplo incorrecto |
|-------|------------------|--------------------|
| Modificador = `--` | `.atom-link--body` | `.atom-link-body` |
| Elemento = `__` | `.molecule-card__image` | `.molecule-card-image` |
| Encadenar mods | `.atom-link--body--small` | `.atom-link--bodySmall` |
| Override contextual | `.organism-footer .atom-link--body {}` | `.atom-link-footer {}` |
| Estados JS | `.is-open`, `.is-active` | `.atom-nav--open` |
| Layer prefix | `.atom-`, `.molecule-`, `.organism-` | `.card`, `.btn`, `.nav` |
| Archivos globales | `atoms/global/_atom-link.scss` | `atoms/_atom-link-body.scss` |
| Archivos contextuales | `atoms/contextual/_atom-link-nav.scss` | `atoms/_atom-link-nav.scss` |

---

## 11. Criterios de Aceptacion — Definition of Done

Un componente se considera **Done** cuando cumple todos los puntos siguientes:

| # | Criterio | Verificacion |
|---|----------|-------------|
| 1 | **HTML semantico** | Usa elementos nativos correctos (`<button>`, `<nav>`, `<a>`, etc.) |
| 2 | **Atributos ARIA** | Incluye `aria-label`, `role`, `aria-expanded` donde aplique |
| 3 | **Contraste WCAG AA** | Ratio minimo 4.5:1 (texto normal) / 3:1 (texto grande). Verificado en panel A11y de Storybook |
| 4 | **Sin fallos criticos a11y** | El panel Accessibility de Storybook (axe-core) muestra 0 violations de nivel "critical" y "serious" |
| 5 | **Navegacion por teclado** | El componente es accesible via Tab, Enter, Escape donde aplique |
| 6 | **Estados visibles** | :hover, :active, :focus y :focus-visible estan definidos en SCSS |
| 7 | **Documentacion completa** | Tiene autodocs con Definicion/Uso, Composicion, Tabla de Specs y Anatomia Espacial |
| 8 | **Tokens consistentes** | Todos los valores CSS provienen de Design Tokens (no hardcoded) |
| 9 | **Integridad espacial** | Padding, margin y gap verificados con Measure y Outline en Storybook (obligatorio para moleculas y organismos) |

### 11.1 Regla critica de accesibilidad

> **Ningun componente se considerara terminado (Done) si presenta fallos criticos de accesibilidad en el panel de Storybook.**

El addon `@storybook/addon-a11y` ejecuta automaticamente [axe-core](https://github.com/dequelabs/axe-core) sobre cada story. Las reglas habilitadas globalmente en `preview.js` son:

- `color-contrast` — Contraste de color WCAG AA/AAA
- `label` — Inputs con labels asociados
- `link-name` — Links con texto accesible
- `button-name` — Botones con texto accesible
- `image-alt` — Imagenes con atributo alt

Antes de marcar cualquier componente como Done, el desarrollador debe:
1. Abrir la story en Storybook
2. Revisar la pestana **Accessibility** en el panel inferior
3. Corregir todas las violations de nivel **critical** y **serious**
4. Documentar las **needs review** con justificacion si se descartan

### 11.2 Regla de integridad espacial

> **Ninguna molecula u organismo se considerara terminado (Done) sin verificar su integridad espacial usando las herramientas Measure y Outline de Storybook.**

Las herramientas de inspeccion estan disponibles en la barra superior de Storybook:

| Herramienta | Icono toolbar | Funcion |
|-------------|--------------|---------|
| **Measure** | Regla | Al hacer hover sobre cualquier elemento, muestra padding, margin y dimensiones en px. Comparar con los valores de la tabla "Anatomia Espacial" de la story |
| **Outline** | Contorno | Dibuja contornos de todos los elementos del componente. Verificar que no hay solapamientos ni desalineaciones |
| **Grid (4px)** | Rejilla | Superpone una rejilla de 4px sobre el canvas. Verificar que los bordes de los elementos caen en lineas de la rejilla |

**Proceso de verificacion para moleculas y organismos:**

1. Abrir la story en Storybook en el viewport **Mobile (Token — 480px)**
2. Activar **Outline** → verificar que no hay solapamientos ni overflow
3. Activar **Measure** → pasar el cursor sobre cada area del componente y comparar los valores de padding/margin/gap con la tabla "Anatomia Espacial"
4. Activar **Grid** → verificar que los bordes principales caen en la rejilla de 4px
5. Repetir en viewport **Desktop (Token — 1366px)** para validar el comportamiento responsive
6. Documentar cualquier desviacion justificada en la story

**Rejilla base (Grid):**

La rejilla esta configurada con `cellSize: 4` (4px), alineada con la escala de dimensiones del sistema de tokens (`opt.dimensions`). Los valores mas comunes de la escala (8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px) son multiplos de 4, lo que permite validar visualmente la alineacion.

---

## 12. Visual Regression Testing

### 12.1 Objetivo

Garantizar que los cambios en Design Tokens (`tokens/*.json`) o en SCSS no generen efectos secundarios visuales no deseados en otros componentes. Cualquier cambio en tokens requiere una ejecucion de visual testing antes de considerarse validado.

### 12.2 Stack tecnico

| Herramienta | Funcion |
|-------------|---------|
| **Playwright** (Chromium) | Captura screenshots de cada story en Storybook via `iframe.html` |
| **reg-cli** | Compara screenshots `expected/` vs `actual/` pixel a pixel, genera diff y report HTML |
| **Storybook** | Servidor de componentes aislados (debe estar corriendo en `localhost:6006`) |

### 12.3 Viewports de testing

Los viewports estan sincronizados con los 5 breakpoints oficiales de `tokens/breakpoints.json` (ver seccion 1.1):

| Nombre | Ancho | Alto | Breakpoint token |
|--------|-------|------|-----------------|
| mobile | 480px | 896px | `opt.breakpoints.mobile` |
| tablet | 768px | 1024px | `opt.breakpoints.tablet` |
| laptop | 1024px | 768px | `opt.breakpoints.laptop` |
| desktop | 1366px | 900px | `opt.breakpoints.desktop` |
| wide | 1920px | 1080px | `opt.breakpoints.wide` |

### 12.4 Modos de visualizacion

Cada story se captura en **2 temas** (light y dark) x **5 viewports** = **10 capturas por story**.

Los componentes deben ser probados en:
- **Estado de reposo** (default) — sin interaccion
- **Estados forzados** (hover, active, focus) — cuando existan stories con esos estados

### 12.5 Estructura de archivos

```
screenshots/
├── expected/        ← Baseline (screenshots de referencia aprobados)
├── actual/          ← Capturas actuales (generadas antes de comparar)
├── diff/            ← Diferencias visuales (generadas por reg-cli)
├── report.html      ← Report visual interactivo
└── report.json      ← Report en JSON (para CI)
```

El directorio `screenshots/` esta excluido de git via `.gitignore`.

### 12.6 Scripts npm

```bash
npm run screenshot           # Captura "actual" de todas las stories
npm run screenshot:baseline  # Captura "expected" (baseline de referencia)
npm run screenshot:compare   # Compara actual vs expected, genera diff + report
npm run test:visual          # Atajo: screenshot + compare en un solo comando
```

### 12.7 Flujo de trabajo

```
1. Establecer baseline
   npm run screenshot:baseline
   (captura el estado actual aprobado como referencia)

2. Hacer cambios en tokens o SCSS
   (editar tokens/*.json, ejecutar npm run tokens, modificar SCSS)

3. Capturar estado actual
   npm run screenshot
   (genera screenshots con los cambios aplicados)

4. Comparar
   npm run screenshot:compare
   (genera diff y report HTML)

5. Revisar
   Abrir screenshots/report.html
   → Si los cambios son esperados: actualizar baseline (paso 1)
   → Si hay regresiones: corregir y repetir desde paso 2
```

### 12.8 Configuracion del script (`scripts/screenshot.js`)

El script Playwright:
1. Consulta `localhost:6006/index.json` para obtener la lista de stories
2. Filtra solo entries de tipo `story` (excluye docs)
3. Para cada combinacion story × viewport × tema:
   - Crea un contexto Playwright con el viewport y `colorScheme` correspondiente
   - Navega a `iframe.html?id={storyId}&viewMode=story`
   - Espera `networkidle` + 500ms de estabilizacion
   - Captura screenshot full-page
4. Nombrado de archivos: `{storyId}__{viewport}__{theme}.png`

### 12.9 Umbral de comparacion

reg-cli usa `--matchingThreshold 0.01` (1% de tolerancia por pixel). Esto permite ignorar diferencias subpixel por antialiasing mientras detecta cambios reales de color, espaciado o layout.

### 12.10 Regla de validacion

> **Cualquier cambio en `tokens/*.json` que afecte a valores SCSS requiere una ejecucion completa de visual regression testing antes de merge.**

El desarrollador debe:
1. Ejecutar `npm run test:visual`
2. Revisar `screenshots/report.html`
3. Confirmar que las diferencias detectadas son **intencionales**
4. Actualizar el baseline si los cambios son correctos
