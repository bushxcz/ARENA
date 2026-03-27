import { initialLeaderboard } from './mockData'
import { delay } from '../utils/helpers'

export async function fetchLeaderboard() {
  await delay(320)
  return structuredClone(initialLeaderboard)
}
