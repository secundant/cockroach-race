const { readdir } = require('fs/promises');

class LayerInfo {
  constructor({ layer, rootDir }, path) {
    this.baseDir = path.resolve(rootDir, layer);
  }

  getSlicesNames() {
    return readdir(this.baseDir);
  }
}

const prompts = {
  rootDir: {
    name: 'rootDir',
    type: 'input',
    silent: true,
    message: 'Path to components root folder'
  },
  layer: {
    name: 'layer',
    type: 'select',
    silent: true,
    message: 'FSD layer',
    choices: ['entities', 'features', 'widgets']
  }
};

module.exports = {
  prompts,
  getLayerFromPrompt: (prompt, path) =>
    prompt([prompts.rootDir, prompts.layer]).then(params => new LayerInfo(params, path))
};
