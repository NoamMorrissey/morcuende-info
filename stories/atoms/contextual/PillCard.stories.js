const specsTable = `
| Propiedad CSS | Variable SCSS | Design Token | Valor |
|---|---|---|---|
| background | map.get($opt-colors, 'base', 'white') | opt.colors.base.white | #FFFFFF |
| border-radius | map.get($opt-radius, 100) | opt.radius.100 | 255px |
| padding (mobile) | map.get($opt-dimensions, 30) / map.get($opt-dimensions, 60) | opt.dimensions.30 / 60 | 4px / 8px |
| padding (desktop) | map.get($opt-dimensions, 50) / map.get($opt-dimensions, 100) | opt.dimensions.50 / 100 | 6px / 20px |
| text-transform | — | — | uppercase |
| font-weight | map.get($opt-font-weight, semi-bold) | opt.font-weight.semi-bold | 600 |
| letter-spacing | map.get($opt-font-spacing, tight) | opt.font-spacing.tight | -0.02em |
| icon-size (tablet) | map.get($opt-dimensions, 100) | opt.dimensions.100 | 20px |
| typography | text-style('overline') | opt.typography.overline | Public Sans / 400 |

**Anatomia Espacial (padding / margin / gap)**

| Breakpoint | Propiedad | Variable SCSS | Token | Valor |
|---|---|---|---|---|
| Mobile | padding | $opt-dimensions, 30 / 60 | opt.dimensions.30 / 60 | 4px / 12px |
| Tablet | padding | $opt-dimensions, 30 / 80 | opt.dimensions.30 / 80 | 4px / 16px |
| Tablet | gap | $opt-dimensions, 40 | opt.dimensions.40 | 6px |
| Laptop | padding | $opt-dimensions, 40 / 90 | opt.dimensions.40 / 90 | 6px / 18px |
| Laptop | gap | $opt-dimensions, 50 | opt.dimensions.50 | 8px |
| Desktop | padding | $opt-dimensions, 50 / 100 | opt.dimensions.50 / 100 | 8px / 20px |
| Desktop | gap | $opt-dimensions, 60 | opt.dimensions.60 | 12px |
`;

export default {
  title: 'Atoms/Contextual/PillCard',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Definicion y Uso

**Contexto de negocio:** Indicador visual tipo "pill" sobre las cards. Muestra un icono
de flecha por defecto y en hover se expande mostrando la categoria (ej: "Article").

**Contexto de diseno:** Dos variantes: \`--base\` (icono solo) y \`--hover\` (texto + icono).
Tipografia overline con semi-bold, texto en uppercase. Radius circular (100).

## Composicion (Atomic BEM Hibrido)

- **Capa:** Atom
- **Tipo:** Contextual (solo vive dentro de molecule-card)
- **Clase base:** \`.atom-pill-card\`
- **Modificadores:** \`--base\`, \`--hover\`
- **Elementos internos:** \`.atom-pill--text\`
- **Estados JS:** Ninguno (controlado por hover de molecule-card)
- **Override:** No aplica (es contextual)

## Snippet HTML

\`\`\`html
<div class="molecule-pill-card">
  <p class="atom-pill-card--base">
    <span class="material-icons">arrow_outward</span>
  </p>
  <p class="atom-pill-card--hover">
    <span class="atom-pill--text">Article</span>
    <span class="material-icons">arrow_forward</span>
  </p>
</div>
\`\`\`
        `,
      },
    },
  },
};

export const Base = {
  render: () => `
    <div class="molecule-pill-card">
      <p class="atom-pill-card--base">
        <span class="material-icons">arrow_outward</span>
      </p>
    </div>`,
  parameters: {
    docs: { description: { story: `**Especificaciones Tecnicas**\n${specsTable}` } },
  },
};

export const Hover = {
  render: () => `
    <div class="molecule-pill-card">
      <p class="atom-pill-card--hover">
        <span class="atom-pill--text">Article</span>
        <span class="material-icons">arrow_forward</span>
      </p>
    </div>`,
  parameters: {
    docs: { description: { story: `**Especificaciones Tecnicas**\n${specsTable}` } },
  },
};

export const Combined = {
  render: () => `
    <div class="molecule-pill-card">
      <p class="atom-pill-card--base">
        <span class="material-icons">arrow_outward</span>
      </p>
      <p class="atom-pill-card--hover">
        <span class="atom-pill--text">Article</span>
        <span class="material-icons">arrow_forward</span>
      </p>
    </div>`,
  parameters: {
    docs: { description: { story: `**Especificaciones Tecnicas**\n${specsTable}` } },
  },
};
