const specsTable = `
| Propiedad CSS | Variable SCSS | Design Token | Valor |
|---|---|---|---|
| opacity (pill base) | map.get($opt-opacity-levels, 80%) | opt.opacity-levels.80% | 0.8 |
| opacity (pill hover) | map.get($opt-opacity-levels, 0%) | opt.opacity-levels.0% | 0 |
| transform (pill hover) | map.get($opt-dimensions, 150) | opt.dimensions.150 | translateX(48px) |
| transition-duration | map.get($opt-movement-duration, fast) | opt.movement.duration.fast | 200ms |
| transition-timing | map.get($opt-movement-easing, linear) | opt.movement.easing.linear | linear |
| aspect-ratio (vertical) | map.get($opt-aspect-ratio, rectangle-vertical) | opt.aspect-ratio.rectangle-vertical | 3/4 |
| display (pill-card) | — | — | grid (stacked) |

**Anatomia Espacial (padding / margin / gap)**

| Breakpoint | Propiedad | Variable SCSS | Token | Valor |
|---|---|---|---|---|
| All | transform (pill hover) | $opt-dimensions, 150 | opt.dimensions.150 | translateX(30px) |
| All | transform (pill reset) | $opt-dimensions, 0 | opt.dimensions.0 | translateX(0) |

> Nota: molecule-card no define padding/margin/gap propios. El espaciado interior es gestionado por sus hijos atomicos (atom-pill-card, atom-card-title, atom-card-subtitle).
`;

export default {
  title: 'Molecules/Global/Card',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Definicion y Uso

**Contexto de negocio:** Card principal para contenido editorial (articulos, entrevistas,
proyectos). Muestra titulo, subtitulo, imagen de fondo y un pill indicador de tipo.

**Contexto de diseno:** Contenedor con imagen de fondo, overlay de hover, y animacion
de opacidad en el pill-card. Usa aspect-ratio configurable via modificadores.

## Composicion (Atomic BEM Hibrido)

- **Capa:** Molecule
- **Tipo:** Global (reutilizable en cualquier seccion)
- **Clase base:** \`.molecule-card\`
- **Modificadores:** \`--bg\`, \`--rectangle-vertical\`, \`--rectangle-horizontal\`
- **Elementos internos:** \`__content\`, \`__bg\`, \`__hover\`, \`--link\`
- **Hijos atomicos:** \`.atom-pill-card\`, \`.atom-card-title\`, \`.atom-card-subtitle\`
- **Estados JS:** Ninguno (hover CSS-only)
- **Override:** Si — organismos pueden overridear dimensiones y aspect-ratio

## Snippet HTML

\`\`\`html
<article class="molecule-card molecule-card--bg molecule-card--rectangle-vertical">
  <a href="#" class="molecule-card--link">
    <div class="molecule-pill-card">
      <p class="atom-pill-card--base">
        <span class="material-icons">arrow_outward</span>
      </p>
      <p class="atom-pill-card--hover">
        <span class="atom-pill--text">Article</span>
        <span class="material-icons">arrow_forward</span>
      </p>
    </div>
    <div class="molecule-card__content">
      <h3 class="atom-card-title">Titulo de la Card</h3>
      <p class="atom-card-subtitle">Subtitulo descriptivo</p>
    </div>
    <div class="molecule-card__bg">
      <img src="/images/web_images/example.jpg" alt="Descripcion">
    </div>
    <div class="molecule-card__hover">
      <p>Texto de hover.</p>
    </div>
  </a>
</article>
\`\`\`
        `,
      },
    },
  },
};

export const Default = {
  render: () => `
    <div style="max-width:400px;">
      <article class="molecule-card molecule-card--bg molecule-card--rectangle-vertical">
        <a href="#" class="molecule-card--link">
          <div class="molecule-pill-card">
            <p class="atom-pill-card--base">
              <span class="material-icons">arrow_outward</span>
            </p>
            <p class="atom-pill-card--hover">
              <span class="atom-pill--text">Article</span>
              <span class="material-icons">arrow_forward</span>
            </p>
          </div>
          <div class="molecule-card__content">
            <h3 class="atom-card-title">Titulo de la Card</h3>
            <p class="atom-card-subtitle">Subtitulo descriptivo</p>
          </div>
          <div class="molecule-card__bg">
            <img src="https://placehold.co/400x300" alt="Placeholder">
          </div>
          <div class="molecule-card__hover">
            <p>Lee mas sobre este contenido exclusivo.</p>
          </div>
        </a>
      </article>
    </div>`,
  parameters: {
    docs: { description: { story: `**Especificaciones Tecnicas**\n${specsTable}` } },
  },
};
