import { NavLink, Outlet } from 'react-router-dom'
import { Icon } from './Icon'
import { useAuth } from '../../features/auth'
import type { Role } from '../../features/auth/types/auth.types'

type ItemDef = { to: string; label: string; icon: string; roles: Role[] }

const items: ItemDef[] = [
  { to: '/client/profile', label: 'Mi perfil', icon: 'person', roles: ['CLIENT'] },
  { to: '/client/credit-requests/new', label: 'Solicitar crédito', icon: 'add_circle', roles: ['CLIENT'] },
  { to: '/client/loans', label: 'Mis créditos', icon: 'receipt_long', roles: ['CLIENT'] },
]

function Item({ to, label, icon }: { to: string; label: string; icon: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? 'inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white'
          : 'inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100'
      }
    >
      <Icon name={icon} className="text-[18px]" />
      {label}
    </NavLink>
  )
}

export function ClientLayout() {
  const { roles } = useAuth()
  const visibleItems = items.filter((it) => it.roles.some((r) => roles.includes(r)))

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <Icon name="account_balance_wallet" className="text-[22px]" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight text-slate-900">CashUp</div>
              <div className="text-xs text-slate-600">Portal del cliente</div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-2">
            {visibleItems.map((it) => (
              <Item key={it.to} to={it.to} label={it.label} icon={it.icon} />
            ))}
          </nav>
        </div>
      </div>

      <Outlet />
    </div>
  )
}

