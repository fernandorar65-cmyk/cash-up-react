import type { ReactNode } from 'react'

export function Alert({
  title = 'Error',
  children,
}: {
  title?: string
  children: ReactNode
}) {
  return (
    <div className="rounded-xl border border-rose-900/60 bg-rose-950/40 p-4 text-rose-100">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-sm opacity-90">{children}</div>
    </div>
  )
}

