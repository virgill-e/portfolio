import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'

interface ScoreEntry {
  pseudo: string
  score: number
  date: string
}

const DATA_DIR = join(process.cwd(), '.data')
const SCORES_FILE = join(DATA_DIR, 'leaderboard.json')

export default defineEventHandler(async () => {
  try {
    if (!existsSync(SCORES_FILE)) {
      return { scores: [] }
    }

    const raw = await readFile(SCORES_FILE, 'utf-8')
    const scores: ScoreEntry[] = JSON.parse(raw)

    // Return top 10, sorted descending
    const top10 = scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)

    return { scores: top10 }
  } catch {
    return { scores: [] }
  }
})
