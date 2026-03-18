import { Icon } from "../../../shared/components/Icon"

function MetricCard({
    title,
    value,
    sub,
    icon,
    accentClass,
    progressPct,
}: {
    title: string
    value: string
    sub?: string
    icon: string
    accentClass: string
    progressPct?: number
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium uppercase tracking-wider text-slate-500">{title}</p>
                <Icon name={icon} className={accentClass} />
            </div>
            <div className="flex items-end gap-3">
                <p className="text-3xl font-bold leading-none text-slate-900">{value}</p>
                {sub ? <p className="flex items-center text-sm font-medium text-emerald-600">{sub}</p> : null}
            </div>
            {typeof progressPct === 'number' ? (
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full bg-orange-500" style={{ width: `${progressPct}%` }} />
                </div>
            ) : null}
        </div>
    )
}

export default MetricCard;