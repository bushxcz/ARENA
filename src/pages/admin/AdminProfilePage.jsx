import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Table from '../../components/ui/Table'
import useAuthStore from '../../store/useAuthStore'
import useRoomStore from '../../store/useRoomStore'
import useTeamStore from '../../store/useTeamStore'
import useLeaderboardStore from '../../store/useLeaderboardStore'
import useChatStore from '../../store/useChatStore'
import { getStatusTone } from '../../utils/helpers'
import adminAvatar from '../../assets/admin-avatar.png'

function AdminProfilePage() {
  const user = useAuthStore((state) => state.user)
  const teams = useTeamStore((state) => state.teams)
  const rooms = useRoomStore((state) => state.rooms)
  const currentRoom = useRoomStore((state) => state.currentRoom())
  const leaderboard = useLeaderboardStore((state) => state.entries)

  // Mock admin stats
  const adminStats = {
    contestsManaged: 24,
    totalParticipants: 156,
    teamsRegistered: teams.length,
    activeContests: rooms.filter(r => r.status === 'live').length,
    broadcastsSent: 38,
    uptime: '99.8%',
  }

  const systemLogs = [
    { label: 'Contest "Code Sprint #4" started', time: '12 min ago', icon: 'solar:play-circle-linear', color: '#00FF88', severity: 'info' },
    { label: 'Team "ByteForce" joined the arena', time: '28 min ago', icon: 'solar:users-group-rounded-linear', color: '#00FF88', severity: 'info' },
    { label: 'Broadcast sent: "Extended by 10 min"', time: '1 hour ago', icon: 'solar:letter-linear', color: '#FFB800', severity: 'warning' },
    { label: 'System health check passed', time: '2 hours ago', icon: 'solar:shield-check-linear', color: '#00FF88', severity: 'info' },
    { label: 'Contest "Algo Battle #3" ended', time: '1 day ago', icon: 'solar:stop-circle-linear', color: '#FF4444', severity: 'critical' },
    { label: 'New team "NullPointers" registered', time: '2 days ago', icon: 'solar:add-circle-linear', color: '#A855F7', severity: 'info' },
  ]

  const permissions = [
    { name: 'Contest Management', icon: 'solar:cup-linear', status: true },
    { name: 'Team Oversight', icon: 'solar:users-group-rounded-linear', status: true },
    { name: 'Broadcast System', icon: 'solar:volume-loud-linear', status: true },
    { name: 'Leaderboard Control', icon: 'solar:ranking-linear', status: true },
    { name: 'User Management', icon: 'solar:user-plus-linear', status: true },
    { name: 'System Config', icon: 'solar:settings-linear', status: true },
  ]

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Admin Profile"
        title="System administrator"
        description="Your admin overview, system logs, and access control dashboard."
      />

      {/* Admin Profile Header */}
      <Card>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative group">
            <img
              src={adminAvatar}
              alt="Admin Avatar"
              className="w-24 h-24 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
              style={{ border: '2px solid rgba(255,184,0,0.4)', boxShadow: '0 0 25px rgba(255,184,0,0.15)' }}
            />
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: '#FFB800', border: '2px solid #0B0E14' }}
            >
              <iconify-icon icon="solar:shield-check-linear" style={{ fontSize: '0.6rem', color: '#040608' }} />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#fff', letterSpacing: '-0.03em' }}>
              {user?.name ?? 'Administrator'}
            </h2>
            <p className="mt-1" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {user?.email}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-3 justify-center sm:justify-start">
              <Badge variant="warning">Administrator</Badge>
              <Badge variant="success">Full Access</Badge>
              <Badge variant="primary">Super Admin</Badge>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-1">
            <span style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 700, fontSize: '2rem', color: '#FFB800' }}>
              {adminStats.uptime}
            </span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              System Uptime
            </span>
          </div>
        </div>
      </Card>

      {/* Admin Stats Grid */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {[
          { label: 'Contests', value: adminStats.contestsManaged, icon: 'solar:cup-linear' },
          { label: 'Participants', value: adminStats.totalParticipants, icon: 'solar:users-group-rounded-linear' },
          { label: 'Teams', value: adminStats.teamsRegistered, icon: 'solar:shield-user-linear' },
          { label: 'Live Now', value: adminStats.activeContests, icon: 'solar:play-circle-linear' },
          { label: 'Broadcasts', value: adminStats.broadcastsSent, icon: 'solar:volume-loud-linear' },
          { label: 'Uptime', value: adminStats.uptime, icon: 'solar:server-linear' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 flex flex-col items-center gap-2 transition-all duration-300 hover:border-[#FFB800]/30 hover:-translate-y-1"
            style={{ background: '#0B0E14', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <iconify-icon icon={stat.icon} style={{ fontSize: '1.25rem', color: '#FFB800' }} />
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
        {/* System Logs */}
        <Card title="System Logs" description="Recent administrative actions and system events.">
          <div className="space-y-1">
            {systemLogs.map((item, i) => (
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
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: item.severity === 'critical' ? '#FF4444' : item.severity === 'warning' ? '#FFB800' : '#00FF88',
                    }}
                  />
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#6B7280' }}>
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Access Permissions */}
        <Card title="Access Permissions" description="Your administrative privileges.">
          <div className="grid grid-cols-2 gap-3">
            {permissions.map((perm) => (
              <div
                key={perm.name}
                className="p-4 flex flex-col items-center gap-2 text-center transition-all duration-300 hover:scale-[1.03]"
                style={{ background: 'rgba(255,184,0,0.03)', border: '1px solid rgba(255,184,0,0.1)' }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-lg"
                  style={{ background: 'rgba(255,184,0,0.1)', border: '1px solid rgba(255,184,0,0.2)' }}
                >
                  <iconify-icon icon={perm.icon} style={{ fontSize: '1.25rem', color: '#FFB800' }} />
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#E8E8E0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {perm.name}
                </span>
                <Badge variant="success">Granted</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card title="Quick Actions" description="Frequently used administrative controls.">
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Manage Contests', icon: 'solar:cup-linear', link: '/admin', desc: 'Start, pause, or end contests' },
            { label: 'View Leaderboard', icon: 'solar:ranking-linear', link: '/leaderboard', desc: 'Live ranking overview' },
            { label: 'Monitor Arena', icon: 'solar:code-square-linear', link: '/arena', desc: 'Watch live submissions' },
            { label: 'Team Registry', icon: 'solar:users-group-rounded-linear', link: '/room', desc: 'Manage team participation' },
          ].map((action) => (
            <a
              key={action.label}
              href={action.link}
              className="p-4 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#FFB800]/30"
              style={{ background: '#0B0E14', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <iconify-icon icon={action.icon} style={{ fontSize: '1.5rem', color: '#FFB800' }} />
              <div>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {action.label}
                </p>
                <p className="mt-1" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#6B7280' }}>
                  {action.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </Card>
    </section>
  )
}

export default AdminProfilePage
