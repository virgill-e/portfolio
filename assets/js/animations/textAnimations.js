import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

/**
 * Anime les titres avec effet de caractères qui apparaissent un par un
 * @param {string} selector - Sélecteur CSS des éléments à animer
 */
export function animateSplitText(selector = ".split") {
    let split = new SplitText(selector, { type: "words, chars" })

    split.chars.forEach((char, i) => {
        gsap.fromTo(char, {
            opacity: 0,
            duration: 0.5,
            y: -100,
            delay: 0.05 * i
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.05 * i
        })
    })

    return split
}

/**
 * Animation plus avancée avec timeline pour un meilleur contrôle
 * @param {string} selector - Sélecteur CSS des éléments à animer
 * @param {Object} options - Options d'animation
 */
export function animateSplitTextAdvanced(selector = ".split", options = {}) {
    const {
        duration = 0.5,
        stagger = 0.05,
        yOffset = -100,
        ease = "power2.out"
    } = options

    let split = new SplitText(selector, { type: "words, chars" })

    const timeline = gsap.timeline()

    timeline.fromTo(split.chars, {
        opacity: 0,
        y: yOffset
    }, {
        opacity: 1,
        y: 0,
        duration: duration,
        stagger: stagger,
        ease: ease
    })

    return { split, timeline }
} 