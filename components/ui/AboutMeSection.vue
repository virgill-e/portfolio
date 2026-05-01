<template>
  <section ref="sectionRef" id="about-me" class="w-full min-h-screen bg-transparent px-6 md:px-16 py-32 relative overflow-hidden flex items-center">
    
    <div class="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center relative z-10">
      
      <!-- Asymmetric left column for the huge statement -->
      <div class="col-span-1 md:col-span-5 flex flex-col items-start">
        <h2 class="text-6xl sm:text-7xl md:text-[8rem] font-serif font-bold text-zinc-100 leading-[0.85] tracking-tighter flex flex-col gap-2 md:gap-4">
          <span class="block overflow-hidden py-6 -my-6">
            <span ref="title1" class="block translate-y-full">Hello,</span>
          </span>
          <span class="block overflow-hidden py-6 -my-6">
            <span ref="title2" class="block translate-y-full italic text-zinc-400">I'm Virgile.</span>
          </span>
        </h2>
      </div>

      <!-- Asymmetric right column for the body text -->
      <div class="col-span-1 md:col-span-6 md:col-start-7 flex flex-col pt-12 md:pt-32">
        <div class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sans font-light text-zinc-300 leading-snug">
          <!-- Word by word reveal -->
          <span
            v-for="(word, index) in words"
            :key="index"
            class="inline-block overflow-hidden mr-[0.25em] mb-[0.1em] align-top"
          >
            <span class="word-reveal inline-block translate-y-full opacity-0">
              {{ word }}
            </span>
          </span>
        </div>
        
        <div class="mt-16 overflow-hidden">
          <div ref="lineRef" class="w-full h-[1px] bg-zinc-800 scale-x-0 origin-left"></div>
        </div>
        
        <div class="mt-8 flex justify-between items-center opacity-0 translate-y-4" ref="metaRef">
          <span class="font-sans text-xs md:text-sm tracking-widest uppercase text-zinc-500">Based in Belgium</span>
          <span class="font-sans text-xs md:text-sm tracking-widest uppercase text-zinc-500">Open to work</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const title1 = ref(null)
const title2 = ref(null)
const lineRef = ref(null)
const metaRef = ref(null)

const paragraph = "a full stack developer passionate about creating web and mobile applications. Curious and always seeking new challenges, I enjoy exploring personal projects that allow me to expand my skills and stay up-to-date in an ever-evolving field."
const words = paragraph.split(' ')

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 60%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.to([title1.value, title2.value], {
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power4.out'
    })
    .to('.word-reveal', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.02,
      ease: 'power3.out'
    }, "-=0.6")
    .to(lineRef.value, {
      scaleX: 1,
      duration: 1,
      ease: 'power4.inOut'
    }, "-=0.4")
    .to(metaRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, "-=0.4")

  }, sectionRef.value)
})

onUnmounted(() => {
  ctx && ctx.revert()
})
</script>