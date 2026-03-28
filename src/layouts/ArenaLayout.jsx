import { Link, Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'

function ArenaLayout({ user, room, onLogout }) {
  return (
    <div className="flex flex-col" style={{ background: '#040608', color: '#E8E8E0', height: '100vh', overflow: 'hidden' }}>
      <Navbar onLogout={onLogout} room={room} user={user} />
      {/* Full width container, no sidebar — constrained to viewport */}
      <main
        className="flex-1 w-full overflow-auto"
        style={{ padding: '1rem clamp(1rem,3vw,2rem)' }}
      >
        <Outlet />
      </main>
    </div>
  )
}

export default ArenaLayout
