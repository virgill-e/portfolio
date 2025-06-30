<template>
    <div class="min-h-screen bg-custom-cream py-16 px-8 md:px-24 flex flex-col items-center relative z-25">
        <h1 class="text-custom-forest text-6xl font-lostar mb-16">What I have already done</h1>

        <!-- Grid des projets sur 2 colonnes -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl w-full">
            <!-- Première colonne -->
            <div class="space-y-8">
                <UiProjectVisualizer v-for="(project, index) in projects.filter((_, i) => i % 2 === 0)"
                    :key="project.id" :project="project" />
            </div>

            <!-- Deuxième colonne -->
            <div class="space-y-8 mt-32">
                <UiProjectVisualizer v-for="(project, index) in projects.filter((_, i) => i % 2 === 1)"
                    :key="project.id" :project="project" />
            </div>
        </div>
    </div>
</template>

<script setup>
// Données des projets avec tous les paramètres requis
const projects = ref([
    {
        id: 1,
        name: "ArtConnect",
        image: "/images/projects/artconnect/ArtConnect.webp",
        tags: ["Vue.js", "Node.js", "MongoDB", "Art"],
        description: "Une plateforme de mise en relation entre artistes et collectionneurs, permettant la découverte et l'achat d'œuvres d'art contemporaines.",
        date: "2024"
    },
    {
        id: 2,
        name: "Math Project",
        image: "/images/projects/math-project/math-project.webp",
        tags: ["Python", "Mathematics", "Algorithm", "Visualization"],
        description: "Application de visualisation de concepts mathématiques complexes avec des algorithmes interactifs et des représentations graphiques.",
        date: "2023"
    },
    {
        id: 3,
        name: "Portfolio V2",
        image: "/images/projects/portfolio/portfolio.webp",
        tags: ["Nuxt.js", "Vue.js", "Tailwind CSS", "Design"],
        description: "Portfolio personnel moderne avec animations fluides, design responsive et présentation interactive de mes projets.",
        date: "2024"
    },
    {
        id: 4,
        name: "Qairn",
        image: "/images/projects/qairn/qairn.webp",
        tags: ["React", "TypeScript", "API", "Data"],
        description: "Application de gestion de données avec interface intuitive et fonctionnalités avancées de filtrage et d'analyse.",
        date: "2023"
    },
    {
        id: 5,
        name: "Shamir Secret Sharing",
        image: "/images/projects/shamir-secret-sharing/shamir secret.webp",
        tags: ["Cryptography", "Python", "Security", "Algorithm"],
        description: "Implémentation de l'algorithme de partage de secret de Shamir pour la sécurisation de données sensibles.",
        date: "2022"
    },
    {
        id: 6,
        name: "Star Colonies",
        image: "/images/projects/star-colonies/star-colonies.webp",
        tags: ["Game Development", "Unity", "C#", "Strategy"],
        description: "Jeu de stratégie spatial où les joueurs développent des colonies interstellaires et gèrent des ressources cosmiques.",
        date: "2022"
    }
])
</script>