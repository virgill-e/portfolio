import gsap from 'gsap'

export function splitChars(text) {
  return text.split('')
}

// Splitting text into one span per letter loses the browser's word-boundary
// info, so a line can wrap in the middle of a word. This groups letters back
// into per-word tokens (each carrying a flat, shared index for ref/GSAP
// targeting) so the template can wrap each word in a `whitespace-nowrap`
// container while still animating individual letters inside it.
export function buildWordTokens(text) {
  let index = 0
  return text.split(' ').map((word) => ({
    word,
    chars: word.split('').map((char) => ({ char, index: index++ }))
  }))
}

export function useKineticType() {
  const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Letter-by-letter snap: each glyph settles from a receded, scaled-down
  // state rather than the whole word sliding in as one block. Deliberately
  // 2D-only (no rotateX/perspective): 3D transforms combined with an
  // overflow-hidden ancestor are a known WebKit/mobile rendering trap — the
  // rotated glyphs can visibly clip mid-transform until the transform flattens
  // back to none, which read as "part of the title is cut off, then appears
  // a moment later" on real phones. Under reduced motion, the letters just fade.
  function kineticVars(opts = {}) {
    const reduced = prefersReducedMotion()
    return reduced ? {
      opacity: 0,
      duration: 0.4,
      stagger: 0,
      ease: 'power1.out',
      delay: opts.delay ?? 0
    } : {
      opacity: 0,
      y: opts.y ?? 50,
      scale: opts.scale ?? 0.85,
      duration: opts.duration ?? 0.9,
      stagger: opts.stagger ?? 0.025,
      ease: 'power4.out',
      delay: opts.delay ?? 0
    }
  }

  // Standalone reveal for sections that don't need to chain into a larger timeline.
  function revealLetters(elements, opts = {}) {
    if (!elements || !elements.length) return null
    return gsap.from(elements, kineticVars(opts))
  }

  return { revealLetters, kineticVars, prefersReducedMotion }
}
