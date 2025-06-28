<template>
    <div class="min-h-screen bg-custom-cream px-16 md:px-24 relative z-25">
        <!-- title bloc -->
        <div class="flex flex-col items-center md:justify-around h-[90vh] pb-8">
            <div class="flex flex-col items-center justify-center h-3/5 md:h-3/5">
                <h1 class="split font-lostar text-custom-cream text-shadow-custom-bronze text-6xl md:text-9xl ">
                    Virgill_e
                </h1>
                <h1 class="split font-lostar text-custom-cream text-shadow-custom-bronze text-5xl md:text-9xl">
                    developper
                </h1>
            </div>
            <div class="h-3/5 md:h-2/5 w-full flex flex-col md:flex-row justify-between md:items-center">
                <p class="md:w-3/5 py-8  text-left md:text-lg text-balance   ">Hello, I'm Virgile Bigaré, a full stack
                    developer
                    passionate about creating web and mobile applications.
                    Curious and always seeking new challenges, I enjoy exploring personal projects that
                    allow me to expand my skills and stay up-to-date in an ever-evolving field.</p>
                <UiButton @click="scrollToUiProjectImageDisplays" class="py-4 md:w-1/3 md:h-1/3"
                    text="Scroll to continue ↓" />
            </div>
        </div>

        <!-- 3 favorite projects bloc -->
        <div id="favorite-projects" class=" w-full flex flex-col items-center">
            <h2 class="text-custom-forest py-16 text-6xl font-lostar">Favorites projects</h2>
            <div class="w-full py-4">
                <div class="h-[50vh]">
                    <UiProjectImageDisplay class="h-full" project-name="Portfolio"
                        main-image="/images/projects/portfolio/large.png"
                        secondary-image="/images/projects/portfolio/mobile.webp" />
                </div>
            </div>
            <div class="w-full py-4">
                <div class="h-[50vh]">
                    <UiProjectImageDisplay class="h-full" project-name="Qairn"
                        main-image="/images/projects/qairn/1.jpeg" secondary-image="/images/projects/qairn/2.PNG" />
                </div>
            </div>
            <div class="w-full py-4">
                <div class="h-[50vh]">
                    <UiProjectImageDisplay class="h-full" project-name="Shamir secret sharing"
                        main-image="/images/projects/shamir-secret-sharing/1.jpeg"
                        secondary-image="/images/projects/shamir-secret-sharing/2.jpeg" />
                </div>
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

function scrollToUiProjectImageDisplays() {
    const UiProjectImageDisplays = document.getElementById('favorite-projects');
    UiProjectImageDisplays.scrollIntoView({ behavior: 'smooth' });
}
</script>