export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Get A Ghost 👻',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'apple-mobile-web-app-title', content: 'Get A Ghost' },
      { name: 'application-name', content: 'Get A Ghost' },
      { name: 'msapplication-TileColor', content: '#363636' },
      { name: 'theme-color', content: '#363636' },
    ],
    htmlAttrs: {
      lang: 'de',
    },
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'mask-icon',
        color: '#363636',
        href: '/safari-pinned-tab.svg',
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true,
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/notify.server.js',
    '@/plugins/notify.client.js',
    '@/plugins/axios.js',
    '@/plugins/pincode.client.js',
    '@/plugins/vcalendar.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
  ],
  auth: {
    strategies: {
      local: {
        token: {
          required: false,
          type: false,
        },
        user: {
          property: 'data',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'get' },
          user: { url: '/users/me', method: 'get' },
          home: '/',
        },
      },
    },
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/',
    },
    fullPathRedirect: true,
    cookie: {
      options: {
        secure: process.env.NODE_ENV && process.env.NODE_ENV === 'production',
      },
    },
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BROWSER_BASE_API_URL,
    credentials: true,
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_API_URL,
    },
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_API_URL,
    },
  },
  router: {
    middleware: ['auth'],
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['gsap'],
  },
}
