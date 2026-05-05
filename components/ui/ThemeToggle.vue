<template>
  <button 
    @click="toggleTheme" 
    class="fixed bottom-8 right-8 z-[10000] w-14 h-14 rounded-full bg-text-primary text-bg-primary shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300 group border border-border-subtle"
    aria-label="Toggle theme"
  >
    <div class="relative w-6 h-6">
      <!-- Sun Icon -->
      <svg 
        v-if="!isDark"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        class="w-full h-full transform transition-all duration-500 rotate-0 scale-100"
      >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      
      <!-- Moon Icon -->
      <svg 
        v-else
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        class="w-full h-full transform transition-all duration-500 rotate-0 scale-100"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </div>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(true)

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.setAttribute('data-theme', 'light')
  }
}

const toggleTheme = (event) => {
  // Check if browser supports View Transitions API
  if (!document.startViewTransition) {
    isDark.value = !isDark.value
    updateTheme()
    return
  }

  // Get the click position
  const x = event.clientX
  const y = event.clientY
  
  // Calculate final radius
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )

  // Start the transition
  const transition = document.startViewTransition(() => {
    isDark.value = !isDark.value
    updateTheme()
  })

  // Animate the transition
  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]

    document.documentElement.animate(
      {
        clipPath: clipPath,
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  })
}

onMounted(() => {
  // Initialize based on current class or system preference
  isDark.value = document.documentElement.classList.contains('dark') || 
                (!document.documentElement.classList.contains('light') && 
                 window.matchMedia('(prefers-color-scheme: dark)').matches)
  updateTheme()
})
</script>

<style>
/* Essential for View Transitions API circular reveal */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
  display: block;
  opacity: 1;
}

::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 9999;
}
</style>
