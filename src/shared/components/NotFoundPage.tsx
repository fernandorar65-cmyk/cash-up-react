import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-semibold text-white">404</h1>
      <p className="text-sm text-slate-300">No encontramos esta página.</p>
      <Link to="/" className="text-sm text-indigo-300 hover:text-indigo-200">
        Ir al inicio
      </Link>
    </div>
  )
}

