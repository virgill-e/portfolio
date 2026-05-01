<template>
  <section ref="sectionRef" id="projects" class="w-full min-h-screen bg-transparent py-32 relative overflow-hidden">
    <div class="w-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col relative z-10">
      
      <!-- Title -->
      <div class="mb-24 flex items-end justify-between border-b border-white/10 pb-8">
        <h2 ref="titleRef" class="text-5xl md:text-8xl font-serif font-bold text-zinc-100 tracking-tighter translate-y-full opacity-0">
          Selected Works
        </h2>
        <span class="hidden md:block text-zinc-500 font-sans tracking-widest uppercase text-sm">
          03 // Portfolio
        </span>
      </div>

      <!-- Projects Grid -->
      <div class="flex flex-col gap-24">
        <template v-if="projects.length > 0">
          <div 
            v-for="(project, index) in projects" 
            :key="index"
            class="project-card relative w-full h-[60vh] md:h-[80vh] rounded-[2rem] overflow-hidden group cursor-pointer shadow-2xl"
          >
            <!-- Background Image with Scale on Hover -->
            <div class="absolute inset-0 w-full h-full overflow-hidden bg-zinc-900">
               <!-- Using the first image -->
              <img 
                :src="project.images[0]" 
                :alt="project.title" 
                class="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
              />
              <!-- Dark Overlay -->
              <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700"></div>
            </div>

            <!-- Content Overlay -->
            <div class="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
              <!-- Top Tags -->
              <div class="mb-auto flex gap-3">
                <span v-for="tag in project.tags" :key="tag" 
                      class="font-sans text-xs tracking-widest uppercase text-zinc-100 backdrop-blur-md bg-white/10 px-4 py-2 rounded-full border border-white/20">
                  {{ tag }}
                </span>
              </div>
              
              <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                
                <div class="flex flex-col">
                  <h3 class="font-serif text-5xl md:text-7xl font-bold text-zinc-100 mb-4 drop-shadow-lg">
                    {{ project.title }}
                  </h3>
                  <p class="font-sans text-lg md:text-xl text-zinc-300 max-w-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    {{ project.description }}
                  </p>
                </div>

                <!-- CTA that reveals on hover -->
                <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                  <div class="flex items-center justify-center w-16 h-16 rounded-full bg-white text-[#0a0a0a] hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </template>
        
        <!-- Empty State Placeholder -->
        <div v-else class="project-card w-full h-[40vh] md:h-[60vh] rounded-[2rem] border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-sm shadow-2xl">
          <p class="font-sans text-xl md:text-2xl text-zinc-500 tracking-widest uppercase flex flex-col items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="opacity-50">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span>Projects coming soon</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Img1 from '@/assets/images/img1.jpeg'
import Img2 from '@/assets/images/img2.jpeg'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const titleRef = ref(null)

const projects = []

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
    const cards = gsap.utils.toArray('.project-card')
    cards.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      })
    })

  }, sectionRef.value)
})

onUnmounted(() => {
  ctx && ctx.revert()
})
</script>
