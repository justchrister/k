import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase', 
    '@nuxt/content'
  ],
  css: ['@/assets/stylesheet.scss'],
  build: {
    transpile: ['chart.js'],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/base/_variables.scss" as *;'
        }
      }
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=500, initial-scale=1',
      title: 'Undefined',
      link: [ 
        { rel: 'icon', type: "image/x-icon", href: '/icon/icon.ico' },
        { rel: 'icon', type: "image/png", sizes: '32x32', href: '/icon/icon-32.png' } ,
        { rel: 'icon', type: "image/png", sizes: '180x180', href: '/icon/icon-180.png' } ,
        { rel: 'icon', type: "image/svg+xml", href: '/icon/icon.svg' } ,
        { rel: 'manifest', type: "image/x-icon", href: '/manifest.webmanifest' },
        { rel: 'preload', as: 'font', href: "/fonts/display.woff2", crossorigin: true},
        { rel: 'preload', as: 'font', href: "/fonts/body.woff2", crossorigin: true },
        { rel: 'preload', as: 'font', href: "/fonts/body-bold.woff2", crossorigin: true}
      ],
      meta: [
        { name: 'description', content: 'Make money, make a difference!' },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1"
        }
      ],
    }
  },
  components: [{
    path: '~/components',
    global: true
  }]
})