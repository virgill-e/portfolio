<template>
  <section id="hero" class="relative w-full h-screen flex items-center justify-center overflow-hidden bg-transparent">
    <!-- Parallax Layers -->
    
    <!-- Background Layer (0.3x) -->
    <div 
      ref="bgLayer"
      class="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none overflow-hidden will-change-transform"
    >
      <h1 class="text-[20vw] md:text-[12vw] font-serif font-bold text-transparent tracking-tighter whitespace-nowrap" style="-webkit-text-stroke: 2px var(--text-primary);">
        DEVELOPER
      </h1>
    </div>

    <!-- Midground Layer (0.6x) -->
    <div 
      ref="midLayer"
      class="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
    >
      <div class="w-full max-w-7xl px-6 flex justify-between items-end h-full pb-20 md:pb-32">
        <div class="text-text-muted font-sans tracking-widest uppercase text-xs md:text-sm">
          Portfolio ©2026
        </div>
        <div class="text-text-muted font-sans tracking-widest uppercase text-xs md:text-sm text-right">
          Creative<br/>Development
        </div>
      </div>
    </div>

    <!-- Foreground Layer (1x) -->
    <div 
      ref="fgLayer"
      class="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center text-center will-change-transform"
    >
      <h1 class="text-7xl md:text-[8rem] lg:text-[10rem] font-serif font-bold text-text-primary leading-[0.9] tracking-tight mb-8 flex flex-col gap-2 md:gap-4">
        <span class="block overflow-hidden py-6 -my-6">
          <span ref="title1" class="block translate-y-full">Virgile</span>
        </span>
        <span class="block overflow-hidden py-6 -my-6">
          <span ref="title2" class="block translate-y-full italic text-text-secondary">Bigaré</span>
        </span>
      </h1>
      
      <div class="overflow-hidden">
        <p ref="subtitle" class="text-lg md:text-2xl text-text-muted font-sans font-light translate-y-full max-w-lg mx-auto">
          Crafting digital experiences with depth, motion, and intention.
        </p>
      </div>

      <div class="mt-16 overflow-hidden">
        <div ref="buttonContainer" class="translate-y-full">
          <a href="#about-me" class="group relative inline-flex items-center justify-center px-10 py-5 font-sans tracking-widest uppercase text-sm text-bg-primary bg-text-primary rounded-full overflow-hidden transition-transform hover:scale-105 duration-300">
            <span class="relative z-10 font-bold">Explore Work</span>
            <div class="absolute inset-0 bg-text-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

// const { scrollY } = useParallax() // No longer needed

const title1 = ref(null)
const title2 = ref(null)
const subtitle = ref(null)
const buttonContainer = ref(null)

const bgLayer = ref(null)
const midLayer = ref(null)
const fgLayer = ref(null)

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    // Initial entrance animation
    const tl = gsap.timeline({ delay: 0.2 })

    tl.to([title1.value, title2.value], {
      y: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out'
    })
    .to(subtitle.value, {
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, "-=0.8")
    .to(buttonContainer.value, {
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, "-=0.8")

    // Parallax Scroll Animations
    gsap.to(bgLayer.value, {
      y: 150,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    })

    gsap.to(midLayer.value, {
      y: 300,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    })

    gsap.to(fgLayer.value, {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    })
  })
})

onUnmounted(() => {
  ctx && ctx.revert()
})
</script>