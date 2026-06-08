<template>
  <div ref="gameContainer" class="runner-game-container" @touchstart.prevent="onTouchStart" @touchend.prevent="onTouchEnd">
    <canvas ref="canvas" class="runner-canvas"></canvas>

    <!-- Score overlay -->
    <div class="score-overlay">
      <span class="score-label">SCORE</span>
      <span class="score-value">{{ displayScore }}</span>
    </div>

    <!-- Hi-Score overlay -->
    <div v-if="hiScore > 0" class="hiscore-overlay">
      <span class="score-label">HI</span>
      <span class="score-value">{{ displayHiScore }}</span>
    </div>

    <!-- Start screen -->
    <div v-if="gameState === 'idle'" class="game-overlay start-overlay" @click="startGame">
      <div class="overlay-content">
        <div class="start-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </div>
        <p class="start-text desktop-text">Press <kbd>Space</kbd> to start</p>
        <p class="start-text mobile-text">Tap to start</p>
      </div>
    </div>

    <!-- Game over screen -->
    <div v-if="gameState === 'gameover'" class="game-overlay gameover-overlay">
      <div class="overlay-content gameover-content">
        <h3 class="gameover-title">GAME OVER</h3>
        <p class="gameover-score">{{ displayScore }} pts</p>

        <!-- Submit form -->
        <form v-if="!submitted" class="submit-form" @submit.prevent="submitScore">
          <input
            ref="pseudoInput"
            v-model="pseudo"
            type="text"
            maxlength="16"
            placeholder="Your pseudo"
            class="pseudo-input"
            autocomplete="off"
          />
          <button type="submit" class="submit-btn" :disabled="submitting || !pseudo.trim()">
            {{ submitting ? '...' : 'Submit Score' }}
          </button>
        </form>
        <p v-else class="submitted-msg">
          Score saved! Rank #{{ submitRank }}
        </p>

        <button class="restart-btn" @click="startGame">
          <span class="desktop-text">Press <kbd>Space</kbd> or click to retry</span>
          <span class="mobile-text">Tap to retry</span>
        </button>
      </div>
    </div>

    <!-- Mobile controls -->
    <div v-if="gameState === 'playing' && isMobile" class="mobile-controls">
      <button class="mobile-btn jump-btn" @touchstart.prevent="onJump" aria-label="Jump">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
      <button class="mobile-btn duck-btn" @touchstart.prevent="onDuckStart" @touchend.prevent="onDuckEnd" aria-label="Duck">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

// ─── Emits ─────────────────────────────────────────
const emit = defineEmits<{
  (e: 'score-submitted'): void
}>()

// ─── Refs ──────────────────────────────────────────
const gameContainer = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const pseudoInput = ref<HTMLInputElement | null>(null)

// ─── State ─────────────────────────────────────────
const gameState = ref<'idle' | 'playing' | 'gameover'>('idle')
const score = ref(0)
const hiScore = ref(0)
const pseudo = ref('')
const submitted = ref(false)
const submitting = ref(false)
const submitRank = ref<number | null>(null)
const isMobile = ref(false)

const displayScore = computed(() => String(Math.floor(score.value)).padStart(5, '0'))
const displayHiScore = computed(() => String(Math.floor(hiScore.value)).padStart(5, '0'))

// ─── Theme colors (read from CSS variables) ────────
interface ThemeColors {
  bgPrimary: string
  bgSecondary: string
  bgTertiary: string
  textPrimary: string
  textSecondary: string
  textMuted: string
  accentPrimary: string
  accentSecondary: string
  borderSubtle: string
}

function getThemeColors(): ThemeColors {
  const style = getComputedStyle(document.documentElement)
  return {
    bgPrimary: style.getPropertyValue('--bg-primary').trim() || '#0a0a0a',
    bgSecondary: style.getPropertyValue('--bg-secondary').trim() || '#09090b',
    bgTertiary: style.getPropertyValue('--bg-tertiary').trim() || '#18181b',
    textPrimary: style.getPropertyValue('--text-primary').trim() || '#f4f4f5',
    textSecondary: style.getPropertyValue('--text-secondary').trim() || '#a1a1aa',
    textMuted: style.getPropertyValue('--text-muted').trim() || 'rgba(244,244,245,0.4)',
    accentPrimary: style.getPropertyValue('--accent-primary').trim() || '#ffffff',
    accentSecondary: style.getPropertyValue('--accent-secondary').trim() || '#d4d4d8',
    borderSubtle: style.getPropertyValue('--border-subtle').trim() || 'rgba(255,255,255,0.05)',
  }
}

// ─── Game constants ────────────────────────────────
const GRAVITY = 0.6
const JUMP_FORCE = -13
const GROUND_OFFSET = 60 // px from bottom
const PLAYER_WIDTH = 32
const PLAYER_HEIGHT = 48
const PLAYER_DUCK_HEIGHT = 28
const INITIAL_SPEED = 5
const MAX_SPEED = 16
const SPEED_INCREMENT = 0.0015 // Progression plus douce et agréable
const MIN_OBSTACLE_GAP = 45 // Facteur de vitesse (pixels = MIN_OBSTACLE_GAP * speed)
const OBSTACLE_SPAWN_BASE = 55 // Facteur de vitesse de base pour la distance
const OBSTACLE_SPAWN_VARIANCE = 45 // Facteur de vitesse de variance pour la distance

// ─── Game engine state ─────────────────────────────
let ctx: CanvasRenderingContext2D | null = null
let animFrame = 0
let colors: ThemeColors

// Player
let playerX = 0
let playerY = 0
let playerVelocityY = 0
let playerDucking = false
let isJumping = false
let runFrame = 0
let runTimer = 0

// World
let speed = INITIAL_SPEED
let groundY = 0
let canvasW = 0
let canvasH = 0

// Obstacles
interface Obstacle {
  x: number
  y: number
  width: number
  height: number
  type: 'ground' | 'aerial'
  text: string
}
let obstacles: Obstacle[] = []
let spawnTimer = 0
let spawnInterval = OBSTACLE_SPAWN_BASE

// Parallax
interface Star {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}
let stars: Star[] = []

// Particles (ground dust)
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
}
let particles: Particle[] = []

// Input
let keys: Record<string, boolean> = {}

// ─── Functions ─────────────────────────────────────
function detectMobile() {
  isMobile.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
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
  if (ctx) {
    ctx.scale(dpr, dpr)
  }
  groundY = canvasH - GROUND_OFFSET
}

function initStars() {
  stars = []
  for (let i = 0; i < 60; i++) {
    stars.push({
      x: Math.random() * canvasW,
      y: Math.random() * (groundY - 40),
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.3 + 0.05,
    })
  }
}

function resetGame() {
  playerX = 80
  playerY = groundY - PLAYER_HEIGHT
  playerVelocityY = 0
  playerDucking = false
  isJumping = false
  runFrame = 0
  runTimer = 0
  speed = INITIAL_SPEED
  obstacles = []
  particles = []
  spawnTimer = 0
  spawnInterval = OBSTACLE_SPAWN_BASE * speed
  score.value = 0
  submitted.value = false
  submitting.value = false
  submitRank.value = null
  pseudo.value = ''
  colors = getThemeColors()
  initStars()
}

function startGame() {
  resetGame()
  gameState.value = 'playing'
  keys = {}
}

function gameOver() {
  gameState.value = 'gameover'
  if (score.value > hiScore.value) {
    hiScore.value = score.value
  }
  nextTick(() => {
    pseudoInput.value?.focus()
  })
}

// ─── Input ─────────────────────────────────────────
function onKeyDown(e: KeyboardEvent) {
  keys[e.code] = true

  if (e.code === 'Space' || e.code === 'ArrowUp') {
    e.preventDefault()
    if (gameState.value === 'idle') {
      startGame()
    } else if (gameState.value === 'gameover') {
      startGame()
    } else if (gameState.value === 'playing') {
      onJump()
    }
  }
  if (e.code === 'ArrowDown' && gameState.value === 'playing') {
    e.preventDefault()
    onDuckStart()
  }
}

function onKeyUp(e: KeyboardEvent) {
  keys[e.code] = false
  if (e.code === 'ArrowDown') {
    onDuckEnd()
  }
}

function onJump() {
  if (!isJumping && gameState.value === 'playing') {
    playerVelocityY = JUMP_FORCE
    isJumping = true
    playerDucking = false
    // Spawn dust particles
    for (let i = 0; i < 6; i++) {
      particles.push({
        x: playerX + PLAYER_WIDTH / 2,
        y: groundY,
        vx: -(Math.random() * 3 + 1),
        vy: -(Math.random() * 2 + 0.5),
        life: 1,
        maxLife: 1,
        size: Math.random() * 3 + 1,
      })
    }
  }
}

function onDuckStart() {
  if (gameState.value === 'playing' && !isJumping) {
    playerDucking = true
  }
}

function onDuckEnd() {
  playerDucking = false
}

// Mobile touch
function onTouchStart(e: TouchEvent) {
  if (gameState.value === 'idle') {
    startGame()
    return
  }
  if (gameState.value !== 'playing') return

  const touch = e.touches[0]
  if (!touch) return
  const rect = gameContainer.value?.getBoundingClientRect()
  if (!rect) return

  const relY = touch.clientY - rect.top
  if (relY < rect.height * 0.5) {
    onJump()
  } else {
    onDuckStart()
  }
}

function onTouchEnd() {
  onDuckEnd()
}

// ─── Spawn obstacles ───────────────────────────────
function spawnObstacle() {
  const typeRoll = Math.random()
  const isAerial = typeRoll > 0.7 && speed > 7 // Aerial only after some speed
  const texts = ['404', '4O4', 'ERR', 'N/A', '???']
  const text = texts[Math.floor(Math.random() * texts.length)]

  if (isAerial) {
    const h = 28 + Math.random() * 12
    obstacles.push({
      x: canvasW + 20,
      y: groundY - PLAYER_HEIGHT - 20 - Math.random() * 30,
      width: 50 + Math.random() * 20,
      height: h,
      type: 'aerial',
      text,
    })
  } else {
    const h = 30 + Math.random() * 25
    const w = 35 + Math.random() * 30
    obstacles.push({
      x: canvasW + 20,
      y: groundY - h,
      width: w,
      height: h,
      type: 'ground',
      text,
    })
  }
}

// ─── Collision detection ───────────────────────────
function checkCollision(): boolean {
  const pH = playerDucking ? PLAYER_DUCK_HEIGHT : PLAYER_HEIGHT
  const pY = playerDucking ? groundY - pH : playerY
  // Player hitbox with some padding for fairness
  const pad = 6
  const px1 = playerX + pad
  const py1 = pY + pad
  const px2 = playerX + PLAYER_WIDTH - pad
  const py2 = pY + pH - pad

  for (const obs of obstacles) {
    const ox1 = obs.x
    const oy1 = obs.y
    const ox2 = obs.x + obs.width
    const oy2 = obs.y + obs.height

    if (px1 < ox2 && px2 > ox1 && py1 < oy2 && py2 > oy1) {
      return true
    }
  }
  return false
}

// ─── Drawing ───────────────────────────────────────
function drawBackground() {
  if (!ctx) return

  // Gradient background
  const grad = ctx.createLinearGradient(0, 0, 0, canvasH)
  grad.addColorStop(0, colors.bgPrimary)
  grad.addColorStop(1, colors.bgSecondary)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, canvasW, canvasH)

  // Grid lines (subtle)
  ctx.strokeStyle = colors.borderSubtle
  ctx.lineWidth = 0.5
  const gridSize = 60
  for (let x = 0; x < canvasW; x += gridSize) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, groundY)
    ctx.stroke()
  }
  for (let y = 0; y < groundY; y += gridSize) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(canvasW, y)
    ctx.stroke()
  }

  // Parallax stars/dots
  for (const star of stars) {
    ctx.globalAlpha = star.opacity
    ctx.fillStyle = colors.textSecondary
    ctx.fillRect(star.x, star.y, star.size, star.size)
  }
  ctx.globalAlpha = 1
}

function drawGround() {
  if (!ctx) return

  // Ground line
  ctx.strokeStyle = colors.textSecondary
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(0, groundY)
  ctx.lineTo(canvasW, groundY)
  ctx.stroke()

  // Dashed sub-line
  ctx.strokeStyle = colors.borderSubtle
  ctx.lineWidth = 1
  ctx.setLineDash([4, 8])
  ctx.beginPath()
  ctx.moveTo(0, groundY + 10)
  ctx.lineTo(canvasW, groundY + 10)
  ctx.stroke()
  ctx.setLineDash([])
}

function drawPlayer() {
  if (!ctx) return

  const pH = playerDucking ? PLAYER_DUCK_HEIGHT : PLAYER_HEIGHT
  const pY = playerDucking ? groundY - pH : playerY
  const px = playerX
  const py = pY

  // Body - main rectangle
  ctx.fillStyle = colors.textPrimary
  ctx.fillRect(px + 4, py, PLAYER_WIDTH - 8, pH - 10)

  // Head
  const headSize = 14
  ctx.fillStyle = colors.textPrimary
  ctx.fillRect(px + (PLAYER_WIDTH - headSize) / 2, py - (playerDucking ? 0 : 4), headSize, headSize)

  // Eye
  ctx.fillStyle = colors.accentPrimary
  ctx.fillRect(px + PLAYER_WIDTH / 2 + 2, py + (playerDucking ? 2 : -1), 4, 4)

  // Legs (animated when running)
  if (!isJumping) {
    const legOffset = runFrame % 2 === 0 ? 4 : -4
    // Left leg
    ctx.fillStyle = colors.textPrimary
    ctx.fillRect(px + 8, py + pH - 10, 6, 10)
    // Right leg
    ctx.fillRect(px + PLAYER_WIDTH - 14, py + pH - 10 + (playerDucking ? 0 : legOffset > 0 ? 2 : -2), 6, 10)
  } else {
    // Tucked legs during jump
    ctx.fillStyle = colors.textPrimary
    ctx.fillRect(px + 6, py + pH - 8, PLAYER_WIDTH - 12, 8)
  }

  // Visor/cap accent
  ctx.fillStyle = colors.accentSecondary
  ctx.fillRect(px + (PLAYER_WIDTH - headSize) / 2, py - (playerDucking ? 0 : 4), headSize, 3)
}

function drawObstacles() {
  if (!ctx) return

  for (const obs of obstacles) {
    // Obstacle body
    if (obs.type === 'ground') {
      // Solid block with accent border
      ctx.fillStyle = colors.accentSecondary
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height)

      // Inner fill
      ctx.fillStyle = colors.bgTertiary
      ctx.fillRect(obs.x + 2, obs.y + 2, obs.width - 4, obs.height - 4)

      // Text
      ctx.fillStyle = colors.accentPrimary
      ctx.font = `bold ${Math.min(obs.height - 8, 18)}px "Lato", monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(obs.text, obs.x + obs.width / 2, obs.y + obs.height / 2)
    } else {
      // Aerial - floating glitch-style block
      ctx.save()
      ctx.globalAlpha = 0.85

      // Glitch offset
      const glitchX = Math.sin(Date.now() * 0.01 + obs.x) * 2
      ctx.fillStyle = colors.accentPrimary
      ctx.fillRect(obs.x + glitchX, obs.y, obs.width, obs.height)

      ctx.fillStyle = colors.bgPrimary
      ctx.fillRect(obs.x + glitchX + 2, obs.y + 2, obs.width - 4, obs.height - 4)

      ctx.fillStyle = colors.accentPrimary
      ctx.font = `bold ${Math.min(obs.height - 6, 16)}px "Lato", monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(obs.text, obs.x + obs.width / 2 + glitchX, obs.y + obs.height / 2)

      ctx.restore()

      // Warning dashes below aerial obstacle
      ctx.strokeStyle = colors.accentSecondary
      ctx.lineWidth = 1
      ctx.setLineDash([3, 5])
      ctx.globalAlpha = 0.3
      ctx.beginPath()
      ctx.moveTo(obs.x + obs.width / 2, obs.y + obs.height)
      ctx.lineTo(obs.x + obs.width / 2, groundY)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.globalAlpha = 1
    }
  }
}

function drawParticles() {
  if (!ctx) return
  for (const p of particles) {
    ctx.globalAlpha = p.life * 0.6
    ctx.fillStyle = colors.textSecondary
    ctx.fillRect(p.x, p.y, p.size, p.size)
  }
  ctx.globalAlpha = 1
}

// ─── Game loop ─────────────────────────────────────
function update() {
  if (gameState.value !== 'playing') return

  // Speed increases over time
  speed = Math.min(MAX_SPEED, speed + SPEED_INCREMENT)

  // Score
  score.value += speed * 0.1

  // Player physics
  if (isJumping) {
    playerVelocityY += GRAVITY
    playerY += playerVelocityY

    if (playerY >= groundY - PLAYER_HEIGHT) {
      playerY = groundY - PLAYER_HEIGHT
      playerVelocityY = 0
      isJumping = false
    }
  }

  // Fast fall when pressing down in air
  if (keys['ArrowDown'] && isJumping) {
    playerVelocityY += GRAVITY * 1.5
  }

  // Run animation
  runTimer += speed * 0.15
  if (runTimer >= 1) {
    runTimer = 0
    runFrame++
  }

  // Move obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].x -= speed
    if (obstacles[i].x + obstacles[i].width < -20) {
      obstacles.splice(i, 1)
    }
  }

  // Spawn obstacles
  spawnTimer += speed
  if (spawnTimer >= spawnInterval) {
    spawnTimer = 0
    spawnInterval = (OBSTACLE_SPAWN_BASE + Math.random() * OBSTACLE_SPAWN_VARIANCE) * speed
    // Only spawn if last obstacle is far enough
    const lastObs = obstacles[obstacles.length - 1]
    const minGap = MIN_OBSTACLE_GAP * speed
    if (!lastObs || lastObs.x < canvasW - minGap - lastObs.width) {
      spawnObstacle()
    }
  }

  // Move parallax stars
  for (const star of stars) {
    star.x -= star.speed * (speed * 0.3)
    if (star.x < -5) {
      star.x = canvasW + 5
      star.y = Math.random() * (groundY - 40)
    }
  }

  // Update particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.x += p.vx
    p.y += p.vy
    p.life -= 0.03
    if (p.life <= 0) {
      particles.splice(i, 1)
    }
  }

  // Running ground dust
  if (!isJumping && runFrame % 4 === 0) {
    particles.push({
      x: playerX + PLAYER_WIDTH / 2 - Math.random() * 8,
      y: groundY - 2,
      vx: -(Math.random() * 2 + 0.5),
      vy: -(Math.random() * 1),
      life: 0.6,
      maxLife: 0.6,
      size: Math.random() * 2 + 0.5,
    })
  }

  // Collision
  if (checkCollision()) {
    gameOver()
  }
}

function render() {
  if (!ctx) return

  ctx.clearRect(0, 0, canvasW, canvasH)

  drawBackground()
  drawGround()
  drawParticles()
  drawObstacles()
  drawPlayer()
}

function loop() {
  update()
  render()
  animFrame = requestAnimationFrame(loop)
}

// ─── Score submission ──────────────────────────────
async function submitScore() {
  if (!pseudo.value.trim() || submitting.value) return
  submitting.value = true

  try {
    const res = await $fetch<{ success: boolean; rank: number | null }>('/api/scores', {
      method: 'POST',
      body: {
        pseudo: pseudo.value.trim(),
        score: Math.floor(score.value),
      },
    })
    submitted.value = true
    submitRank.value = res.rank
    emit('score-submitted')
  } catch (err) {
    console.error('Failed to submit score:', err)
  } finally {
    submitting.value = false
  }
}

// ─── Lifecycle ─────────────────────────────────────
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  detectMobile()
  resizeCanvas()
  colors = getThemeColors()
  resetGame()

  // Observe resize
  if (gameContainer.value) {
    resizeObserver = new ResizeObserver(() => {
      resizeCanvas()
      groundY = canvasH - GROUND_OFFSET
      if (gameState.value === 'idle') {
        initStars()
        render()
      }
    })
    resizeObserver.observe(gameContainer.value)
  }

  // Load hi-score from localStorage
  try {
    const saved = localStorage.getItem('runner-hi-score')
    if (saved) hiScore.value = parseInt(saved, 10) || 0
  } catch {}

  // Watch hi-score
  // We'll save on gameover in the gameOver function via a watcher
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)

  // Start render loop (always running for idle animation)
  loop()

  // Watch theme changes
  const observer = new MutationObserver(() => {
    colors = getThemeColors()
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] })
})

onUnmounted(() => {
  cancelAnimationFrame(animFrame)
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
  resizeObserver?.disconnect()
})

// Save hi-score reactively
import { watch } from 'vue'
watch(hiScore, (val) => {
  try { localStorage.setItem('runner-hi-score', String(val)) } catch {}
})
</script>

<style scoped>
.runner-game-container {
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  background: var(--bg-secondary);
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
}

@media (min-width: 768px) {
  .runner-game-container {
    height: 400px;
    border-radius: 2rem;
  }
}

.runner-canvas {
  display: block;
  width: 100%;
  height: 100%;
}

/* ── Score overlays ─────────────────── */
.score-overlay,
.hiscore-overlay {
  position: absolute;
  top: 16px;
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

.score-overlay {
  right: 16px;
}

.hiscore-overlay {
  right: 150px;
}

@media (max-width: 500px) {
  .hiscore-overlay {
    right: auto;
    left: 16px;
  }
}

.score-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.score-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
}

/* ── Overlays ───────────────────────── */
.game-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
}

.start-overlay {
  background: transparent;
  cursor: pointer;
}

.gameover-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.overlay-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.start-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--text-primary);
  color: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 0 0 var(--text-primary);
  animation: pulse-ring 2s ease-out infinite;
}

@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3); }
  70% { box-shadow: 0 0 0 20px rgba(255, 255, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
}

.start-text {
  font-family: "Lato", sans-serif;
  font-size: 14px;
  color: var(--text-secondary);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.start-text kbd {
  display: inline-block;
  padding: 2px 8px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  font-size: 12px;
  color: var(--text-primary);
  font-family: "Lato", monospace;
}

.desktop-text { display: block; }
.mobile-text { display: none; }

@media (max-width: 768px) {
  .desktop-text { display: none; }
  .mobile-text { display: block; }
}

/* ── Game Over ──────────────────────── */
.gameover-content {
  gap: 16px;
  padding: 32px;
  max-width: 360px;
  width: 90%;
}

.gameover-title {
  font-family: "Lato", sans-serif;
  font-size: 32px;
  font-weight: 900;
  color: #fff;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.gameover-score {
  font-family: "Lato", monospace;
  font-size: 48px;
  font-weight: 700;
  color: var(--accent-primary);
  font-variant-numeric: tabular-nums;
}

.submit-form {
  display: flex;
  gap: 8px;
  width: 100%;
}

.pseudo-input {
  flex: 1;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  color: #fff;
  font-family: "Lato", sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.pseudo-input:focus {
  border-color: var(--accent-primary);
}

.pseudo-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.submit-btn {
  padding: 10px 20px;
  background: var(--text-primary);
  color: var(--bg-primary);
  border: none;
  border-radius: 999px;
  font-family: "Lato", sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
  white-space: nowrap;
}

.submit-btn:hover {
  transform: scale(1.05);
}

.submit-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

.submitted-msg {
  font-family: "Lato", sans-serif;
  font-size: 14px;
  color: var(--accent-primary);
  letter-spacing: 0.05em;
}

.restart-btn {
  margin-top: 8px;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.6);
  font-family: "Lato", sans-serif;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
}

.restart-btn:hover {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.5);
}

.restart-btn kbd {
  display: inline-block;
  padding: 1px 6px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 3px;
  font-size: 11px;
  font-family: "Lato", monospace;
}

/* ── Mobile Controls ────────────────── */
.mobile-controls {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: space-between;
  z-index: 15;
  pointer-events: none;
}

.mobile-btn {
  pointer-events: auto;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s, transform 0.15s;
}

.mobile-btn:active {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(0.9);
}
</style>
