const specsTable = `
| Propiedad CSS | Variable SCSS | Design Token | Valor |
|---|---|---|---|
| color | map.get($opt-colors, 'base', 'white') | opt.colors.base.white | #FFFFFF |
| background-color | map.get($opt-colors, 'neutral', '900') | opt.colors.neutral.900 | #1A2026 |
| background (hover) | map.get($opt-colors, 'primary', '50') | opt.colors.primary.50 | #FDE4E2 |
| color (hover) | map.get($opt-colors, 'primary', '400') | opt.colors.primary.400 | #E15347 |
| border-radius | map.get($opt-radius, 40) | opt.radius.40 | 4px |
| padding (mobile --nav) | map.get($opt-dimensions, 60) / 0 | opt.dimensions.60 | 8px / 0 |
| padding (desktop --nav) | map.get($opt-dimensions, 70) / map.get($opt-dimensions, 120) | opt.dimensions.70 / 120 | 12px / 32px |
| transform (active) | map.get($opt-dimensions, 20) | opt.dimensions.20 | translateY(2px) |
| transition-duration | map.get($opt-movement-duration, medium) | opt.movement.duration.medium | 300ms |
| typography | text-style('button-s') | opt.typography.button-s | Public Sans / 600 |

**Anatomia Espacial (padding / margin / gap)**

| Breakpoint | Propiedad | Variable SCSS | Token | Valor |
|---|---|---|---|---|
| Mobile | padding | $opt-dimensions, 60 / 0 | opt.dimensions.60 / 0 | 12px / 0 |
| Tablet | padding | $opt-dimensions, 50 / 90 | opt.dimensions.50 / 90 | 8px / 18px |
| Laptop | padding | $opt-dimensions, 60 / 100 | opt.dimensions.60 / 100 | 12px / 20px |
| Desktop | padding | $opt-dimensions, 70 / 120 | opt.dimensions.70 / 120 | 14px / 24px |
`;

export default {
  title: 'Atoms/Global/Button',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Definicion y Uso

**Contexto de negocio:** Boton de accion principal. El modificador \`--nav\` se usa como CTA
en la navegacion del sitio (ej: "Contacto").

**Contexto de diseno:** Tipografia button-s con peso semi-bold. Fondo oscuro por defecto
con transicion a colores primarios en hover. Efecto de translateY en active.

## Accesibilidad

- **Contraste WCAG:** #FFFFFF sobre #1A2026 = **15.3:1** (supera AAA)
- **Contraste hover:** #E15347 sobre #FDE4E2 = **4.6:1** (cumple AA)
- **Semantica:** Usar \`<button>\` para acciones, \`<a>\` para navegacion
- **ARIA:** \`aria-label\` solo cuando el texto visible no es suficiente

## Composicion (Atomic BEM Hibrido)

- **Capa:** Atom
- **Tipo:** Global (reutilizable en cualquier contexto)
- **Clase base:** \`.btn\`
- **Modificadores:** \`--nav\`, \`--primary\` (futuro)
- **Estados JS:** Ninguno (CSS-only)
- **Override:** Si — un organismo puede overridear color/padding via selector compuesto

## Snippet HTML

\`\`\`html
<a href="/contacto" class="btn btn--nav">Contacto</a>
\`\`\`
        `,
      },
    },
  },
};

export const NavDefault = {
  render: () => `<a href="/contacto" class="btn btn--nav" aria-label="Ir a la pagina de contacto">Contacto</a>`,
  parameters: {
    docs: { description: { story: `**Especificaciones Tecnicas**\n${specsTable}` } },
  },
};

export const NavHover = {
  render: () => `<a href="/contacto" class="btn btn--nav" aria-label="Ir a la pagina de contacto">Contacto</a>`,
  parameters: {
    docs: { description: { story: `**Especificaciones Tecnicas**\n${specsTable}` } },
  },
};

export const NavDisabled = {
  render: () => `<button class="btn btn--nav" disabled aria-disabled="true">Contacto</button>`,
  parameters: {
    docs: { description: { story: `**Especificaciones Tecnicas**\n${specsTable}` } },
  },
};
