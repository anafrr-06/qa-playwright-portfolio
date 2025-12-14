import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth, useTheme, useToast } from '../App'
import Modal from '../components/Modal'
import ThemeToggle from '../components/ThemeToggle'

const navigation = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
]

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const { showToast } = useToast()
  const location = useLocation()
  const navigate = useNavigate()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleLogoutClick = () => {
    setShowLogoutModal(true)
  }

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false)
    logout()
    showToast('You have been signed out', 'success')
    navigate('/login')
  }

  const handleLogoutCancel = () => {
    setShowLogoutModal(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-white flex flex-col" data-testid="sidebar">
        <div className="p-4 border-b border-slate-700">
          <h1 className="text-xl font-bold">SaaS Dashboard</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === item.href
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
              aria-current={location.pathname === item.href ? 'page' : undefined}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700 space-y-2">
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

          <div className="flex items-center gap-3 pt-2">
            <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
              {user?.name[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" data-testid="user-name">
                {user?.name}
              </p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogoutClick}
            className="w-full px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
            data-testid="logout-button"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-slate-100 dark:bg-slate-900" data-testid="main-content">
        <Outlet />
      </main>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        title="Sign out"
        message="Are you sure you want to sign out? You'll need to log in again to access your dashboard."
        confirmText="Sign out"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  )
}
