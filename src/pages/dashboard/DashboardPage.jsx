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
          className="flex items-center gap-3 p-4"
          style={{
            borderLeft: `2px solid ${feedback.type === 'success' ? '#00FF88' : '#ff4444'}`,
            background: `rgba(${feedback.type === 'success' ? '0,255,136' : '255,68,68'},0.05)`,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            color: feedback.type === 'success' ? '#00FF88' : '#ff4444',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          <iconify-icon icon={feedback.type === 'success' ? "solar:check-circle-linear" : "solar:danger-triangle-linear"} style={{ fontSize: '1.25rem' }} />
          {feedback.message}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="User Profile" description="Current signed-in identity">
          <div className="space-y-4" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span style={{ color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Name</span>
              <span className="font-medium text-white">{user?.name}</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span style={{ color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Role</span>
              <Badge variant={user?.role === 'admin' ? 'warning' : 'primary'}>{user?.role}</Badge>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span style={{ color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Team</span>
              <span className="font-medium text-white">{myTeam?.name ?? 'Not joined'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span style={{ color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Rank</span>
              <span className="font-medium text-white">{myRank || 'Unranked'}</span>
            </div>
          </div>
        </Card>

        <Card title="Teams" description="Your club teams and status">
          {teamLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
            </div>
          ) : teams.length ? (
            <div className="space-y-3">
              {teams.slice(0, 3).map((team) => (
                <div key={team.id} className="p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center justify-between">
                    <p style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 600, color: '#fff' }}>{team.name}</p>
                    <Badge variant={team.joinedContest ? 'success' : 'default'}>
                      {team.joinedContest ? 'READY' : 'STANDBY'}
                    </Badge>
                  </div>
                  <p className="mt-2" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {team.members.length} members · Code {team.code}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="No teams yet" description="Create or join a team to start collaborating." compact />
          )}
        </Card>

        <Card title="Current arena" description="Live contest status">
          {currentRoom ? (
            <div className="p-4" style={{ background: 'rgba(0,255,136,0.03)', border: '1px solid rgba(0,255,136,0.2)' }}>
              <div className="flex items-center justify-between">
                <p style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 600, color: '#00FF88' }}>{currentRoom.name}</p>
                <Badge variant={getStatusTone(currentRoom.status)}>{currentRoom.statusLabel?.toUpperCase()}</Badge>
              </div>
              <p className="mt-2" style={{ fontSize: '0.8rem', color: '#E8E8E0' }}>{currentRoom.description}</p>
              <p className="mt-4" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <iconify-icon icon="solar:users-group-rounded-linear" className="mr-1 inline-block align-middle" />
                {currentRoom.participants.length} teams joined
              </p>
            </div>
          ) : (
            <EmptyState title="No contest joined" description="Select an available arena below." compact />
          )}
        </Card>
      </div>

      <Card title="Available contests/arenas" description="Choose a competition to register your team.">
        {roomsLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </div>
        ) : rooms.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {rooms.map((room) => (
              <div key={room.id} className="p-5 flex flex-col justify-between hover:border-white/20 transition-colors" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', minHeight: '11rem' }}>
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <p style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 600, fontSize: '1.25rem', color: '#fff' }}>{room.name}</p>
                    <Badge variant={getStatusTone(room.status)}>{room.statusLabel?.toUpperCase()}</Badge>
                  </div>
                  <p className="mt-3" style={{ fontSize: '0.85rem', color: '#6B7280' }}>{room.description}</p>
                </div>
                
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#00FF88', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    <iconify-icon icon="solar:users-group-rounded-linear" className="mr-1 inline-block align-middle" />
                    {room.participants.length} Teams
                  </span>
                  <Button size="sm" onClick={() => joinContest(room.id, user?.teamId)} disabled={!user?.teamId}>
                    {user?.teamId ? 'Join Arena' : 'Requires Team'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="No contests available" description="Admins will provision new arenas shortly." />
        )}
      </Card>

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Initialize Team"
        description="Provision a new team roster for the arena."
      >
        <div className="space-y-5 pt-2">
          <Input 
            value={teamName} 
            onChange={(event) => setTeamName(event.target.value)} 
            placeholder="Binary Brigade" 
            label="Team Designation"
            icon="solar:shield-user-linear" 
          />
          <Button className="w-full mt-2" onClick={handleCreateTeam}>
            Initialize Team
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        title="Join Existing Team"
        description="Enter the unique access code provided by your captain."
      >
        <div className="space-y-5 pt-2">
          <Input 
            value={joinCode} 
            onChange={(event) => setJoinCode(event.target.value.toUpperCase())} 
            placeholder="ALGO-21" 
            label="Access Code"
            icon="solar:key-linear" 
          />
          <Button className="w-full mt-2" onClick={handleJoinTeam}>
            Authenticate & Join
          </Button>
        </div>
      </Modal>
    </section>
  )
}

export default DashboardPage
