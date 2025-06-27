<script setup lang="ts">
import { ref, provide, watch, onMounted } from 'vue'
import { gsap } from 'gsap'

const isDark = ref(false)
const darkModeOverlay = ref<HTMLElement | null>(null)

const toggleDark = () => {
  isDark.value = !isDark.value
  animateDarkModeTransition()
}

provide('toggleDark', toggleDark)
provide('isDark', isDark)

watch(isDark, (val) => {
  if (val) document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
})

function animateDarkModeTransition() {
  const overlay = darkModeOverlay.value
  if (!overlay) return

  if (isDark.value) {
    // Animation d'activation : voile qui glisse de la gauche vers la droite
    gsap.fromTo(overlay,
      {
        clipPath: 'inset(0 100% 0 0)', // Commence invisible (clippé à droite)
        opacity: 1
      },
      {
        clipPath: 'inset(0 0% 0 0)', // Se révèle complètement
        duration: 0.8,
        ease: 'power2.inOut'
      }
    )
  } else {
    // Animation de désactivation : voile qui glisse de droite vers la gauche et disparaît
    gsap.to(overlay, {
      clipPath: 'inset(0 100% 0 0)', // Se cache vers la gauche
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        // Remet l'overlay à son état initial pour la prochaine activation
        gsap.set(overlay, { opacity: 0, clipPath: 'inset(0 100% 0 0)' })
      }
    })
  }
}

onMounted(() => {
  // Initialise l'overlay comme invisible
  if (darkModeOverlay.value) {
    gsap.set(darkModeOverlay.value, {
      opacity: 0,
      clipPath: 'inset(0 100% 0 0)'
    })
  }
})
</script>

<template>
  <div :class="['text-custom-forest uppercase', { dark: isDark }]">
    <NuxtRouteAnnouncer />
    <LayoutNavbar />
    <UiCustomCursor />
    <NuxtPage />
    <LayoutFooter />
    <!-- Dark mode overlay avec animation de voile -->
    <div ref="darkModeOverlay" class="dark-mode-overlay"
      style="position: fixed; inset: 0; width: 100vw; height: 100vh; background: white; pointer-events: none; z-index: 99999; opacity: 0;">
    </div>
  </div>
</template>