# Utiliser une image Node.js plus récente
FROM node:20-alpine AS base

# Build stage
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage with nginx
FROM nginx:alpine AS prod-stage
COPY --from=build-stage /app/.output/public /usr/share/nginx/html

# Configuration nginx pour SPA
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
