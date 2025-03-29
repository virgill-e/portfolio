<template>
  <div class="p-6 rounded-lg shadow-md" :class="bgColorClass">
    <div class="flex items-center mb-4">
      <div class="w-10 h-10 mr-3" :class="textColorClass" v-html="svgContent"></div>
    </div>
  </div>
</template>

<script setup>
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