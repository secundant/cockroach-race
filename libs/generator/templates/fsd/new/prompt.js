const { prompts, fsd } = require('../../../internal');

module.exports = {
  async prompt({ prompter, args, h }) {
    const { prompt, getAnswers } = prompts(prompter, {
      defaults: args,
      silent: args.silent
    });

    await prompt([
      fsd.prompts.rootDir,
      fsd.prompts.layer,
      {
        name: 'name',
        type: 'input',
        message: 'Slice name',
        result: h.changeCase.kebab,
        validate: value => value.length > 2 || 'Name length should be greater than 2'
      }
    ]);
    const answers = getAnswers();

    return {
      ...answers,
      baseDir: h.path.resolve(answers.rootDir, answers.layer, answers.name)
    };
  }
};
