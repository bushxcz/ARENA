import PageHeader from '../../components/layout/PageHeader'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import Table from '../../components/ui/Table'
import useLeaderboardStore from '../../store/useLeaderboardStore'

function LeaderboardPage() {
  const entries = useLeaderboardStore((state) => state.entries)

  const columns = [
    { key: 'rank', header: 'Rank' },
    { key: 'teamName', header: 'Team' },
    { key: 'score', header: 'Score', render: (entry) => <span className="font-semibold text-white">{entry.score}</span> },
    { key: 'time', header: 'Time' },
    {
      key: 'trend',
      header: 'Trend',
      render: (entry) => <Badge variant={entry.trend === 'up' ? 'success' : 'default'}>{entry.trend}</Badge>,
    },
  ]

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Results"
        title="Leaderboard"
        description="Mock rankings stay in sync with team and contest actions to simulate live event feedback."
      />

      <Card title="Standings" description="Ranked by score first, then completion time.">
        <Table columns={columns} data={entries} emptyMessage="No leaderboard data available yet." />
      </Card>
    </section>
  )
}

export default LeaderboardPage
