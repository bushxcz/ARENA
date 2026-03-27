import { initialRooms } from './mockData'
import { delay } from '../utils/helpers'

export async function fetchRooms() {
  await delay(350)
  return structuredClone(initialRooms)
}
