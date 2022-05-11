const { createJestProjectConfig } = require('config/jest');

module.exports = {
  projects: [
    createJestProjectConfig({
      displayName: '@apps/cockroaches',
      pathsRoot: 'apps/cockroaches',
      tsConfig: require.resolve('./apps/cockroaches/tsconfig.node.json'),
      targets: ['apps/cockroaches']
    }),
    createJestProjectConfig({
      displayName: '@libs/<*>',
      targets: ['libs/ui', 'libs/utils'],
      tsConfig: require.resolve('./tsconfig.node.json')
    })
  ]
};
