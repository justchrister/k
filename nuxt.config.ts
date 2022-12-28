import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  css: ['@/assets/stylesheet.css'],
  build: {
    transpile: ['chart.js'],
  },
  serverMiddleware: [
    // Transactions
    { path: "/api/transactions", handler: "~/server-middleware/transactions/createTransaction.ts" },
    { path: "/api/transactions", handler: "~/server-middleware/transactions/getTransactions.ts" },
    { path: "/api/transactions", handler: "~/server-middleware/transactions/autoInvest.ts" },

    // Exchange
    { path: "/api/exchange", handler: "~/server-middleware/exchange/createOrder.ts" },
    { path: "/api/exchange", handler: "~/server-middleware/exchange/getOrders.ts" },
    { path: "/api/exchange", handler: "~/server-middleware/exchange/matchOrders.ts" },

    // BFF
    { path: "/api/bff", handler: "~/server-middleware/bff/dailyCalculatedPortfolioValue.ts" },
    { path: "/api/bff", handler: "~/server-middleware/bff/dailyCalculatedAccountBalance.ts" },

    // Cards
    { path: "/api/cards", handler: "~/server-middleware/cards/getCards.ts" }
  ],
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
        { name: 'description', content: 'Make money, make a difference!' }
      ],
    }
  }
})