const fsd = require('config/depcruise/fsd');

module.exports = {
  ...fsd,
  options: {
    ...fsd.options,
    tsPreCompilationDeps: true,
    doNotFollow: 'node_modules',
    baseDir: '.',
    exclude: {
      path: ['.next', 'node_modules']
    },
    tsConfig: {
      fileName: 'tsconfig.json'
    }
  }
};
