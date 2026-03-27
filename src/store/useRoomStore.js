import { create } from 'zustand'
import { fetchRooms } from '../services/roomService'
import useLeaderboardStore from './useLeaderboardStore'
import useTeamStore from './useTeamStore'

function withStatusLabel(status) {
  const labels = {
    not_started: 'Not Started',
    live: 'Live',
    paused: 'Paused',
    ended: 'Ended',
  }

  return labels[status] ?? 'Unknown'
}

const useRoomStore = create((set, get) => ({
  rooms: [],
  currentRoomId: null,
  loading: false,
  async bootstrap() {
    set({ loading: true })
    const rooms = await fetchRooms()
    const activeRoom = rooms.find((room) => room.active) ?? rooms[0] ?? null
    set({ rooms, currentRoomId: activeRoom?.id ?? null, loading: false })
  },
  currentRoom() {
    const { rooms, currentRoomId } = get()
    return rooms.find((room) => room.id === currentRoomId) ?? null
  },
  joinContest(roomId, teamId) {
    if (!teamId) {
      return
    }

    set((state) => ({
      currentRoomId: roomId,
      rooms: state.rooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              participants: room.participants.includes(teamId)
                ? room.participants
                : [...room.participants, teamId],
            }
          : room,
      ),
    }))

    useTeamStore.getState().markContestJoined(teamId)
    useLeaderboardStore.getState().bumpScore(teamId, 20)
  },
  leaveCurrentRoom() {
    set({ currentRoomId: null })
  },
  updateRoomStatus(status) {
    const roomId = get().currentRoomId
    if (!roomId) {
      return
    }

    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              status,
              statusLabel: withStatusLabel(status),
              startedAt: status === 'live' ? new Date().toISOString() : room.startedAt,
              finalDuration: status === 'ended' ? '01:45:32' : room.finalDuration,
            }
          : room,
      ),
    }))
  },
}))

export default useRoomStore
