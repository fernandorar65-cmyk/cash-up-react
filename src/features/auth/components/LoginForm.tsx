import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '../../../shared/ui/Button'
import { TextField } from '../../../shared/ui/TextField'
import { Alert } from '../../../shared/ui/Alert'
import { errorMessage } from '../../../shared/utils/errorMessage'
import { useAuth } from '../hooks/useAuth'

export function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
    <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl bg-slate-950 p-6 ring-1 ring-slate-800">
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      <TextField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        autoComplete="current-password"
      />
      <Button type="submit" disabled={!canSubmit || loading}>
        {loading ? 'Entrando…' : 'Entrar'}
      </Button>
      {error ? <Alert>{errorMessage(error)}</Alert> : null}
    </form>
  )
}

