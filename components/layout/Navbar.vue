<template>
    <nav 
        ref="navRef" 
        class="fixed top-0 left-0 right-0 z-[9999] flex justify-between items-center px-6 md:px-16 transition-all duration-300 font-bagel md:text-xl text-custom-forest backdrop-blur-xl"
        :class="isScrolled ? 'bg-custom-cream shadow-md py-4 md:py-6' : 'bg-custom-cream/80 md:bg-custom-cream/60 py-6 md:py-8'"
        style="transform: translateZ(0); will-change: transform; -webkit-transform: translateZ(0);"
    >
        <!-- Hero / Title Link -->
        <a 
            @click.prevent="scrollTo('hero')" 
            ref="heroLinkRef"
            class="cursor-pointer relative z-50 hover:opacity-80 transition-opacity text-xl md:text-2xl"
        >
            Virgill_e
        </a>

        <!-- Desktop Navigation Links -->
        <ul class="hidden md:flex gap-8 items-center relative z-10">
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

        <!-- Desktop Moving Underline (Hidden on Mobile) -->
        <div 
            ref="underlineRef"
            class="hidden md:block absolute bottom-[30px] h-[2px] pointer-events-none rounded-full transition-all duration-300"
            style="background: linear-gradient(90deg, var(--color-custom-olive), var(--color-custom-forest), var(--color-custom-amber), var(--color-custom-bronze)); z-index: 1;"
            :class="isScrolled ? 'bottom-[20px]' : 'bottom-[30px]'"
        ></div>

        <!-- Mobile Menu Button -->
        <button 
            @click="toggleMenu" 
            class="md:hidden relative z-50 p-2 hover:bg-custom-forest/10 rounded-full transition-colors"
            aria-label="Toggle Menu"
        >
            <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"/>
                <line x1="4" x2="20" y1="6" y2="6"/>
                <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18"/>
                <path d="m6 6 18 12"/>
            </svg>
        </button>

        <!-- Mobile Menu Overlay -->
        <div 
            class="fixed inset-0 h-[100dvh] bg-custom-cream/90 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-10 md:hidden transition-all duration-500 ease-in-out"
            :class="isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
        >
            <a 
                v-for="item in navItems" 
                :key="item.id"
                @click.prevent="scrollTo(item.id)"
                class="text-4xl font-bagel text-custom-forest cursor-pointer hover:text-custom-bronze transition-colors relative group"
                :class="{ 'text-custom-bronze': activeId === item.id }"
            >
                {{ item.label }}
                <!-- Animated underline for mobile items -->
                <span 
                    class="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-custom-bronze rounded-full transition-all duration-300"
                    :class="activeId === item.id ? 'w-full' : 'w-0 group-hover:w-full'"
                ></span>
            </a>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import gsap from 'gsap'

const navRef = ref(null)
const heroLinkRef = ref(null)
const underlineRef = ref(null)
const itemRefs = ref({})
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const activeId = ref('hero')

const navItems = [
    { label: 'About me', id: 'about-me' },
    { label: 'Education', id: 'education' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
]

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
    // Prevent body scroll when menu is open
    if (isMenuOpen.value) {
        document.body.style.overflow = 'hidden'
        document.documentElement.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
        document.documentElement.style.overflow = ''
    }
}

const scrollTo = (id) => {
    // Close menu if open (mobile)
    if (isMenuOpen.value) {
        toggleMenu()
    }

    const element = document.getElementById(id)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}

const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
    // Force update underline position as padding changes
    requestAnimationFrame(updateUnderline)
}

const updateUnderline = () => {
    // Only update if elements exist and we are on desktop (width check or check if parent is visible)
    if (!underlineRef.value || !navRef.value) return
    
    // Check if underline is visible (it's hidden on mobile)
    const style = window.getComputedStyle(underlineRef.value)
    if (style.display === 'none') return

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
    setTimeout(updateUnderline, 100)
    
    window.addEventListener('scroll', handleScroll)

    // Setup IntersectionObserver
    const options = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    }

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeId.value = entry.target.id
            }
        })
    }, options)

    const ids = ['hero', ...navItems.map(item => item.id)]
    ids.forEach(id => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
    })
    
    window.addEventListener('resize', updateUnderline)
})

onUnmounted(() => {
    if (observer) observer.disconnect()
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', updateUnderline)
    document.body.style.overflow = '' // Ensure scroll is restored
    document.documentElement.style.overflow = ''
})

watch(activeId, () => {
    updateUnderline()
})
</script>