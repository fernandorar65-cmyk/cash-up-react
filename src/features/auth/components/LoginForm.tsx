import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { errorMessage } from '../../../shared/utils/errorMessage'
import { Icon } from '../../../shared/components/Icon'
import { useAuth } from '../hooks/useAuth'

export function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const [loading, setLoading] = useState(false)

  const canSubmit = useMemo(() => email.trim().length > 3 && password.length >= 3, [email, password])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login({ email: email.trim(), password })
      onSuccess()
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold leading-normal text-slate-800">Email</label>
          <div className="relative">
            <Icon
              name="mail"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400"
            />
            <input
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              placeholder="tu@email.com"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold leading-normal text-slate-800">Contraseña</label>
            <a className="text-xs font-semibold text-slate-600 hover:text-slate-900 hover:underline" href="#">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div className="relative">
            <Icon
              name="lock"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400"
            />
            <input
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-12 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              placeholder="••••••••"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <label className="group flex cursor-pointer items-center gap-3">
          <input
            className="h-5 w-5 rounded border-slate-300 bg-white text-primary transition-colors focus:ring-0 focus:ring-offset-0"
            type="checkbox"
          />
          <span className="text-sm font-medium text-slate-700 transition-colors group-hover:text-slate-900">
            Recordar este dispositivo
          </span>
        </label>
        <span className="text-sm text-slate-600">
          ¿No tienes cuenta?{' '}
          <Link
            to="/register"
            className="font-semibold text-slate-900 underline underline-offset-4 hover:text-black"
          >
            Regístrate
          </Link>
        </span>
      </div>

      <button
        className="h-12 w-full rounded-xl bg-slate-900 text-base font-bold text-white shadow-md shadow-black/10 transition hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={!canSubmit || loading}
        type="submit"
      >
        {loading ? 'Ingresando…' : 'Ingresar'}
      </button>

      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          {errorMessage(error)}
        </div>
      ) : null}
    </form>
  )
}

