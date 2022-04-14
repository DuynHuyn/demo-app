import { axios, auth, i18n } from './core/config'

export default {
  publicRuntimeConfig: {
    baseURL: process.env.NUXT_ENV_API_URL,
    systemId: process.env.NUXT_ENV_SYSTEM_ID,
  },
  head: {
    title: 'Home',
    titleTemplate: '%s - Yummi Partner Portal',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/jpeg', href: '/branding.jpg' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
      },
    ],
  },
  router: {
    middleware: ['auth'],
  },
  css: ['@bigin/bigin-ui-ds'],
  plugins: [
    '@/core/plugins/axios.ts',
    '@/core/plugins/filter.ts',
    '@/core/plugins/directive.ts',
    '@/core/plugins/vuelidate.ts',
    '@/core/plugins/bigin-ui.ts',
    '@/plugins/services.ts',
    '@/plugins/filter.ts',
  ],
  components: true,
  buildModules: ['@nuxt/typescript-build'],
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    // '@nuxtjs/sentry',
  ],
  axios,
  auth,
  i18n,
  // sentry,
  build: {
    // transpile: ['@nuxtjs/auth-next', '@bigin/bigin-ui-vue'],
    devMiddleware: {
      headers: {
        'Cache-Control': 'no-store',
        Vary: '*',
      },
    },
    // babel: {
    //   compact: true,
    // },
  },
}
