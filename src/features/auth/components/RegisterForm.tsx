import { useState } from 'react'
import type { FormEvent } from 'react'
import { errorMessage } from '../../../shared/utils/errorMessage'
import { Icon } from '../../../shared/components/Icon'
import { useAuth } from '../hooks/useAuth'

export function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const [loading, setLoading] = useState(false)

  const canSubmit = name.trim().length >= 3 && email.trim().length > 3 && password.length >= 6

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await register({ name: name.trim(), email: email.trim(), password })
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
          <label className="text-sm font-semibold leading-normal text-slate-800">Nombre</label>
          <div className="relative">
            <Icon name="person" className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
            <input
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              placeholder="Ej. Fernando Pérez"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              autoComplete="name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold leading-normal text-slate-800">Email</label>
          <div className="relative">
            <Icon name="mail" className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
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
          <label className="text-sm font-semibold leading-normal text-slate-800">Contraseña</label>
          <div className="relative">
            <Icon name="lock" className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
            <input
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-12 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              placeholder="mínimo 6 caracteres"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
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

      <button
        className="h-12 w-full rounded-xl bg-slate-900 text-base font-bold text-white shadow-md shadow-black/10 transition hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={!canSubmit || loading}
        type="submit"
      >
        {loading ? 'Creando…' : 'Crear cuenta'}
      </button>

      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          {errorMessage(error)}
        </div>
      ) : null}

      <p className="text-xs leading-relaxed text-slate-500">
        Al crear tu cuenta aceptas los términos internos y políticas de acceso de datos para esta simulación.
      </p>
    </form>
  )
}

