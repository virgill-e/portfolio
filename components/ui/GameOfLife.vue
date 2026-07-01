<template>
  <div ref="gameContainer" class="life-game-container">
    <canvas ref="canvas" class="life-canvas"></canvas>

    <!-- Generation counter -->
    <div class="gen-overlay">
      <span class="gen-label">GEN</span>
      <span class="gen-value">{{ displayGeneration }}</span>
    </div>

    <!-- Reset -->
    <button class="reset-btn" @click="resetGame" aria-label="Restart simulation">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
      <span>Reset</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// ─── State ─────────────────────────────────────────
const gameContainer = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)

const generation = ref(0)
const displayGeneration = computed(() => String(generation.value).padStart(4, '0'))

// ─── Theme colors (read from CSS variables) ────────
interface ThemeColors {
  bgPrimary: string
  accentPrimary: string
  borderSubtle: string
}

function getThemeColors(): ThemeColors {
  const style = getComputedStyle(document.documentElement)
  return {
    bgPrimary: style.getPropertyValue('--bg-primary').trim() || '#0a0a0a',
    accentPrimary: style.getPropertyValue('--accent-primary').trim() || '#ffffff',
    borderSubtle: style.getPropertyValue('--border-subtle').trim() || 'rgba(255,255,255,0.05)',
  }
}

// ─── Pixel-art "404" seed pattern (5x7 dot-matrix digits) ──
const DIGIT_4 = ['10001', '10001', '10001', '11111', '00001', '00001', '00001']
const DIGIT_0 = ['01110', '10001', '10001', '10001', '10001', '10001', '01110']

function build404Pattern(): { rows: string[]; width: number; height: number } {
  const glyphs = [DIGIT_4, DIGIT_0, DIGIT_4]
  const height = 7
  const rows: string[] = Array.from({ length: height }, () => '')

  glyphs.forEach((glyph, gi) => {
    for (let r = 0; r < height; r++) {
      rows[r] += glyph[r]
      if (gi < glyphs.length - 1) rows[r] += '0'
    }
  })

  return { rows, width: rows[0].length, height }
}

// ─── Simulation constants ──────────────────────────
const STEP_INTERVAL_MS = 130
const HOLD_MS = 3500 // Keep the seeded "404" pattern static & readable before it starts evolving
const CELL_PX_DESKTOP = 12
const CELL_PX_MOBILE = 9

// ─── Engine state ──────────────────────────────────
let ctx: CanvasRenderingContext2D | null = null
let animFrame = 0
let colors: ThemeColors

let canvasW = 0
let canvasH = 0
let cellPx = CELL_PX_DESKTOP
let cols = 0
let rows = 0
let grid = new Uint8Array(0)
let nextGrid = new Uint8Array(0)
let lastStepTime = 0
let holdUntil = 0

function idx(x: number, y: number): number {
  return y * cols + x
}

function resizeCanvas() {
  if (!canvas.value || !gameContainer.value) return
  const rect = gameContainer.value.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1
  canvasW = rect.width
  canvasH = rect.height
  canvas.value.width = canvasW * dpr
  canvas.value.height = canvasH * dpr
  canvas.value.style.width = canvasW + 'px'
  canvas.value.style.height = canvasH + 'px'
  ctx = canvas.value.getContext('2d')
  if (ctx) ctx.scale(dpr, dpr)

  cellPx = canvasW < 500 ? CELL_PX_MOBILE : CELL_PX_DESKTOP
  cols = Math.max(20, Math.floor(canvasW / cellPx))
  rows = Math.max(12, Math.floor(canvasH / cellPx))
}

function seedWithPattern() {
  grid = new Uint8Array(cols * rows)
  nextGrid = new Uint8Array(cols * rows)
  generation.value = 0
  holdUntil = performance.now() + HOLD_MS
  lastStepTime = holdUntil

  const { rows: patternRows, width: pw, height: ph } = build404Pattern()

  const maxScaleByWidth = Math.floor((cols * 0.8) / pw)
  const maxScaleByHeight = Math.floor((rows * 0.6) / ph)
  const scale = Math.max(1, Math.min(6, maxScaleByWidth, maxScaleByHeight))

  const offsetX = Math.floor((cols - pw * scale) / 2)
  const offsetY = Math.floor((rows - ph * scale) / 2)

  for (let py = 0; py < ph; py++) {
    for (let px = 0; px < pw; px++) {
      if (patternRows[py][px] !== '1') continue
      for (let sy = 0; sy < scale; sy++) {
        for (let sx = 0; sx < scale; sx++) {
          const x = offsetX + px * scale + sx
          const y = offsetY + py * scale + sy
          if (x >= 0 && x < cols && y >= 0 && y < rows) {
            grid[idx(x, y)] = 1
          }
        }
      }
    }
  }
}

// ─── Conway's rules ────────────────────────────────
function countNeighbors(x: number, y: number): number {
  let count = 0
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue
      const nx = x + dx
      const ny = y + dy
      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && grid[idx(nx, ny)]) count++
    }
  }
  return count
}

function step() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const alive = grid[idx(x, y)]
      const n = countNeighbors(x, y)
      nextGrid[idx(x, y)] = alive ? (n === 2 || n === 3 ? 1 : 0) : n === 3 ? 1 : 0
    }
  }
  const tmp = grid
  grid = nextGrid
  nextGrid = tmp
  generation.value++
}

// ─── Rendering ─────────────────────────────────────
function render() {
  if (!ctx) return

  ctx.clearRect(0, 0, canvasW, canvasH)
  ctx.fillStyle = colors.bgPrimary
  ctx.fillRect(0, 0, canvasW, canvasH)

  // Faint grid
  ctx.strokeStyle = colors.borderSubtle
  ctx.lineWidth = 0.5
  for (let x = 0; x <= cols; x++) {
    ctx.beginPath()
    ctx.moveTo(x * cellPx, 0)
    ctx.lineTo(x * cellPx, rows * cellPx)
    ctx.stroke()
  }
  for (let y = 0; y <= rows; y++) {
    ctx.beginPath()
    ctx.moveTo(0, y * cellPx)
    ctx.lineTo(cols * cellPx, y * cellPx)
    ctx.stroke()
  }

  // Live cells
  ctx.fillStyle = colors.accentPrimary
  const pad = Math.max(1, cellPx * 0.12)
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[idx(x, y)]) {
        ctx.fillRect(x * cellPx + pad / 2, y * cellPx + pad / 2, cellPx - pad, cellPx - pad)
      }
    }
  }
}

function loop(timestamp: number) {
  if (timestamp - lastStepTime >= STEP_INTERVAL_MS) {
    lastStepTime = timestamp
    step()
  }
  render()
  animFrame = requestAnimationFrame(loop)
}

function resetGame() {
  colors = getThemeColors()
  seedWithPattern()
}

// ─── Lifecycle ─────────────────────────────────────
let resizeObserver: ResizeObserver | null = null
let themeObserver: MutationObserver | null = null

onMounted(() => {
  resizeCanvas()
  resetGame()

  resizeObserver = new ResizeObserver(() => {
    resizeCanvas()
    seedWithPattern()
  })
  if (gameContainer.value) resizeObserver.observe(gameContainer.value)

  themeObserver = new MutationObserver(() => {
    colors = getThemeColors()
  })
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] })

  animFrame = requestAnimationFrame(loop)
})

onUnmounted(() => {
  cancelAnimationFrame(animFrame)
  resizeObserver?.disconnect()
  themeObserver?.disconnect()
})
</script>

<style scoped>
.life-game-container {
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  background: var(--bg-secondary);
  user-select: none;
  -webkit-user-select: none;
}

@media (min-width: 768px) {
  .life-game-container {
    height: 400px;
    border-radius: 2rem;
  }
}

.life-canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.gen-overlay {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  font-family: "Lato", monospace;
  pointer-events: none;
  z-index: 10;
}

.gen-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.gen-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
}

.reset-btn {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--text-primary);
  color: var(--bg-primary);
  border: none;
  border-radius: 999px;
  font-family: "Lato", sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.2s;
  z-index: 10;
}

.reset-btn:hover {
  transform: scale(1.05);
}

.reset-btn:active {
  transform: scale(0.95);
}
</style>
