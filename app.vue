<script setup lang="ts">
import { ref, provide, watch } from 'vue'

const isDark = ref(false)
const toggleDark = () => { isDark.value = !isDark.value }

provide('toggleDark', toggleDark)
provide('isDark', isDark)

watch(isDark, (val) => {
  if (val) document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
})
</script>

<template>
  <div :class="['text-custom-forest uppercase', { dark: isDark }]">
    <NuxtRouteAnnouncer />
    <LayoutNavbar />
    <UiCustomCursor />
    <NuxtPage />
    <LayoutFooter />
    <div v-if="isDark"
      style="position: fixed; inset: 0; width: 100vw; height: 100vh; background: white; mix-blend-mode: difference; pointer-events: none; z-index: 99999;">
    </div>
  </div>
</template>