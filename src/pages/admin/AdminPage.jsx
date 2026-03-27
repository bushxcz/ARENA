import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Table from '../../components/ui/Table'
import useChatStore from '../../store/useChatStore'
import useRoomStore from '../../store/useRoomStore'
import useTeamStore from '../../store/useTeamStore'
import { getStatusTone } from '../../utils/helpers'

function AdminPage() {
  const [broadcast, setBroadcast] = useState('')
  const [feedback, setFeedback] = useState('')
  const currentRoom = useRoomStore((state) => state.currentRoom())
  const updateRoomStatus = useRoomStore((state) => state.updateRoomStatus)
  const postBroadcast = useChatStore((state) => state.postBroadcast)
  const teams = useTeamStore((state) => state.teams)

  const columns = [
    { key: 'name', header: 'Team' },
    { key: 'membersCount', header: 'Members' },
    { key: 'captain', header: 'Captain' },
    {
      key: 'status',
      header: 'Status',
      render: (team) => <Badge variant={team.joinedContest ? 'success' : 'default'}>{team.joinedContest ? 'Joined' : 'Idle'}</Badge>,
    },
  ]

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Admin"
        title="Contest control panel"
        description="Manage the contest lifecycle, communicate with all teams, and monitor participation."
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card title="Contest controls" description="Status changes update the room and arena views immediately.">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={getStatusTone(currentRoom?.status)}>{currentRoom?.statusLabel}</Badge>
            <Button onClick={() => updateRoomStatus('live')}>Start Contest</Button>
            <Button variant="secondary" onClick={() => updateRoomStatus('paused')}>
              Pause Contest
            </Button>
            <Button variant="danger" onClick={() => updateRoomStatus('ended')}>
              End Contest
            </Button>
          </div>
        </Card>

        <Card title="Broadcast message" description="Send a system note into every chat feed.">
          <div className="space-y-3">
            <Input
              value={broadcast}
              onChange={(event) => setBroadcast(event.target.value)}
              placeholder="Example: Submission window extended by 10 minutes."
            />
            <Button
              className="w-full"
              onClick={() => {
                if (!broadcast.trim()) {
                  setFeedback('Write a message before broadcasting.')
                  return
                }
                postBroadcast(broadcast.trim())
                setBroadcast('')
                setFeedback('Broadcast sent to all teams.')
              }}
            >
              Broadcast to teams
            </Button>
            {feedback ? <p className="text-sm text-slate-300">{feedback}</p> : null}
          </div>
        </Card>
      </div>

      <Card title="Registered teams" description="Quick visibility into who is ready before the contest goes live.">
        <Table
          columns={columns}
          data={teams.map((team) => ({
            ...team,
            membersCount: team.members.length,
            captain: team.members[0]?.name ?? 'N/A',
          }))}
        />
      </Card>
    </section>
  )
}

export default AdminPage
