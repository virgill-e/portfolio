import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  // Pour une SPA statique
  ssr: false,

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      link: [
        { rel: 'preload', href: '/fonts/Lostar.ttf', as: 'font', type: 'font/ttf', crossorigin: 'anonymous' }
      ]
    }
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  nitro: {
    preset: 'node-server', // Pour le déploiement serveur
    port: process.env.PORT ? parseInt(process.env.PORT) : 3001,
    host: process.env.HOST || '0.0.0.0',
    // Configuration pour servir les assets statiques en mode SPA
    serveStatic: true,
  },

  // Configuration pour la production
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || ''
    }
  },

  modules: ['@nuxt/image']
});