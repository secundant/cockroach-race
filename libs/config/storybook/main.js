const defaultStorybookConfig = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  framework: '@storybook/react',
  features: {
    postcss: false,
    storyStoreV7: true,
    buildStoriesJson: true,
    modernInlineRender: true
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true)
    }
  }
};

module.exports = {
  defaultStorybookConfig,
  createStorybookConfig({ postcssOptions }) {
    return {
      ...defaultStorybookConfig,
      addons: [
        '@storybook/addon-essentials',
        {
          name: '@storybook/addon-postcss',
          options: {
            postcssLoaderOptions: {
              postcssOptions,
              implementation: require('postcss')
            }
          }
        }
      ]
    };
  }
};
