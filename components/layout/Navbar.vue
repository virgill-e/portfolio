<template>
    <div
        class="bg-custom-cream dark:bg-custom-forest px-4 flex justify-between md:justify-around items-center h-[10vh] text-custom-forest dark:text-custom-cream border-b-2 border-custom-olive dark:border-custom-cream text-xl">
        <nuxt-link to="/" class="underline-gradient font-lostar">Virgill_e</nuxt-link>
        <div class="hidden md:flex gap-8">
            <nuxt-link to="/" class="underline-gradient">Home</nuxt-link>
            <nuxt-link to="/projects" class="underline-gradient">Projects</nuxt-link>
        </div>
        <div class="ml-4 hidden md:block">
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
        <div class="md:hidden flex flex-col items-center justify-center" v-if="!isOpen">
            <button class="text-custom-forest" @click="toggleMenu">
                <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path ref="morphPath" id="menu-path" d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" />
                </svg>
            </button>
        </div>

        <!-- Menu Overlay -->
        <div v-show="menuVisible" ref="menuOverlay"
            class="fixed inset-0 z-50 bg-custom-cream dark:bg-custom-forest flex flex-col justify-center items-start px-8 py-12">
            <button class="absolute top-4 right-6 text-4xl" @click="toggleMenu" aria-label="Fermer le menu">
                &times;
            </button>
            <div class="space-y-12 text-custom-forest dark:text-custom-cream w-full">
                <nuxt-link @click="toggleMenu" to="/" class="block text-5xl font-lostar">Home</nuxt-link>
                <nuxt-link @click="toggleMenu" to="/projects" class="block text-5xl font-lostar">Projects</nuxt-link>
                <div class="pt-8 flex items-center gap-4">
                    <button @click="toggleDarkMode"
                        class="p-2 hover:opacity-70 transition-all duration-300 hover:scale-110 flex flex-row">
                        <span class="text-2xl mr-4">Dark mode:</span>
                        <svg ref="darkModeSvgMobile" class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                            <path ref="darkModeIconMobile" />
                            <g ref="sunRaysMobile" opacity="0">
                                <path d="M12 1L12 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                <path d="M12 21L12 23" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" />
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

const isOpen = ref(false);
const menuVisible = ref(false);
const morphPath = ref<SVGPathElement | null>(null);
const menuOverlay = ref<HTMLElement | null>(null);
const darkModeIcon = ref<SVGPathElement | null>(null);
const darkModeIconMobile = ref<SVGPathElement | null>(null);
const darkModeSvg = ref<SVGElement | null>(null);
const darkModeSvgMobile = ref<SVGElement | null>(null);
const sunRays = ref<SVGGElement | null>(null);
const sunRaysMobile = ref<SVGGElement | null>(null);

// Configuration
const ROTATION_DURATION = 10;
const sunPath = "M12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7Z";
const moonPath = "M12 7C12.93 7 13.79 7.25 14.54 7.68C13.5 8.82 13 10.34 13 12C13 13.66 13.5 15.18 14.54 16.32C13.79 16.75 12.93 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7Z";

onMounted(() => {
    const icons = [darkModeIcon.value, darkModeIconMobile.value];
    const rays = [sunRays.value, sunRaysMobile.value];

    // Initialisation des icônes
    icons.forEach(icon => {
        if (icon) icon.setAttribute('d', isDark.value ? moonPath : sunPath);
    });

    // Initialisation des rayons
    rays.forEach(ray => {
        if (ray) {
            gsap.set(ray, { opacity: isDark.value ? 0 : 1, rotation: 0, transformOrigin: "50% 50%" });
            if (!isDark.value) {
                gsap.to(ray, { rotation: 360, duration: ROTATION_DURATION, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
            }
        }
    });
});

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

function toggleDarkMode() {
    const icons = [darkModeIcon.value, darkModeIconMobile.value];
    const svgs = [darkModeSvg.value, darkModeSvgMobile.value];
    const rays = [sunRays.value, sunRaysMobile.value];
    const timeline = gsap.timeline();

    // Animation de rotation des SVG
    svgs.forEach(svg => {
        if (svg) {
            timeline.to(svg, {
                rotation: isDark.value ? 180 : -180,
                duration: 0.8,
                ease: "power2.inOut",
                transformOrigin: "50% 50%"
            }, 0);
        }
    });

    // Animation des rayons
    rays.forEach(ray => {
        if (ray) {
            if (isDark.value) {
                // Lune → Soleil : faire apparaître les rayons
                gsap.killTweensOf(ray); // Arrêter toutes les animations précédentes
                // Réinitialiser la rotation à 0 immédiatement
                gsap.set(ray, { rotation: 0, transformOrigin: "50% 50%" });
                // Faire apparaître les rayons
                timeline.to(ray, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0.3);
                // Démarrer la rotation continue après l'apparition
                timeline.to(ray, { rotation: 360, duration: ROTATION_DURATION, ease: "none", repeat: -1, transformOrigin: "50% 50%" }, 0.65);
            } else {
                // Soleil → Lune : faire disparaître les rayons
                gsap.killTweensOf(ray);
                timeline.to(ray, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0);
            }
        }
    });

    // Animation de morphing des icônes
    icons.forEach(icon => {
        if (icon) {
            timeline.to(icon, {
                duration: 0.6,
                morphSVG: { shape: isDark.value ? sunPath : moonPath },
                ease: "power2.inOut"
            }, 0.1);
        }
    });

    toggleDark();
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
