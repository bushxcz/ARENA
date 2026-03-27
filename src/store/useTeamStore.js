import { create } from 'zustand'
import { fetchTeams } from '../services/teamService'
import useAuthStore from './useAuthStore'
import useLeaderboardStore from './useLeaderboardStore'

function buildMember(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: 'Captain',
  }
}

const useTeamStore = create((set, get) => ({
  teams: [],
  loading: false,
  async bootstrap() {
    set({ loading: true })
    const teams = await fetchTeams()
    set({ teams, loading: false })
  },
  async createTeam({ name, user }) {
    const team = {
      id: crypto.randomUUID(),
      name,
      code: `${name.slice(0, 4).toUpperCase()}-${Math.floor(10 + Math.random() * 89)}`,
      joinedContest: false,
      members: [buildMember(user)],
    }

    set((state) => ({ teams: [team, ...state.teams] }))
    useAuthStore.getState().assignTeam(team.id)
    useLeaderboardStore.getState().addOrUpdateTeam(team)
  },
  async joinTeam({ code, user }) {
    const match = get().teams.find((team) => team.code === code)
    if (!match) {
      return false
    }

    set((state) => ({
      teams: state.teams.map((team) =>
        team.id === match.id
          ? {
              ...team,
              members: team.members.some((member) => member.id === user.id)
                ? team.members
                : [...team.members, { id: user.id, name: user.name, email: user.email, role: 'Member' }],
            }
          : team,
      ),
    }))

    useAuthStore.getState().assignTeam(match.id)
    useLeaderboardStore.getState().addOrUpdateTeam(match)
    return true
  },
  markContestJoined(teamId) {
    set((state) => ({
      teams: state.teams.map((team) =>
        team.id === teamId ? { ...team, joinedContest: true } : team,
      ),
    }))
  },
}))

export default useTeamStore
