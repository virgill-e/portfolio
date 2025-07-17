<template>
  <div class="custom-cursor" :class="{ clickable: isClickable }" :style="{ left: x + 'px', top: y + 'px' }"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { updateCursor, initializeCursor, cleanupCursor } from '@/assets/js/animations';

const x = ref(0);
const y = ref(0);
const isClickable = ref(false);

const refs = { x, y, isClickable };

function handleUpdateCursor(e) {
  updateCursor(e, refs);
}

onMounted(() => {
  initializeCursor(handleUpdateCursor);
});

onUnmounted(() => {
  cleanupCursor(handleUpdateCursor);
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