const { createNextConfig, env } = require('config/next');
const nextTranslate = require('next-translate');

/**
 * @type {import('next').NextConfig}
 */
const configuration = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    esmExternals: false
  }
};

module.exports = createNextConfig(
  {
    cwd: __dirname,
    workspaceDependencies: ['ui'],
    analyzer: {
      enabled: env.bool('ANALYZE'),
      detailed: false
    },
    plugins: [nextTranslate]
  },
  configuration
);
