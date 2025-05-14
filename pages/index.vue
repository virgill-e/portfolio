<template>
    <div class="min-h-screen bg-custom-cream">
        <!-- title bloc -->
        <div class="flex flex-col items-center justify-center h-[90vh]">
            <h1 class="split font-lostar text-custom-cream text-shadow-custom-bronze text-9xl pt-16 h-3/4">Virgill_e
            </h1>
            <div class="h-1/4 w-full flex flex-row items-center justify-around">
                <p class="w-3/5 px-16 text-left text-lg">Bonjour, je suis Virgile Bigaré, développeur full stack
                    passionné par la création d'applications web
                    et mobiles.<br>
                    Curieux et toujours en quête de nouveaux défis, j'aime explorer des projets personnels qui me
                    permettent d'élargir mes compétences et de rester à jour dans un domaine en constante évolution.</p>
                <button class="w-2/5">scroll</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.split span {
    opacity: 0;
    display: inline-block;
}
</style>

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