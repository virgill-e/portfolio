<template>
  <div
      class="custom-block rounded-lg shadow-md overflow-hidden cursor-pointer flex items-center justify-center h-full"
    :class="[bgColor, textColor]" 
    @click="handleClick"
  >
    <div 
      v-if="svgContent" 
      v-html="svgContent" 
      class="svg-container h-14 w-14 md:h-20 md:w-20 flex items-center justify-center transform transition-transform duration-300 ease-in-out"
    ></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  bgColor: {
    type: String,
    default: 'bg-white'
  },
  textColor: {
    type: String,
    default: 'text-black'
  },
  svgContent: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: ''
  },
  isExternal: {
    type: Boolean,
    default: false
  }
});

const handleClick = () => {
  if (!props.link) return;

  if (props.isExternal) {
    // Ouvrir un lien externe dans un nouvel onglet
    window.open(props.link, '_blank');
  } else {
    // Naviguer vers un ancrage interne
    if (props.link.startsWith('#')) {
      const element = document.querySelector(props.link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // S'il ne s'agit pas d'un ancrage mais d'un lien interne
      window.location.href = props.link;
    }
  }
};
</script>

<style scoped>
.custom-block:hover .svg-container {
  transform: scale(1.25);
}

.custom-block .svg-container :deep(svg) {
  width: 100%;
  height: 100%;
}
</style>