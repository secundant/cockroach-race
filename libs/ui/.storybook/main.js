const { createStorybookConfig } = require('config/storybook/main');

module.exports = {
  ...createStorybookConfig({
    postcssOptions: require('../postcss.config')
  }),
  staticDirs: ['../molecules/sprite-icon']
};
