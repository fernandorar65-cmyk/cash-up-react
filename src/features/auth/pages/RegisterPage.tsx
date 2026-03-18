import { Link, useNavigate } from 'react-router-dom'
import { RegisterForm } from '../components/RegisterForm'

export function RegisterPage() {
  const navigate = useNavigate()
  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="text-xl font-semibold tracking-tight text-white">Registro</h1>
      <p className="mt-1 text-sm text-slate-300">Crea una cuenta para probar el flujo de auth.</p>
      <div className="mt-6">
        <RegisterForm onSuccess={() => navigate('/login', { replace: true })} />
      </div>
      <p className="mt-4 text-sm text-slate-300">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-indigo-300 hover:text-indigo-200">
          Ir a login
        </Link>
      </p>
    </div>
  )
}

