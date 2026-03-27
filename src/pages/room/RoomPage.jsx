import PageHeader from '../../components/layout/PageHeader'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import useAuthStore from '../../store/useAuthStore'
import useRoomStore from '../../store/useRoomStore'
import { getStatusTone } from '../../utils/helpers'

function RoomPage() {
  const rooms = useRoomStore((state) => state.rooms)
  const user = useAuthStore((state) => state.user)
  const joinContest = useRoomStore((state) => state.joinContest)

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Contests"
        title="Contest rooms"
        description="Browse active rooms, inspect status, and join the right contest with your team."
      />

      {rooms.length ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {rooms.map((room) => (
            <Card
              key={room.id}
              title={room.name}
              description={room.description}
              action={<Badge variant={getStatusTone(room.status)}>{room.statusLabel}</Badge>}
            >
              <div className="space-y-4">
                <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-slate-400">Status</p>
                    <p className="mt-2 font-medium text-white">{room.statusLabel}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-slate-400">Participating teams</p>
                    <p className="mt-2 font-medium text-white">{room.participants.length}</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Problem preview</p>
                  <p className="mt-2 text-sm text-slate-300">{room.problem.summary}</p>
                </div>
                <Button onClick={() => joinContest(room.id, user?.teamId)} disabled={!user?.teamId}>
                  Join Contest
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState title="No contest rooms" description="An admin can create the first room when the event opens." />
      )}
    </section>
  )
}

export default RoomPage
