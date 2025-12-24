<template>
  <div ref="container" class="w-full h-screen bg-custom-cream flex items-center justify-center visible">
    <div class="flex flex-col w-min">
      <h1 class="text-7xl md:text-[16rem] font-bagel text-custom-forest text-center whitespace-nowrap overflow-hidden">
        <span
          v-for="(char, index) in h1Text.split('')"
          :key="index"
          class="h1-char inline-block opacity-0"
        >
          {{ char === ' ' ? '\u00A0' : char }}
        </span>
      </h1>
      <div class="flex items-center justify-between w-full h-4 md:h-8">
        <div ref="line1" class="flex-grow h-full bg-custom-forest rounded-full origin-left scale-x-0"></div>
        <span class="text-xl md:text-3xl font-bagel text-custom-forest whitespace-nowrap px-2">
          <span
             v-for="(char, index) in nameText.split('')"
             :key="index"
             class="name-char inline-block opacity-0"
          >
            {{ char === ' ' ? '\u00A0' : char }}
          </span>
        </span>
        <div ref="line2" class="flex-grow h-full bg-custom-forest rounded-full origin-left scale-x-0"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const h1Text = "Portfolio"
const nameText = "Virgile Bigaré"

const container = ref(null)
const line1 = ref(null)
const line2 = ref(null)

onMounted(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline()
    
    // Initial states
    gsap.set('.h1-char', { y: 100, opacity: 0 })
    gsap.set('.name-char', { y: 20, opacity: 0 })
    gsap.set([line1.value, line2.value], { scaleX: 0 })

    // Animation Sequence
    tl.to('.h1-char', {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    })
    .to(line1.value, {
      scaleX: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, "-=0.2")
    .to('.name-char', {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.05,
      ease: 'back.out(1.7)'
    }, "-=0.2")
    .to(line2.value, {
      scaleX: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, "-=0.1")
    
  }, container.value) // Scope to container
})
</script>