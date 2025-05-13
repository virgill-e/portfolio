<template>
    <div
      class="custom-cursor"
      :class="{ clickable: isClickable }"
      :style="{ left: x + 'px', top: y + 'px' }"
    ></div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const x = ref(0);
  const y = ref(0);
  const isClickable = ref(false);
  
  function checkClickable(e) {
    let el = e.target;
    while (el) {
      if (
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.onclick ||
        el.getAttribute('role') === 'button'
      ) {
        isClickable.value = true;
        return;
      }
      el = el.parentElement;
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
    z-index: 9999;
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
  