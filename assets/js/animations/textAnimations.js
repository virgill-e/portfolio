import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

/**
 * Anime les titres avec effet de caractères qui apparaissent un par un
 * @param {string} selector - Sélecteur CSS des éléments à animer
 */
export function animateSplitTextTitles(selector = ".split") {
    let split = new SplitText(selector, { type: "words, chars" })

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

    return split
}

/**
 * Ajoute un effet 3D smooth au titre basé sur le mouvement de la souris
 * @param {HTMLElement} element - L'élément à animer
 */
export function add3DMouseEffect(element) {
    if (!element) return

    // Configuration simple
    const maxRotation = 5
    const sensitivity = 0.3
    const followSpeed = 0.2
    const returnSpeed = 0.3
    const idleDelay = 0.1

    let tween = null
    let returnTimer = null
    let lastX = 0
    let lastY = 0
    let isFirstMove = true

    // Initialisation
    gsap.set(element, {
        rotateX: 0,
        rotateY: 0,
        force3D: true,
        transformOrigin: "center center"
    })

    const handleMouseMove = (e) => {
        // Initialisation au premier mouvement
        if (isFirstMove) {
            lastX = e.clientX
            lastY = e.clientY
            isFirstMove = false
            return
        }

        // Calcul des rotations basées sur le mouvement
        const deltaX = (e.clientX - lastX) * sensitivity
        const deltaY = (e.clientY - lastY) * sensitivity

        lastX = e.clientX
        lastY = e.clientY

        const rotateY = gsap.utils.clamp(-maxRotation, maxRotation)(deltaX)
        const rotateX = gsap.utils.clamp(-maxRotation, maxRotation)(-deltaY)

        // Annuler le retour en cours
        if (returnTimer) {
            clearTimeout(returnTimer)
            returnTimer = null
        }

        // Animation du suivi - GSAP gère automatiquement la transition smooth
        tween = gsap.to(element, {
            rotateX,
            rotateY,
            duration: followSpeed,
            ease: "power1.out",
            overwrite: true,
            force3D: true
        })

        // Programmer le retour smooth après inactivité
        returnTimer = setTimeout(() => {
            tween = gsap.to(element, {
                rotateX: 0,
                rotateY: 0,
                duration: returnSpeed,
                ease: "power2.out",
                overwrite: true,
                force3D: true
            })
        }, idleDelay * 1000)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        if (returnTimer) clearTimeout(returnTimer)
        if (tween) tween.kill()
    }
}