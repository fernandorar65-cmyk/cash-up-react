import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { httpClient } from '../../../shared/services/httpClient'
import { errorMessage } from '../../../shared/utils/errorMessage'
import { Icon } from '../../../shared/components/Icon'
import type { PendingCreditRequest } from '../entities/creditRequest.types'

export function PendingCreditRequestsPage() {
  const pendingQuery = useQuery({
    queryKey: ['credit-requests', 'pending'],
    queryFn: async () => {
      const { data } = await httpClient.get<PendingCreditRequest[]>('/credit-requests/pending')
      return data
    },
  })

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Icon name="pending_actions" className="text-lg" />
              Créditos pendientes
            </div>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
              Bandeja de solicitudes
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Lista de solicitudes en estado <span className="font-semibold">PENDING</span>.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total</div>
            <div className="mt-1 text-xl font-black text-slate-900">
              {pendingQuery.data?.length ?? 0}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {pendingQuery.isLoading ? (
          <div className="text-sm text-slate-600">Cargando…</div>
        ) : pendingQuery.isError ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {errorMessage(pendingQuery.error)}
          </div>
        ) : pendingQuery.data?.length ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Cliente</th>
                  <th className="px-4 py-3">Monto</th>
                  <th className="px-4 py-3">Plazo</th>
                  <th className="px-4 py-3">Propósito</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Creado</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {pendingQuery.data.map((it) => (
                  <tr key={it.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs text-slate-700">{it.id}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-700">{it.clientId}</td>
                    <td className="px-4 py-3 text-slate-900 font-semibold">
                      {it.currency ?? '—'} {it.requestedAmount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{it.termMonths} meses</td>
                    <td className="px-4 py-3 text-slate-700">{it.purpose ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
                        {it.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {it.createdAt ? new Date(it.createdAt).toLocaleString() : '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`/staff/credit-requests/review/${it.id}`}
                        state={{
                          clientId: it.clientId,
                          requestedAmount: it.requestedAmount,
                          termMonths: it.termMonths,
                          currency: it.currency,
                          purpose: it.purpose,
                        }}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                      >
                        <Icon name="account_balance_wallet" className="text-[18px]" />
                        Detalle del cliente
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
            No hay solicitudes pendientes.
          </div>
        )}
      </div>
    </div>
  )
}

