export default {
  css: [
    '~/assets/scss/common.scss'
  ],
  serverMiddleware: [
    { path: '/api', handler: '~/api/plants.js' },
  ],
};
