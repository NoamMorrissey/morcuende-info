const specsTable = `
| Propiedad CSS | Variable SCSS | Design Token | Valor |
|---|---|---|---|
| height (mobile) | map.get($opt-dimensions, 70) | opt.dimensions.70 | 12px |
| background (tablet+) | map.get($opt-colors, 'base', 'white') | opt.colors.base.white | #FFFFFF (80% opacity) |
| border-radius (tablet+) | map.get($opt-radius, 50) | opt.radius.50 | 6px |
| z-index | map.get($opt-elevation, max) | opt.elevation.max | 1000000000 |
| hamburger width | map.get($opt-dimensions, 120) | opt.dimensions.120 | 32px |
| hamburger stroke | map.get($opt-dimensions, 20) | opt.dimensions.20 | 2px |
| hamburger gap | map.get($opt-dimensions, 50) | opt.dimensions.50 | 6px |
| transition-duration | map.get($opt-movement-duration, medium) | opt.movement.duration.medium | 300ms |
| animation | — | — | slideDownInitial 0.5s ease forwards |
| box-shadow (tablet+) | — | — | 0 1px 12px rgba(0,0,0,0.04) |

**Anatomia Espacial (padding / margin / gap)**

| Breakpoint | Propiedad | Variable SCSS | Token | Valor |
|---|---|---|---|---|
| Mobile | padding-top | $opt-dimensions, 60 | opt.dimensions.60 | 12px |
| Mobile | margin-top (.molecule-link-nav) | $opt-dimensions, 320 | opt.dimensions.320 | 100px |
| Tablet | padding | $opt-dimensions, 30 / 30 / 30 / 0 | opt.dimensions.30 / 0 | 4px / 4px / 4px / 0 |
| Tablet | gap | $opt-dimensions, 0 | opt.dimensions.0 | 0 |
| Tablet | top | $opt-dimensions, 160 | opt.dimensions.160 | 32px |
| Laptop | padding | $opt-dimensions, 40 / 40 / 40 / 0 | opt.dimensions.40 / 0 | 6px / 6px / 6px / 0 |
| Laptop | top | $opt-dimensions, 180 | opt.dimensions.180 | 36px |
| Desktop | padding | $opt-dimensions, 50 / 50 / 50 / 0 | opt.dimensions.50 / 0 | 8px / 8px / 8px / 0 |
| Desktop | top | $opt-dimensions, 200 | opt.dimensions.200 | 40px |
`;

export default {
  title: 'Organisms/Contextual/Nav',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Definicion y Uso

**Contexto de negocio:** Navegacion principal del sitio. En mobile es un menu hamburguesa
con apertura vertical. En tablet+ es una barra horizontal flotante con fondo blanco semitransparente.

**Contexto de diseno:** Mobile: height fijo 70px con hamburguesa animada (3 lineas → X).
Tablet+: barra flotante con border-radius 50, background blanco al 80% de opacidad y box-shadow.
Animacion de entrada slideDownInitial.

## Composicion (Atomic BEM Hibrido)

- **Capa:** Organism
- **Tipo:** Contextual (navegacion unica del sitio)
- **Clase base:** \`.organism-nav\`
- **Hijos moleculares:** \`.molecule-link-nav\`, \`.molecule-logo-nav\`
- **Hijos atomicos:** \`.atom-logo-nav\`, \`.atom-link-nav\`, \`.btn--nav\`, \`.atom-lang-nav\`
- **Estados JS:** \`.is-open\` (toggle via nav-toggle button)
- **Override:** Overridea atoms globales (.btn) dentro de su contexto

## Snippet HTML

\`\`\`html
<header class="organism-nav">
  <button class="nav-toggle" aria-label="Abrir menu">
    <span class="hamburger"></span>
  </button>
  <div class="molecule-logo-nav">
    <h1>
      <a href="#" class="atom-logo-nav">
        <span class="atom-logo-nav--name">ThisIsDesign</span>
        <span class="atom-logo-nav--iso">TID</span>
      </a>
    </h1>
  </div>
  <nav class="molecule-link-nav" aria-label="Main navigation">
    <ul>
      <li><a href="#" class="atom-link-nav">Articulos</a></li>
      <li><a href="#" class="atom-link-nav">Entrevistas</a></li>
      <li><a href="#" class="atom-link-nav">Podcast</a></li>
      <li><a href="#" class="atom-link-nav">Sobre mi</a></li>
    </ul>
    <a href="#" class="btn btn--nav">Contacto</a>
  </nav>
</header>
<nav class="atom-lang-nav atom-lang-nav--eng" aria-label="Language selector">
  <a href="#" hreflang="en">En.</a>
</nav>
\`\`\`
        `,
      },
    },
  },
};

export const Closed = {
  render: () => `
    <div style="min-height:300px;">
      <header class="organism-nav">
        <button class="nav-toggle" aria-label="Abrir menu">
          <span class="hamburger"></span>
        </button>
        <div class="molecule-logo-nav">
          <h1>
            <a href="#" class="atom-logo-nav">
              <span class="atom-logo-nav--name">ThisIsDesign</span>
              <span class="atom-logo-nav--iso">TID</span>
            </a>
          </h1>
        </div>
        <nav class="molecule-link-nav" aria-label="Main navigation">
          <ul>
            <li><a href="#" class="atom-link-nav">Articulos</a></li>
            <li><a href="#" class="atom-link-nav">Entrevistas</a></li>
            <li><a href="#" class="atom-link-nav">Podcast</a></li>
            <li><a href="#" class="atom-link-nav">Sobre mi</a></li>
          </ul>
          <a href="#" class="btn btn--nav">Contacto</a>
        </nav>
      </header>
      <nav class="atom-lang-nav atom-lang-nav--eng" aria-label="Language selector">
        <a href="#" hreflang="en">En.</a>
      </nav>
    </div>`,
  parameters: {
    docs: { description: { story: `**Especificaciones Tecnicas**\n${specsTable}` } },
  },
};

export const Open = {
  render: () => `
    <div style="min-height:300px;">
      <header class="organism-nav is-open">
        <button class="nav-toggle" aria-label="Cerrar menu">
          <span class="hamburger"></span>
        </button>
        <div class="molecule-logo-nav">
          <h1>
            <a href="#" class="atom-logo-nav">
              <span class="atom-logo-nav--name">ThisIsDesign</span>
              <span class="atom-logo-nav--iso">TID</span>
            </a>
          </h1>
        </div>
        <nav class="molecule-link-nav" aria-label="Main navigation">
          <ul>
            <li><a href="#" class="atom-link-nav">Articulos</a></li>
            <li><a href="#" class="atom-link-nav">Entrevistas</a></li>
            <li><a href="#" class="atom-link-nav">Podcast</a></li>
            <li><a href="#" class="atom-link-nav">Sobre mi</a></li>
          </ul>
          <a href="#" class="btn btn--nav">Contacto</a>
        </nav>
      </header>
    </div>`,
  parameters: {
    docs: { description: { story: `**Especificaciones Tecnicas**\n${specsTable}` } },
  },
};
