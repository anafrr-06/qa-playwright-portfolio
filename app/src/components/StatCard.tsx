type StatCardProps = {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
}

export default function StatCard({ label, value, change, trend }: StatCardProps) {
  const isPositive = trend === 'up'

  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm"
      data-testid="stat-card"
    >
      <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1" data-testid="stat-value">
        {value}
      </p>
      <div className="flex items-center gap-1 mt-2">
        <span
          className={`text-sm font-medium ${
            isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}
          data-testid="stat-change"
        >
          {change}
        </span>
        <span className="text-sm text-slate-500 dark:text-slate-400">vs last month</span>
      </div>
    </div>
  )
}
