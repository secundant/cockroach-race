module.exports = {
  async format({ path, input, ...options }) {
    const { format, resolveConfig } = require('prettier');

    return format(input, {
      ...((await resolveConfig(path)) ?? {}),
      ...options
    });
  }
};
