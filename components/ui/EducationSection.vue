<template>
  <section 
    ref="sectionRef" 
    id="education" 
    class="w-full min-h-screen bg-transparent py-32 relative overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]"
    :style="{ clipPath: isVisible ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }"
  >
    <div class="w-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col relative z-10">
      
      <!-- Title -->
      <div class="mb-24 flex items-end justify-between border-b border-white/10 pb-8">
        <h2 class="text-5xl md:text-8xl font-serif font-bold text-zinc-100 tracking-tighter">
          Education
        </h2>
        <span class="hidden md:block text-zinc-500 font-sans tracking-widest uppercase text-sm">
          01 // Academic
        </span>
      </div>

      <!-- Timeline / List -->
      <div class="flex flex-col w-full">
        <div 
          v-for="(item, index) in educationItems" 
          :key="index"
          class="edu-row group flex flex-col md:flex-row justify-between items-start md:items-center py-10 md:py-16 border-b border-white/5 hover:border-white/20 transition-colors duration-500 relative cursor-default"
        >
          <!-- Left side: Date & School -->
          <div class="w-full md:w-1/2 flex flex-col md:flex-row gap-4 md:gap-16 items-start md:items-center mb-6 md:mb-0">
            <span class="font-sans text-xs md:text-sm tracking-widest uppercase text-zinc-500 group-hover:text-zinc-300 transition-colors w-32">
              {{ item.year }}
            </span>
            <h3 class="font-serif text-3xl md:text-4xl text-zinc-100 group-hover:translate-x-4 transition-transform duration-500 ease-out">
              {{ item.school }}
            </h3>
          </div>

          <!-- Right side: Degree -->
          <div class="w-full md:w-1/2 md:text-right">
            <p class="font-sans text-lg md:text-xl text-zinc-400 font-light group-hover:text-zinc-100 transition-colors duration-500">
              {{ item.degree }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)

const educationItems = [
  {
    year: '2016 — 2021',
    school: 'Institut Notre Dame',
    degree: 'General of IT transition C.E.S.S.'
  },
  {
    year: '2021 — 2025',
    school: 'HELMo',
    degree: 'Bachelor in Computer Science, App Dev'
  }
]

let observer = null

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '0px 0px -15% 0px',
    threshold: 0
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true
        // Unobserve after reveal to keep it visible
        observer.unobserve(entry.target)
      }
    })
  }, options)

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  if (observer && sectionRef.value) {
    observer.unobserve(sectionRef.value)
  }
})
</script>