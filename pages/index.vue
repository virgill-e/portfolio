<template>
    <div class="min-h-screen bg-custom-cream px-16 md:px-24 relative z-25">
        <!-- title bloc -->
        <div class="flex flex-col items-center md:justify-around h-[90vh] pb-8">
            <div class="flex flex-col items-center justify-center h-3/5 md:h-3/5">
                <h1 class="split font-lostar text-custom-cream text-shadow-custom-bronze text-6xl md:text-9xl ">
                    Virgill_e
                </h1>
                <h1 class="split font-lostar text-custom-cream text-shadow-custom-bronze text-5xl md:text-9xl">
                    developper
                </h1>
            </div>
            <div class="h-3/5 md:h-2/5 w-full flex flex-col md:flex-row justify-between md:items-center">
                <p class="md:w-3/5 py-8  text-left md:text-lg text-balance   ">Hello, I'm Virgile Bigaré, a full stack
                    developer
                    passionate about creating web and mobile applications.
                    Curious and always seeking new challenges, I enjoy exploring personal projects that
                    allow me to expand my skills and stay up-to-date in an ever-evolving field.</p>
                <UiButton @click="scrollToUiProjectImageDisplays" class="py-4 md:w-1/3 md:h-1/3"
                    text="Scroll to continue ↓" />
            </div>
        </div>

        <!-- 3 favorite projects bloc -->
        <div id="favorite-projects" class="w-full flex flex-col items-center py-16">
            <h2 class="text-custom-forest py-16 text-6xl font-lostar text-balance">What I have already done</h2>

            <!-- Grid des projets -->
            <div class="w-full max-w-7xl">
                <!-- Mobile: Une seule colonne avec tous les projets -->
                <div class="md:hidden space-y-8">
                    <UiProjectVisualizer v-for="project in projects" :key="project.id" :project="project"
                        class="project-visualizer left" />
                </div>

                <!-- Desktop: 2 colonnes alternées -->
                <div class="hidden md:grid grid-cols-2 gap-8">
                    <!-- Première colonne -->
                    <div class="space-y-8">
                        <UiProjectVisualizer v-for="(project, index) in projects.filter((_, i) => i % 2 === 0)"
                            :key="project.id" :project="project" class="project-visualizer left" />
                    </div>

                    <!-- Deuxième colonne -->
                    <div class="space-y-8 mt-32">
                        <UiProjectVisualizer v-for="(project, index) in projects.filter((_, i) => i % 2 === 1)"
                            :key="project.id" :project="project" class="project-visualizer right" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { animateProjectVisualizers } from '@/assets/js/projectVisualizerAnimation';

gsap.registerPlugin(SplitText);

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
        description: "Shamir Secret Sharing is a cryptographic algorithm used to divide a secret (like a password or private key) into several pieces called 'shares.' To reconstruct the original secret, you need to gather a minimum number of these shares (for example, 3 out of 5).",
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

onMounted(() => {
    let split = new SplitText(".split", { type: "words, chars" });
    split.chars.forEach((char, i) => {
        gsap.fromTo(char, {
            opacity: 0,
            duration: 0.5,
            y: -100,
            delay: 0.05 * i
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.05 * i
        });
    });
    animateProjectVisualizers();
});

function scrollToUiProjectImageDisplays() {
    const UiProjectImageDisplays = document.getElementById('favorite-projects');
    UiProjectImageDisplays.scrollIntoView({ behavior: 'smooth' });
}
</script>