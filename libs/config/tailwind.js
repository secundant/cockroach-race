const colors = require('tailwindcss/colors');

module.exports = {
  /**
   * @param {string[]} externals
   * @returns {import('tailwindcss/tailwind-config').TailwindConfig}
   */
  createTailwindConfig({ externals = [] }) {
    return {
      content: ['.', ...externals].flatMap(prefix => [
        `${prefix}/**/*.{ts,tsx,mdx}`,
        `${prefix}/**/*.module.css`
      ]),
      theme: {
        fontSize: {
          xs: '12px',
          sm: '16px',
          base: '20px',
          lg: '24px',
          xl: '32px'
        },
        lineHeight: {
          base: '1.17'
        },
        colors: {
          transparent: 'transparent',
          current: 'currentColor',
          black: colors.black,
          white: colors.white,
          accent: {
            200: '#99D69D',
            500: '#00990B',
            600: '#06870e'
          },
          gray: {
            100: '#ececec',
            200: '#D9D7D7',
            300: '#d1d1d1',
            400: '#C4C4C4'
          },
          blue: {
            200: '#A8B8E1'
          },
          red: {
            500: '#EC1C24'
          }
        },
        extend: {
          spacing: {
            13: '52px'
          },
          transitionDuration: {
            'entering-screen': '195ms',
            'leaving-screen': '140ms'
          }
        }
      },
      plugins: []
    };
  }
};
