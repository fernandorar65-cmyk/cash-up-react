import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { httpClient } from '../../../shared/services/httpClient'
import { errorMessage } from '../../../shared/utils/errorMessage'
import { Icon } from '../../../shared/components/Icon'
import type { ClientMe, UpdateClientMe } from '../entities/client.types'

export function ClientProfilePage() {
  const queryClient = useQueryClient()
  const meQuery = useQuery({
    queryKey: ['client', 'me'],
    queryFn: async () => {
      const { data } = await httpClient.get<ClientMe>('/clients/me')
      return data
    },
  })

  const [draft, setDraft] = useState<UpdateClientMe | null>(null)

  const saveMutation = useMutation({
    mutationKey: ['client', 'me', 'patch'],
    mutationFn: async (body: UpdateClientMe) => {
      const { data } = await httpClient.patch<ClientMe>('/clients/me', body)
      return data
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(['client', 'me'], updated)
      setDraft(null)
    },
  })

  const me = meQuery.data
  const form = useMemo<UpdateClientMe>(() => {
    if (!me) return {}
    return (
      draft ?? {
        name: me.name,
        email: me.email,
        phone: me.phone ?? '',
        monthlyIncome: me.monthlyIncome ?? 0,
      }
    )
  }, [draft, me])

  const canSubmit = useMemo(() => {
    const nameOk = (form.name ?? '').trim().length >= 3
    const emailOk = (form.email ?? '').trim().includes('@')
    const incomeOk = form.monthlyIncome == null || (Number.isFinite(form.monthlyIncome) && form.monthlyIncome >= 0)
    return nameOk && emailOk && incomeOk && !saveMutation.isPending
  }, [form.email, form.monthlyIncome, form.name, saveMutation.isPending])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const body: UpdateClientMe = {
      name: (form.name ?? '').trim(),
      email: (form.email ?? '').trim(),
      phone: (form.phone ?? '').trim() || undefined,
      monthlyIncome: typeof form.monthlyIncome === 'number' ? form.monthlyIncome : undefined,
    }
    saveMutation.mutate(body)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Icon name="person" className="text-lg" />
              Mi perfil
            </div>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900">Datos del cliente</h1>
            <p className="mt-1 text-sm text-slate-600">Actualiza tu información para mejorar tu evaluación.</p>
          </div>
          <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 sm:block">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Score</div>
            <div className="mt-1 text-lg font-black text-slate-900">{me?.score ?? '—'}</div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <form onSubmit={onSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
          {meQuery.isLoading ? (
            <div className="text-sm text-slate-600">Cargando…</div>
          ) : meQuery.isError ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              {errorMessage(meQuery.error)}
            </div>
          ) : me ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 sm:col-span-2">
                  <span className="text-sm font-semibold text-slate-800">Nombre</span>
                  <input
                    className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    value={form.name ?? ''}
                    onChange={(e) => setDraft({ ...(form ?? {}), name: e.target.value })}
                    autoComplete="name"
                  />
                </label>

                <label className="grid gap-2 sm:col-span-2">
                  <span className="text-sm font-semibold text-slate-800">Email</span>
                  <input
                    className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    value={form.email ?? ''}
                    onChange={(e) => setDraft({ ...(form ?? {}), email: e.target.value })}
                    type="email"
                    autoComplete="email"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-800">Teléfono</span>
                  <input
                    className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    value={form.phone ?? ''}
                    onChange={(e) => setDraft({ ...(form ?? {}), phone: e.target.value })}
                    autoComplete="tel"
                    placeholder="+51…"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-800">Ingreso mensual</span>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                      S/
                    </span>
                    <input
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                      value={typeof form.monthlyIncome === 'number' ? String(form.monthlyIncome) : ''}
                      onChange={(e) => setDraft({ ...(form ?? {}), monthlyIncome: Number(e.target.value) })}
                      inputMode="decimal"
                      placeholder="0"
                    />
                  </div>
                </label>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-900 bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Icon name="save" className="text-lg" />
                  {saveMutation.isPending ? 'Guardando…' : 'Guardar cambios'}
                </button>
                <button
                  type="button"
                  onClick={() => setDraft(null)}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Descartar
                </button>
              </div>

              {saveMutation.isError ? (
                <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                  {errorMessage(saveMutation.error)}
                </div>
              ) : null}
              {saveMutation.isSuccess ? (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                  Perfil actualizado.
                </div>
              ) : null}
            </>
          ) : null}
        </form>

        <aside className="space-y-4 lg:col-span-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Resumen</div>
            <dl className="mt-3 grid gap-2 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-600">Cliente ID</dt>
                <dd className="font-mono text-slate-900">{me?.id ?? '—'}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-600">Documento</dt>
                <dd className="text-slate-900">
                  {(me?.documentType ?? '—') + ' ' + (me?.documentNumber ?? '')}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  )
}

