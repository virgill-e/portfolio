<script setup lang="ts">
import { ref, provide, watch, onMounted } from 'vue'
import {
  animateDarkModeTransition as animateDarkMode,
  animatePageImages,
  initializeDarkModeOverlay
} from '@/assets/js/animations'

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
  if (darkModeOverlay.value) {
    animateDarkMode(isDark.value, darkModeOverlay.value)
  }
}

onMounted(() => {
  // Initialise l'overlay comme invisible
  if (darkModeOverlay.value) {
    initializeDarkModeOverlay(darkModeOverlay.value)
  }

  if (typeof window !== 'undefined') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      if (!isDark.value) {
        isDark.value = true
        animateDarkModeTransition()
      }
    }
  }

  // Animer l'apparition des images au chargement initial
  setTimeout(() => {
    animatePageImages()
  }, 100)
})
</script>

<template>
  <div :class="['text-custom-forest uppercase', { dark: isDark }]">
    <NuxtRouteAnnouncer />
    <LayoutNavbar />
    <UiCustomCursor class="hidden md:block" />
    <NuxtPage />
    <LayoutFooter />
    <!-- Dark mode overlay avec animation de voile -->
    <div ref="darkModeOverlay" class="dark-mode-overlay"
      style="position: fixed; inset: 0; width: 100vw; height: 100vh; background: white; pointer-events: none; z-index: 99999; opacity: 0;">
    </div>
  </div>
</template>

<style>
/* Masquer toutes les images par défaut pour éviter le flash */
img {
  opacity: 0;
}

/* Appliquer l'inversion des images automatiquement en dark mode */
/* Seulement quand l'animation n'est pas en cours */
.dark img:not(.animating) {
  filter: invert(1);
}
</style>