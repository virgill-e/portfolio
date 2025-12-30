<template>
    <div 
        ref="containerRef"
        class="w-full h-auto aspect-[4/3] relative cursor-pointer perspective-1000"
        @mouseenter="cycleImage(true)"
        @click="cycleImage(false)"
    >
        <template v-for="(img, idx) in displayedImages" :key="img.uniqueId">
            <div 
                class="absolute inset-0 w-full h-full bg-custom-cream border-4 border-custom-bronze rounded-[2rem] overflow-hidden shadow-[8px_8px_0px_0px_var(--color-custom-bronze)] transition-all duration-500 ease-out image-card"
                :style="{
                    zIndex: displayedImages.length - idx,
                    transform: `translate(${idx * 4}px, ${idx * 4}px) rotate(${img.rotation}deg)`
                }"
            >
                <img :src="img.src" alt="Project Image" class="w-full h-full object-cover pointer-events-none select-none" />
                <div class="absolute inset-0 bg-custom-bronze opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const props = defineProps({
    images: {
        type: Array,
        required: true
    }
});

const containerRef = ref(null);

const initImages = () => {
    let imgs = [...props.images];
    // Ensure we have at least 3 images for the stack effect
    if (imgs.length < 3) {
        if (imgs.length === 1) imgs = [imgs[0], imgs[0], imgs[0]];
        else if (imgs.length === 2) imgs = [imgs[0], imgs[1], imgs[0], imgs[1]];
    }
    // Limit to 5 max to prevent DOM bloat
    imgs = imgs.slice(0, 5);
    
    return imgs.map((src, i) => ({
        src,
        uniqueId: `img-${Date.now()}-${i}`, // stable key
        rotation: (Math.random() * 6 - 3)
    }));
};

const displayedImages = ref(initImages());
const isAnimating = ref(false);

const cycleImage = () => {
    if (isAnimating.value) return; 
    
    // Scoped selection within this component instance
    const cards = containerRef.value.querySelectorAll('.image-card');
    if (!cards || cards.length === 0) return;
    
    // The top card is visually the one with highest z-index.
    // In our v-for loop, index 0 is at z-index: length.
    // So index 0 corresponds to the first element in DOM?
    // v-for renders in order. 
    // Element 0: z-index N
    // Element 1: z-index N-1
    // So Element 0 is indeed the top one visually.
    const topCard = cards[0];
    
    if (!topCard) return;

    isAnimating.value = true;

    const tl = gsap.timeline({
        onComplete: () => {
            // Reset styles immediately before Vue re-renders structure
            gsap.set(topCard, { clearProps: "all" });
            
            // Move first item to end of array
            const first = displayedImages.value.shift();
            // Re-randomize rotation slightly
            first.rotation = (Math.random() * 6 - 3);
            displayedImages.value.push(first);
            
            isAnimating.value = false;
        }
    });

    const directionX = Math.random() > 0.5 ? 150 : -150;
    const rotation = Math.random() * 20 - 10;

    tl.to(topCard, {
        x: directionX,
        y: 50,
        rotation: rotation,
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power2.in"
    });
};
</script>

<style scoped>
.perspective-1000 {
    perspective: 1000px;
}
</style>
