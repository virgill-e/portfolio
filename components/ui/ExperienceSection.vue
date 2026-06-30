<template>
  <section ref="sectionRef" id="experience" class="w-full min-h-screen bg-transparent py-32 relative overflow-hidden">
    <div class="w-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col relative z-10">
      
      <!-- Title -->
      <div class="mb-24 flex items-end justify-between border-b border-border-subtle pb-8">
        <h2 ref="titleRef" class="text-5xl md:text-8xl font-serif font-bold text-text-primary tracking-tighter translate-y-full opacity-0">
          Experience
        </h2>
        <span class="hidden md:block text-text-muted font-sans tracking-widest uppercase text-sm">
          02 // Professional
        </span>
      </div>

      <!-- Experience Cards -->
      <div class="flex flex-col gap-16 md:gap-32">
        <div 
          v-for="(item, index) in experienceItems" 
          :key="index"
          class="experience-card group w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative"
        >
          <!-- Date / Meta (Col 1-3) -->
          <div class="col-span-1 md:col-span-3 flex flex-col pt-2">
            <span class="font-sans text-xs md:text-sm tracking-widest uppercase text-text-muted border-l border-border-subtle pl-4 py-1 mb-4">
              {{ item.date }}
            </span>
          </div>

          <!-- Content (Col 4-12) -->
          <div class="col-span-1 md:col-span-9 flex flex-col md:flex-row gap-8 items-start">
            
            <!-- Logo -->
            <div class="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 flex items-start justify-start group-hover:scale-105 transition-transform duration-500 ease-out grayscale group-hover:grayscale-0">
              <img :src="item.image" :alt="item.title" loading="lazy" decoding="async" width="96" height="96" class="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>

            <!-- Details -->
            <div class="flex flex-col">
              <h3 class="font-serif text-3xl sm:text-4xl md:text-5xl text-text-secondary mb-6 tracking-tight group-hover:text-text-primary transition-colors duration-300">
                {{ item.title }}
              </h3>
              <p class="font-sans text-xl md:text-2xl text-text-muted font-light leading-relaxed max-w-2xl">
                {{ item.description }}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import noshaqLogo from '@/assets/images/Noshaq.png'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const titleRef = ref(null)

const experienceItems = [
  {
    date: 'February 2025 — May 2025',
    title: 'Noshaq - Internship',
    description: 'Mobile development in Flutter.',
    image: noshaqLogo
  },
  {
    date: 'July 2025 — Now',
    title: 'Noshaq - Employee',
    description: 'IT Support',
    image: noshaqLogo
  }
]

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    
    // Title Animation
    gsap.to(titleRef.value, {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power4.out'
    })

    // Cards Animation
    const cards = gsap.utils.toArray('.experience-card')
    cards.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
    })

  }, sectionRef.value)
})

onUnmounted(() => {
  ctx && ctx.revert()
})
</script>
