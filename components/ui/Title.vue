<template>
    <div class="title-3d-container">
        <h1 class="title-stack split font-lostar text-6xl md:text-9xl">
            <span class="title-layer layer-one text-custom-bronze text-shadow-custom-bronze"
                aria-hidden="true">Virgill_e</span>
            <span class="title-layer layer-two text-custom-amber text-shadow-custom-amber"
                aria-hidden="true">Virgill_e</span>
            <span class="title-layer layer-three text-custom-cream">Virgill_e</span>
        </h1>
    </div>
    <div class="title-3d-container">
        <h1 class="title-stack split font-lostar text-6xl md:text-9xl">
            <span class="title-layer layer-one text-custom-bronze text-shadow-custom-bronze"
                aria-hidden="true">Developer</span>
            <span class="title-layer layer-two text-custom-amber text-shadow-custom-amber"
                aria-hidden="true">Developer</span>
            <span class="title-layer layer-three text-custom-cream">Developer</span>
        </h1>
    </div>
</template>

<style scoped>
.title-3d-container {
    perspective: 1000px;
    perspective-origin: center center;
    display: inline-block;
}

.title-stack {
    position: relative;
    display: inline-block;
    transform-style: preserve-3d;
    will-change: transform;
    backface-visibility: hidden;
}

.title-layer {
    position: absolute;
    top: 0;
    left: 0;
    transform-style: preserve-3d;
    will-change: transform;
    backface-visibility: hidden;
}

.layer-one {
    transform: translate(8px, -8px) translateZ(-20px);
}

.layer-two {
    transform: translate(4px, -4px) translateZ(-10px);
}

.layer-three {
    position: relative;
    transform: translateZ(0);
}
</style>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { animateSplitTextTitles, add3DMouseEffect } from '@/assets/js/animations/textAnimations';

let cleanupFunctions = [];

onMounted(() => {
    // Animer tous les titres
    animateSplitTextTitles("h1");

    // Appliquer l'effet 3D à TOUS les h1 avec la classe title-stack
    const h1Elements = document.querySelectorAll('h1.title-stack');
    h1Elements.forEach((h1Element) => {
        const cleanup = add3DMouseEffect(h1Element);
        if (cleanup) {
            cleanupFunctions.push(cleanup);
        }
    });
});

onUnmounted(() => {
    // Nettoyer tous les effets 3D
    cleanupFunctions.forEach((cleanup) => {
        if (cleanup) {
            cleanup();
        }
    });
    cleanupFunctions = [];
});
</script>