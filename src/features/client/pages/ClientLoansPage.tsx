import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { httpClient } from '../../../shared/services/httpClient'
import { errorMessage } from '../../../shared/utils/errorMessage'
import { Icon } from '../../../shared/components/Icon'

type Loan = {
  id: string
  status?: string
  currency?: string
  principal?: number
  interestRate?: number
  termMonths?: number
  createdAt?: string
  [k: string]: unknown
}

export function ClientLoansPage() {
  const loansQuery = useQuery({
    queryKey: ['loans', 'my'],
    queryFn: async () => {
      const { data } = await httpClient.get<Loan[]>('/loans/my')
      return data
    },
  })

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <Icon name="receipt_long" className="text-lg" />
          Mis créditos
        </div>
        <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900">Préstamos</h1>
        <p className="mt-1 text-sm text-slate-600">Lista de tus préstamos y acceso al cronograma de cuotas.</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {loansQuery.isLoading ? (
          <div className="text-sm text-slate-600">Cargando…</div>
        ) : loansQuery.isError ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {errorMessage(loansQuery.error)}
          </div>
        ) : loansQuery.data && loansQuery.data.length ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Monto</th>
                  <th className="px-4 py-3">Plazo</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loansQuery.data.map((loan) => (
                  <tr key={loan.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs text-slate-700">{loan.id}</td>
                    <td className="px-4 py-3 text-slate-700">{loan.status ?? '—'}</td>
                    <td className="px-4 py-3 text-slate-900">
                      {loan.currency ?? 'PEN'} {loan.principal ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{loan.termMonths ?? '—'} meses</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`/client/loans/${loan.id}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                      >
                        <Icon name="calendar_month" className="text-[18px]" />
                        Ver cronograma
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
            Aún no tienes préstamos. Cuando se apruebe una solicitud, aparecerá aquí.
          </div>
        )}
      </div>
    </div>
  )
}

