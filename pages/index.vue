<template>
  <div class="bg-[#0a0a0a] text-zinc-100 min-h-screen relative selection:bg-zinc-100 selection:text-[#0a0a0a] overflow-x-hidden font-sans">
    
    <!-- Grain/Noise Overlay -->
    <div class="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-difference" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>
    
    <!-- Animated Aurora/Gradient Blobs -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/20 blur-[100px] animate-aurora-1 mix-blend-screen"></div>
      <div class="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-indigo-900/20 blur-[100px] animate-aurora-2 mix-blend-screen"></div>
      <div class="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-slate-800/30 blur-[120px] animate-aurora-3 mix-blend-screen"></div>
    </div>

    <!-- Main Content wrapper to ensure it sits above background -->
    <div class="relative z-10">
      <LayoutNavbar />
      <UiHeroSection id="hero" />
      <UiAboutMeSection id="about-me" />
      <UiEducationSection id="education" />
      <UiExperienceSection id="experience" />
      <UiProjectsSection id="projects" />
      <LayoutFooter id="contact" />
    </div>
  </div>
</template>

<style>
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