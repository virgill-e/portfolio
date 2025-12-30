<template>
    <section ref="sectionRef" class="w-full min-h-screen bg-custom-cream relative overflow-hidden py-24 flex flex-col items-center justify-center">
        <!-- Background Decorations -->
        <img ref="decor1Ref" src="@/assets/images/Polygon 1.svg" alt="" class="absolute top-20 left-[-5%] w-64 md:w-96 rotate-45 pointer-events-none opacity-50 z-0">
        <img ref="decor2Ref" src="@/assets/images/Polygon 2.svg" alt="" class="absolute bottom-20 right-[-5%] w-64 md:w-96 -rotate-45 pointer-events-none opacity-50 z-0">

        <!-- Title -->
         <h2 ref="titleRef" class="font-bagel text-6xl md:text-8xl text-custom-bronze mb-24 z-10 text-center relative">
            Experience
        </h2>

        <!-- Timeline Container -->
        <div class="container mx-auto px-6 md:px-12 z-10 relative max-w-6xl">
            <!-- Vertical Line -->
            <!-- Adjusted left position for mobile to accommodate the connector -->
            <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-custom-bronze transform md:-translate-x-1/2 opacity-30 rounded-full"></div>
            
            <div class="flex flex-col gap-12 md:gap-24 relative">
                <div 
                    v-for="(item, index) in experienceItems" 
                    :key="index"
                    :class="['flex flex-col md:flex-row items-center w-full relative experience-card group', index % 2 === 0 ? 'md:flex-row-reverse' : '']"
                >
                    <!-- Date (Opposite side on desktop, Hidden on mobile) -->
                    <div class="hidden md:flex w-1/2 px-12 justify-center items-center" :class="index % 2 === 0 ? 'justify-start' : 'justify-end'">
                         <span class="font-bagel text-2xl text-custom-forest bg-custom-cream px-6 py-2 border-2 border-custom-forest rounded-full shadow-[4px_4px_0px_0px_var(--color-custom-bronze)] transform hover:-translate-y-1 transition-transform duration-300">
                            {{ item.date }}
                         </span>
                    </div>

                    <!-- Dot on Line with Pulse effect -->
                    <div class="absolute left-8 md:left-1/2 w-6 h-6 bg-custom-bronze border-4 border-custom-cream rounded-full transform -translate-x-1/2 z-20 shadow-lg group-hover:scale-125 transition-transform duration-300">
                        <div class="absolute inset-0 bg-custom-bronze rounded-full animate-ping opacity-20"></div>
                    </div>

                    <!-- Content Card side -->
                    <div class="w-full md:w-1/2 pl-24 md:px-12">
                         <div class="bg-custom-cream bg-opacity-60 backdrop-blur-md border-2 border-custom-bronze rounded-[2rem] p-8 hover:bg-opacity-90 transition-all duration-300 relative group shadow-sm hover:shadow-xl hover:-translate-y-2">
                            
                            <!-- Mobile Date Badge (Visible only on mobile) -->
                            <div class="md:hidden absolute -top-4 right-8">
                                <span class="font-bagel text-sm text-custom-forest bg-custom-cream px-4 py-2 border-2 border-custom-forest rounded-full shadow-[2px_2px_0px_0px_var(--color-custom-bronze)]">
                                    {{ item.date }}
                                </span>
                            </div>

                            <div class="flex flex-col sm:flex-row items-start gap-6">
                                <!-- Company Logo -->
                                <div class="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-custom-cream rounded-2xl border-2 border-custom-bronze overflow-hidden flex items-center justify-center p-3 shadow-md group-hover:rotate-3 transition-transform duration-300">
                                    <img :src="item.image" :alt="item.title" class="w-full h-full object-contain" />
                                </div>
                                
                                <div class="flex-1">
                                    <h3 class="font-bagel text-2xl sm:text-3xl text-custom-bronze mb-3 leading-tight group-hover:text-custom-forest transition-colors duration-300">
                                        {{ item.title }}
                                    </h3>
                                    <p class="font-lato text-lg text-custom-forest opacity-80 leading-relaxed">
                                        {{ item.description }}
                                    </p>
                                </div>
                            </div>
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
import noshaqLogo from '@/assets/images/Noshaq.png';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const titleRef = ref(null);
const decor1Ref = ref(null);
const decor2Ref = ref(null);

const experienceItems = [
    {
        date: 'February 2025 - May 2025',
        title: 'Noshaq - Internship',
        description: 'Mobile development in Flutter. Implemented core features and improved app performance.',
        image: noshaqLogo
    },
    {
        date: 'July 2025 - Now',
        title: 'Noshaq - Employee',
        description: 'Participation in the EDMS (Electronic Document Management System) Project. Full stack development and system architecture.',
        image: noshaqLogo
    }
];

let ctx;

onMounted(() => {
    ctx = gsap.context(() => {
        // Main timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.value,
                start: 'top 60%',
                end: 'bottom center',
                toggleActions: 'play none none none',
                once: true
            }
        });

        // Background elements parallax/fade
        tl.from([decor1Ref.value, decor2Ref.value], {
            opacity: 0,
            scale: 0.8,
            rotation: 0,
            duration: 1.5,
            stagger: 0.3,
            ease: 'power2.out'
        })
        .from(titleRef.value, {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, "-=1");

        // Cards Animation
        // Animate each item staggered
        const cards = gsap.utils.toArray('.experience-card');
        cards.forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    once: true
                },
                x: i % 2 === 0 ? 100 : -100, // Alternate entry direction
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        });

    }, sectionRef.value);
});

onUnmounted(() => {
    ctx && ctx.revert();
});
</script>
