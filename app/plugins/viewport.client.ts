// Pins --app-100vh to the viewport height at load time, then only updates it
// when the viewport's WIDTH actually changes (real resize, device rotation).
// This deliberately ignores height-only resize events, which is exactly what
// fires when a mobile in-app browser's chrome (Instagram, TikTok, the OS
// address bar) hides or shows on scroll — svh/dvh don't reliably cover this
// because some in-app browsers resize their WebView frame natively rather
// than going through the OS-level dynamic-toolbar mechanism those CSS units
// track. Pinning the value in JS works regardless of which mechanism it is.
export default defineNuxtPlugin(() => {
  let lastWidth = window.innerWidth

  function setPinnedVh() {
    document.documentElement.style.setProperty('--app-100vh', `${window.innerHeight}px`)
  }

  setPinnedVh()

  window.addEventListener('resize', () => {
    if (window.innerWidth !== lastWidth) {
      lastWidth = window.innerWidth
      setPinnedVh()
    }
  }, { passive: true })

  window.addEventListener('orientationchange', () => {
    lastWidth = window.innerWidth
    setPinnedVh()
  })
})
