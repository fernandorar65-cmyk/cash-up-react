import type { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function TextField({ label, className = '', ...props }: Props) {
  return (
    <label className="grid gap-2">
      <span className="text-sm text-slate-200">{label}</span>
      <input
        className={`h-10 rounded-lg bg-slate-900 px-3 text-slate-100 ring-1 ring-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
        {...props}
      />
    </label>
  )
}

