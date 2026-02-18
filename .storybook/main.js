/** @type {import('@storybook/html-vite').StorybookConfig} */
const config = {
  stories: ['../stories/**/*.stories.js'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
    '@storybook/addon-backgrounds',
  ],
  framework: '@storybook/html-vite',
  staticDirs: ['../assets'],
  viteFinal: async (config) => {
    config.css = {
      ...config.css,
      preprocessorOptions: {
        scss: {
          loadPaths: ['node_modules'],
        },
      },
    };
    return config;
  },
};
export default config;
