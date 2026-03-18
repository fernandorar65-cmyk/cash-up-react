import { Link, useLocation } from 'react-router-dom'
import { Icon } from './Icon'

export function ForbiddenPage() {
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from

  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
          <Icon name="lock" className="text-[22px]" />
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-black tracking-tight text-slate-900">Acceso denegado</h1>
          <p className="mt-1 text-sm text-slate-600">
            Esta sección es solo para usuarios con rol <span className="font-semibold text-slate-900">ANALYST</span>.
          </p>
          {from ? (
            <p className="mt-2 text-xs text-slate-500">
              Ruta solicitada: <span className="font-mono">{from}</span>
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Ir al inicio
            </Link>
            <Link
              to="/login"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Cambiar de cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

