<template>
    <button ref="buttonRef"
        class="relative overflow-hidden rounded-full border-2 text-custom-forest border-custom-forest uppercase transition-all duration-300 group flex items-center justify-center px-4 py-3 md:px-6 md:py-4 text-sm md:text-base">
        <span ref="fillRef" class="absolute left-0 top-0 h-full w-0 bg-custom-forest z-0 transition-none"></span>
        <span
            class="relative z-10 group-hover:text-custom-cream transition-colors duration-300 text-center leading-tight">{{
            text }}</span>
    </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
    text: {
        type: String,
        required: true
    }
})

const buttonRef = ref(null)
const fillRef = ref(null)
let enterHandler, leaveHandler

onMounted(() => {
    enterHandler = () => {
        gsap.to(fillRef.value, { width: '100%', duration: 0.5, ease: 'power2.out' })
    }
    leaveHandler = () => {
        gsap.to(fillRef.value, { width: '0%', duration: 0.5, ease: 'power2.in' })
    }
    buttonRef.value.addEventListener('mouseenter', enterHandler)
    buttonRef.value.addEventListener('mouseleave', leaveHandler)
})

onBeforeUnmount(() => {
    if (buttonRef.value) {
        buttonRef.value.removeEventListener('mouseenter', enterHandler)
        buttonRef.value.removeEventListener('mouseleave', leaveHandler)
    }
})
</script>