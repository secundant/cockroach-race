const { access, readdir, readFile, stat } = require('fs/promises');
const { join, resolve } = require('path');
const { prettier, prompts } = require('../../../internal');
const { createElement } = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { optimize } = require('svgo');
const { parse } = require('svgson');

module.exports = {
  async prompt({ prompter, args }) {
    const ora = (await import('ora')).default;
    const { prompt, getAnswers } = prompts(prompter, {
      defaults: {
        name: 'sprite.svg',
        ...args
      },
      silent: args.silent
    });

    const { input, output } = await prompt([
      {
        name: 'input',
        type: 'input',
        silent: true,
        message: 'Path to folder with svg files',
        validate: path =>
          access(resolve(path))
            .then(() => true)
            .catch(() => `Path "${path}" not exists`)
      },
      {
        name: 'output',
        type: 'input',
        message: 'Path to output generated sprites files'
      },
      {
        name: 'name',
        type: 'input',
        message: 'Generated sprite name'
      }
    ]);

    const inputAbsPath = resolve(input);
    const outputAbsPath = resolve(output);

    const readingFilesProgress = ora(`Looking for svg sources`).start();
    const inputs = await readInput(inputAbsPath);

    readingFilesProgress.succeed(`Found ${inputs.length} files`);
    const processingProgress = ora('[0/0] Processing sources').start();
    const processedNodes = [];
    let index = 0;

    for (const { path, name, id } of inputs) {
      processingProgress.text = `[${++index}/${inputs.length}] Processing sources`;
      const content = await readFile(path, 'utf-8');
      const optimized = optimize(content, SVGO_DEFAULTS);
      const processed = await parse(optimized.data, {
        transformNode: transformBy({ id }),
        camelcase: true
      });

      processedNodes.push({
        id,
        name,
        path,
        value: processed
      });
    }
    processingProgress.succeed(`Processed ${inputs.length} files`);

    const generatingSpriteProgress = ora('Generating sprite').start();
    const icons = processedNodes.map(({ value }) =>
      toElement({
        ...value,
        keyProp: value.attributes.id,
        name: 'symbol'
      })
    );
    const renderedSprite = await prettier.format({
      path: outputAbsPath,
      input: renderToStaticMarkup(createSprite(icons)),
      parser: 'html'
    });
    const sprite = renderedSprite.replace(/^;|;$/g, '');

    generatingSpriteProgress.succeed();

    return {
      ...getAnswers(),
      sprite: sprite,
      iconsIds: processedNodes.map(icon => icon.id)
    };
  }
};

const createSprite = icons =>
  createElement('svg', { width: 0, height: 0, className: 'hidden' }, icons);

const toElement = ({ children, name, attributes, keyProp }) =>
  createElement(
    name,
    { ...attributes, key: keyProp },
    Array.isArray(children)
      ? children.map((node, index) =>
          node.type === 'element'
            ? toElement({ ...node, keyProp: index })
            : node.type === 'text'
            ? node.value
            : void 0
        )
      : children
  );

const transformBy = ({ id }) => {
  const transformNode = node => {
    if (Array.isArray(node)) {
      return node.map(transformNode);
    }
    if (node.name !== 'svg') {
      return node;
    }
    const { viewBox, width, height, ...attributes } = node.attributes;

    return {
      ...node,
      attributes: {
        ...attributes,
        viewBox: viewBox || `0 0 ${width} ${height}`,
        id
      }
    };
  };

  return transformNode;
};

async function readInput(path, parent = '') {
  const children = await readdir(path);

  return Promise.all(
    children.map(async name => {
      const childPath = resolve(path, name);
      const childStat = await stat(childPath);

      if (childStat.isFile()) {
        return [name];
      } else {
        return readInput(resolve(childPath, join(parent, name)));
      }
    })
  )
    .then(results => [].concat(...results))
    .then(results =>
      results.map(name => ({
        id: name.replace(/.svg$/, ''),
        name,
        path: resolve(path, name)
      }))
    );
}

const SVGO_DEFAULTS = {
  plugins: [
    { name: 'removeStyleElement', active: true },
    { name: 'removeScriptElement', active: true },
    { name: 'removeViewBox', active: false },
    { name: 'removeTitle', active: false },
    {
      name: 'removeAttrs',
      params: {
        attrs: [
          '(class|style)',
          'xlink:href',
          'aria-labelledby',
          'aria-describedby',
          'xmlns:xlink',
          'data-name'
        ]
      }
    }
  ],
  multipass: true
};
