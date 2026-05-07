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

      <div class="flex flex-col gap-16 md:gap-32">
        <template v-if="projects.length > 0">
          <div 
            v-for="(project, index) in projects" 
            :key="index"
            class="project-card relative w-full flex flex-col md:block md:h-[85vh] rounded-[2.5rem] overflow-hidden group shadow-2xl bg-bg-secondary border border-border-subtle"
          >
            <!-- Image Container -->
            <div class="relative w-full aspect-video md:aspect-auto md:absolute md:inset-0 md:h-full overflow-hidden bg-bg-tertiary">
              <img 
                :src="project.images[0]" 
                :alt="project.title" 
                class="w-full h-full object-cover transform transition-transform duration-1000 ease-out md:group-hover:scale-105"
              />
              <!-- Mobile Gradient Overlay (Stronger for readability) -->
              <div class="absolute inset-0 bg-gradient-to-t from-bg-secondary via-bg-secondary/60 to-transparent md:hidden"></div>
              <!-- Desktop Gradient Overlay (Ensures readability at the bottom) -->
              <div class="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/30 to-transparent transition-opacity duration-700 hidden md:block"></div>
            </div>

            <!-- Desktop Link Overlay (MD and up) -->
            <NuxtLink 
              :to="project.link" 
              target="_blank"
              class="hidden md:block absolute inset-0 z-10 cursor-pointer"
            ></NuxtLink>

            <!-- Content Overlay -->
            <div class="relative md:absolute md:inset-0 p-8 md:p-16 flex flex-col md:justify-end z-20 pointer-events-none -mt-16 md:mt-0">
              <!-- Tags (Mobile: relative, Desktop: absolute at top) -->
              <div class="flex gap-2 mb-6 md:mb-auto md:gap-3 pointer-events-auto">
                <span v-for="tag in project.tags" :key="tag" 
                      class="font-sans text-[10px] md:text-xs tracking-widest uppercase text-text-primary backdrop-blur-xl bg-bg-primary/40 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-border-subtle shadow-lg">
                  {{ tag }}
                </span>
              </div>
              
              <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 transform translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 transition-all duration-700 ease-out">
                
                <div class="flex flex-col pointer-events-auto">
                  <h3 class="font-serif text-4xl md:text-7xl font-bold text-text-primary mb-3 md:mb-4 drop-shadow-xl tracking-tighter">
                    {{ project.title }}
                  </h3>
                  <p class="font-sans text-sm md:text-xl text-text-secondary max-w-xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 delay-100 leading-relaxed md:leading-normal drop-shadow-sm">
                    {{ project.description }}
                  </p>
                </div>

                <!-- CTA Button -->
                <div class="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-700 delay-200 pointer-events-auto relative z-30 self-end md:self-auto">
                  <NuxtLink 
                    :to="project.link" 
                    target="_blank"
                    class="flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-full bg-text-primary text-bg-primary hover:scale-110 transition-transform duration-500 shadow-2xl"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="md:w-8 md:h-8">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </NuxtLink>
                </div>

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
    title: 'MORE SOON',
    description: 'MORE SOON',
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
