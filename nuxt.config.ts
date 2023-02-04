import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase', '@nuxt/content'],
  content: {
    // https://content.nuxtjs.org/api/configuration
  },
  css: ['@/assets/stylesheet.css'],
  build: {
    transpile: ['chart.js'],
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=500, initial-scale=1',
      title: 'Kalt — Undefined',
      link: [ 
        { rel: 'icon', type: "image/x-icon", href: '/favicon/favicon.ico' },
        { rel: 'icon', type: "image/png", sizes: '32x32', href: '/favicon//favicon-32x32.png' } ,
        { rel: 'icon', type: "image/png", sizes: '16x16', href: '/favicon//favicon-16x16.png' } ,
        { rel: 'manifest', type: "image/x-icon", href: '/favicon/site.webmanifest' }
      ],
      meta: [
        // <meta name="description" content="My amazing site">
        { name: 'description', content: 'Make money, make a difference!' },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1"
        }
      ],
    }
  },

  runtimeConfig: {
    supabase_service_role: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZ2l0ZnNvZHRyc2J0Y2J3bnB2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2OTM4NDQyMCwiZXhwIjoxOTg0OTYwNDIwfQ.Ektf29cT8wufwIutky0xZ1naEc13uz0dVfPt94rTH8g',
    supabase_service_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZ2l0ZnNvZHRyc2J0Y2J3bnB2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2OTM4NDQyMCwiZXhwIjoxOTg0OTYwNDIwfQ.Ektf29cT8wufwIutky0xZ1naEc13uz0dVfPt94rTH8g',
    supabase_url: 'https://urgitfsodtrsbtcbwnpv.supabase.co',
    public: {
      supabase_url: 'https://urgitfsodtrsbtcbwnpv.supabase.co',
      supabase_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZ2l0ZnNvZHRyc2J0Y2J3bnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkzODQ0MjAsImV4cCI6MTk4NDk2MDQyMH0.l9JEhyEnQ8ILtdJ3mUrCYtWm_Sx6eXHUGNQ8FnSF0yw',
    }
  }
})