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

  // Many individually-transformed letter spans (each forced onto its own GPU
  // layer by GSAP's translate3d) nested inside an overflow-hidden ancestor is
  // a known WebKit/mobile rendering trap: letters can visibly clip mid-reveal
  // until the transform settles, reading as "part of the title cut off, then
  // appears a moment later" on real phones. Desktop browsers (and the fewer
  // layers of a single fine-pointer hover) don't hit it in practice. So the
  // transform-driven reveal is a desktop-only enhancement; touch/narrow
  // viewports — same bucket as reduced motion — get an opacity-only fade:
  // same letters, same timing, zero transform, zero clipping risk.
  const shouldSimplify = () => {
    if (typeof window === 'undefined') return true
    return prefersReducedMotion() ||
      !window.matchMedia('(min-width: 768px)').matches ||
      !window.matchMedia('(pointer: fine)').matches
  }

  function kineticVars(opts = {}) {
    return shouldSimplify() ? {
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
