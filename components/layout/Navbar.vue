<template>
    <div
        class="bg-custom-cream dark:bg-custom-forest px-4 flex justify-between md:justify-around items-center h-[10vh] text-custom-forest dark:text-custom-cream border-b-2 border-custom-olive dark:border-custom-cream text-xl">
        <nuxt-link to="/" class="underline-gradient font-lostar">Virgill_e</nuxt-link>
        <div class="ml-4">
            <button @click="toggleDarkMode" class="p-2 hover:opacity-70 transition-all duration-300 hover:scale-110">
                <svg ref="darkModeSvg" class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path ref="darkModeIcon" />
                    <g ref="sunRays" opacity="0">
                        <path d="M12 1L12 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        <path d="M12 21L12 23" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" />
                        <path d="M1 12L3 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        <path d="M21 12L23 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" />
                        <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" />
                    </g>
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, inject, onMounted } from 'vue';
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

const toggleDark = inject('toggleDark') as () => void;
const isDark = inject('isDark') as any;

gsap.registerPlugin(MorphSVGPlugin);

const darkModeIcon = ref<SVGPathElement | null>(null);
const darkModeSvg = ref<SVGElement | null>(null);
const sunRays = ref<SVGGElement | null>(null);

// Configuration
const ROTATION_DURATION = 10;
const sunPath = "M12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7Z";
const moonPath = "M12 7C12.93 7 13.79 7.25 14.54 7.68C13.5 8.82 13 10.34 13 12C13 13.66 13.5 15.18 14.54 16.32C13.79 16.75 12.93 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7Z";

onMounted(() => {
    // Initialisation de l'icône
    if (darkModeIcon.value) {
        darkModeIcon.value.setAttribute('d', isDark.value ? moonPath : sunPath);
    }

    // Initialisation des rayons
    if (sunRays.value) {
        gsap.set(sunRays.value, { opacity: isDark.value ? 0 : 1, rotation: 0, transformOrigin: "50% 50%" });
        if (!isDark.value) {
            gsap.to(sunRays.value, { rotation: 360, duration: ROTATION_DURATION, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
        }
    }
});

function toggleDarkMode() {
    const timeline = gsap.timeline();

    // Animation de rotation du SVG
    if (darkModeSvg.value) {
        timeline.to(darkModeSvg.value, {
            rotation: isDark.value ? 180 : -180,
            duration: 0.8,
            ease: "power2.inOut",
            transformOrigin: "50% 50%"
        }, 0);
    }

    // Animation des rayons
    if (sunRays.value) {
        if (isDark.value) {
            // Lune → Soleil : faire apparaître les rayons
            gsap.killTweensOf(sunRays.value);
            // Réinitialiser la rotation à 0 immédiatement
            gsap.set(sunRays.value, { rotation: 0, transformOrigin: "50% 50%" });
            // Faire apparaître les rayons
            timeline.to(sunRays.value, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0.3);
            // Démarrer la rotation continue après l'apparition
            timeline.to(sunRays.value, { rotation: 360, duration: ROTATION_DURATION, ease: "none", repeat: -1, transformOrigin: "50% 50%" }, 0.65);
        } else {
            // Soleil → Lune : faire disparaître les rayons
            gsap.killTweensOf(sunRays.value);
            timeline.to(sunRays.value, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0);
        }
    }

    // Animation de morphing de l'icône
    if (darkModeIcon.value) {
        timeline.to(darkModeIcon.value, {
            duration: 0.6,
            morphSVG: { shape: isDark.value ? sunPath : moonPath },
            ease: "power2.inOut"
        }, 0.1);
    }

    toggleDark();
}

</script>
