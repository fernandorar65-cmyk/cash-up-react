import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { setUnauthorizedHandler } from '../services/httpClient'
import { useAuth } from '../../features/auth'
import { Button } from '../ui/Button'

function NavItem({ to, label, theme }: { to: string; label: string; theme: 'light' | 'dark' }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        theme === 'light'
          ? `text-sm ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`
          : `text-sm ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`
      }
    >
      {label}
    </NavLink>
  )
}

export function RootLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, roles, logout } = useAuth()
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register'
  const isClientRoute = location.pathname === '/client' || location.pathname.startsWith('/client/')
  const isStaffRoute = location.pathname === '/staff' || location.pathname.startsWith('/staff/')
  const theme: 'light' | 'dark' = isAuthRoute || isClientRoute || isStaffRoute ? 'light' : 'dark'

  useEffect(() => {
    setUnauthorizedHandler(() => {
      logout()
      navigate('/login', { replace: true })
    })
    return () => setUnauthorizedHandler(null)
  }, [logout, navigate])

  if (isAuthRoute) {
    return (
      <div className="min-h-svh bg-background-light text-slate-900">
        <main className="mx-auto flex min-h-svh w-full max-w-5xl items-center justify-center px-4 py-10">
          <Outlet />
        </main>
      </div>
    )
  }

  return (
    <div className={theme === 'light' ? 'min-h-svh bg-background-light text-slate-900' : 'min-h-svh bg-slate-950 text-slate-100'}>
      <header
        className={
          theme === 'light'
            ? 'sticky top-0 z-10 border-b border-slate-200/80 bg-background-light/75 backdrop-blur'
            : 'sticky top-0 z-10 border-b border-slate-800/80 bg-slate-950/75 backdrop-blur'
        }
      >
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <Link
            to="/"
            className={
              theme === 'light'
                ? 'text-sm font-semibold tracking-tight text-slate-900'
                : 'text-sm font-semibold tracking-tight text-white'
            }
          >
            Cash Up
          </Link>

          <nav className="flex items-center gap-4">
            {isAuthenticated ? <NavItem to="/dashboard" label="Dashboard" theme={theme} /> : null}
            {!isAuthenticated ? (
              <>
                <NavItem to="/login" label="Login" theme={theme} />
                <NavItem to="/register" label="Registro" theme={theme} />
              </>
            ) : (
              <>
                <span className={theme === 'light' ? 'hidden text-xs text-slate-500 sm:inline' : 'hidden text-xs text-slate-400 sm:inline'}>
                  {roles.length ? roles.join(', ') : 'Sin roles'}
                </span>
                <Button variant="secondary" size="sm" onClick={logout}>
                  Salir
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main
        className={
          isStaffRoute
            ? 'w-full'
            : 'mx-auto w-full max-w-5xl px-4 py-6'
        }
      >
        <Outlet />
      </main>
    </div>
  )
}

