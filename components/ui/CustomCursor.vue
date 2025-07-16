<template>
  <div class="custom-cursor" :class="{ clickable: isClickable }" :style="{ left: x + 'px', top: y + 'px' }"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const x = ref(0);
const y = ref(0);
const isClickable = ref(false);

function checkClickable(e) {
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
      isClickable.value = true;
      return;
    }
    currentEl = currentEl.parentElement;
  }
  isClickable.value = false;
}

function updateCursor(e) {
  x.value = e.clientX;
  y.value = e.clientY;
  checkClickable(e);
}

onMounted(() => {
  window.addEventListener('mousemove', updateCursor);
});
onUnmounted(() => {
  window.removeEventListener('mousemove', updateCursor);
});
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 100001;
  mix-blend-mode: difference;
  background: white;
  transform: translate(-50%, -50%);
  transition: width 0.15s, height 0.15s;
}

.custom-cursor.clickable {
  width: 40px;
  height: 40px;
}
</style>