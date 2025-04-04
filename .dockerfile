# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copier uniquement les fichiers de dépendances pour mettre en cache les layers
COPY package*.json ./
RUN npm ci

# Copier le reste des fichiers et construire
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copier uniquement les dépendances de production
COPY package*.json ./
RUN npm ci --only=production

# Copier les fichiers générés depuis l'étape de build
COPY --from=build /app/.output ./output
COPY --from=build /app/.nuxt ./.nuxt
COPY --from=build /app/public ./public
COPY --from=build /app/nuxt.config.js ./

# Définir un port par défaut mais qui peut être écrasé
ENV PORT=3000
ENV HOST=0.0.0.0
ENV NODE_ENV=production

# Exposer le port comme variable
EXPOSE ${PORT}

# Utiliser un utilisateur non-root pour plus de sécurité
USER node

# Démarrer l'application avec le port configuré
CMD ["sh", "-c", "node output/server/index.mjs"]