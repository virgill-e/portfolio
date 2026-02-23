import tailwindcss from "@tailwindcss/vite";
import { ViteMinifyPlugin } from 'vite-plugin-minify';


export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  // Pour une SPA statique
  ssr: false,

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Virgile Bigaré | Développeur Web Full-Stack',
      htmlAttrs: {
        lang: 'fr'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portfolio de Virgile Bigaré, développeur web full-stack passionné par la création d\'applications web et mobiles. Découvrez mes projets et compétences.' },
        { name: 'author', content: 'Virgile Bigaré' },

        // Open Graph (pour le partage sur LinkedIn, Facebook, etc.)
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Virgile Bigaré | Développeur Web Full-Stack' },
        { property: 'og:description', content: 'Portfolio de Virgile Bigaré, développeur web full-stack passionné par la création d\'applications web et mobiles.' },
        { property: 'og:url', content: 'https://virgill-e.com/' },
        { property: 'og:locale', content: 'fr_FR' },
        { property: 'og:site_name', content: 'Virgile Bigaré - Portfolio' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Virgile Bigaré | Développeur Web Full-Stack' },
        { name: 'twitter:description', content: 'Portfolio de Virgile Bigaré, développeur web full-stack passionné par la création d\'applications web et mobiles.' },
      ],
      link: [
        { rel: 'canonical', href: 'https://virgill-e.com/' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Virgile Bigaré',
            url: 'https://virgill-e.com',
            jobTitle: 'Développeur Web Full-Stack',
            sameAs: [
              'https://github.com/virgill-e',
              'https://www.linkedin.com/in/virgile-bigar%C3%A9',
              'https://x.com/virgill_e',
              'https://www.instagram.com/virgill_e'
            ],
            email: 'virgile.bigare@gmail.com',
            knowsAbout: ['Développement Web', 'Full-Stack', 'Applications Mobiles', 'JavaScript', 'Vue.js', 'Nuxt.js']
          })
        }
      ]
    }
  },

  vite: {
    plugins: [
      tailwindcss(),
      ViteMinifyPlugin({
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        minifyCSS: true,
        minifyJS: true,
      }),
    ],
    build: {
      cssMinify: 'lightningcss', // Plus rapide que esbuild pour le CSS
      minify: 'esbuild', // Déjà par défaut, mais explicite
    },
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