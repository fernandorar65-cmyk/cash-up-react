import type { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
}

const base =
  'inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<NonNullable<Props['variant']>, string> = {
  primary: 'bg-indigo-500 hover:bg-indigo-400 text-white',
  secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-100 ring-1 ring-slate-700',
  ghost: 'bg-transparent hover:bg-slate-900 text-slate-100 ring-1 ring-slate-800',
  danger: 'bg-rose-600 hover:bg-rose-500 text-white',
}

const sizes: Record<NonNullable<Props['size']>, string> = {
  sm: 'h-9',
  md: 'h-10',
}

export function Button({ className = '', variant = 'primary', size = 'md', ...props }: Props) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
  )
}

