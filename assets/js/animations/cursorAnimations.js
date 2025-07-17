/**
 * Vérifie si l'élément sous le curseur est cliquable
 * @param {MouseEvent} e - Événement de souris
 * @returns {boolean} - True si l'élément est cliquable
 */
export function checkClickable(e) {
    // Prend seulement le premier élément sous la souris (le plus haut)
    const el = document.elementFromPoint(e.clientX, e.clientY);

    let currentEl = el;
    while (currentEl) {
        if (
            currentEl.tagName === 'A' ||
            currentEl.tagName === 'BUTTON' ||
            currentEl.onclick ||
            currentEl.getAttribute('role') === 'button'
        ) {
            return true;
        }
        currentEl = currentEl.parentElement;
    }
    return false;
}

/**
 * Met à jour la position du curseur et vérifie si l'élément est cliquable
 * @param {MouseEvent} e - Événement de souris
 * @param {Object} refs - Objets refs contenant x, y et isClickable
 */
export function updateCursor(e, refs) {
    refs.x.value = e.clientX;
    refs.y.value = e.clientY;
    refs.isClickable.value = checkClickable(e);
}

/**
 * Initialise les event listeners pour le curseur personnalisé
 * @param {Function} updateFunction - Fonction de mise à jour du curseur
 */
export function initializeCursor(updateFunction) {
    window.addEventListener('mousemove', updateFunction);
}

/**
 * Nettoie les event listeners du curseur personnalisé
 * @param {Function} updateFunction - Fonction de mise à jour du curseur
 */
export function cleanupCursor(updateFunction) {
    window.removeEventListener('mousemove', updateFunction);
} 