<template>
    <section ref="sectionRef" class="w-full bg-custom-cream relative overflow-x-hidden py-24">
        <!-- Background Decorations -->
        <img src="@/assets/images/Polygon 1.svg" alt="" class="absolute top-40 left-[-5%] w-64 md:w-96 rotate-12 pointer-events-none opacity-50 z-0">
        <img src="@/assets/images/Polygon 2.svg" alt="" class="absolute bottom-1/4 right-[-5%] w-64 md:w-96 -rotate-12 pointer-events-none opacity-50 z-0">

        <!-- Title -->
         <h2 ref="titleRef" class="font-bagel text-6xl md:text-8xl text-custom-bronze mb-32 z-10 text-center relative">
            Projects
        </h2>

        <div class="flex flex-col relative w-full">
            <div 
                v-for="(project, index) in projects" 
                :key="index"
                class="min-h-screen pb-32 md:pb-8 w-full flex items-center justify-center sticky -top-32 md:top-16 bg-custom-cream project-panel border-t-2 border-custom-bronze/10 md:border-t-0"
            >
                <div class="container mx-auto px-6 md:px-12 max-w-7xl">
                    <div :class="['flex flex-col gap-16 items-center', index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row']">
                        
                        <!-- Text Content -->
                        <div class="w-full md:w-1/2 space-y-8 z-10">
                            <h3 class="font-bagel text-5xl md:text-6xl text-custom-bronze leading-tight">
                                {{ project.title }}
                            </h3>
                            
                            <div class="flex flex-wrap gap-3">
                                <span v-for="tag in project.tags" :key="tag" 
                                      class="font-bagel text-sm md:text-base text-custom-forest bg-custom-cream px-5 py-2 border-2 border-custom-forest rounded-full shadow-[3px_3px_0px_0px_var(--color-custom-bronze)] cursor-default">
                                    {{ tag }}
                                </span>
                            </div>

                            <p class="font-lato text-xl text-custom-forest leading-loose max-w-xl">
                                {{ project.description }}
                            </p>
                        </div>

                        <!-- Image Display Stack -->
                        <div class="w-full md:w-1/2 relative group image-stack-container">
                            <!-- Background decoration behind the stack -->
                             <div class="absolute inset-0 bg-custom-bronze rounded-[2.5rem] rotate-3 opacity-20 transform scale-105 transition-all duration-500 pointer-events-none"></div>
                             
                             <UiProjectImageStack :images="project.images" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Noshaq from '@/assets/images/Noshaq.png';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const titleRef = ref(null);

const projects = [
    {
        title: 'SaaS Dashboard',
        tags: ['Vue.js', 'Tailwind', 'Chart.js', 'Node.js'],
        description: 'A comprehensive analytics dashboard for modern SaaS applications. Features real-time data visualization, user management, and customizable reporting widgets.',
        // Simulating multiple screenshots for the stack
        images: [Noshaq, Noshaq, Noshaq]
    },
    {
        title: 'Neo-Chic Commerce',
        tags: ['Nuxt', 'Shopify', 'GSAP', 'Stripe'],
        description: 'A vibrant e-commerce experiences for a fashion brand. Optimized for conversion with smooth animations and a lightning-fast checkout process.',
        images: [Noshaq, Noshaq, Noshaq]
    }
];

let ctx;

onMounted(() => {
    ctx = gsap.context(() => {
        // Title Animation
        gsap.from(titleRef.value, {
            scrollTrigger: {
                trigger: sectionRef.value,
                start: 'top 70%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // Projects Panel Animation (Parallax/Stagger)
        const panels = gsap.utils.toArray('.project-panel');
        panels.forEach((panel, i) => {
            gsap.from(panel.querySelector('h3'), {
                scrollTrigger: {
                    trigger: panel,
                    start: 'top 60%',
                    toggleActions: 'play none none reverse'
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 0.1
            });
            
             gsap.from(panel.querySelector('.image-stack-container'), {
                scrollTrigger: {
                    trigger: panel,
                    start: 'top 60%',
                     toggleActions: 'play none none reverse'
                },
                scale: 0.9,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
        });

    }, sectionRef.value);
});

onUnmounted(() => {
    ctx && ctx.revert();
});
</script>

<style scoped>
.perspective-1000 {
    perspective: 1000px;
}
</style>
