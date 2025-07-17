import { gsap } from 'gsap'

/**
 * Anime les images lors du changement de mode sombre/clair
 * @param {boolean} isDark - État du mode sombre
 * @returns {gsap.timeline} Timeline GSAP
 */
export function animateImages(isDark) {
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
            filter: isDark ? 'invert(1)' : 'none'
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

/**
 * Anime l'apparition des images au chargement de la page
 */
export function animatePageImages() {
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

/**
 * Anime la transition du mode sombre avec overlay
 * @param {boolean} isDark - État du mode sombre
 * @param {HTMLElement|null} overlay - Élément overlay pour l'animation
 */
export function animateDarkModeTransition(isDark, overlay) {
    if (!overlay) return

    // Créer une timeline principale pour synchroniser les animations
    const masterTimeline = gsap.timeline()

    if (isDark) {
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

        const imageTimeline = animateImages(isDark)

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

        const imageTimeline = animateImages(isDark)

        // Lancer les deux animations en parallèle
        masterTimeline
            .add(overlayTween, 0)
            .add(imageTimeline, 0)
    }

    return masterTimeline
}

/**
 * Initialise l'overlay du mode sombre
 * @param {HTMLElement|null} overlay - Élément overlay
 */
export function initializeDarkModeOverlay(overlay) {
    if (overlay) {
        gsap.set(overlay, {
            opacity: 0,
            clipPath: 'inset(0 100% 0 0)'
        })
    }
} 