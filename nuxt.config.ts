// https://nuxt.com/docs/api/configuration/nuxt-config

const appName = 'EMS'
const appDescription = "You're in the right place to manage your school's data"

export default defineNuxtConfig({
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }, // Add this line
      // Other meta tags if needed
    ],
  },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@formkit/auto-animate",
    "@pinia/nuxt",
    '@vite-pwa/nuxt',
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  aliases: {
    nuxt: "logos:nuxt-icon",
  },
  plugins: ["~/plugins/vue3-toastify.js",],

  devServer: {
    port: 3002,
  },

  ssr: false,

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
})


