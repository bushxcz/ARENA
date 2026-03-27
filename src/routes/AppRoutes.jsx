import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'
import useAppBootstrap from '../hooks/useAppBootstrap'
import AdminPage from '../pages/admin/AdminPage'
import ArenaPage from '../pages/arena/ArenaPage'
import LoginPage from '../pages/auth/LoginPage'
import SignupPage from '../pages/auth/SignupPage'
import DashboardPage from '../pages/dashboard/DashboardPage'
import LandingPage from '../pages/landing/LandingPage'
import LeaderboardPage from '../pages/leaderboard/LeaderboardPage'
import RoomPage from '../pages/room/RoomPage'
import TeamPage from '../pages/team/TeamPage'
import useAuthStore from '../store/useAuthStore'
import useRoomStore from '../store/useRoomStore'

function ProtectedShell() {
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useAuthStore((state) => state.logout)
  const room = useRoomStore((state) => state.currentRoom())

  useAppBootstrap(isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  return <MainLayout user={user} room={room} onLogout={logout} />
}

function AdminRoute() {
  const user = useAuthStore((state) => state.user)

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

function PublicRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing page — always accessible */}
        <Route path="/" element={<LandingPage />} />

        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedShell />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/room" element={<RoomPage />} />
          <Route path="/arena" element={<ArenaPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
