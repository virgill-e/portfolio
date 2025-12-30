<template>
    <section ref="sectionRef" class="w-full min-h-screen bg-custom-cream relative overflow-hidden py-24 flex flex-col items-center">
        <!-- Background Decorations -->
        <img ref="decor1Ref" src="@/assets/images/Polygon 1.svg" alt="" class="absolute top-10 right-[-5%] w-48 md:w-80  rotate-12 pointer-events-none z-0">
        <img ref="decor2Ref" src="@/assets/images/Polygon 2.svg" alt="" class="absolute bottom-10 left-[-5%] w-48 md:w-80  -rotate-12 pointer-events-none z-0">

        <!-- Title -->
         <h2 ref="titleRef" class="font-bagel text-6xl md:text-8xl text-custom-bronze mb-20 z-10 text-center relative">
            Education
        </h2>

        <!-- Timeline -->
        <div class="relative w-full max-w-4xl px-6 md:px-0 z-10 flex flex-col gap-12">
            <!-- Vertical Line -->
            <div ref="lineRef" class="absolute left-10 md:left-1/2 top-2 bottom-2 w-1 bg-custom-forest transform md:-translate-x-1/2 origin-top rounded-full"></div>

            <div 
                v-for="(item, index) in educationItems" 
                :key="index"
                class="timeline-item relative flex flex-col md:flex-row items-start md:items-center w-full group"
                :class="{'md:flex-row-reverse': index % 2 !== 0}"
            >
                <!-- Date -->
                <div class="w-full md:w-1/2 pl-20 md:pl-0 md:px-12 md:text-right mb-2 md:mb-0 date-text">
                    <span class="font-bagel text-2xl md:text-3xl text-custom-bronze block">{{ item.year }}</span>
                </div>

                <!-- Star Icon -->
                <div class="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 flex items-center justify-center bg-custom-cream border-4 border-custom-cream rounded-full z-20 star-icon">
                    <img src="@/assets/images/Star 1.svg" class="w-12 h-12" alt="Star">
                </div>

                <!-- Content -->
                <div class="w-full md:w-1/2 pl-20 md:px-12 content-text text-left">
                    <h3 class="font-bagel text-xl md:text-2xl text-custom-forest mb-1 leading-tight">{{ item.school }}</h3>
                    <p class="font-lato text-lg text-custom-forest opacity-80 leading-relaxed">{{ item.degree }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const titleRef = ref(null);
const lineRef = ref(null);
const decor1Ref = ref(null);
const decor2Ref = ref(null);

const educationItems = [
    {
        year: '2016 - 2021',
        school: 'INSTITUT NOTRE DAME, MALMEDY',
        degree: 'General of IT transition C.E.S.S.'
    },
    {
        year: '2021 - 2025',
        school: 'HELMO',
        degree: 'Bachelor in Computer Science, Application Development Orientation'
    }
];

let ctx;

onMounted(() => {
    ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.value,
                start: 'top 70%',
                end: 'bottom center',
                toggleActions: 'play none none reverse'
            }
        });

        // Background & Title
        tl.from([decor1Ref.value, decor2Ref.value], {
            scale: 0,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'elastic.out(1, 0.7)'
        })
        .from(titleRef.value, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)'
        }, "-=1")
        .from(lineRef.value, {
            scaleY: 0,
            duration: 1,
            ease: 'power3.inOut'
        }, "-=0.5");

        // Timeline Items
        const items = gsap.utils.toArray('.timeline-item');
        items.forEach((item, i) => {
            const star = item.querySelector('.star-icon');
            const date = item.querySelector('.date-text');
            const content = item.querySelector('.content-text');

            const itemTl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });

            itemTl.from(star, {
                scale: 0,
                rotate: -180,
                duration: 0.8,
                ease: 'back.out(2)'
            })
            .from([date, content], {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out'
            }, "-=0.4");
        });

    }, sectionRef.value);
});

onUnmounted(() => {
    ctx && ctx.revert();
});
</script>