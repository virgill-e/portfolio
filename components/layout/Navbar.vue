<template>
    <nav ref="navRef" class="fixed top-0 left-0 right-0 z-50 flex justify-between px-16 py-8 bg-custom-cream/60 backdrop-blur-xl text-custom-forest font-bagel md:text-xl transition-all duration-300">
        <!-- Hero / Title Link -->
        <a 
            @click.prevent="scrollTo('hero')" 
            ref="heroLinkRef"
            class="cursor-pointer relative z-10 hover:opacity-80 transition-opacity"
        >
            Virgill_e
        </a>

        <!-- Navigation Links -->
        <ul class="flex gap-8 items-center relative z-10">
            <li v-for="item in navItems" :key="item.id">
                <a 
                    @click.prevent="scrollTo(item.id)" 
                    :ref="el => { if(el) itemRefs[item.id] = el }"
                    class="cursor-pointer hover:opacity-80 transition-opacity"
                >
                    {{ item.label }}
                </a>
            </li>
        </ul>

        <!-- Moving Underline -->
        <div 
            ref="underlineRef"
            class="absolute bottom-[30px] h-[2px] pointer-events-none rounded-full"
            style="background: linear-gradient(90deg, var(--color-custom-olive), var(--color-custom-forest), var(--color-custom-amber), var(--color-custom-bronze)); z-index: 1;"
        ></div>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import gsap from 'gsap'

const navRef = ref(null)
const heroLinkRef = ref(null)
const underlineRef = ref(null)
const itemRefs = ref({})

const activeId = ref('hero')

const navItems = [
    { label: 'About me', id: 'about-me' },
    { label: 'Education', id: 'education' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
]

const scrollTo = (id) => {
    const element = document.getElementById(id)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}

const updateUnderline = () => {
    if (!underlineRef.value || !navRef.value) return

    let target = null
    if (activeId.value === 'hero') {
        target = heroLinkRef.value
    } else {
        target = itemRefs.value[activeId.value]
    }

    if (target) {
        const navRect = navRef.value.getBoundingClientRect()
        const targetRect = target.getBoundingClientRect()

        const left = targetRect.left - navRect.left
        const width = targetRect.width

        gsap.to(underlineRef.value, {
            left: left,
            width: width,
            duration: 0.5,
            ease: "power2.out"
        })
    }
}

let observer = null

onMounted(() => {
    // Initial update
    // Wait for next tick/mounting to ensure rects are correct
    setTimeout(updateUnderline, 100)

    // Setup IntersectionObserver to track active section
    const options = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Active when element is in middle of screen
        threshold: 0
    }

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeId.value = entry.target.id
            }
        })
    }, options)

    // Observe all sections
    const ids = ['hero', ...navItems.map(item => item.id)]
    ids.forEach(id => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
    })
    
    // Resize listener to update underline position
    window.addEventListener('resize', updateUnderline)
})

onUnmounted(() => {
    if (observer) observer.disconnect()
    window.removeEventListener('resize', updateUnderline)
})

watch(activeId, () => {
    updateUnderline()
})
</script>