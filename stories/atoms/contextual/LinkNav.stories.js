const specsTable = `
| Propiedad CSS | Variable SCSS | Design Token | Valor |
|---|---|---|---|
| color | map.get($opt-colors, 'neutral', '900') | opt.colors.neutral.900 | #1A2026 |
| color (hover) | map.get($opt-colors, 'primary', '500') | opt.colors.primary.500 | #DA2A1C |
| background (hover) | map.get($opt-colors, 'base', 'white') | opt.colors.base.white | #FFFFFF |
| border-radius (mobile) | map.get($opt-radius, 40) | opt.radius.40 | 4px |
| border-radius (tablet+) | map.get($opt-radius, 100) | opt.radius.100 | 255px |
| padding (mobile) | map.get($opt-dimensions, 80) | opt.dimensions.80 | 16px |
| transition-duration | map.get($opt-movement-duration, medium) | opt.movement.duration.medium | 300ms |
| transition-timing | map.get($opt-movement-easing, in-out) | opt.movement.easing.in-out | cubic-bezier(0.42, 0, 0.58, 1) |
| typography | text-style('headlines-regular-h6') | opt.typography.headlines-regular-h6 | Public Sans / 400 |

**Anatomia Espacial (padding / margin / gap)**

| Breakpoint | Propiedad | Variable SCSS | Token | Valor |
|---|---|---|---|---|
| Mobile | padding | $opt-dimensions, 80 / 80 | opt.dimensions.80 | 16px / 16px |
| Tablet | padding | $opt-dimensions, 50 / 80 | opt.dimensions.50 / 80 | 8px / 16px |
| Laptop | padding | $opt-dimensions, 60 / 90 | opt.dimensions.60 / 90 | 12px / 18px |
| Desktop | padding | $opt-dimensions, 70 / 100 | opt.dimensions.70 / 100 | 14px / 20px |
`;

export default {
  title: 'Atoms/Contextual/LinkNav',
  parameters: {
    layout: 'padded',
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

## Snippet HTML

\`\`\`html
<a href="#" class="atom-link-nav">Link Text</a>
\`\`\`
        `,
      },
    },
  },
};

export const Default = {
  render: () => `<a href="#" class="atom-link-nav">Link Text</a>`,
  parameters: {
    docs: { description: { story: `**Especificaciones Tecnicas**\n${specsTable}` } },
  },
};

export const Active = {
  render: () => `<a href="#" class="atom-link-nav atom-link-nav--active">Link Text Active</a>`,
  parameters: {
    docs: { description: { story: `**Especificaciones Tecnicas**\n${specsTable}` } },
  },
};

export const Disabled = {
  render: () => `<a href="#" class="atom-link-nav atom-link-nav--disabled">Link Text Disabled</a>`,
  parameters: {
    docs: { description: { story: `**Especificaciones Tecnicas**\n${specsTable}` } },
  },
};
