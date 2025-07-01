<template>
    <div class="min-h-screen bg-custom-cream py-16 px-8 md:px-24 flex flex-col items-center relative z-25">
        <h1 class="text-custom-forest text-6xl font-lostar mb-16 text-balance">What I have already done</h1>

        <!-- Grid des projets -->
        <div class="w-full max-w-7xl">
            <!-- Mobile: Une seule colonne avec tous les projets -->
            <div class="md:hidden space-y-8">
                <UiProjectVisualizer v-for="project in projects" :key="project.id" :project="project" />
            </div>

            <!-- Desktop: 2 colonnes alternées -->
            <div class="hidden md:grid grid-cols-2 gap-8">
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
    </div>
</template>

<script setup>
// Données des projets avec tous les paramètres requis
const projects = ref([
    {
        id: 1,
        name: "Qairn",
        image: "/images/projects/qairn/qairn.webp",
        tags: ["Flutter", "Firebase", "swift", "Kotlin"],
        description: "Digital business card, an application to always have your business cards with you at your fingertips",
        date: "2025"
    },
    {
        id: 2,
        name: "Portfolio V2",
        image: "/images/projects/portfolio/portfolio.webp",
        tags: ["Nuxt.js", "Tailwind CSS", "Gsap"],
        description: "My portfolio, the one you are currently viewing!",
        date: "2025"
    },
    {
        id: 3,
        name: "Shamir Secret Sharing",
        image: "/images/projects/shamir-secret-sharing/shamir secret.webp",
        tags: ["Cryptography", "Python", "Security", "Algorithm"],
        description: "Shamir Secret Sharing is a cryptographic algorithm used to divide a secret (like a password or private key) into several pieces called “shares.” To reconstruct the original secret, you need to gather a minimum number of these shares (for example, 3 out of 5).",
        date: "2025"
    },
    {
        id: 4,
        name: "Star Colonies",
        image: "/images/projects/star-colonies/star-colonies.webp",
        tags: ["ASP.NET", "Razor Pages", "MySQL", "Tailwind CSS"],
        description: "Space colony management game, as part of my web programming course.",
        date: "2025"
    },
    {
        id: 5,
        name: "ArtConnect",
        image: "/images/projects/artconnect/ArtConnect.webp",
        tags: ["Vue.js", "ASP.NET", "Tailwind CSS"],
        description: "A platform for the sale of art between artists and collectors, allowing the discovery and purchase of art.",
        date: "2024"
    },
    {
        id: 6,
        name: "Math Project",
        image: "/images/projects/math-project/math-project.webp",
        tags: ["Java", "Arbre Lexicographique", "JGraphT"],
        description: "Three projects realized as part of my mathematics course: LexicographicTree, Boggle, and DictionaryBasedAnalysis. Each project demonstrates the importance of data structures and algorithmic efficiency in processing large amounts of data.",
        date: "2023"
    },
])
</script>