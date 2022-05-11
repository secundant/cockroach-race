const { prompts, fsd } = require('../../../internal');

module.exports = {
  async prompt({ prompter, args, h }) {
    const { prompt, getAnswers } = prompts(prompter, {
      defaults: args,
      silent: args.silent
    });
    const fsdLayer = await fsd.getLayerFromPrompt(prompt, h.path);

    await prompt([
      {
        name: 'name',
        type: 'select',
        message: 'Slice name',
        choices: await fsdLayer.getSlicesNames()
      },
      {
        name: 'component',
        type: 'input',
        message: 'New UI component name',
        result: h.changeCase.kebab,
        validate: value => value.length > 2 || 'Name length should be greater than 2'
      }
    ]);

    const answers = getAnswers();

    return {
      ...answers,
      componentName: h.changeCase.pascal(`${answers.name}-${answers.component}`),
      baseDir: h.path.resolve(answers.rootDir, answers.layer, answers.name)
    };
  }
};
