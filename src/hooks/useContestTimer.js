import { useEffect, useMemo, useState } from 'react'

function formatTime(seconds) {
  const value = Math.max(0, seconds)
  const hours = String(Math.floor(value / 3600)).padStart(2, '0')
  const minutes = String(Math.floor((value % 3600) / 60)).padStart(2, '0')
  const remainingSeconds = String(value % 60).padStart(2, '0')

  return `${hours}:${minutes}:${remainingSeconds}`
}

function useContestTimer(room) {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    if (!room || room.status !== 'live') {
      return undefined
    }

    const interval = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(interval)
  }, [room])

  return useMemo(() => {
    if (!room) {
      return '00:00:00'
    }

    if (room.status === 'ended') {
      return room.finalDuration ?? '01:45:32'
    }

    if (room.status !== 'live' || !room.startedAt) {
      return formatTime(room.elapsedSeconds ?? 0)
    }

    const elapsed = Math.floor((now - new Date(room.startedAt).getTime()) / 1000)
    return formatTime((room.elapsedSeconds ?? 0) + elapsed)
  }, [now, room])
}

export default useContestTimer
