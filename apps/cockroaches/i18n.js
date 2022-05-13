module.exports = {
  locales: ['en', 'ru'],
  defaultLocale: 'ru',
  loadLocaleFrom: (lang, ns) => import(`./public/locales/${lang}/${ns}.json`).then(m => m.default),
  pages: {
    '*': ['common'],
    '/auth': ['auth']
  },
  logger: () => void 0
};
