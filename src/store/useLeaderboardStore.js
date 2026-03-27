import { create } from 'zustand'
import { fetchLeaderboard } from '../services/leaderboardService'

function sortEntries(entries) {
  return [...entries]
    .sort((a, b) => b.score - a.score || a.time.localeCompare(b.time))
    .map((entry, index) => ({ ...entry, rank: index + 1 }))
}

const useLeaderboardStore = create((set) => ({
  entries: [],
  loading: false,
  async bootstrap() {
    set({ loading: true })
    const entries = await fetchLeaderboard()
    set({ entries: sortEntries(entries), loading: false })
  },
  addOrUpdateTeam(team) {
    set((state) => {
      const existing = state.entries.find((entry) => entry.teamId === team.id)
      const nextEntries = existing
        ? state.entries.map((entry) =>
            entry.teamId === team.id
              ? { ...entry, teamName: team.name, score: entry.score + 15, trend: 'up' }
              : entry,
          )
        : [
            ...state.entries,
            {
              id: crypto.randomUUID(),
              teamId: team.id,
              teamName: team.name,
              score: 75,
              time: '00:00:00',
              trend: 'steady',
            },
          ]

      return { entries: sortEntries(nextEntries) }
    })
  },
  bumpScore(teamId, amount = 25) {
    set((state) => ({
      entries: sortEntries(
        state.entries.map((entry) =>
          entry.teamId === teamId
            ? { ...entry, score: entry.score + amount, trend: 'up' }
            : entry,
        ),
      ),
    }))
  },
}))

export default useLeaderboardStore
