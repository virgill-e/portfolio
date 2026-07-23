<template>
  <section id="hero" class="relative w-full h-app-screen flex items-center justify-center overflow-hidden bg-transparent">
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
      <h1 class="hero-name text-7xl md:text-[8rem] lg:text-[10rem] font-serif font-bold text-text-primary leading-[0.9] tracking-tight mb-8 flex flex-col gap-2 md:gap-4">
        <span class="sr-only">Virgile Bigaré</span>
        <span class="block whitespace-nowrap" aria-hidden="true">
          <span
            v-for="(char, i) in chars1"
            :key="`c1-${i}`"
            :ref="el => setLetterRef(el, 0, i)"
            class="hero-letter inline-block"
            >{{ char === ' ' ? ' ' : char }}</span>
        </span>
        <span class="block italic text-text-secondary whitespace-nowrap" aria-hidden="true">
          <span
            v-for="(char, i) in chars2"
            :key="`c2-${i}`"
            :ref="el => setLetterRef(el, 1, i)"
            class="hero-letter inline-block"
            >{{ char === ' ' ? ' ' : char }}</span>
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

const NAME_LINE_1 = 'Virgile'
const NAME_LINE_2 = 'Bigaré'
const chars1 = NAME_LINE_1.split('')
const chars2 = NAME_LINE_2.split('')

const letterEls = [[], []]
function setLetterRef(el, line, index) {
  if (el) letterEls[line][index] = el
}

const subtitle = ref(null)
const buttonContainer = ref(null)

const bgLayer = ref(null)
const midLayer = ref(null)
const fgLayer = ref(null)

let ctx
let reducedMotion = false
let magneticActive = false
let letters = []
let setters = []

function onMagneticMove(e) {
  const radius = 140
  const strength = 14
  letters.forEach((el, i) => {
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.hypot(dx, dy)
    if (dist > radius) {
      setters[i].x(0)
      setters[i].y(0)
      return
    }
    const pull = (1 - dist / radius) * strength
    setters[i].x(-(dx / (dist || 1)) * pull)
    setters[i].y(-(dy / (dist || 1)) * pull)
  })
}

function onMagneticLeave() {
  letters.forEach((el, i) => {
    setters[i].x(0)
    setters[i].y(0)
  })
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  ctx = gsap.context(() => {
    const allLetters = [...letterEls[0], ...letterEls[1]]

    // Kinetic split-letter entrance: each glyph snaps into place from a
    // receded, scaled-down state rather than the whole word sliding as one
    // block. Deliberately 2D-only (no rotateX/perspective) — see
    // composables/useKineticType.js for why. Under reduced motion: a plain,
    // instant-ish fade — same content, no travel.
    const tl = gsap.timeline({ delay: 0.2 })

    tl.from(allLetters, reducedMotion ? {
      opacity: 0,
      duration: 0.4,
      stagger: 0,
      ease: 'power1.out'
    } : {
      opacity: 0,
      y: 60,
      scale: 0.85,
      duration: 1,
      stagger: 0.025,
      ease: 'power4.out'
    })
      .to(subtitle.value, {
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.7')
      .to(buttonContainer.value, {
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.8')

    // Magnetic type: on fine-pointer, motion-safe devices, letters lean away
    // from the cursor as it passes near — the same "the cursor is part of the
    // interface" idea as the custom cursor, applied to the headline itself.
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (isFinePointer && !reducedMotion) {
      letters = allLetters
      setters = letters.map((el) => ({
        x: gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' }),
        y: gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
      }))
      fgLayer.value.addEventListener('mousemove', onMagneticMove)
      fgLayer.value.addEventListener('mouseleave', onMagneticLeave)
      magneticActive = true
    }

    // Parallax Scroll Animations
    gsap.to(bgLayer.value, {
      y: 150,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    gsap.to(midLayer.value, {
      y: 300,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    gsap.to(fgLayer.value, {
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })
  })
})

onUnmounted(() => {
  if (magneticActive && fgLayer.value) {
    fgLayer.value.removeEventListener('mousemove', onMagneticMove)
    fgLayer.value.removeEventListener('mouseleave', onMagneticLeave)
  }
  ctx && ctx.revert()
})
</script>
