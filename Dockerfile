# Dockerfile pour Nuxt 4 - Déploiement Dokploy
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer TOUTES les dépendances (dev + prod) pour le build
RUN npm ci && npm cache clean --force

# Copier le code source
COPY . .

# Construire l'application
RUN npm run build

# Supprimer les devDependencies après le build
RUN npm prune --production

# Exposer le port 3001
EXPOSE 3001

# Définir les variables d'environnement
ENV NODE_ENV=production
ENV PORT=3001
ENV HOST=0.0.0.0

# Commande pour démarrer l'application
CMD ["node", ".output/server/index.mjs"]
