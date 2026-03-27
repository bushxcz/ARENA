import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'

function MainLayout({ user, room, onLogout }) {
  return (
    <div className="min-h-screen" style={{ background: '#040608', color: '#E8E8E0' }}>
      <Navbar onLogout={onLogout} room={room} user={user} />
      <div
        className="mx-auto flex flex-col gap-6 py-6 lg:flex-row"
        style={{ maxWidth: 'clamp(65rem,90vw,88rem)', padding: '1.5rem clamp(1rem,5vw,4rem)' }}
      >
        <Sidebar isAdmin={user?.role === 'admin'} />
        <main className="min-w-0 flex-1" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
