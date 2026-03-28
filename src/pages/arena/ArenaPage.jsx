import PageHeader from '../../components/layout/PageHeader'
import ChatPanel from '../../components/chat/ChatPanel'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import useContestTimer from '../../hooks/useContestTimer'
import useAuthStore from '../../store/useAuthStore'
import useChatStore from '../../store/useChatStore'
import useRoomStore from '../../store/useRoomStore'
import useTeamStore from '../../store/useTeamStore'
import { getStatusTone } from '../../utils/helpers'

function ArenaPage() {
  const user = useAuthStore((state) => state.user)
  const room = useRoomStore((state) => state.currentRoom())
  const leaveRoom = useRoomStore((state) => state.leaveCurrentRoom)
  const teams = useTeamStore((state) => state.teams)
  const messages = useChatStore((state) => state.messages)
  const sendTeamMessage = useChatStore((state) => state.sendTeamMessage)
  const timer = useContestTimer(room)

  const activeTeam = teams.find((team) => team.id === user?.teamId)
  const visibleMessages = messages.filter(
    (message) =>
      message.teamId === activeTeam?.id || message.teamId === 'broadcast' || message.type === 'system',
  )

  return (
    <section className="flex flex-col gap-4" style={{ height: '100%' }}>
      <PageHeader
        eyebrow="Arena"
        title="Coding arena"
        description="A focused workspace for the active challenge with contest status, a mock editor, and live team communication."
        actions={
          <>
            <Badge variant={getStatusTone(room?.status)}>{room?.statusLabel}</Badge>
            <Badge variant="primary">Timer {timer}</Badge>
            <Button variant="ghost" onClick={leaveRoom}>
              Leave Arena
            </Button>
          </>
        }
      />

      {room ? (
        <div className="grid gap-4 xl:grid-cols-[1.05fr_1fr_0.95fr] flex-1 min-h-0">
          <Card title={room.problem.title} description={room.problem.summary} className="h-full">
            <div className="space-y-5 text-sm leading-7 text-slate-300">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Prompt</p>
                <p className="mt-2">{room.problem.description}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Constraints</p>
                <ul className="mt-2 space-y-2 text-slate-300">
                  {room.problem.constraints.map((constraint) => (
                    <li key={constraint}>• {constraint}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Example</p>
                <div className="mt-2 rounded-2xl border border-white/10 bg-slate-900/80 p-4 font-mono text-xs text-slate-200">
                  {room.problem.example}
                </div>
              </div>
            </div>
          </Card>

          <Card title="Code editor" description="Mock-only editor UI ready for backend or socket integration later.">
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-xs text-slate-400">
                <span>{room.problem.language}</span>
                <span>Autosave disabled</span>
              </div>
              <div className="min-h-[260px] rounded-2xl border border-white/10 bg-[#0b1120] p-4 font-mono text-sm leading-7 text-slate-300">
                <p className="text-slate-500">// Write your solution here</p>
                <p>function solve(input) {'{'}</p>
                <p className="pl-4 text-slate-500">// parse input</p>
                <p className="pl-4 text-slate-500">// implement solution</p>
                <p className="pl-4">return input</p>
                <p>{'}'}</p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <Button>Run Sample</Button>
                <Button variant="secondary">Submit Mock Solution</Button>
              </div>
            </div>
          </Card>

          <ChatPanel
            currentUserId={user?.id}
            messages={visibleMessages}
            onSend={(text) => sendTeamMessage({ author: user.name, text, teamId: activeTeam?.id, userId: user.id })}
            disabled={!activeTeam || room.status === 'ended'}
            title={activeTeam ? `${activeTeam.name} Chat` : 'Team Chat'}
          />
        </div>
      ) : (
        <EmptyState
          title="No active contest room"
          description="Join a contest from the contests page to open the coding arena."
        />
      )}
    </section>
  )
}

export default ArenaPage
