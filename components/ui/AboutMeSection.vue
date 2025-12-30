<template>
<div ref="sectionRef" id="about-me" class="w-full h-screen bg-custom-cream pt-24 px-16 relative overflow-hidden">
    <h2 ref="titleRef" class="absolute top-24 left-16 text-7xl md:text-9xl font-bagel text-custom-bronze flex flex-col items-start z-10">
        <span>Hello,</span>
        <span>I'm Virgile,</span>
    </h2>
    <p ref="textRef" class="absolute bottom-16 right-16 md:w-1/2 font-lato md:text-3xl z-10 text-justify leading-relaxed">
        a full stack developer passionate about creating web and mobile applications. Curious and always seeking new challenges, I enjoy exploring personal projects that allow me to expand my skills and stay up-to-date in an ever-evolving field.
    </p>
    <img ref="decor1Ref" class="absolute top-0 right-0 pointer-events-none" src="@/assets/images/Polygon 1.svg" alt="">
    <img ref="decor2Ref" class="absolute bottom-0 left-0 pointer-events-none" src="@/assets/images/Polygon 2.svg" alt="">
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