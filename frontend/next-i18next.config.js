module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },
  // debug: process.env.NODE_ENV === 'development',
  debug: true,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
