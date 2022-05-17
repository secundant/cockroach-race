const { readdir, stat, rename } = require('fs/promises');
const { resolve } = require('path');
const { prompts } = require('../../../internal');

module.exports = {
  async prompt({ prompter, args, h }) {
    const ora = (await import('ora')).default;
    const { prompt, getAnswers } = prompts(prompter, {
      defaults: args,
      silent: args.silent
    });

    const { rootDir, layer } = await prompt([
      {
        name: 'rootDir',
        type: 'input',
        silent: true,
        message: 'Path to components root folder'
      },
      {
        name: 'layer',
        type: 'select',
        message: 'Atomic layer',
        choices: ['atoms', 'molecules', 'organisms']
      }
    ]);
    const baseDir = resolve(rootDir, layer);
    const dirContent = await readdir(baseDir);
    const components = await Promise.all(
      dirContent.map(name => stat(resolve(baseDir, name)).then(f => (f.isFile() ? null : name)))
    ).then(names => names.filter(Boolean));

    const { prevName, name } = await prompt([
      {
        name: 'prevName',
        type: 'select',
        silent: false,
        message: 'Select component',
        choices: components
      },
      {
        name: 'name',
        type: 'input',
        message: 'New component name',
        result: h.changeCase.kebab,
        validate: value => value.length > 2 || 'Name length should be greater than 2'
      }
    ]);
    const prevPath = resolve(baseDir, prevName);
    const progress = ora('Renaming...').start();

    await Promise.all(
      ['tsx', 'd.ts', 'test.tsx', 'stories.tsx'].map(async ext => {
        const prev = resolve(prevPath, `${prevName}.${ext}`);

        if ((await stat(prev)).isFile()) {
          await rename(prev, resolve(prevPath, `${name}.${ext}`));
        }
      })
    );
    await rename(prevPath, resolve(baseDir, name));

    progress.succeed(`Renamed "${prevName}" -> "${name}"`);

    return getAnswers();
  }
};
