const specsTable = `
| Propiedad CSS | Variable SCSS | Design Token | Valor |
|---|---|---|---|
| display (mobile) | — | — | none |
| display (tablet+) | — | — | flex |
| gap (tablet) | map.get($opt-dimensions, 20) | opt.dimensions.20 | 2px |
| gap (laptop) | map.get($opt-dimensions, 30) | opt.dimensions.30 | 4px |
| gap (desktop) | map.get($opt-dimensions, 40) | opt.dimensions.40 | 4px |
| border-bottom (mobile) | map.get($opt-stroke, 10) solid map.get($opt-colors, 'neutral', '500') | opt.stroke.10 + opt.colors.neutral.500 | 1px solid #6B7B8D |
| scroll-behavior | — | — | smooth |

**Anatomia Espacial (padding / margin / gap)**

| Breakpoint | Propiedad | Variable SCSS | Token | Valor |
|---|---|---|---|---|
| Mobile | margin | $opt-dimensions, 0 | opt.dimensions.0 | 0 |
| Mobile | padding | $opt-dimensions, 0 | opt.dimensions.0 | 0 |
| Tablet | gap (nav) | $opt-dimensions, 20 | opt.dimensions.20 | 2px |
| Tablet | gap (ul) | $opt-dimensions, 20 | opt.dimensions.20 | 2px |
| Laptop | gap (nav) | $opt-dimensions, 30 | opt.dimensions.30 | 4px |
| Laptop | gap (ul) | $opt-dimensions, 30 | opt.dimensions.30 | 4px |
| Desktop | gap (nav) | $opt-dimensions, 40 | opt.dimensions.40 | 6px |
| Desktop | gap (ul) | $opt-dimensions, 40 | opt.dimensions.40 | 6px |
`;

export default {
  title: 'Molecules/Contextual/LinkNav',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Definicion y Uso

**Contexto de negocio:** Agrupacion de links de navegacion principal. Contiene la lista de
secciones del sitio (Articulos, Entrevistas, Podcast, Sobre mi) mas el boton CTA de Contacto.

**Contexto de diseno:** En mobile se oculta (display: none) y se muestra al abrir el menu
hamburguesa. En tablet+ se muestra como flex row con gaps responsivos entre items.

## Composicion (Atomic BEM Hibrido)

- **Capa:** Molecule
- **Tipo:** Contextual (solo vive dentro de organism-nav)
- **Clase base:** \`.molecule-link-nav\`
- **Hijos:** \`.atom-link-nav\` (links), \`.btn--nav\` (CTA)
- **Estados JS:** Ninguno (visibilidad controlada por organism-nav)
- **Override:** No aplica (es contextual)

## Snippet HTML

\`\`\`html
<nav class="molecule-link-nav" aria-label="Main navigation">
  <ul>
    <li><a href="#" class="atom-link-nav">Articulos</a></li>
    <li><a href="#" class="atom-link-nav">Entrevistas</a></li>
    <li><a href="#" class="atom-link-nav">Podcast</a></li>
    <li><a href="#" class="atom-link-nav">Sobre mi</a></li>
  </ul>
  <a href="#" class="btn btn--nav">Contacto</a>
</nav>
\`\`\`
        `,
      },
    },
  },
};

export const Default = {
  render: () => `
    <nav class="molecule-link-nav" aria-label="Main navigation" style="display: flex;">
      <ul>
        <li><a href="#" class="atom-link-nav">Articulos</a></li>
        <li><a href="#" class="atom-link-nav">Entrevistas</a></li>
        <li><a href="#" class="atom-link-nav">Podcast</a></li>
        <li><a href="#" class="atom-link-nav">Sobre mi</a></li>
      </ul>
      <a href="#" class="btn btn--nav">Contacto</a>
    </nav>`,
  parameters: {
    docs: { description: { story: `**Especificaciones Tecnicas**\n${specsTable}` } },
  },
};
