import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

/**
 * Anime les titres avec effet de caractères qui apparaissent un par un
 * @param {string} selector - Sélecteur CSS des éléments à animer
 */
export async function animateSplitTextTitles(selector = ".split") {
    if (document.fonts) {
        await document.fonts.ready;
    }

    const elements = document.querySelectorAll(selector)
    const splits = []

    // Traiter chaque élément séparément pour animer en parallèle
    elements.forEach((element) => {
        let split = new SplitText(element, { type: "words, chars" })
        splits.push(split)

        // Animer les caractères de cet élément avec un délai basé sur l'index local
        split.chars.forEach((char, i) => {
            gsap.fromTo(char, {
                opacity: 0,
                y: -100,
            }, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.01 * i
            })
        })
    })

    return splits
}

/**
 * Ajoute un effet 3D smooth au titre basé sur le mouvement de la souris
 * @param {HTMLElement} element - L'élément à animer
 */
export function add3DMouseEffect(element) {
    if (!element) return

    // Configuration premium
    const maxRotation = 15 // Plus d'angle pour plus d'impact
    const speed = 0.5 // Durée de l'interpolation (plus grand = plus "flottant")

    // Initialisation
    gsap.set(element, {
        transformOrigin: "center center",
        transformStyle: "preserve-3d",
        force3D: true
    })

    const handleMouseMove = (e) => {
        // Calcul de la position de la souris relative au centre de l'écran (-1 à 1)
        const xPct = (e.clientX / window.innerWidth - 0.5) * 2
        const yPct = (e.clientY / window.innerHeight - 0.5) * 2

        // Calcul des angles cibles
        // Note: on inverse Y pour que ça suive la souris naturellement (regarder en haut = basculer en arrière)
        const targetRotateY = xPct * maxRotation
        const targetRotateX = -yPct * maxRotation

        gsap.to(element, {
            rotateX: targetRotateX,
            rotateY: targetRotateY,
            duration: speed,
            ease: "power2.out",
            overwrite: "auto"
        })
    }

    // Remettre à plat quand la souris quitte la fenêtre (optionnel mais propre)
    const handleMouseLeave = () => {
        gsap.to(element, {
            rotateX: 0,
            rotateY: 0,
            duration: 1,
            ease: "power2.out",
            overwrite: "auto"
        })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseleave', handleMouseLeave)
        gsap.killTweensOf(element)
    }
}