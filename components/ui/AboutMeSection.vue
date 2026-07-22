<template>
  <section ref="sectionRef" id="about-me" class="w-full min-h-app-screen bg-transparent px-6 md:px-16 py-32 relative overflow-hidden flex items-center">

    <span class="about-ghost-index hidden lg:block" aria-hidden="true">00</span>

    <div class="w-full max-w-7xl mx-auto relative z-10">
      <div class="hidden md:flex items-center justify-between border-b border-border-subtle pb-8 mb-16">
        <span class="text-text-muted font-sans tracking-widest uppercase text-sm">
          00 // Profile
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">

        <!-- Asymmetric left column for the huge statement -->
        <div class="col-span-1 md:col-span-5 flex flex-col items-start">
          <h2 class="text-6xl sm:text-7xl md:text-[8rem] font-serif font-bold text-text-primary leading-[0.85] tracking-tighter flex flex-col gap-2 md:gap-4" style="perspective: 800px;">
            <span class="sr-only">Hello, I'm Virgile.</span>
            <span class="block" aria-hidden="true">
              <template v-for="(token, wi) in tokens1" :key="`a1-w${wi}`">
                <span class="inline-block whitespace-nowrap">
                  <span
                    v-for="c in token.chars"
                    :key="`a1-${c.index}`"
                    :ref="el => setLetterRef(el, 0, c.index)"
                    class="about-letter inline-block"
                    >{{ c.char }}</span>
                </span>
                <span v-if="wi < tokens1.length - 1">&nbsp;</span>
              </template>
            </span>
            <span class="block italic text-text-secondary" aria-hidden="true">
              <template v-for="(token, wi) in tokens2" :key="`a2-w${wi}`">
                <span class="inline-block whitespace-nowrap">
                  <span
                    v-for="c in token.chars"
                    :key="`a2-${c.index}`"
                    :ref="el => setLetterRef(el, 1, c.index)"
                    class="about-letter inline-block"
                    >{{ c.char }}</span>
                </span>
                <span v-if="wi < tokens2.length - 1">&nbsp;</span>
              </template>
            </span>
          </h2>
        </div>

        <!-- Asymmetric right column for the body text -->
        <div class="col-span-1 md:col-span-6 md:col-start-7 flex flex-col pt-12 md:pt-32">
          <div class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sans font-light text-text-secondary leading-snug">
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
            <div ref="lineRef" class="w-full h-[1px] bg-border-subtle scale-x-0 origin-left"></div>
          </div>

          <div class="mt-8 flex justify-between items-center opacity-0 translate-y-4" ref="metaRef">
            <span class="font-sans text-xs md:text-sm tracking-widest uppercase text-text-muted">Based in Belgium</span>
            <span class="font-sans text-xs md:text-sm tracking-widest uppercase text-text-muted">Open to work</span>
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
import { useKineticType, buildWordTokens } from '~/composables/useKineticType'

gsap.registerPlugin(ScrollTrigger)

const { kineticVars } = useKineticType()

const sectionRef = ref(null)
const lineRef = ref(null)
const metaRef = ref(null)

const tokens1 = buildWordTokens('Hello,')
const tokens2 = buildWordTokens("I'm Virgile.")

const letterEls = [[], []]
function setLetterRef(el, line, index) {
  if (el) letterEls[line][index] = el
}

const paragraph = "a full stack developer passionate about creating web and mobile applications. Curious and always seeking new challenges, I enjoy exploring personal projects that allow me to expand my skills and stay up-to-date in an ever-evolving field."
const words = paragraph.split(' ')

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    const allLetters = [...letterEls[0], ...letterEls[1]]

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 60%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.from(allLetters, kineticVars({ stagger: 0.02 }))
    .to('.word-reveal', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.02,
      ease: 'power3.out'
    }, "-=0.5")
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

<style scoped>
.about-ghost-index {
  position: absolute;
  top: 50%;
  right: 0;
  translate: 0 -50%;
  z-index: 0;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", serif;
  font-weight: 700;
  font-size: clamp(6rem, 12vw, 14rem);
  line-height: 1;
  color: var(--text-primary);
  opacity: 0.04;
  pointer-events: none;
}
</style>
