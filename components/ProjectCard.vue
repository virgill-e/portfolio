<template>
  <div class="project-card w-full max-w-4xl mb-16">
    <div class="project-header flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
      <h3 class="text-custom-forest text-3xl md:text-4xl font-neuemontreal">{{ title }}</h3>
      <span class="font-neuemontreal text-custom-bronze text-xl mt-1 md:mt-0">{{ year }}</span>
    </div>
    
    <div class="project-tags flex flex-wrap gap-2 mb-4">
      <span 
        v-for="(tag, index) in tags" 
        :key="index" 
        class="px-3 py-1 bg-custom-bronze bg-opacity-20 text-custom-forest rounded-full font-neuemontreal text-sm"
      >
        {{ tag }}
      </span>
    </div>
    
    <p class="project-description text-custom-forest font-neuemontreal text-lg mb-6">
      {{ description }}
    </p>
    
    <div class="project-image w-full overflow-hidden rounded-lg shadow-lg">
      <img :src="image" :alt="title" class="w-full h-auto object-cover">
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    default: () => []
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});
</script>
