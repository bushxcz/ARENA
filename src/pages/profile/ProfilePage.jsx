import { useMemo, useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import EditProfileModal from '../../components/ui/EditProfileModal'
import useAuthStore from '../../store/useAuthStore'
import useLeaderboardStore from '../../store/useLeaderboardStore'
import useTeamStore from '../../store/useTeamStore'
import userAvatar from '../../assets/user-avatar.png'

function ProfilePage() {
  const user = useAuthStore((state) => state.user)
  const updateProfile = useAuthStore((state) => state.updateProfile)
  const teams = useTeamStore((state) => state.teams)
  const leaderboard = useLeaderboardStore((state) => state.entries)

  const [editOpen, setEditOpen] = useState(false)

  const myTeam = useMemo(() => teams.find((t) => t.id === user?.teamId), [teams, user?.teamId])
  const myRank = leaderboard.findIndex((e) => e.teamId === user?.teamId) + 1

  const displayAvatar = user?.avatarUrl || userAvatar

  // Mock stats for demo
  const stats = {
    contestsEntered: 12,
    problemsSolved: 47,
    winRate: '38%',
    totalPoints: 2450,
    streak: 5,
    bestRank: 2,
  }

  const recentActivity = [
    { label: 'Solved "Binary Search Trees"', time: '2 hours ago', icon: 'solar:check-circle-linear', color: '#00FF88' },
    { label: 'Joined Contest: Code Sprint #4', time: '1 day ago', icon: 'solar:cup-linear', color: '#FFB800' },
    { label: 'Team "Alpha Squad" ranked #2', time: '3 days ago', icon: 'solar:ranking-linear', color: '#00FF88' },
    { label: 'Solved "Dynamic Programming"', time: '5 days ago', icon: 'solar:check-circle-linear', color: '#00FF88' },
    { label: 'Earned Badge: Speed Coder', time: '1 week ago', icon: 'solar:medal-ribbon-star-linear', color: '#FFB800' },
  ]

  const badges = [
    { name: 'Speed Coder', icon: 'solar:bolt-linear', color: '#FFB800' },
    { name: 'Team Player', icon: 'solar:users-group-rounded-linear', color: '#00FF88' },
    { name: 'First Blood', icon: 'solar:fire-linear', color: '#FF4444' },
    { name: '10-Win Streak', icon: 'solar:star-linear', color: '#A855F7' },
  ]

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Profile"
        title="Your command center"
        description="View your stats, achievements, and activity history."
      />

      {/* Profile Header Card */}
      <Card>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative group">
            <img
              src={displayAvatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
              style={{ border: '2px solid rgba(0,255,136,0.3)', boxShadow: '0 0 20px rgba(0,255,136,0.1)' }}
            />
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: '#00FF88', border: '2px solid #0B0E14' }}
            >
              <iconify-icon icon="solar:check-read-linear" style={{ fontSize: '0.6rem', color: '#040608' }} />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#fff', letterSpacing: '-0.03em' }}>
              {user?.name ?? 'Guest'}
            </h2>
            <p className="mt-1" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {user?.email}
            </p>
            {user?.bio && (
              <p className="mt-2" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#9CA3AF', lineHeight: '1.5' }}>
                {user.bio}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2 mt-3 justify-center sm:justify-start">
              <Badge variant="primary">Participant</Badge>
              {myTeam && <Badge variant="success">{myTeam.name}</Badge>}
              {myRank > 0 && <Badge variant="warning">Rank #{myRank}</Badge>}
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className="hidden lg:flex flex-col items-end gap-1">
              <span style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 700, fontSize: '2rem', color: '#00FF88' }}>
                {stats.totalPoints.toLocaleString()}
              </span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Total Points
              </span>
            </div>

            {/* Edit Profile Button */}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setEditOpen(true)}
              id="edit-profile-btn"
            >
              <iconify-icon icon="solar:pen-new-square-linear" style={{ fontSize: '0.85rem' }} />
              Edit Profile
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {[
          { label: 'Contests', value: stats.contestsEntered, icon: 'solar:cup-linear' },
          { label: 'Problems', value: stats.problemsSolved, icon: 'solar:code-square-linear' },
          { label: 'Win Rate', value: stats.winRate, icon: 'solar:chart-linear' },
          { label: 'Points', value: stats.totalPoints.toLocaleString(), icon: 'solar:star-linear' },
          { label: 'Streak', value: `${stats.streak} days`, icon: 'solar:fire-linear' },
          { label: 'Best Rank', value: `#${stats.bestRank}`, icon: 'solar:ranking-linear' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 flex flex-col items-center gap-2 transition-all duration-300 hover:border-[#00FF88]/30 hover:-translate-y-1"
            style={{ background: '#0B0E14', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <iconify-icon icon={stat.icon} style={{ fontSize: '1.25rem', color: '#00FF88' }} />
            <span style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 700, fontSize: '1.25rem', color: '#fff' }}>
              {stat.value}
            </span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        {/* Recent Activity */}
        <Card title="Recent Activity" description="Your latest actions across the Arena.">
          <div className="space-y-1">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 transition-colors hover:bg-white/[0.02]"
                style={{ borderLeft: `2px solid ${item.color}` }}
              >
                <iconify-icon icon={item.icon} style={{ fontSize: '1rem', color: item.color, flexShrink: 0 }} />
                <div className="flex-1 min-w-0">
                  <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#E8E8E0' }}>
                    {item.label}
                  </p>
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#6B7280', flexShrink: 0 }}>
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Badges */}
        <Card title="Achievements" description="Badges you've earned along the way.">
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.name}
                className="p-4 flex flex-col items-center gap-2 text-center transition-all duration-300 hover:scale-[1.03]"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-lg"
                  style={{ background: `${badge.color}15`, border: `1px solid ${badge.color}30` }}
                >
                  <iconify-icon icon={badge.icon} style={{ fontSize: '1.25rem', color: badge.color }} />
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#E8E8E0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        user={user}
        currentAvatar={displayAvatar}
        accentColor="#00FF88"
        onSave={(updates) => updateProfile(updates)}
      />
    </section>
  )
}

export default ProfilePage
