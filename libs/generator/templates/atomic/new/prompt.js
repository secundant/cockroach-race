const { prompts } = require('../../../internal');

module.exports = {
  async prompt({ prompter, args, h }) {
    const { prompt, getAnswers } = prompts(prompter, {
      defaults: args,
      silent: args.silent
    });

    await prompt([
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
      },
      {
        name: 'name',
        type: 'input',
        message: 'Component name',
        result: h.changeCase.kebab,
        validate: value => value.length > 2 || 'Name length should be greater than 2'
      }
    ]);

    return getAnswers();
  }
};
