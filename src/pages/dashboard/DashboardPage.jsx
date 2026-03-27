import { useMemo, useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import Input from '../../components/ui/Input'
import Modal from '../../components/ui/Modal'
import Skeleton from '../../components/ui/Skeleton'
import useAuthStore from '../../store/useAuthStore'
import useLeaderboardStore from '../../store/useLeaderboardStore'
import useRoomStore from '../../store/useRoomStore'
import useTeamStore from '../../store/useTeamStore'
import { getStatusTone } from '../../utils/helpers'

function DashboardPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isJoinOpen, setIsJoinOpen] = useState(false)
  const [teamName, setTeamName] = useState('')
  const [joinCode, setJoinCode] = useState('')
  const [feedback, setFeedback] = useState(null)
  const user = useAuthStore((state) => state.user)
  const teams = useTeamStore((state) => state.teams)
  const teamLoading = useTeamStore((state) => state.loading)
  const createTeam = useTeamStore((state) => state.createTeam)
  const joinTeam = useTeamStore((state) => state.joinTeam)
  const rooms = useRoomStore((state) => state.rooms)
  const roomsLoading = useRoomStore((state) => state.loading)
  const joinContest = useRoomStore((state) => state.joinContest)
  const currentRoom = useRoomStore((state) => state.currentRoom())
  const leaderboard = useLeaderboardStore((state) => state.entries)

  const myTeam = useMemo(() => teams.find((team) => team.id === user?.teamId), [teams, user?.teamId])
  const myRank = leaderboard.findIndex((entry) => entry.teamId === user?.teamId) + 1

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      setFeedback({ type: 'error', message: 'Add a team name before saving.' })
      return
    }
    await createTeam({ name: teamName.trim(), user })
    setTeamName('')
    setIsCreateOpen(false)
    setFeedback({ type: 'success', message: 'Team created successfully.' })
  }

  const handleJoinTeam = async () => {
    if (!joinCode.trim()) {
      setFeedback({ type: 'error', message: 'Enter a valid invite code.' })
      return
    }
    const success = await joinTeam({ code: joinCode.trim(), user })
    setJoinCode('')
    if (success) {
      setIsJoinOpen(false)
      setFeedback({ type: 'success', message: 'You joined the team successfully.' })
    } else {
      setFeedback({ type: 'error', message: 'Invite code not found. Try another one.' })
    }
  }

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Workspace"
        title="Team dashboard"
        description="See your account, teams, and active contests from a single command view."
        actions={
          <>
            <Button variant="secondary" onClick={() => setIsJoinOpen(true)}>
              Join Team
            </Button>
            <Button onClick={() => setIsCreateOpen(true)}>Create Team</Button>
          </>
        }
      />

      {feedback ? (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            feedback.type === 'success'
              ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100'
              : 'border-rose-400/30 bg-rose-500/10 text-rose-100'
          }`}
        >
          {feedback.message}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="User" description="Current signed-in profile">
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <span>Name</span>
              <span className="font-medium text-white">{user?.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Role</span>
              <Badge variant={user?.role === 'admin' ? 'warning' : 'primary'}>{user?.role}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Team</span>
              <span className="font-medium text-white">{myTeam?.name ?? 'Not joined'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Rank</span>
              <span className="font-medium text-white">{myRank || 'Unranked'}</span>
            </div>
          </div>
        </Card>

        <Card title="Teams" description="Your club teams and participation snapshot">
          {teamLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
            </div>
          ) : teams.length ? (
            <div className="space-y-3">
              {teams.slice(0, 3).map((team) => (
                <div key={team.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white">{team.name}</p>
                    <Badge variant={team.joinedContest ? 'success' : 'default'}>
                      {team.joinedContest ? 'Contest Ready' : 'Standby'}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">
                    {team.members.length} members · Invite code {team.code}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="No teams yet" description="Create a team to start collaborating on contests." compact />
          )}
        </Card>

        <Card title="Current contest" description="Quick room visibility for the active arena">
          {currentRoom ? (
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-white">{currentRoom.name}</p>
                <Badge variant={getStatusTone(currentRoom.status)}>{currentRoom.statusLabel}</Badge>
              </div>
              <p className="text-sm text-slate-400">{currentRoom.description}</p>
              <p className="text-sm text-slate-300">{currentRoom.participants.length} teams joined</p>
            </div>
          ) : (
            <EmptyState title="No contest joined" description="Choose an available contest below to enter the arena." compact />
          )}
        </Card>
      </div>

      <Card title="Available contests" description="Join a room and start preparing with your team.">
        {roomsLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-44" />
            <Skeleton className="h-44" />
          </div>
        ) : rooms.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {rooms.map((room) => (
              <div key={room.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{room.name}</p>
                    <p className="mt-2 text-sm text-slate-400">{room.description}</p>
                  </div>
                  <Badge variant={getStatusTone(room.status)}>{room.statusLabel}</Badge>
                </div>
                <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
                  <span>{room.participants.length} teams</span>
                  <Button size="sm" onClick={() => joinContest(room.id, user?.teamId)} disabled={!user?.teamId}>
                    Join Contest
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="No contests available" description="Admins can create a contest room once the schedule is ready." />
        )}
      </Card>

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create a team"
        description="Add a team name and instantly register it into the dashboard."
      >
        <div className="space-y-4">
          <Input value={teamName} onChange={(event) => setTeamName(event.target.value)} placeholder="Binary Brigade" />
          <Button className="w-full" onClick={handleCreateTeam}>
            Save team
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        title="Join an existing team"
        description="Use the invite code shared by your captain."
      >
        <div className="space-y-4">
          <Input value={joinCode} onChange={(event) => setJoinCode(event.target.value.toUpperCase())} placeholder="ALGO-21" />
          <Button className="w-full" onClick={handleJoinTeam}>
            Join team
          </Button>
        </div>
      </Modal>
    </section>
  )
}

export default DashboardPage
