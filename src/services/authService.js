import { delay } from '../utils/helpers'

export async function loginUser({ email, password }) {
  await delay(450)

  if (!email || !password) {
    throw new Error('Missing credentials')
  }

  const isAdmin = email.toLowerCase().includes('@admin')

  return {
    id: isAdmin ? 'user-admin' : 'user-01',
    name: isAdmin ? 'Club Admin' : email.split('@')[0].replace('.', ' '),
    email,
    role: isAdmin ? 'admin' : 'member',
    teamId: isAdmin ? null : 'team-1',
  }
}

export async function signupUser({ name, email, password }) {
  await delay(500)

  if (!name || !email || !password) {
    throw new Error('All fields are required')
  }

  return {
    id: crypto.randomUUID(),
    name,
    email,
    role: 'member',
    teamId: null,
  }
}
