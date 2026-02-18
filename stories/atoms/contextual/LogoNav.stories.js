const specsTable = `
| Propiedad CSS | Variable SCSS | Design Token | Valor |
|---|---|---|---|
| color (mobile) | map.get($opt-colors, 'base', 'white') | opt.colors.base.white | #FFFFFF |
| background (mobile) | map.get($opt-colors, 'base', 'black') | opt.colors.base.black | #000000 |
| color (tablet+) | map.get($opt-colors, 'base', 'black') | opt.colors.base.black | #000000 |
| color (hover mobile) | map.get($opt-colors, 'primary', '500') | opt.colors.primary.500 | #DA2A1C |
| border-radius (mobile) | map.get($opt-radius, 40) | opt.radius.40 | 4px |
| padding (mobile) | map.get($opt-dimensions, 60) | opt.dimensions.60 | 8px / 8px |
| font-weight | map.get($opt-font-weight, semi-bold) | opt.font-weight.semi-bold | 600 |
| letter-spacing | map.get($opt-font-spacing, tight) | opt.font-spacing.tight | -0.02em |
| typography | text-style('headlines-regular-h6') | opt.typography.headlines-regular-h6 | Public Sans / 400 |

**Anatomia Espacial (padding / margin / gap)**

| Breakpoint | Propiedad | Variable SCSS | Token | Valor |
|---|---|---|---|---|
| Mobile | padding | $opt-dimensions, 60 / 60 | opt.dimensions.60 | 12px / 12px |
| Tablet | padding | $opt-dimensions, 50 / 80 | opt.dimensions.50 / 80 | 8px / 16px |
| Laptop | padding | $opt-dimensions, 60 / 90 | opt.dimensions.60 / 90 | 12px / 18px |
| Desktop | padding | $opt-dimensions, 70 / 100 | opt.dimensions.70 / 100 | 14px / 20px |
`;

export default {
  title: 'Atoms/Contextual/LogoNav',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Definicion y Uso

**Contexto de negocio:** Logo principal del sitio "ThisIsDesign". En mobile muestra el isotipo
"TID" compacto; en tablet+ se expande al nombre completo.

**Contexto de diseno:** Tipografia headlines-regular-h6 con semi-bold (600). En mobile tiene
fondo negro con texto blanco y radius compacto. En tablet+ cambia a texto negro sin fondo.

## Composicion (Atomic BEM Hibrido)

- **Capa:** Atom
- **Tipo:** Contextual (solo vive dentro de organism-nav)
- **Clase base:** \`.atom-logo-nav\`
- **Modificadores:** \`--name\` (nombre completo), \`--iso\` (isotipo)
- **Estados JS:** Ninguno
- **Override:** No aplica (es contextual)

## Snippet HTML

\`\`\`html
<a href="#" class="atom-logo-nav">
  <span class="atom-logo-nav--name">ThisIsDesign</span>
  <span class="atom-logo-nav--iso">TID</span>
</a>
\`\`\`
        `,
      },
    },
  },
};

export const Default = {
  render: () => `
    <a href="#" class="atom-logo-nav">
      <span class="atom-logo-nav--name">ThisIsDesign</span>
      <span class="atom-logo-nav--iso">TID</span>
    </a>`,
  parameters: {
    docs: { description: { story: `**Especificaciones Tecnicas**\n${specsTable}` } },
  },
};
