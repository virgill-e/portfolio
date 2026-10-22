import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Runs once, before any component mounts. Mobile in-app browsers (Instagram,
// TikTok, etc.) show/hide their toolbar on scroll, which fires a resize event
// with only the height changing — ScrollTrigger's default refresh-on-resize
// then recalculates every trigger mid-scroll and the page visibly jumps.
// ignoreMobileResize tells it to skip resize events that are just the mobile
// toolbar, not a real viewport change.
export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.config({ ignoreMobileResize: true })
})
