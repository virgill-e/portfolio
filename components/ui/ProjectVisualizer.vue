<template>
    <div
        class="group relative overflow-hidden rounded-xl bordertransition-all duration-1000 hover:scale-103 hover:shadow-2xl project-card aspect-square">
        <!-- Image de fond avec overlay -->
        <div class="relative w-full h-full overflow-hidden">
            <img :src="project.image" :alt="project.name" class="w-full h-full object-cover project-image" />

        </div>

        <!-- Contenu -->
        <div
            class="absolute inset-0 flex flex-col justify-between text-white project-content">
            <!-- Date en haut à droite -->
            <div class="flex justify-end">
                <span
                    class="bg-custom-amber/90 text-custom-forest px-3 py-1 rounded-full text-sm font-medium project-date">
                    {{ project.date }}
                </span>
            </div>

            <!-- Contenu principal en bas -->
            <div class="space-y-4 backdrop-blur-xs text-custom-forest bg-gradient-to-t from-custom-cream via-custom-cream/90 to-custom-cream/20 p-8 pt-16">
                <!-- Titre -->
                <h3 class="text-3xl font-lostar font-bold leading-tight project-title">
                    {{ project.name }}
                </h3>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2">
                    <span v-for="tag in project.tags" :key="tag"
                        class="bg-custom-olive/80 text-white px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm project-tag">
                        {{ tag }}
                    </span>
                </div>

                <!-- Description -->
                <p class="text-custom-forest text-sm leading-relaxed line-clamp-3 project-description">
                    {{ project.description }}
                </p>
            </div>
        </div>

    </div>
</template>

<script setup>
defineProps({
    project: {
        type: Object,
        required: true,
        validator: (project) => {
            return project.name && project.image && project.tags && project.description && project.date
        }
    }
})
</script>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Z-index management pour contrer le z-index global des images */
.project-card {
    position: relative;
    z-index: 100001;
}

.project-image {
    position: relative;
    z-index: 1;
}

.project-overlay {
    position: absolute;
    z-index: 2;
}

.project-content {
    position: absolute;
    z-index: 3;
}

.project-date,
.project-title,
.project-tag,
.project-description {
    position: relative;
    z-index: 4;
}

.project-hover {
    position: absolute;
    z-index: 3;
}
</style>