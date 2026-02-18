const specsTable = `
| Propiedad CSS | Variable SCSS | Design Token | Valor |
|---|---|---|---|
| color | map.get($opt-colors, 'base', 'white') | opt.colors.base.white | #FFFFFF |
| background-color | map.get($opt-colors, 'base', 'black') | opt.colors.base.black | #000000 |
| position | — | — | fixed |
| top (mobile) | map.get($opt-dimensions, 70) | opt.dimensions.70 | 12px |
| width (mobile) | map.get($opt-dimensions, 90) | opt.dimensions.90 | 18px |
| aspect-ratio | map.get($opt-aspect-ratio, square) | opt.aspect-ratio.square | 1/1 |
| border-radius | map.get($opt-radius, 100) | opt.radius.100 | 255px |
| z-index | map.get($opt-elevation, max) | opt.elevation.max | 1000000000 |
| transition-duration | map.get($opt-movement-duration, fast) | opt.movement.duration.fast | 200ms |

**Anatomia Espacial (posicion / padding)**

| Breakpoint | Propiedad | Variable SCSS | Token | Valor |
|---|---|---|---|---|
| Mobile | padding | $opt-dimensions, 60 / 60 | opt.dimensions.60 | 12px / 12px |
| Mobile | top | $opt-dimensions, 70 | opt.dimensions.70 | 14px |
| Mobile | right | $opt-dimensions, 80 | opt.dimensions.80 | 16px |
| Tablet | padding | — | — | 0 |
| Tablet | top / right | $opt-dimensions, 160 | opt.dimensions.160 | 32px |
| Laptop | top / right | $opt-dimensions, 180 | opt.dimensions.180 | 36px |
| Desktop | top / right | $opt-dimensions, 200 | opt.dimensions.200 | 40px |
`;

export default {
  title: 'Atoms/Contextual/LangNav',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Definicion y Uso

**Contexto de negocio:** Selector de idioma del sitio. Permite cambiar entre ingles (En.) y
espanol (Es.). Se posiciona de forma fija en la esquina superior derecha.

**Contexto de diseno:** Elemento circular con fondo negro y texto blanco. En hover muestra
una imagen de bandera como fondo. Posicionado con fixed y z-index maximo.

## Composicion (Atomic BEM Hibrido)

- **Capa:** Atom
- **Tipo:** Contextual (solo vive junto a organism-nav)
- **Clase base:** \`.atom-lang-nav\`
- **Modificadores:** \`--eng\`, \`--esp\`
- **Estados JS:** Ninguno
- **Override:** No aplica (es contextual)

## Snippet HTML

\`\`\`html
<nav class="atom-lang-nav atom-lang-nav--eng" aria-label="Language selector">
  <a href="#" hreflang="en">En.</a>
</nav>
\`\`\`
        `,
      },
    },
  },
};

export const English = {
  render: () => `
    <div style="min-height:200px; position:relative;">
      <nav class="atom-lang-nav atom-lang-nav--eng" aria-label="Language selector">
        <a href="#" hreflang="en">En.</a>
      </nav>
    </div>`,
  parameters: {
    docs: { description: { story: `**Especificaciones Tecnicas**\n${specsTable}` } },
  },
};

export const Spanish = {
  render: () => `
    <div style="min-height:200px; position:relative;">
      <nav class="atom-lang-nav atom-lang-nav--esp" aria-label="Selector de idioma">
        <a href="#" hreflang="es">Es.</a>
      </nav>
    </div>`,
  parameters: {
    docs: { description: { story: `**Especificaciones Tecnicas**\n${specsTable}` } },
  },
};
