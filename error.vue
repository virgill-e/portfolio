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
      <section class="w-full max-w-6xl mx-auto px-4 md:px-16 mt-12 md:mt-16">
        <UiRunnerGame @score-submitted="refreshLeaderboard" />
      </section>

      <!-- Leaderboard Section -->
      <section class="w-full max-w-4xl mx-auto px-6 md:px-16 mt-16 md:mt-24 pb-24">
        <div class="flex items-end justify-between border-b border-border-subtle pb-6 mb-10">
          <h2 class="text-3xl md:text-5xl font-serif font-bold text-text-primary tracking-tighter">
            Leaderboard
          </h2>
          <span class="text-text-muted font-sans tracking-widest uppercase text-xs">
            Top 10
          </span>
        </div>

        <!-- Loading state -->
        <div v-if="leaderboardLoading" class="flex items-center justify-center py-16">
          <div class="leaderboard-spinner"></div>
        </div>

        <!-- Empty state -->
        <div v-else-if="leaderboard.length === 0" class="flex flex-col items-center justify-center py-16 gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted opacity-50">
            <path d="M12 20V10"/>
            <path d="M18 20V4"/>
            <path d="M6 20v-4"/>
          </svg>
          <p class="text-text-muted font-sans tracking-widest uppercase text-sm">
            No scores yet — be the first!
          </p>
        </div>

        <!-- Scores list -->
        <div v-else class="leaderboard-list">
          <div
            v-for="(entry, index) in leaderboard"
            :key="index"
            class="leaderboard-entry"
            :class="{ 'top-three': index < 3 }"
          >
            <!-- Rank -->
            <div class="entry-rank" :class="rankClass(index)">
              <span v-if="index === 0" class="rank-icon">🥇</span>
              <span v-else-if="index === 1" class="rank-icon">🥈</span>
              <span v-else-if="index === 2" class="rank-icon">🥉</span>
              <span v-else class="rank-number">#{{ index + 1 }}</span>
            </div>

            <!-- Pseudo -->
            <div class="entry-pseudo">
              {{ entry.pseudo }}
            </div>

            <!-- Score -->
            <div class="entry-score">
              {{ formatScore(entry.score) }}
            </div>

            <!-- Decorative bar (width based on score relative to #1) -->
            <div
              class="entry-bar"
              :style="{ width: `${(entry.score / (leaderboard[0]?.score || 1)) * 100}%` }"
            ></div>
          </div>
        </div>
      </section>
    </div>

    <!-- Theme Toggle -->
    <UiThemeToggle />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface ScoreEntry {
  pseudo: string
  score: number
  date: string
}

const leaderboard = ref<ScoreEntry[]>([])
const leaderboardLoading = ref(true)

const handleGoHome = () => {
  clearError({ redirect: '/' })
}

function formatScore(score: number): string {
  return String(Math.floor(score)).padStart(5, '0')
}

function rankClass(index: number): string {
  if (index === 0) return 'rank-gold'
  if (index === 1) return 'rank-silver'
  if (index === 2) return 'rank-bronze'
  return ''
}

async function fetchLeaderboard() {
  try {
    const data = await $fetch<{ scores: ScoreEntry[] }>('/api/scores')
    leaderboard.value = data.scores || []
  } catch (err) {
    console.error('Failed to fetch leaderboard:', err)
    leaderboard.value = []
  } finally {
    leaderboardLoading.value = false
  }
}

function refreshLeaderboard() {
  fetchLeaderboard()
}

onMounted(() => {
  fetchLeaderboard()
})
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

<style scoped>
/* ── Elegant 404 Typography ─────────── */

/* ── Leaderboard ────────────────────── */
.leaderboard-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.leaderboard-entry {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  border-radius: 12px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-secondary);
  overflow: hidden;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.leaderboard-entry:hover {
  transform: translateX(4px);
  border-color: var(--accent-primary);
}

.leaderboard-entry.top-three {
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
}

.entry-rank {
  width: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rank-icon {
  font-size: 22px;
  line-height: 1;
}

.rank-number {
  font-family: "Lato", monospace;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.entry-pseudo {
  flex: 1;
  font-family: "Lato", sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.03em;
  text-transform: uppercase;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  z-index: 2;
}

.entry-score {
  font-family: "Lato", monospace;
  font-size: 18px;
  font-weight: 700;
  color: var(--accent-primary);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.05em;
  position: relative;
  z-index: 2;
}

.entry-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  border-radius: 0 3px 0 0;
  opacity: 0.4;
  transition: width 0.8s ease;
}

.rank-gold .rank-icon { filter: drop-shadow(0 0 6px rgba(255, 215, 0, 0.4)); }
.rank-silver .rank-icon { filter: drop-shadow(0 0 6px rgba(192, 192, 192, 0.4)); }
.rank-bronze .rank-icon { filter: drop-shadow(0 0 6px rgba(205, 127, 50, 0.4)); }

/* ── Spinner ────────────────────────── */
.leaderboard-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border-subtle);
  border-top-color: var(--text-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
