import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'

interface ScoreEntry {
  pseudo: string
  score: number
  date: string
}

const DATA_DIR = join(process.cwd(), '.data')
const SCORES_FILE = join(DATA_DIR, 'leaderboard.json')
const MAX_STORED = 50

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_MS = 5000

export default defineEventHandler(async (event) => {
  // Rate limiting by IP
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const now = Date.now()
  const lastSubmit = rateLimitMap.get(ip) || 0

  if (now - lastSubmit < RATE_LIMIT_MS) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests. Please wait a few seconds.',
    })
  }

  // Parse and validate body
  const body = await readBody<{ pseudo: string; score: number }>(event)

  if (!body || typeof body.pseudo !== 'string' || typeof body.score !== 'number') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid body. Expected { pseudo: string, score: number }',
    })
  }

  const pseudo = body.pseudo.trim().slice(0, 16)
  const score = Math.floor(body.score)

  if (pseudo.length < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Pseudo must be at least 1 character.',
    })
  }

  if (score < 0 || !Number.isFinite(score)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Score must be a positive finite number.',
    })
  }

  // Update rate limit
  rateLimitMap.set(ip, now)

  // Ensure data directory exists
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true })
  }

  // Read existing scores
  let scores: ScoreEntry[] = []
  try {
    if (existsSync(SCORES_FILE)) {
      const raw = await readFile(SCORES_FILE, 'utf-8')
      scores = JSON.parse(raw)
    }
  } catch {
    scores = []
  }

  // Add new entry
  const entry: ScoreEntry = {
    pseudo,
    score,
    date: new Date().toISOString(),
  }

  scores.push(entry)

  // Sort descending and keep top MAX_STORED
  scores.sort((a, b) => b.score - a.score)
  scores = scores.slice(0, MAX_STORED)

  // Write back
  await writeFile(SCORES_FILE, JSON.stringify(scores, null, 2), 'utf-8')

  // Return current rank
  const rank = scores.findIndex(
    (s) => s.pseudo === pseudo && s.score === score && s.date === entry.date
  )

  return {
    success: true,
    rank: rank !== -1 ? rank + 1 : null,
    entry,
  }
})
