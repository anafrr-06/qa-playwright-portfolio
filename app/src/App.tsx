import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, createContext, useContext, useEffect, useCallback } from 'react'
import DashboardLayout from './layouts/DashboardLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Toast, { type ToastType } from './components/Toast'

type AuthContextType = {
  isAuthenticated: boolean
  user: { name: string; email: string } | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

type ThemeContextType = {
  isDark: boolean
  toggleTheme: () => void
}

type ToastContextType = {
  showToast: (message: string, type: ToastType) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)
export const ThemeContext = createContext<ThemeContextType | null>(null)
export const ToastContext = createContext<ToastContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  const [toast, setToast] = useState<{
    message: string
    type: ToastType
    isVisible: boolean
  }>({ message: '', type: 'info', isVisible: false })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev)
  }, [])

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type, isVisible: true })
  }, [])

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isVisible: false }))
  }, [])

  const login = (email: string, password: string) => {
    if (email && password.length >= 6) {
      setIsAuthenticated(true)
      setUser({ name: email.split('@')[0], email })
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        <ToastContext.Provider value={{ showToast }}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </BrowserRouter>

          <Toast
            message={toast.message}
            type={toast.type}
            isVisible={toast.isVisible}
            onClose={hideToast}
          />
        </ToastContext.Provider>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  )
}
