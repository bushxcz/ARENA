import { create } from 'zustand'
import { fetchMessages } from '../services/chatService'
import { formatClock } from '../utils/helpers'

const useChatStore = create((set) => ({
  messages: [],
  loading: false,
  async bootstrap() {
    set({ loading: true })
    const messages = await fetchMessages()
    set({ messages, loading: false })
  },
  sendTeamMessage({ author, text, teamId, userId }) {
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: crypto.randomUUID(),
          userId,
          teamId,
          author,
          text,
          timestamp: formatClock(new Date()),
          type: 'user',
        },
      ],
    }))
  },
  postBroadcast(text) {
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: crypto.randomUUID(),
          userId: 'system',
          teamId: 'broadcast',
          author: 'Admin Broadcast',
          text,
          timestamp: formatClock(new Date()),
          type: 'system',
        },
      ],
    }))
  },
}))

export default useChatStore
