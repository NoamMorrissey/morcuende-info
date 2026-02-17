# Arquitectura del Proyecto — morcuende.info

> **Rol:** @Architect
> **Fecha:** 2026-02-17
> **Versión:** 1.0
> **Referencia:** [docs/brief.md](brief.md)

---

## 1. Principios Arquitectónicos

1. **Token-First:** Todo valor visual (color, espaciado, tipografía, motion) proviene de Design Tokens. Cero hardcoded.
2. **SSOT (Single Source of Truth):** `/docs` para decisiones, `tokens/*.json` para valores de diseño, SCSS generado es derivado.
3. **Plan Before Code:** No se implementa sin brief y architecture aprobados.
4. **Mobile-First:** Base CSS es mobile, breakpoints amplían progresivamente.
5. **Component-Driven:** Figma → Storybook → HTML. Los componentes se validan aislados antes de integrar.

---

## 2. Estructura de Carpetas

```
morcuende-info/
│
├── docs/                              ← SSOT del proyecto
│   ├── brief.md                       ← Requisitos y decisiones (v1.0)
│   └── architecture.md                ← Este documento
│
├── tokens/                            ← Fuente de verdad: Design Tokens (W3C DTCG)
│   ├── options.json                   ← Dimensiones, motion, radius, elevation, font base
│   ├── colors.json                    ← Paleta de colores + opacidad
│   ├── breakpoints.json               ← Breakpoints, columns, gutters
│   └── typography.json                ← Estilos tipográficos responsive (4 breakpoints)
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
│   ├── 2-tools/                       ← Mixins y funciones
│   │   ├── _functions.scss            ← to-rem()
│   │   └── _mixins.scss               ← bp(), apply-style(), text-style()
│   ├── 3-generic/                     ← Reset y estilos base
│   │   ├── _normalize.scss
│   │   └── _base.scss
│   ├── 4-components/                  ← Atomic Design
│   │   ├── _utilities.scss
│   │   ├── _grid.scss
│   │   ├── atoms/
│   │   │   ├── _atom-button-nav.scss
│   │   │   ├── _atom-link-nav.scss
│   │   │   ├── _atom-logo-nav.scss
│   │   │   ├── _atom-lang-nav.scss
│   │   │   ├── _atom-pill-card.scss
│   │   │   └── (nuevos átomos aquí)
│   │   ├── molecules/
│   │   │   ├── _molecule-link-nav.scss
│   │   │   ├── _molecule-logo-nav.scss
│   │   │   ├── _molecule-card.scss
│   │   │   └── (nuevas moléculas aquí)
│   │   └── organisms/
│   │       ├── _organism-nav.scss
│   │       └── (nuevos organismos aquí)
│   └── styles.scss                    ← Punto de entrada SCSS
│
├── css/                               ← Output compilado
│   ├── styles.css
│   └── styles.css.map
│
├── assets/                            ← Recursos estáticos
│   ├── fonts/
│   │   ├── Public_Sans/
│   │   └── Noto_Serif/
│   ├── images/
│   │   ├── flags/
│   │   ├── web_images/
│   │   └── portfolio/                 ← NUEVO: imágenes de casos y proyectos
│   └── js/                            ← JavaScript del sitio
│       ├── main.js                    ← Nav toggle (existente)
│       ├── auth.js                    ← NUEVO: Google Sheets Auth
│       └── contact.js                 ← NUEVO: Validación formulario
│
├── components/                        ← Fragmentos HTML de referencia
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
│
├── .storybook/                        ← NUEVO: Configuración Storybook
│   ├── main.js
│   ├── preview.js                     ← Carga SCSS/tokens en preview
│   └── manager.js
│
├── stories/                           ← NUEVO: Stories de Storybook
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── pages/                         ← Stories de página completa
│
├── es/                                ← NUEVO: Contenido en español
│   ├── index.html                     ← Home ES (landing)
│   ├── articulos/
│   │   ├── index.html                 ← Listado
│   │   └── {slug}/index.html          ← Artículo individual
│   ├── entrevistas/
│   │   ├── index.html
│   │   └── {slug}/index.html
│   ├── podcast/
│   │   ├── index.html
│   │   └── {slug}/index.html
│   ├── sobre-mi/
│   │   ├── index.html                 ← Overview
│   │   ├── casos/
│   │   │   ├── index.html             ← Listado casos públicos
│   │   │   └── {slug}/index.html
│   │   ├── proyectos/index.html       ← Side Projects
│   │   ├── charlas/index.html         ← Talks
│   │   ├── cv/index.html              ← Resumé
│   │   └── design-system/index.html   ← Link a Storybook
│   ├── portfolio-privado/
│   │   ├── index.html                 ← Login + gate
│   │   └── {slug}/index.html          ← Caso privado (protegido)
│   └── contacto/index.html
│
├── en/                                ← NUEVO: Contenido en inglés (espejo de /es/)
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
├── index.html                         ← Redirect raíz → /es/ (o detección idioma)
├── package.json
├── .gitignore
├── CLAUDE.md                          ← Instrucciones para agentes IA
└── _bmad-output/                      ← Artefactos BMAD
    ├── project-context.md
    ├── planning-artifacts/
    └── implementation-artifacts/
```

---

## 3. Pipelines de Build

### 3.1 Pipeline actual (conservado)

```bash
npm run tokens    # tokens/*.json → scss/1-settings/*.scss
npm run sass      # Watch mode (desarrollo)
npm run build     # tokens + compilación SCSS (producción)
```

### 3.2 Pipeline extendido (propuesto)

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

### 3.3 Flujo de tokens completo

```
Figma (Tokens Studio)
        ↕ sync bidireccional
tokens/*.json (W3C DTCG)
        ↓ npm run tokens
scss/1-settings/*.scss (generados)
        ↓ npm run build
css/styles.css (producción)
        ↓
HTML pages (es/, en/)
        +
Storybook (consume mismos tokens)
```

---

## 4. Arquitectura JavaScript

El sitio es estático sin framework JS. Se usan módulos vanilla específicos:

| Módulo | Archivo | Responsabilidad |
|--------|---------|-----------------|
| **Nav Toggle** | `assets/js/main.js` | Hamburguesa ↔ X, clase `.is-open` (existente) |
| **Auth** | `assets/js/auth.js` | Validación contra Google Sheets API, gestión de sesión |
| **Contact** | `assets/js/contact.js` | Validación de formulario frontend |

### 4.1 Auth — Google Sheets (detalle)

```
assets/js/auth.js
├── fetchPasswords()        ← GET Google Sheets API (o Apps Script web app)
├── validatePassword(input) ← Compara contra lista + verifica caducidad
├── grantAccess()           ← Guarda sesión en sessionStorage
├── checkAccess()           ← Verifica sesión existente al cargar página protegida
└── revokeAccess()          ← Limpia sesión (logout o cierre de pestaña)
```

**Protección del contenido privado:**
- Las páginas en `/portfolio-privado/{slug}/` cargan `auth.js`
- Al abrir, `checkAccess()` verifica si hay sesión válida
- Si no hay sesión → muestra formulario de login (UI definida en SCSS)
- Si hay sesión → renderiza el contenido (oculto por defecto con CSS `display: none`, revelado por JS)
- sessionStorage expira al cerrar la pestaña → acceso temporal por visita

**Consideración de seguridad:** Este sistema ofrece protección contra acceso casual, no contra inspección del código fuente. Para contenido truly confidencial, el HTML protegido podría servirse desde un endpoint externo (Apps Script) solo tras validación, en vez de estar embebido en el HTML estático. Esta decisión queda abierta para la fase de implementación.

---

## 5. Storybook — Configuración

### 5.1 Integración con el proyecto

- **Framework:** HTML puro (Storybook soporta `@storybook/html`)
- **SCSS:** Storybook consumirá `scss/styles.scss` completo vía su webpack/vite config
- **Tokens:** Al compartir el mismo SCSS, los componentes en Storybook son idénticos a producción
- **Despliegue:** Subdominio `design.morcuende.info` (build estático via `storybook build`)

### 5.2 Estructura de stories

```
stories/
├── atoms/
│   ├── Button.stories.js
│   ├── Link.stories.js
│   └── PillCard.stories.js
├── molecules/
│   ├── Card.stories.js
│   ├── LinkNav.stories.js
│   └── LogoNav.stories.js
├── organisms/
│   ├── Nav.stories.js
│   └── Footer.stories.js
└── pages/
    ├── Home.stories.js
    └── Article.stories.js
```

---

## 6. Convenciones de Nombrado

### 6.1 Archivos SCSS (existente, se mantiene)

- Patrón: `_[tipo]-[nombre].scss`
- Ejemplos: `_atom-button-nav.scss`, `_molecule-card.scss`, `_organism-nav.scss`

### 6.2 Clases CSS (existente, se mantiene)

- Patrón: `.[tipo]-[nombre]` con BEM para variantes
- Prefijos: `atom-`, `molecule-`, `organism-`
- Estados: `.is-open`, `.is-hidden`, `.is-active`

### 6.3 Archivos HTML (nuevo)

- Páginas: `{seccion}/index.html` (clean URLs)
- Slugs: kebab-case (`mi-articulo-sobre-diseno`)
- Bilingüe: misma estructura pero con nombres localizados (`/es/articulos/` vs `/en/articles/`)

### 6.4 Imports SCSS (estandarizado)

```scss
@use 'sass:map';
@use '../../2-tools/functions'          as mapFun;
@use '../../2-tools/mixins'             as mix;
@use '../../1-settings/options'         as mapOpt;
@use '../../1-settings/opt-colors'      as mapCol;
@use '../../1-settings/opt-typography'  as mapTyp;
```

---

## 7. Dependencias Nuevas (propuestas)

| Paquete | Tipo | Uso |
|---------|------|-----|
| `@storybook/html` | devDependency | Framework Storybook para HTML puro |
| `@storybook/addon-essentials` | devDependency | Addons básicos (docs, controls, viewport) |
| `storybook` | devDependency | CLI de Storybook |

No se añaden dependencias de producción. El sitio final sigue siendo HTML + CSS + JS vanilla.
