<script setup lang="ts">
import { ref, provide, watch, onMounted } from 'vue'
import { gsap } from 'gsap'

const isTouch = ref(false)
const isDark = ref(false)
const darkModeOverlay = ref<HTMLElement | null>(null)

onMounted(() => {
  isTouch.value =
    window.matchMedia('(pointer: coarse)').matches ||
    'ontouchstart' in window
})

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

// Code de surveillance des routes supprimé car une seule page

function animateImages() {
  const images = document.querySelectorAll('img')
  const timeline = gsap.timeline()

  // Ajouter la classe 'animating' pour désactiver le CSS d'inversion
  images.forEach(img => img.classList.add('animating'))

  // Animation : disparition -> inversion manuelle -> réapparition
  timeline
    .to(images, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut'
    })
    .set(images, {
      filter: isDark.value ? 'invert(1)' : 'none'
    })
    .to(images, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        // Retirer la classe 'animating' à la fin de l'animation
        images.forEach(img => img.classList.remove('animating'))
      }
    })

  return timeline
}



function animatePageImages() {
  const images = document.querySelectorAll('img')
  if (images.length === 0) return

  // Animer l'apparition des images (elles sont déjà masquées par le CSS)
  gsap.to(images, {
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.1 // Légère cascade pour un effet plus fluide
  })
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

    const imageTimeline = animateImages()

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

    const imageTimeline = animateImages()

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
    <UiCustomCursor />
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