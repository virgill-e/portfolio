import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * Anime l'apparition des visualiseurs de projets au scroll
 */
export function animateProjectVisualizers() {
    // Colonne de gauche (index pair)
    gsap.utils.toArray(".project-visualizer.left").forEach((el) => {
        gsap.fromTo(
            el,
            { x: -100, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.2,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            }
        );
    });

    // Colonne de droite (index impair)
    gsap.utils.toArray(".project-visualizer.right").forEach((el) => {
        gsap.fromTo(
            el,
            { x: 100, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.2,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            }
        );
    });
} 