import { create } from 'zustand'
import { loginUser, signupUser } from '../services/authService'

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: '',
  async login(credentials) {
    set({ loading: true, error: '' })

    try {
      const user = await loginUser(credentials)
      set({ user, isAuthenticated: true, loading: false })
      return true
    } catch (error) {
      set({ error: error.message || 'Unable to login', loading: false })
      return false
    }
  },
  async signup(payload) {
    set({ loading: true, error: '' })

    try {
      const user = await signupUser(payload)
      set({ user, isAuthenticated: true, loading: false })
      return true
    } catch (error) {
      set({ error: error.message || 'Unable to create account', loading: false })
      return false
    }
  },
  updateProfile(updates) {
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : state.user,
    }))
  },
  assignTeam(teamId) {
    set((state) => ({
      user: state.user ? { ...state.user, teamId } : state.user,
    }))
  },
  logout() {
    set({ user: null, isAuthenticated: false, error: '', loading: false })
  },
}))

export default useAuthStore
