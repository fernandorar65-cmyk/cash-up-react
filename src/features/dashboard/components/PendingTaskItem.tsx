import { Icon } from "../../../shared/components/Icon"

function PendingTaskItem({
    color,
    icon,
    title,
    desc,
    when,
  }: {
    color: 'orange' | 'blue' | 'emerald' | 'slate'
    icon: string
    title: string
    desc: string
    when: string
  }) {
    const colorMap: Record<typeof color, string> = {
      orange: 'bg-orange-100 text-orange-700',
      blue: 'bg-blue-100 text-blue-700',
      emerald: 'bg-emerald-100 text-emerald-700',
      slate: 'bg-slate-100 text-slate-700',
    }
    return (
      <div className="flex items-start gap-4 rounded-xl border border-transparent p-3 transition-colors hover:border-slate-200 hover:bg-slate-50">
        <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${colorMap[color]}`}>
          <Icon name={icon} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">{title}</p>
          <p className="text-xs text-slate-600">{desc}</p>
        </div>
        <span className="text-[10px] font-bold uppercase text-slate-400">{when}</span>
      </div>
    )
  }

export default PendingTaskItem;