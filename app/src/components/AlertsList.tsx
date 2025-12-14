type Alert = {
  id: number
  type: 'info' | 'warning' | 'error'
  message: string
  time: string
}

type AlertsListProps = {
  alerts: Alert[]
}

const alertStyles = {
  info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
  warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300',
  error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300',
}

const alertIcons = {
  info: 'ℹ️',
  warning: '⚠️',
  error: '❌',
}

export default function AlertsList({ alerts }: AlertsListProps) {
  return (
    <div className="space-y-3" data-testid="alerts-list" role="region" aria-label="System alerts">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg border ${alertStyles[alert.type]}`}
          role="alert"
          data-testid={`alert-${alert.type}`}
        >
          <div className="flex items-start gap-2">
            <span aria-hidden="true">{alertIcons[alert.type]}</span>
            <div className="flex-1">
              <p className="text-sm font-medium">{alert.message}</p>
              <p className="text-xs opacity-75 mt-1">{alert.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
