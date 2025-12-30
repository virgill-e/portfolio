<template>
<div ref="sectionRef" id="about-me" class="w-full min-h-screen bg-custom-cream px-6 md:px-16 py-20 md:py-24 relative overflow-hidden flex flex-col justify-center md:block">
    <div class="flex flex-col gap-6 md:gap-0 md:contents">
        <h2 ref="titleRef" class="relative md:absolute md:top-24 md:left-16 text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bagel text-custom-bronze flex flex-col items-start z-10">
            <span>Hello,</span>
            <span>I'm Virgile,</span>
        </h2>
        <p ref="textRef" class="relative md:absolute md:bottom-16 md:right-16 w-full md:w-1/2 font-lato text-lg sm:text-xl md:text-2xl lg:text-3xl z-10 text-justify leading-relaxed">
            a full stack developer passionate about creating web and mobile applications. Curious and always seeking new challenges, I enjoy exploring personal projects that allow me to expand my skills and stay up-to-date in an ever-evolving field.
        </p>
    </div>
    <img ref="decor1Ref" class="absolute top-0 right-0 pointer-events-none w-40 sm:w-56 md:w-72 lg:w-auto opacity-60 md:opacity-100" src="@/assets/images/Polygon 1.svg" alt="">
    <img ref="decor2Ref" class="absolute bottom-0 left-0 pointer-events-none w-40 sm:w-56 md:w-72 lg:w-auto opacity-60 md:opacity-100" src="@/assets/images/Polygon 2.svg" alt="">
</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const titleRef = ref(null);
const textRef = ref(null);
const decor1Ref = ref(null);
const decor2Ref = ref(null);

let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 75%', // Animation starts when top of section hits 75% of viewport height
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      }
    });

    tl.from(titleRef.value.children, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power4.out'
    })
    .from(textRef.value, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5')
    .from([decor1Ref.value, decor2Ref.value], {
      scale: 0,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'elastic.out(1, 0.5)'
    }, '-=1');

  }, sectionRef.value);
});

onUnmounted(() => {
  ctx && ctx.revert();
});
</script>