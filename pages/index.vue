<template>
    <div class="min-h-screen bg-custom-cream">
        <!-- title bloc -->
        <div class="flex flex-col items-center justify-around h-[90vh]">
            <div class="flex flex-col items-center justify-center h-2/5 md:h-3/5">
                <h1 class="split font-lostar text-custom-cream text-shadow-custom-bronze text-5xl md:text-9xl ">Virgill_e
                </h1>
                <h1 class="split font-lostar text-custom-cream text-shadow-custom-bronze text-5xl md:text-9xl">developper
                </h1>
            </div>
            <div class="h-3/5 md:h-2/5 w-full flex flex-col md:flex-row items-center justify-around">
                <p class="md:w-3/5 px-8 md:px-16 text-left md:text-lg">Bonjour, je suis Virgile Bigaré, développeur full stack
                    passionné par la création d'applications web
                    et mobiles.<br>
                    Curieux et toujours en quête de nouveaux défis, j'aime explorer des projets personnels qui me
                    permettent d'élargir mes compétences et de rester à jour dans un domaine en constante évolution.</p>
                <UiButton class="px-16 py-4" text="Scroll to continue ↓" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

onMounted(() => {
    let split = new SplitText(".split", { type: "words, chars" });
    split.chars.forEach((char, i) => {
        gsap.fromTo(char, {
            opacity: 0,
            duration: 0.5,
            y: -100,
            delay: 0.05 * i
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.05 * i
        });
    });
});
</script>