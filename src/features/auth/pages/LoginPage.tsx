import { Link, useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'

export function LoginPage() {
  const navigate = useNavigate()
  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="text-xl font-semibold tracking-tight text-white">Login</h1>
      <p className="mt-1 text-sm text-slate-300">Inicia sesión para acceder a las rutas protegidas.</p>
      <div className="mt-6">
        <LoginForm onSuccess={() => navigate('/dashboard', { replace: true })} />
      </div>
      <p className="mt-4 text-sm text-slate-300">
        ¿No tienes cuenta?{' '}
        <Link to="/register" className="text-indigo-300 hover:text-indigo-200">
          Crear cuenta
        </Link>
      </p>
    </div>
  )
}

