<template>
    <div
        class="bg-custom-cream flex justify-between md:justify-around items-center p-4 text-custom-forest border-b-2 border-custom-olive text-xl">
        <a href="#" class="underline-gradient font-lostar">Virgill_e</a>
        <div class="hidden md:flex gap-8">
            <a href="#" class="underline-gradient">Projects</a>
            <a href="#" class="underline-gradient">About</a>
            <a href="#" class="underline-gradient">CV</a>
        </div>
        <a href="#" class="hidden md:block underline-gradient">Contact</a>
        <div class="md:hidden flex flex-col items-center justify-center">
            <button class="text-custom-forest" @click="toggleMenu">
                <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path ref="morphPath" id="menu-path" d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(MorphSVGPlugin);

const isOpen = ref(false);
const morphPath = ref<SVGPathElement | null>(null);

function toggleMenu() {
    isOpen.value = !isOpen.value;
    const path = morphPath.value;
    if (!path) return;

    const burger = "M4 6h16M4 12h16M4 18h16";
    const x = "M6 6L18 18M12 12M6 18L18 6";

    gsap.to(path, {
        duration: 0.5,
        morphSVG: { shape: isOpen.value ? x : burger },
        ease: "power2.inOut"
    });
}

</script>
