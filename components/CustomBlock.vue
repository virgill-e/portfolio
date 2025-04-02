<template>
  <div class="p-6 rounded-lg shadow-md flex justify-center items-center custom-block-container" :class="bgColorClass">
    <div class="w-16 h-16 flex justify-center items-center svg-container" :class="textColorClass" v-html="svgContent"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  bgColor: {
    type: String,
    default: 'bg-cream'
  },
  textColor: {
    type: String,
    default: 'text-forest'
  },
  svgContent: {
    type: String,
    required: true
  },
});

const bgColorClass = computed(() => `${props.bgColor}`);
const textColorClass = computed(() => `${props.textColor}`);
</script>

<style scoped>
.custom-block-container {
  transition: transform 0.3s ease;
  will-change: transform;
}


.svg-container {
  transition: transform 0.3s ease;
}

.custom-block-container:hover .svg-container {
  transform: scale(1.5  );
}

.svg-container :deep(svg) {
  width: 100%;
  height: 100%;
}
</style>