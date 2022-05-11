module.exports = function prompts(
  prompter,
  { defaults = {}, silent: silentGlobally = false } = {}
) {
  const result = {};
  const makeOptions = ({
    name,
    skip,
    silent = silentGlobally,
    initial: initialFromOptions,
    ...options
  }) => {
    const initial = initialFromOptions || defaults[name];

    return {
      ...options,
      name,
      skip: skip || Boolean(silent && initial),
      initial
    };
  };
  const prompt = options =>
    Array.isArray(options)
      ? prompter.prompt(options.map(makeOptions)).then(value => {
          Object.assign(result, value);
          return value;
        })
      : prompter
          .prompt(makeOptions(options))
          .then(result => result[options.name])
          .then(value => {
            result[options.name] = value;
            return value;
          });

  return {
    prompt,
    getAnswers: () => ({ ...result })
  };
};
