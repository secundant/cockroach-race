module.exports = {
  /**
   * @param {string[]} externals
   * @returns {import('tailwindcss/tailwind-config').TailwindConfig}
   */
  createTailwindConfig({ externals = [] }) {
    return {
      content: ['.', ...externals].flatMap(prefix => `${prefix}/**/*.{ts,tsx,mdx}`),
      theme: {},
      plugins: []
    };
  }
};
