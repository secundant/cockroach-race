const { createTailwindConfig } = require('config/tailwind');

module.exports = createTailwindConfig({ externals: ['../../libs/ui'] });
