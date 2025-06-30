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

function animateImages(invert: boolean) {
  const images = document.querySelectorAll('img')
  const timeline = gsap.timeline()

  if (invert) {
    // Animation d'activation : disparition -> inversion -> réapparition
    timeline
      .to(images, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut'
      })
      .set(images, {
        filter: 'invert(1)'
      })
      .to(images, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.inOut'
      })
  } else {
    // Animation de désactivation : disparition -> retour normal -> réapparition
    timeline
      .to(images, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut'
      })
      .set(images, {
        filter: 'none'
      })
      .to(images, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.inOut'
      })
  }

  return timeline
}

function animateDarkModeTransition() {
  const overlay = darkModeOverlay.value
  if (!overlay) return

  // Créer une timeline principale pour synchroniser les animations
  const masterTimeline = gsap.timeline()

  if (isDark.value) {
    // Animation d'activation : overlay et images en parallèle
    const overlayTween = gsap.fromTo(overlay,
      {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 1
      },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.8,
        ease: 'power2.inOut'
      }
    )

    const imageTimeline = animateImages(true)

    // Lancer les deux animations en parallèle
    masterTimeline
      .add(overlayTween, 0)
      .add(imageTimeline, 0)

  } else {
    // Animation de désactivation
    const overlayTween = gsap.to(overlay, {
      clipPath: 'inset(0 100% 0 0)',
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set(overlay, { opacity: 0, clipPath: 'inset(0 100% 0 0)' })
      }
    })

    const imageTimeline = animateImages(false)

    // Lancer les deux animations en parallèle
    masterTimeline
      .add(overlayTween, 0)
      .add(imageTimeline, 0)
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