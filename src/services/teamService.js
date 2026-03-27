import { initialTeams } from './mockData'
import { delay } from '../utils/helpers'

export async function fetchTeams() {
  await delay(300)
  return structuredClone(initialTeams)
}
