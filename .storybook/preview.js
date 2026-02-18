import '../scss/styles.scss';

const preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        language: 'html',
        type: 'dynamic',
        transform: (src) => {
          // Strip outer <div> wrapper from pseudo-state decorator
          const match = src.match(/^<div[^>]*>\n?([\s\S]*)\n?<\/div>\s*$/);
          if (match) src = match[1];
          // Dedent
          const lines = src.split('\n');
          const nonEmpty = lines.filter(l => l.trim().length > 0);
          if (nonEmpty.length === 0) return src.trim();
          const minIndent = nonEmpty.reduce((min, l) =>
            Math.min(min, l.match(/^(\s*)/)[1].length), Infinity);
          if (minIndent > 0 && minIndent < Infinity) {
            src = lines.map(l => l.slice(minIndent)).join('\n');
          }
          return src.trim();
        },
      },
    },
    viewport: {
      defaultViewport: 'mobile',
      options: {
        // --- Breakpoints oficiales (tokens/breakpoints.json) ---
        mobile:  { name: 'Mobile (Token — 480px)',  styles: { width: '480px',  height: '896px' } },
        tablet:  { name: 'Tablet (Token — 768px)',  styles: { width: '768px',  height: '1024px' } },
        laptop:  { name: 'Laptop (Token — 1024px)', styles: { width: '1024px', height: '768px' } },
        desktop: { name: 'Desktop (Token — 1366px)', styles: { width: '1366px', height: '900px' } },
        wide:    { name: 'Wide (Token — 1920px)',   styles: { width: '1920px', height: '1080px' } },
        // --- Edge cases: justo antes de cada salto ---
        'pre-tablet':  { name: 'Pre-Tablet (767px)',  styles: { width: '767px',  height: '1024px' } },
        'pre-laptop':  { name: 'Pre-Laptop (1023px)', styles: { width: '1023px', height: '768px' } },
        'pre-desktop': { name: 'Pre-Desktop (1365px)', styles: { width: '1365px', height: '900px' } },
        'pre-wide':    { name: 'Pre-Wide (1919px)',   styles: { width: '1919px', height: '1080px' } },
      },
    },
    backgrounds: {
      grid: {
        cellSize: 4,
        opacity: 0.15,
        cellAmount: 5,
        offsetX: 0,
        offsetY: 0,
      },
    },
    measure: { enabled: false },
    outline: { enabled: false },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'label', enabled: true },
          { id: 'link-name', enabled: true },
          { id: 'button-name', enabled: true },
          { id: 'image-alt', enabled: true },
        ],
      },
    },
  },
  globalTypes: {
    pseudo: {
      name: 'Pseudo State',
      description: 'Fuerza un estado interactivo en el componente',
      defaultValue: 'none',
      toolbar: {
        icon: 'pointer',
        items: [
          { value: 'none', title: 'None' },
          { value: 'hover', title: ':hover' },
          { value: 'active', title: ':active' },
          { value: 'focus', title: ':focus' },
          { value: 'focus-visible', title: ':focus-visible' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (storyFn, context) => {
      const pseudo = context.globals.pseudo;
      const result = storyFn();
      const wrapper = document.createElement('div');
      if (typeof result === 'string') {
        wrapper.innerHTML = result;
      } else if (result instanceof HTMLElement) {
        wrapper.appendChild(result);
      } else {
        wrapper.innerHTML = String(result);
      }
      if (pseudo && pseudo !== 'none') {
        wrapper.setAttribute('data-pseudo', pseudo);
      }
      return wrapper;
    },
  ],
};
export default preview;
