import { Link, useLocation } from 'react-router-dom'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { getStatusTone } from '../../utils/helpers'
import userAvatar from '../../assets/user-avatar.png'
import adminAvatar from '../../assets/admin-avatar.png'

function Navbar({ onLogout, room, user }) {
  const location = useLocation()
  const isAdmin = user?.role === 'admin'
  const profileLink = '/profile'
  const avatar = isAdmin ? adminAvatar : userAvatar

  return (
    <header
      className="sticky top-0 z-20 border-b border-white/5"
      style={{ background: 'rgba(4,6,8,0.9)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
    >
      <div
        className="mx-auto flex items-center justify-between gap-4 py-4"
        style={{ maxWidth: 'clamp(65rem,90vw,88rem)', padding: '1rem clamp(1rem,5vw,4rem)' }}
      >
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#00FF88] group-hover:rotate-90 transition-transform duration-500">
              <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
            <span style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.05em', color: '#fff' }}>
              ARENA
            </span>
          </Link>
          <Badge variant={getStatusTone(room?.status)}>
            {room ? `Contest: ${room.statusLabel}` : 'No contest selected'}
          </Badge>
          {location.pathname !== '/dashboard' && location.pathname !== '/admin' && (
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 transition-colors hover:text-[#00FF88]"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#6B7280',
              }}
            >
              <iconify-icon icon="solar:arrow-left-linear" style={{ fontSize: '0.85rem' }} />
              Dashboard
            </Link>
          )}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <div className="text-right">
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#fff', fontWeight: 500 }}>
              {user?.name ?? 'Guest'}
            </p>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {isAdmin ? 'Administrator' : 'Participant'} · {location.pathname}
            </p>
          </div>

          {/* Profile Avatar */}
          <Link
            to={profileLink}
            className="relative group"
            title={isAdmin ? 'Admin Panel' : 'My Profile'}
          >
            <img
              src={avatar}
              alt={isAdmin ? 'Admin Avatar' : 'User Avatar'}
              className="w-9 h-9 rounded-lg object-cover transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,255,136,0.3)]"
              style={{
                border: `2px solid ${isAdmin ? 'rgba(255,184,0,0.4)' : 'rgba(0,255,136,0.3)'}`,
              }}
            />
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full"
              style={{
                background: isAdmin ? '#FFB800' : '#00FF88',
                border: '2px solid #040608',
              }}
            />
          </Link>

          <Button variant="ghost" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar

