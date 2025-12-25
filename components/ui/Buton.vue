<template>
    <button class="w-fit h-fit px-8 md:px-16 py-4 md:py-8 mt-16 bg-custom-forest text-custom-cream cursor-pointer rounded-full font-bagel text-lg md:text-2xl">
        {{ text }}
    </button>
</template>

<script setup>
    const props = defineProps({
        text: String,
        href: String,

    })
</script>