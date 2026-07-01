<template>
  <div class="page-404 bg-bg-primary text-text-primary min-h-screen relative selection:bg-text-primary selection:text-bg-primary overflow-x-hidden font-sans transition-colors duration-300">

    <!-- Grain/Noise Overlay -->
    <div class="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-difference" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>

    <!-- Animated Aurora/Gradient Blobs -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-accent-primary/10 blur-[120px] animate-aurora-1 mix-blend-soft-light md:mix-blend-screen"></div>
      <div class="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-accent-secondary/10 blur-[100px] animate-aurora-2 mix-blend-soft-light md:mix-blend-screen"></div>
      <div class="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-text-secondary/5 blur-[150px] animate-aurora-3 mix-blend-soft-light md:mix-blend-screen"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 flex flex-col min-h-screen">

      <!-- Header -->
      <header class="w-full max-w-7xl mx-auto px-6 md:px-16 pt-12 md:pt-20">
        <div class="flex flex-col items-center text-center gap-6">

          <!-- Elegant 404 Title -->
          <div class="relative select-none">
            <h1 class="text-[7rem] md:text-[13rem] lg:text-[17rem] font-serif font-bold leading-none tracking-tighter flex items-center justify-center">
              <span class="text-text-primary">4</span>
              <span class="italic text-text-secondary mx-[-0.03em] font-light">0</span>
              <span class="text-transparent relative" style="-webkit-text-stroke: 2px var(--text-primary); opacity: 0.85;">4</span>
            </h1>
          </div>

          <p class="text-lg md:text-2xl text-text-secondary font-sans font-light max-w-lg mx-auto leading-relaxed">
            The page you're looking for has escaped.<br class="hidden md:block" />
            <span class="text-text-muted italic">Catch it if you can!</span>
          </p>

          <button
            @click="handleGoHome"
            class="group relative inline-flex items-center justify-center px-10 py-4 font-sans tracking-widest uppercase text-sm text-bg-primary bg-text-primary rounded-full overflow-hidden transition-transform hover:scale-105 duration-300 mt-2"
          >
            <span class="relative z-10 font-bold">Back Home</span>
            <div class="absolute inset-0 bg-text-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          </button>
        </div>
      </header>

      <!-- Game Section -->
      <section class="w-full max-w-6xl mx-auto px-4 md:px-16 mt-12 md:mt-16 mb-24 md:mb-32">
        <UiGameOfLife />
      </section>
    </div>

    <!-- Theme Toggle -->
    <UiThemeToggle />
  </div>
</template>

<script setup lang="ts">
const handleGoHome = () => {
  clearError({ redirect: '/' })
}
</script>

<style>
/* ── Aurora Animations ──────────────── */
@keyframes aurora-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(10%, 10%) scale(1.1); }
  66% { transform: translate(-5%, 15%) scale(0.9); }
}
@keyframes aurora-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-15%, -10%) scale(0.95); }
  66% { transform: translate(10%, -15%) scale(1.05); }
}
@keyframes aurora-3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(5%, -15%) scale(1.02); }
  66% { transform: translate(-10%, 5%) scale(0.98); }
}

.animate-aurora-1 { animation: aurora-1 25s ease-in-out infinite; }
.animate-aurora-2 { animation: aurora-2 30s ease-in-out infinite; }
.animate-aurora-3 { animation: aurora-3 28s ease-in-out infinite; }
</style>
