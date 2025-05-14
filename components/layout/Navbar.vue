<template>
    <div
        class="bg-custom-cream flex justify-between md:justify-around items-center h-[10vh] text-custom-forest border-b-2 border-custom-olive text-xl">
        <a href="#" class="underline-gradient font-lostar">Virgill_e</a>
        <div class="hidden md:flex gap-8">
            <a href="#" class="underline-gradient">Projects</a>
            <a href="#" class="underline-gradient">About</a>
            <a href="#" class="underline-gradient">Résumé</a>
        </div>
        <a href="#" class="hidden md:block underline-gradient">Contact</a>
        <div class="md:hidden flex flex-col items-center justify-center" v-if="!isOpen">
            <button class="text-custom-forest" @click="toggleMenu">
                <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path ref="morphPath" id="menu-path" d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" />
                </svg>
            </button>
        </div>

        <!-- Menu Overlay -->
        <div v-show="menuVisible" ref="menuOverlay"
            class="fixed inset-0 z-50 bg-custom-cream flex flex-col justify-center items-start px-8 py-12">
            <button class="absolute top-4 right-6 text-4xl" @click="toggleMenu" aria-label="Fermer le menu">
                &times;
            </button>
            <div class="space-y-12 text-custom-forest w-full">
                <a @click="toggleMenu" href="#" class="block text-5xl font-lostar">Projects</a>
                <a @click="toggleMenu" href="#" class="block text-5xl font-lostar">About</a>
                <a @click="toggleMenu" href="#" class="block text-5xl font-lostar">Résumé</a>
                <a @click="toggleMenu" href="#" class="block text-5xl font-lostar">Contact</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(MorphSVGPlugin);

const isOpen = ref(false);
const menuVisible = ref(false);
const morphPath = ref<SVGPathElement | null>(null);
const menuOverlay = ref<HTMLElement | null>(null);

function animateOverlay(open: boolean) {
    const overlay = menuOverlay.value;
    if (!overlay) return;
    if (open) {
        gsap.fromTo(
            overlay,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
    } else {
        gsap.to(overlay, {
            opacity: 0,
            y: -50,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
                menuVisible.value = false;
            }
        });
    }
}

function toggleMenu() {
    const path = morphPath.value;
    const burger = "M4 6h16M4 12h16M4 18h16";
    const x = "M6 6L18 18M12 12M6 18L18 6";
    if (!isOpen.value) {
        // Ouvre le menu
        menuVisible.value = true;
        isOpen.value = true;
        nextTick(() => {
            if (path) {
                gsap.to(path, {
                    duration: 0.5,
                    morphSVG: { shape: x },
                    ease: "power2.inOut"
                });
            }
            animateOverlay(true);
        });
    } else {
        // Ferme le menu
        isOpen.value = false;
        if (path) {
            gsap.to(path, {
                duration: 0.5,
                morphSVG: { shape: burger },
                ease: "power2.inOut"
            });
        }
        animateOverlay(false);
    }
}

</script>
