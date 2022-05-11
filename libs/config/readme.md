# Shared config

## Add storybook

```shell
yarn add -D @storybook/addon-essentials @storybook/addon-postcss @storybook/react
```

```javascript
// .storybook/main.js
const { createStorybookConfig } = require('config/storybook/main');

module.exports = createStorybookConfig({
  postcssOptions: require('../postcss.config')
});

```

```javascript
// .storybook/preview.js
export { parameters } from 'config/storybook/preview-defaults';
```
