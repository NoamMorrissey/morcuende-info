---
project_name: 'ThisIsDesignClaude'
user_name: 'Alfonsomorcuende'
date: '2026-02-17'
sections_completed: ['technology_stack', 'architecture', 'implementation_rules', 'patterns', 'tokens']
existing_patterns_found: 18
---

# Contexto del Proyecto para Agentes IA

_Este fichero contiene las reglas críticas y patrones que los agentes IA deben seguir al implementar código en este proyecto. Se centra en detalles no obvios que los LLMs necesitan recordar._

---

## Stack Tecnológico y Versiones

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Sass (Dart Sass) | ^1.93.3 | Compilador SCSS → CSS |
| modern-normalize | ^3.0.1 | Normalización CSS |
| Node.js | v22+ | Token Engine (build.js) |
| Google Fonts | - | Public Sans (400-900), Noto Serif (400,700+italic) |
| Material Icons | - | Iconografía |

**Sin frameworks JS.** Proyecto estático HTML/SCSS con sistema de diseño propio.

---

## Arquitectura del Proyecto

### ITCSS (Inverted Triangle CSS) — 4 Capas

```
scss/
├── 1-settings/        ← GENERADO por Token Engine (NO editar manualmente)
│   ├── _options.scss           ← tokens/options.json
│   ├── _opt-colors.scss        ← tokens/colors.json
│   ├── _opt-breakpoints.scss   ← tokens/breakpoints.json
│   └── _opt-typography.scss    ← tokens/typography.json
├── 2-tools/           ← Mixins y funciones
│   ├── _mixins.scss            ← bp(), apply-style(), text-style(), generate-typography-classes()
│   └── _functions.scss         ← to-rem()
├── 3-generic/         ← Reset y estilos base
│   ├── _normalize.scss
│   └── _base.scss
└── 4-components/      ← Atomic Design
    ├── _utilities.scss
    ├── _grid.scss
    ├── atoms/          ← 5 átomos (button, link, logo, lang, pill-card)
    ├── molecules/      ← 3 moléculas (link-nav, logo-nav, card)
    └── organisms/      ← 1 organismo (nav)
```

### Token Engine (Fuente de Verdad)

```
tokens/*.json  →  node token-engine/build.js  →  scss/1-settings/*.scss
```

- Formato: **W3C DTCG** (`$value`, `$type`, referencias `{category.path}`)
- Los ficheros en `scss/1-settings/` están GENERADOS — toda edición debe hacerse en `tokens/*.json`
- Ejecutar `npm run tokens` para regenerar

---

## Reglas Críticas de Implementación

### 1. NUNCA editar scss/1-settings/ directamente
Los 4 ficheros de settings se generan desde `tokens/*.json`. Cualquier cambio manual se pierde al ejecutar `npm run tokens`.

### 2. Aliases de Import obligatorios
Todos los componentes SCSS DEBEN usar estos aliases exactos:

```scss
@use 'sass:map';
@use '../../2-tools/functions'       as mapFun;
@use '../../2-tools/mixins'          as mix;
@use '../../1-settings/options'      as mapOpt;
@use '../../1-settings/opt-colors'   as mapCol;
@use '../../1-settings/opt-typography' as mapTyp;
```

**NO usar:** `func`, `colorMap`, `typoMap`, `break` — estos son aliases legacy ya migrados.

### 3. Breakpoints siempre con mixin bp()
**CORRECTO:**
```scss
@include mix.bp('tablet') { ... }
```
**INCORRECTO:**
```scss
@media (min-width: map.get(mapBre.$opt-breakpoints, tablet)) { ... }
```
Breakpoints válidos: `mobile`, `tablet`, `laptop`, `desktop`, `wide`

### 4. Valores siempre desde tokens
**CORRECTO:**
```scss
padding: map.get(mapOpt.$opt-dimensions, 80);
color: map.get(mapCol.$opt-colors, 'primary', '500');
z-index: map.get(mapOpt.$opt-elevation, sticky);
```
**INCORRECTO:**
```scss
padding: 16px;
color: #E53935;
z-index: 1100;
```

### 5. Conversión px→rem con to-rem()
Aplicar `mapFun.to-rem()` a `font-size` y `line-height` siempre:
```scss
font-size: mapFun.to-rem(map.get($style, 'font-size'));
```

### 6. Patrón de tipografía responsive
Cada componente con texto define un `$style-key` y accede a los 4 mapas de breakpoint:
```scss
$style-key: 'headlines-regular-h6';

// Base (mobile)
$mobile-style: map.get(mapTyp.$typography-mobile-styles, $style-key);
font-family: map.get($mobile-style, 'font-family');
font-size: mapFun.to-rem(map.get($mobile-style, 'font-size'));

// Tablet
@include mix.bp('tablet') {
    $tablet-style: map.get(mapTyp.$typography-tablet-styles, $style-key);
    font-size: mapFun.to-rem(map.get($tablet-style, 'font-size'));
}
// ... laptop, desktop
```

### 7. Mobile-first obligatorio
Los estilos base son SIEMPRE mobile. Los breakpoints amplían progresivamente.

### 8. Nomenclatura de componentes
- Ficheros: `_[tipo]-[nombre].scss` (ej: `_atom-button-nav.scss`)
- Clases CSS: `.[tipo]-[nombre]` o BEM (ej: `.atom-link-nav`, `.btn--nav`, `.organism-nav.is-open`)
- Prefijos: `atom-`, `molecule-`, `organism-`

### 9. Estructura de fichero de componente SCSS
```scss
// -----------------------------------------------------------
// DEPENDENCIAS
// -----------------------------------------------------------
@use 'sass:map';
@use '../../2-tools/functions' as mapFun;
@use '../../2-tools/mixins' as mix;
// ... más imports

// -----------------------------------------------------------
// ESTILO BASE
// -----------------------------------------------------------
$style-key: 'button-s';

// -----------------------------------------------------------
// COMPONENTE [TIPO] [NOMBRE]
// -----------------------------------------------------------
.componente {
    // Estilos texto (mobile)
    // Estilos visuales (mobile)
    // Estilos interacción (mobile)

    // --- TABLET ---
    @include mix.bp('tablet') { ... }
    // --- LAPTOP ---
    @include mix.bp('laptop') { ... }
    // --- DESKTOP ---
    @include mix.bp('desktop') { ... }

    // -----------------------------------------------------------
    // ESTADOS
    // -----------------------------------------------------------
    &:hover { ... }
    &:active { ... }
}
```

---

## Pipeline de Build

```bash
npm run tokens    # Regenera SCSS desde tokens JSON
npm run sass      # Watch mode (desarrollo)
npm run build     # tokens + compilación SCSS (producción)
```

**Output:** `css/styles.css` + `css/styles.css.map`

---

## Escala de Dimensiones (Referencia Rápida)

Las claves de `$opt-dimensions` NO son los valores en px. Son escalas abstractas:

| Clave | Valor | Clave | Valor |
|-------|-------|-------|-------|
| 0 | 0px | 100 | 20px |
| 10 | 1px | 120 | 24px |
| 20 | 2px | 150 | 30px |
| 30 | 4px | 160 | 32px |
| 40 | 6px | 200 | 40px |
| 50 | 8px | 250 | 50px |
| 60 | 12px | 270 | 64px |
| 70 | 14px | 290 | 80px |
| 80 | 16px | 320 | 100px |
| 90 | 18px | 380 | 256px |

---

## Tokens de Elevación (z-index)

| Token | Valor | Uso |
|-------|-------|-----|
| hide | -1 | Ocultar |
| base | 0 | Default |
| dropdown | 1000 | Menús desplegables |
| sticky | 1100 | Elementos sticky/fixed |
| overlay | 1300 | Overlays |
| modal | 1400 | Modales |
| popover | 1500 | Popovers |
| toast | 1700 | Notificaciones |
| tooltip | 1800 | Tooltips |
| max | 1000000000 | Máxima prioridad |
