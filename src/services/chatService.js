import { initialMessages } from './mockData'
import { delay } from '../utils/helpers'

export async function fetchMessages() {
  await delay(300)
  return structuredClone(initialMessages)
}
