<template>
  <section ref="sectionRef" id="projects" class="w-full min-h-screen bg-transparent py-32 relative overflow-hidden">
    <div class="w-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col relative z-10">
      
      <!-- Title -->
      <div class="mb-24 flex items-end justify-between border-b border-border-subtle pb-8">
        <h2 ref="titleRef" class="text-5xl md:text-8xl font-serif font-bold text-text-primary tracking-tighter translate-y-full opacity-0">
          Selected Works
        </h2>
        <span class="hidden md:block text-text-muted font-sans tracking-widest uppercase text-sm">
          03 // Portfolio
        </span>
      </div>

      <!-- Cinematic Horizontal Layout -->
      <div class="flex flex-col gap-32 md:gap-48">
        <template v-if="projects.length > 0">
          <div 
            v-for="(project, index) in projects" 
            :key="index"
            class="project-card flex flex-col md:flex-row items-center gap-12 md:gap-24"
            :class="index % 2 === 1 ? 'md:flex-row-reverse' : ''"
          >
            <!-- Image Section (Landscape optimized) -->
            <div class="w-full md:w-[60%] group">
              <div class="relative block w-full aspect-video rounded-[2rem] lg:rounded-[3rem] overflow-hidden bg-bg-tertiary shadow-2xl transition-all duration-700">
                <template v-if="project.images && project.images.length > 0">
                  <img 
                    :src="project.images[0]" 
                    :alt="project.title" 
                    class="project-parallax-img w-full h-full object-cover transform transition-transform duration-1000 ease-out"
                  />
                </template>
                <div v-else class="w-full h-full bg-bg-tertiary/40 backdrop-blur-xl flex flex-col items-center justify-center gap-8 relative overflow-hidden group-hover:bg-bg-tertiary/60 transition-all duration-700 border border-white/5">
                  <!-- Decorative Background Glow -->
                  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
                  
                  <!-- Large Spinner -->
                  <div class="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                    <svg class="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                      <circle class="text-white/5" stroke-width="3" stroke="currentColor" fill="transparent" r="44" cx="50" cy="50" />
                      <circle class="text-primary" stroke-width="3" stroke-dasharray="120 160" stroke-linecap="round" stroke="currentColor" fill="transparent" r="44" cx="50" cy="50" />
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <!-- Title -->
                  <div class="flex flex-col items-center gap-2">
                    <h4 class="font-serif text-4xl md:text-6xl text-text-primary italic tracking-tighter opacity-90">Coming Soon</h4>
                    <span class="text-[9px] md:text-[10px] uppercase tracking-[0.6em] text-text-muted font-bold">New Vision Under Construction</span>
                  </div>
                </div>
                
                <!-- Project Number -->
                <div class="absolute top-6 left-6 md:top-10 md:left-10">
                  <span class="text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-text-primary/60 backdrop-blur-md bg-bg-primary/20 px-4 py-2 rounded-full border border-white/5">
                    0{{ index + 1 }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Info Section -->
            <div class="w-full md:w-[40%] flex flex-col px-4 md:px-0" :class="index % 2 === 1 ? 'md:items-end md:text-right' : ''">
              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-8" :class="index % 2 === 1 ? 'md:justify-end' : ''">
                <span v-for="tag in project.tags" :key="tag" 
                      class="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-text-muted bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  {{ tag }}
                </span>
              </div>

              <!-- Title & Description -->
              <div class="flex flex-col gap-6">
                <h3 class="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary tracking-tighter leading-[0.9]">
                  {{ project.title }}
                </h3>
                <p class="font-sans text-sm md:text-lg lg:text-xl text-text-secondary leading-relaxed max-w-md opacity-80" :class="index % 2 === 1 ? 'md:ml-auto' : ''">
                  {{ project.description }}
                </p>
              </div>

              <!-- CTA -->
              <div v-if="project.link && project.link !== '#'" class="mt-12 overflow-hidden">
                <NuxtLink 
                  :to="project.link" 
                  target="_blank"
                  class="inline-flex items-center gap-4 text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-text-primary group/cta"
                >
                  <span class="relative overflow-hidden">
                    <span class="inline-block transition-transform duration-500 group-hover/cta:-translate-y-full">Explore Project</span>
                    <span class="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-500 group-hover/cta:translate-y-0 text-primary">Explore Project</span>
                  </span>
                  <div class="w-10 h-10 md:w-12 md:h-12 rounded-full border border-border-subtle flex items-center justify-center group-hover/cta:bg-text-primary group-hover/cta:text-bg-primary transition-all duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform group-hover/cta:translate-x-1 transition-transform">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </template>
        
        <!-- Empty State Placeholder -->
        <div v-else class="project-card w-full h-[40vh] md:h-[60vh] rounded-[2rem] border border-border-subtle flex items-center justify-center bg-bg-secondary/30 backdrop-blur-sm shadow-2xl">
          <p class="font-sans text-xl md:text-2xl text-text-muted tracking-widest uppercase flex flex-col items-center gap-4">
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
import mockupvidiledger from '../../assets/images/vidiledger/mockup-vidiledger.webp'
import mockupqairnmobile from '../../assets/images/qairn mobile/mockup.webp'
import PIkemon from '../../assets/images/PIkemon/mockup PIkemon mac+iphone.webp'

const projects = ref([
  {
    title: 'Vidi Ledger',
    description: 'Vidi Ledger is a full-stack web application for personal financial management, allowing users to track their expenses, and investments through a web interface.',
    images: [mockupvidiledger],
    tags: ['Nuxt 4', 'Tailwind', 'Drizzle ORM'],
    link: 'https://vidi-ledger.virgill-e.com/'
  },
  {
    title: 'Qairn',
    description: 'Qairn is a modern Flutter-based mobile application designed to create, manage, and share digital business cards through QR codes in VCF (vCard) format. With an intuitive interface and powerful customization options, Qairn streamlines professional networking in the digital age.',
    images: [mockupqairnmobile],
    tags: ['Flutter', 'Swift', 'Kotlin'],
    link: 'https://qairn.app/'
  },
  {
    title: 'PIkémon',
    description: 'Pokémon Red on a Game Boy emulator (serverboy) using the decimal digits of π as a deterministic input stream.',
    images: [PIkemon],
    tags: ['tailwind','Serverboy','ROM'],
    link: '#'
  },
  {
    title: 'MORE SOON',
    description: 'Constantly exploring new horizons in creative engineering and full-stack architecture. Stay tuned for upcoming experimental releases.',
    images: [],
    tags: [],
    link: '#'
  }
])

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const titleRef = ref(null)

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
      // Reveal Animation
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: i % 2 * 0.2 // Stagger delay between columns
      })

      // Parallax Image Effect
      const img = card.querySelector('.project-parallax-img')
      if (img) {
        gsap.to(img, {
          y: '10%',
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      }
    })

  }, sectionRef.value)
})

onUnmounted(() => {
  ctx && ctx.revert()
})
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 3s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.project-parallax-img {
  will-change: transform;
}
</style>
