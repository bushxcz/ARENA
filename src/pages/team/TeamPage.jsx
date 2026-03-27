import PageHeader from '../../components/layout/PageHeader'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import Table from '../../components/ui/Table'
import useAuthStore from '../../store/useAuthStore'
import useTeamStore from '../../store/useTeamStore'

function TeamPage() {
  const teams = useTeamStore((state) => state.teams)
  const user = useAuthStore((state) => state.user)
  const activeTeam = teams.find((team) => team.id === user?.teamId)

  const columns = [
    { key: 'name', header: 'Team' },
    { key: 'code', header: 'Invite Code' },
    { key: 'membersCount', header: 'Members', render: (team) => team.members.length },
    {
      key: 'status',
      header: 'Contest Status',
      render: (team) => (
        <Badge variant={team.joinedContest ? 'success' : 'default'}>
          {team.joinedContest ? 'Joined Contest' : 'Open'}
        </Badge>
      ),
    },
  ]

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Teams"
        title="Team workspace"
        description="Review registered teams and inspect the members and roles for your current squad."
      />

      <Card title="All teams" description="Keep team rosters visible for organizers and participants.">
        <Table columns={columns} data={teams.map((team) => ({ ...team, membersCount: team.members.length }))} />
      </Card>

      {activeTeam ? (
        <Card title={activeTeam.name} description={`Invite code ${activeTeam.code} · Member breakdown`}>
          <div className="grid gap-4 md:grid-cols-2">
            {activeTeam.members.map((member) => (
              <div key={member.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-white">{member.name}</p>
                  <Badge variant={member.role === 'Captain' ? 'warning' : 'primary'}>{member.role}</Badge>
                </div>
                <p className="mt-2 text-sm text-slate-400">{member.email}</p>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <EmptyState
          title="You are not on a team yet"
          description="Create a new team or join one from the dashboard to unlock team details here."
        />
      )}
    </section>
  )
}

export default TeamPage
