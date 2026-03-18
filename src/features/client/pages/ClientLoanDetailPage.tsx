import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { httpClient } from '../../../shared/services/httpClient'
import { errorMessage } from '../../../shared/utils/errorMessage'
import { Icon } from '../../../shared/components/Icon'

type Loan = {
  id: string
  status?: string
  currency?: string
  principal?: number
  interestRate?: number
  interestType?: string
  termMonths?: number
  createdAt?: string
  [k: string]: unknown
}

type Installment = {
  id: string
  number?: number
  dueDate?: string
  status?: 'PENDING' | 'PAID' | 'OVERDUE' | string
  amount?: number
  [k: string]: unknown
}

export function ClientLoanDetailPage() {
  const { loanId } = useParams<{ loanId: string }>()

  const loanQuery = useQuery({
    queryKey: ['loans', loanId],
    enabled: Boolean(loanId),
    queryFn: async () => {
      const { data } = await httpClient.get<Loan>(`/loans/${loanId}`)
      return data
    },
  })

  const installmentsQuery = useQuery({
    queryKey: ['loans', loanId, 'installments'],
    enabled: Boolean(loanId),
    queryFn: async () => {
      const { data } = await httpClient.get<Installment[]>(`/loans/${loanId}/installments`)
      return data
    },
  })

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Icon name="calendar_month" className="text-lg" />
              Cronograma
            </div>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900">Detalle del préstamo</h1>
            <p className="mt-1 text-sm text-slate-600">Cuotas y estado de tu crédito.</p>
          </div>
          <Link
            to="/client/loans"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            Volver
          </Link>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          {loanQuery.isLoading ? (
            <div className="text-sm text-slate-600">Cargando…</div>
          ) : loanQuery.isError ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              {errorMessage(loanQuery.error)}
            </div>
          ) : loanQuery.data ? (
            <dl className="grid gap-3 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Loan ID</dt>
                <dd className="mt-1 font-mono text-xs text-slate-900">{loanQuery.data.id}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-600">Estado</dt>
                <dd className="font-semibold text-slate-900">{loanQuery.data.status ?? '—'}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-600">Monto</dt>
                <dd className="font-semibold text-slate-900">
                  {loanQuery.data.currency ?? 'PEN'} {loanQuery.data.principal ?? '—'}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-600">Plazo</dt>
                <dd className="font-semibold text-slate-900">{loanQuery.data.termMonths ?? '—'} meses</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-600">Tasa</dt>
                <dd className="font-semibold text-slate-900">
                  {loanQuery.data.interestRate != null ? `${loanQuery.data.interestRate}%` : '—'}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-600">Tipo</dt>
                <dd className="font-semibold text-slate-900">{loanQuery.data.interestType ?? '—'}</dd>
              </div>
            </dl>
          ) : null}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-slate-900">Cuotas</div>
            <div className="text-xs text-slate-500">
              {installmentsQuery.data?.length ?? 0} items
            </div>
          </div>

          <div className="mt-4">
            {installmentsQuery.isLoading ? (
              <div className="text-sm text-slate-600">Cargando cronograma…</div>
            ) : installmentsQuery.isError ? (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                {errorMessage(installmentsQuery.error)}
              </div>
            ) : installmentsQuery.data && installmentsQuery.data.length ? (
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-4 py-3">N°</th>
                      <th className="px-4 py-3">Vence</th>
                      <th className="px-4 py-3">Estado</th>
                      <th className="px-4 py-3 text-right">Monto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {installmentsQuery.data.map((it) => (
                      <tr key={it.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-slate-700">{it.number ?? '—'}</td>
                        <td className="px-4 py-3 text-slate-700">{it.dueDate ?? '—'}</td>
                        <td className="px-4 py-3">
                          <span
                            className={
                              it.status === 'PAID'
                                ? 'inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800'
                                : it.status === 'OVERDUE'
                                  ? 'inline-flex rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-800'
                                  : 'inline-flex rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700'
                            }
                          >
                            {it.status ?? '—'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-slate-900">
                          {it.amount ?? '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
                No hay cuotas para mostrar.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

