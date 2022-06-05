const { join } = require('path');

const getBaseDir = (...parts) => join('.', ...parts);
const startsWith = path => `^${getBaseDir(path)}`;

module.exports = {
  options: {
    includeOnly: {
      path: ['^app', '^pages', '^widgets', '^features', '^entities', '^shared']
    }
  },
  forbidden: [
    {
      name: 'no-pages-on-pages',
      severity: 'error',
      comment: 'Page MUST not depends on another page.',
      from: {
        path: startsWith('pages/([^/]+)/?.+'),
        pathNot: startsWith('pages/(routes|paths).ts')
      },
      to: { path: startsWith('pages/(?!$1)/?.+'), pathNot: startsWith('pages/(routes|paths).ts') }
    },
    {
      name: 'no-widgets-on-widgets',
      severity: 'error',
      comment: 'One widget MUST not depends on another widget.',
      from: { path: startsWith('widgets/([^/]+)/?.+') },
      to: { path: startsWith('widgets/(?!$1)/?.+') }
    },
    {
      name: 'no-features-on-features',
      severity: 'error',
      comment: 'One feature MUST not depends on another feature.',
      from: { path: startsWith('features/([^/]+)/?.+') },
      to: { path: startsWith('features/(?!$1)/?.+') }
    },
    {
      name: 'no-entities-on-entities',
      severity: 'error',
      comment: 'One entity MUST not depends on another entity.',
      from: { path: startsWith('entities/([^/]+)/?.+') },
      to: { path: startsWith('entities/(?!$1)/?.+') }
    },
    // ---------------------------------------------------------------------------------------------
    {
      name: 'no-processes-on-high-level',
      severity: 'error',
      comment: 'Processes MUST not depends on high level layers.',
      from: { path: startsWith('processes/([^/]+)/?.+') },
      to: { path: startsWith('app/([^/]+)/?.+') }
    },
    {
      name: 'no-pages-on-high-level',
      severity: 'error',
      comment: 'Pages MUST not depends on high level layers.',
      from: { path: startsWith('pages/([^/]+)/?.+') },
      to: {
        path: startsWith('(app|processes)/([^/]+)/?.+')
      }
    },
    {
      name: 'no-widgets-on-high-level',
      severity: 'error',
      comment: 'Widgets MUST not depends on high level layers.',
      from: { path: startsWith('widgets/([^/]+)/?.+') },
      to: {
        path: startsWith('(app|processes|pages)/([^/]+)/?.+'),
        pathNot: startsWith('pages/(routes|paths).ts')
      }
    },
    {
      name: 'no-features-on-high-level',
      severity: 'error',
      comment: 'Features MUST not depends on high level layers.',
      from: { path: startsWith('features/([^/]+)/?.+') },
      to: {
        path: startsWith('(app|processes|pages|widgets)/([^/]+)/?.+'),
        pathNot: startsWith('pages/(routes|paths).ts')
      }
    },
    {
      name: 'no-entities-on-high-level',
      severity: 'error',
      comment: 'Entities MUST not depends on high level layers.',
      from: { path: startsWith('entities/([^/]+)/?.+') },
      to: { path: startsWith('(app|processes|pages|widgets|features)/([^/]+)/?.+') }
    },
    {
      name: 'no-shared-on-high-level',
      severity: 'error',
      comment: 'Shared MUST not depends on high level layers.',
      from: { path: startsWith('shared/([^/]+)/?.+') },
      to: { path: startsWith('(app|processes|pages|widgets|features|entities)/([^/]+)/?.+') }
    }
  ]
};
