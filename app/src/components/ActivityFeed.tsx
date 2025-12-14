type Activity = {
  id: number
  user: string
  action: string
  time: string
}

type ActivityFeedProps = {
  activities: Activity[]
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm" data-testid="activity-feed">
      <ul className="divide-y divide-slate-200 dark:divide-slate-700">
        {activities.map((activity) => (
          <li key={activity.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {activity.user[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900 dark:text-white">
                  <span className="font-medium">{activity.user}</span>{' '}
                  <span className="text-slate-600 dark:text-slate-400">{activity.action}</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
