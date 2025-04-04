# Virgill_e Portfolio

![Portfolio Preview](/assets/images/preview.png)

## 🌟 Présentation


## 🛠️ Technologies utilisées

- **Framework** : [Nuxt.js](https://nuxt.com/)
- **CSS** : [TailwindCSS](https://tailwindcss.com/)
- **Typographie** : Polices personnalisées (Lostar, Neue Montreal)

## 💻 Installation et développement

### Prérequis

- Node.js (version 16 ou supérieure)
- npm

### Installation

```bash
# Cloner le projet
git clone https://github.com/Virgill-e/portfolio.git
cd portfolio

# Installer les dépendances
npm install
```

### Développement

```bash
# Lancer le serveur de développement
npm run dev
```

Le site sera accessible à l'adresse http://localhost:3000

### Production

```bash
# Construire pour la production
npm run build

# Prévisualiser la version de production
npm run preview
```

## 🐳 Déploiement avec Docker

Le projet peut être facilement déployé à l'aide de Docker.

```bash
# Construire l'image Docker
docker build -t virgille-portfolio -f .dockerfile .

# Exécuter le conteneur
docker run -p 3000:3000 virgille-portfolio

# Pour exécuter avec un port personnalisé
docker run -e PORT=3001 -p 3001:3001 virgille-portfolio


Conçu et développé avec ❤️ par Virgile Bigaré.
