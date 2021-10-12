export default {
  head: {
    title: 'life-nuxt',
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

  css: [
    '@/assets/css/global.scss'
  ],

  plugins: [
    '~/plugins/google_maps'
  ],

  components: false,

  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss'
  ],

  modules: [
    'nuxt-svg-loader',
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],

  axios: {},

  svgLoader: {
    svgoConfig: {
      plugins: [
        { prefixIds: false }
      ]
    }
  },
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  styleResources: {
    scss: [
      '~/assets/css/misc/variables.scss',
      '~/assets/css/misc/breakpoints.scss'
    ]
  },

  build: {
    transpile: [/^vue2-google-maps($|\/)/],
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
