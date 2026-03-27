import { useEffect } from 'react'
import useChatStore from '../store/useChatStore'
import useLeaderboardStore from '../store/useLeaderboardStore'
import useRoomStore from '../store/useRoomStore'
import useTeamStore from '../store/useTeamStore'

function useAppBootstrap(isAuthenticated) {
  const bootstrapTeams = useTeamStore((state) => state.bootstrap)
  const bootstrapRooms = useRoomStore((state) => state.bootstrap)
  const bootstrapChat = useChatStore((state) => state.bootstrap)
  const bootstrapLeaderboard = useLeaderboardStore((state) => state.bootstrap)

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    bootstrapTeams()
    bootstrapRooms()
    bootstrapChat()
    bootstrapLeaderboard()
  }, [bootstrapChat, bootstrapLeaderboard, bootstrapRooms, bootstrapTeams, isAuthenticated])
}

export default useAppBootstrap
