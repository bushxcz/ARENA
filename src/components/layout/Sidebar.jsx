import { NavLink } from 'react-router-dom'

const icons = {
  Dashboard: 'solar:widget-linear',
  Teams: 'solar:users-group-rounded-linear',
  Contests: 'solar:cup-linear',
  Arena: 'solar:code-square-linear',
  Leaderboard: 'solar:ranking-linear',
  'Admin Panel': 'solar:settings-linear',
}

const baseLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Teams', to: '/team' },
  { label: 'Contests', to: '/room' },
  { label: 'Arena', to: '/arena' },
  { label: 'Leaderboard', to: '/leaderboard' },
]

function Sidebar({ isAdmin = false }) {
  const links = isAdmin ? [...baseLinks, { label: 'Admin Panel', to: '/admin' }] : baseLinks

  return (
    <aside
      className="w-full lg:w-64 border border-white/5 flex-shrink-0"
      style={{ background: '#0B0E14', padding: '1.25rem', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 0 100%)' }}
    >
      <div className="border-b border-white/5 pb-4 mb-5">
        <div className="axon-badge" style={{ marginBottom: '0.75rem' }}>
          <iconify-icon icon="solar:server-linear" />
          CONTROL PANEL
        </div>
        <h2 style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 600, fontSize: '1.25rem', color: '#fff', letterSpacing: '-0.03em' }}>
          Workspace
        </h2>
        <p className="mt-1" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Navigate // Manage // Compete
        </p>
      </div>

      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className="transition-all duration-300"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.65rem 0.75rem',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              fontWeight: isActive ? 600 : 400,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: isActive ? '#00FF88' : '#6B7280',
              background: isActive ? 'rgba(0,255,136,0.08)' : 'transparent',
              borderLeft: isActive ? '2px solid #00FF88' : '2px solid transparent',
            })}
          >
            <iconify-icon icon={icons[link.label] || 'solar:alt-arrow-right-linear'} style={{ fontSize: '1rem' }} />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
