import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: false, // Pour une SPA statique
  css: ['~/assets/css/main.css'],
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
  }
});
