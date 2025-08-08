<template>
    <div class="min-h-screen bg-custom-cream px-4 md:px-24 relative z-25">
        <!-- title bloc -->
        <div class="flex flex-col items-center md:justify-around h-[90vh] pb-16 md:pb-32">
            <div class="flex flex-col items-center justify-center h-2/5 md:h-3/5">
                <h1 class="split font-lostar text-custom-cream text-shadow-custom-bronze text-6xl md:text-9xl">
                    Virgill_e
                </h1>
                <h1 class="split font-lostar text-custom-cream text-shadow-custom-bronze text-5xl md:text-9xl">
                    developper
                </h1>
            </div>
            <div class="h-3/5 md:h-2/5 w-full flex flex-col md:flex-row justify-between md:items-center">
                <p class="md:w-3/5 py-4 md:py-8  text-left md:text-lg text-balance   ">Hello, I'm Virgile Bigaré, a full
                    stack
                    developer
                    passionate about creating web and mobile applications.
                    Curious and always seeking new challenges, I enjoy exploring personal projects that
                    allow me to expand my skills and stay up-to-date in an ever-evolving field.</p>
                <UiButton @click="scrollToUiProjectImageDisplays" class="py-4 md:w-1/3 md:h-1/3" text="My projects ↓" />
            </div>
        </div>

        <!-- 3 favorite projects bloc -->
        <div id="favorite-projects" class="w-full flex flex-col items-center pb-16">
            <h2 class="text-custom-forest py-8 md:py-16 text-6xl font-lostar text-balance text-center">What I have
                already
                done</h2>

            <!-- Grid des projets -->
            <div class="w-full max-w-7xl">
                <!-- Mobile: Une seule colonne avec tous les projets -->
                <div class="md:hidden space-y-4 md:space-y-8">
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
import { animateSplitText, animateProjectVisualizers } from '@/assets/js/animations';
import { projects as projectsData } from '@/data/projects';

// Import des données des projets depuis le fichier séparé
const projects = ref(projectsData);

onMounted(() => {
    animateSplitText(".split");
    animateProjectVisualizers();
});

function scrollToUiProjectImageDisplays() {
    const UiProjectImageDisplays = document.getElementById('favorite-projects');
    UiProjectImageDisplays.scrollIntoView({ behavior: 'smooth' });
}
</script>