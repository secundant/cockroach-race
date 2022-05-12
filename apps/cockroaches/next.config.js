const { createNextConfig, env } = require('config/next');
const nextTranslate = require('next-translate');

/**
 * @type {import('next').NextConfig}
 */
const configuration = {
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = createNextConfig(
  {
    cwd: __dirname,
    workspaceDependencies: ['ui'],
    analyzer: {
      enabled: env.bool('ANALYZE'),
      detailed: true
    },
    plugins: [nextTranslate]
  },
  configuration
);
