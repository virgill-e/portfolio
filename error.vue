<template>
    <div
        class="h-screen bg-custom-cream px-4 md:px-8 flex flex-col items-center justify-center text-custom-forest relative z-25 overflow-hidden">
        <!-- Header avec code d'erreur -->
        <div class="text-center mb-4">
            <h1
                class="text-4xl md:text-6xl lg:text-7xl font-lostar text-custom-cream text-shadow-custom-bronze mb-2 glitch">
                {{ error?.statusCode || 500 }}
            </h1>
            <h2 class="text-lg md:text-2xl lg:text-3xl font-lostar text-custom-forest mb-3">
                Erreur détectée !
            </h2>
            <p class="text-custom-olive text-sm md:text-base">
                Utilisez les flèches pour jouer • Espace pour recommencer
            </p>
        </div>

        <!-- Canvas du jeu Snake -->
        <canvas ref="gameCanvas" :width="CANVAS_WIDTH" :height="CANVAS_HEIGHT"
            class="border-3 border-custom-bronze bg-custom-forest rounded-lg shadow-lg mb-4" tabindex="0"
            @keydown="handleKeyPress"></canvas>

        <!-- Score et contrôles -->
        <div class="text-center mb-4">
            <p class="text-custom-bronze text-lg md:text-xl font-lostar mb-4">Score: {{ score }}</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mx-auto max-w-md">
                <UiButton @click="handleError" class="py-3 px-6 w-full sm:w-auto" text="Retour à l'accueil" />
                <UiButton @click="restartGame" class="py-3 px-6 w-full sm:w-auto" text="Nouvelle partie" />
            </div>
        </div>

        <!-- Instructions -->
        <div class="text-center text-custom-olive max-w-lg mx-auto">
            <p class="text-sm md:text-base">🐍 Attrapez l'erreur "{{ getErrorMessage() }}" pour marquer des points !</p>
        </div>
    </div>
</template>

<script setup lang="ts">
interface ErrorProps {
    statusCode?: number
    statusMessage?: string
}

const props = defineProps<{
    error: ErrorProps
}>()

// Configuration du jeu
const CANVAS_WIDTH = 480
const CANVAS_HEIGHT = 320
const GRID_SIZE = 20
const GRID_WIDTH = CANVAS_WIDTH / GRID_SIZE
const GRID_HEIGHT = CANVAS_HEIGHT / GRID_SIZE

// État du jeu
const gameCanvas = ref<HTMLCanvasElement>()
const score = ref(0)
const gameRunning = ref(false)
const snake = ref([{ x: 10, y: 10 }])
const direction = ref({ x: 1, y: 0 })
const food = ref({ x: 15, y: 15 })
const gameInterval = ref<NodeJS.Timeout>()

const getErrorMessage = () => {
    const statusCode = props.error?.statusCode || 500

    switch (statusCode) {
        case 404:
            return "404"
        case 500:
            return "500"
        case 403:
            return "403"
        case 401:
            return "401"
        default:
            return "ERR"
    }
}

const initGame = () => {
    if (!gameCanvas.value) return

    const canvas = gameCanvas.value
    canvas.focus()

    // Reset game state
    snake.value = [{ x: 10, y: 10 }]
    direction.value = { x: 1, y: 0 }
    food.value = generateFood()
    score.value = 0
    gameRunning.value = true

    // Start game loop
    if (gameInterval.value) clearInterval(gameInterval.value)
    gameInterval.value = setInterval(gameLoop, 150)
}

const generateFood = (): { x: number; y: number } => {
    let newFood: { x: number; y: number }
    do {
        newFood = {
            x: Math.floor(Math.random() * GRID_WIDTH),
            y: Math.floor(Math.random() * GRID_HEIGHT)
        }
    } while (snake.value.some(segment => segment.x === newFood.x && segment.y === newFood.y))

    return newFood
}

const gameLoop = () => {
    if (!gameRunning.value) return

    moveSnake()
    checkCollisions()
    draw()
}

const moveSnake = () => {
    const head = { ...snake.value[0] }
    head.x += direction.value.x
    head.y += direction.value.y

    snake.value.unshift(head)

    // Check if food is eaten
    if (head.x === food.value.x && head.y === food.value.y) {
        score.value += 10
        food.value = generateFood()
    } else {
        snake.value.pop()
    }
}

const checkCollisions = () => {
    const head = snake.value[0]

    // Wall collision
    if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) {
        gameOver()
        return
    }

    // Self collision
    for (let i = 1; i < snake.value.length; i++) {
        if (head.x === snake.value[i].x && head.y === snake.value[i].y) {
            gameOver()
            return
        }
    }
}

const gameOver = () => {
    gameRunning.value = false
    if (gameInterval.value) {
        clearInterval(gameInterval.value)
    }
}

const draw = () => {
    if (!gameCanvas.value) return

    const ctx = gameCanvas.value.getContext('2d')
    if (!ctx) return

    // Clear canvas - couleur custom-forest
    ctx.fillStyle = '#283618'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Draw snake - couleur custom-olive/amber
    ctx.fillStyle = '#DDA15E'
    snake.value.forEach((segment, index) => {
        ctx.fillRect(
            segment.x * GRID_SIZE,
            segment.y * GRID_SIZE,
            GRID_SIZE - 2,
            GRID_SIZE - 2
        )

        // Snake head - couleur custom-bronze
        if (index === 0) {
            ctx.fillStyle = '#BC6C25'
            ctx.fillRect(
                segment.x * GRID_SIZE + 2,
                segment.y * GRID_SIZE + 2,
                GRID_SIZE - 6,
                GRID_SIZE - 6
            )
            ctx.fillStyle = '#DDA15E'
        }
    })

    // Draw food (error message) - couleur custom-cream
    ctx.fillStyle = '#FEFAE0'
    ctx.fillRect(
        food.value.x * GRID_SIZE,
        food.value.y * GRID_SIZE,
        GRID_SIZE,
        GRID_SIZE
    )

    // Draw error text on food - couleur custom-forest
    ctx.fillStyle = '#283618'
    ctx.font = 'bold 12px serif'
    ctx.textAlign = 'center'
    ctx.fillText(
        getErrorMessage(),
        food.value.x * GRID_SIZE + GRID_SIZE / 2,
        food.value.y * GRID_SIZE + GRID_SIZE / 2 + 4
    )

    // Game over message
    if (!gameRunning.value && snake.value.length > 1) {
        ctx.fillStyle = 'rgba(40, 54, 24, 0.9)'
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        ctx.fillStyle = '#BC6C25'
        ctx.font = 'bold 32px serif'
        ctx.textAlign = 'center'
        ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20)

        ctx.fillStyle = '#FEFAE0'
        ctx.font = '16px serif'
        ctx.fillText('Appuyez sur ESPACE pour recommencer', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20)
    }
}

const handleKeyPress = (event: KeyboardEvent) => {
    if (!gameRunning.value && event.code === 'Space') {
        restartGame()
        return
    }

    if (!gameRunning.value) return

    switch (event.code) {
        case 'ArrowUp':
            if (direction.value.y === 0) {
                direction.value = { x: 0, y: -1 }
            }
            break
        case 'ArrowDown':
            if (direction.value.y === 0) {
                direction.value = { x: 0, y: 1 }
            }
            break
        case 'ArrowLeft':
            if (direction.value.x === 0) {
                direction.value = { x: -1, y: 0 }
            }
            break
        case 'ArrowRight':
            if (direction.value.x === 0) {
                direction.value = { x: 1, y: 0 }
            }
            break
        case 'Space':
            restartGame()
            break
    }
}

const restartGame = () => {
    initGame()
}

const handleError = () => {
    clearError({ redirect: '/' })
}

// Initialize game when component mounts
onMounted(() => {
    initGame()
})

// Cleanup on unmount
onUnmounted(() => {
    if (gameInterval.value) {
        clearInterval(gameInterval.value)
    }
})
</script>

<style scoped>
/* Restaurer le curseur normal sur la page d'erreur */
* {
    cursor: auto !important;
}

.glitch {
    animation: glitch 2s infinite;
}

@keyframes glitch {
    0% {
        transform: translate(0)
    }

    20% {
        transform: translate(-2px, 2px)
    }

    40% {
        transform: translate(-2px, -2px)
    }

    60% {
        transform: translate(2px, 2px)
    }

    80% {
        transform: translate(2px, -2px)
    }

    100% {
        transform: translate(0)
    }
}

canvas:focus {
    outline: 3px solid #BC6C25;
    outline-offset: 4px;
}
</style>