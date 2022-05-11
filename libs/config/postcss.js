const { join } = require('path');

module.exports = {
  /**
   * @param {string} cwd
   * @returns {*}
   */
  createPostCSSConfig({ cwd }) {
    return {
      plugins: [
        'postcss-import',
        'tailwindcss/nesting',
        [
          'tailwindcss',
          {
            config: join(cwd, 'tailwind.config.js')
          }
        ],
        'postcss-flexbugs-fixes',
        'autoprefixer'
      ]
    };
  }
};
