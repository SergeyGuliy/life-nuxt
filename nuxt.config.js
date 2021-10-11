export default {
  head: {
    title: 'nuxt-sandbox',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [],

  plugins: [],

  components: false,

  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],

  axios: {},

  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  styleResources: {
    scss: [
      '~/assets/styles/global/variables.scss',
      '~/assets/styles/global/breakpoints.scss'
    ]
  },

  build: {
    loaders: {
      sass: {
        implementation: require('sass')
      },
      scss: {
        implementation: require('sass')
      }
    }
  }
}
