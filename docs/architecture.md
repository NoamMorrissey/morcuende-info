# Arquitectura del Proyecto — morcuende.info

> **Rol:** @Architect
> **Fecha:** 2026-02-17
> **Version:** 1.1
> **Referencia:** [docs/brief.md](brief.md)
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
    "storybook:build": "storybook build -o storybook-static"
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

## 7. Storybook — Configuracion y estructura Atomic BEM

### 7.1 Integracion con el proyecto

- **Framework:** HTML puro (Storybook soporta `@storybook/html`)
- **SCSS:** Storybook consumira `scss/styles.scss` completo via su webpack/vite config
- **Tokens:** Al compartir el mismo SCSS, los componentes en Storybook son identicos a produccion
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

### 7.3 Convencion de stories

Cada story debe:

1. **Titulo:** Seguir la ruta de carpetas → `title: 'Atoms/Global/Link'`
2. **Variantes como stories:** Cada `--modifier` es una story independiente
3. **Override demos:** Los organismos incluyen stories que muestran como sus overrides afectan a los atomos globales
4. **Controles:** Exponer props relevantes via Storybook Controls (estados, modificadores)

```js
// Ejemplo: stories/atoms/global/Link.stories.js
export default {
    title: 'Atoms/Global/Link',
};

export const Body = () => `<a href="#" class="atom-link--body">Link de texto</a>`;
export const BodySmall = () => `<a href="#" class="atom-link--body--small">Link pequeno</a>`;
export const CTA = () => `<a href="#" class="atom-link--cta">Call to action</a>`;
```

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

## 9. Dependencias Nuevas (propuestas)

| Paquete | Tipo | Uso |
|---------|------|-----|
| `@storybook/html` | devDependency | Framework Storybook para HTML puro |
| `@storybook/addon-essentials` | devDependency | Addons basicos (docs, controls, viewport) |
| `storybook` | devDependency | CLI de Storybook |

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
