import { useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { setUnauthorizedHandler } from '../services/httpClient'
import { useAuth } from '../../features/auth'
import { Button } from '../ui/Button'

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`
      }
    >
      {label}
    </NavLink>
  )
}

export function RootLayout() {
  const navigate = useNavigate()
  const { isAuthenticated, roles, logout } = useAuth()

  useEffect(() => {
    setUnauthorizedHandler(() => {
      logout()
      navigate('/login', { replace: true })
    })
    return () => setUnauthorizedHandler(null)
  }, [logout, navigate])

  return (
    <div className="min-h-svh bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-800/80 bg-slate-950/75 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="text-sm font-semibold tracking-tight text-white">
            Cash Up
          </Link>

          <nav className="flex items-center gap-4">
            {isAuthenticated ? <NavItem to="/dashboard" label="Dashboard" /> : null}
            {!isAuthenticated ? (
              <>
                <NavItem to="/login" label="Login" />
                <NavItem to="/register" label="Registro" />
              </>
            ) : (
              <>
                <span className="hidden text-xs text-slate-400 sm:inline">
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

      <main className="mx-auto w-full max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}

