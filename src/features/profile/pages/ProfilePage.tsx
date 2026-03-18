import { useNavigate } from 'react-router-dom'
import { Icon } from '../../../shared/components/Icon'
import { useAuth } from '../../auth'

export function ProfilePage() {
  const navigate = useNavigate()
  const { userId, roles, isTokenExpired, logout } = useAuth()

  const roleLabel = roles.length ? roles.join(', ') : 'Sin roles'

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
            <Icon name="person" className="text-lg" />
            Perfil
          </div>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900">Tu cuenta</h1>
          <p className="mt-1 text-sm text-slate-600">
            Información de sesión y accesos habilitados en el panel.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate('/staff/users/new')}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            <Icon name="person_add" className="text-lg" />
            Crear usuario
          </button>
          <button
            type="button"
            onClick={() => {
              logout()
              navigate('/login', { replace: true })
            }}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <Icon name="logout" className="text-lg" />
            Salir
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Usuario</div>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Icon name="badge" className="text-[20px]" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-slate-900">{userId ?? '—'}</div>
              <div className="truncate text-xs text-slate-600">ID de sesión (subject del JWT)</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Roles</div>
          <div className="mt-3 flex items-start gap-3">
            <Icon name="verified_user" className="text-xl text-slate-700" filled />
            <div>
              <div className="text-sm font-semibold text-slate-900">{roleLabel}</div>
              <div className="mt-0.5 text-xs text-slate-600">Accesos disponibles en el panel staff.</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Estado de sesión</div>
          <div className="mt-3 flex items-start gap-3">
            <Icon
              name={isTokenExpired ? 'error' : 'check_circle'}
              className={isTokenExpired ? 'text-xl text-rose-700' : 'text-xl text-emerald-700'}
              filled
            />
            <div>
              <div className="text-sm font-semibold text-slate-900">
                {isTokenExpired ? 'Token expirado' : 'Activa'}
              </div>
              <div className="mt-0.5 text-xs text-slate-600">
                Si expira, se cerrará la sesión automáticamente.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-slate-900">Siguiente paso</div>
            <p className="mt-1 text-sm text-slate-600">
              Puedes crear un usuario de cliente para probar el flujo de simulación.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/staff/users/new')}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Ir a crear usuario
          </button>
        </div>
      </div>
    </div>
  )
}

