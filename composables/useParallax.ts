import { ref, onMounted, onUnmounted } from 'vue'

export function useParallax() {
  const scrollY = ref(0)

  const handleScroll = () => {
    scrollY.value = window.scrollY
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initialize on mount
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    scrollY
  }
}
