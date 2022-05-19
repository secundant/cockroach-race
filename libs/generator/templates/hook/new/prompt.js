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
        message: 'Path to hooks root folder'
      },
      {
        name: 'name',
        type: 'input',
        message: 'Hook name',
        format: value => `use-${value}`,
        result: raw => {
          const name = h.changeCase.kebab(raw);

          return name.startsWith('use') ? name : `use-${name}`;
        },
        validate: value => value.length > 1 || 'Name length should be greater than 1'
      }
    ]);

    return getAnswers();
  }
};
