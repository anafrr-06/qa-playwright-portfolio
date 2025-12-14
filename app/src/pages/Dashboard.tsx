import StatCard from '../components/StatCard'
import ActivityFeed from '../components/ActivityFeed'
import AlertsList from '../components/AlertsList'
import DataTable from '../components/DataTable'

const stats = [
  { label: 'Total Users', value: '2,847', change: '+12%', trend: 'up' as const },
  { label: 'Active Sessions', value: '1,423', change: '+8%', trend: 'up' as const },
  { label: 'Conversion Rate', value: '3.24%', change: '-2%', trend: 'down' as const },
  { label: 'Avg. Response Time', value: '245ms', change: '-18%', trend: 'up' as const },
]

const activities = [
  { id: 1, user: 'John Doe', action: 'created a new project', time: '2 minutes ago' },
  { id: 2, user: 'Jane Smith', action: 'updated settings', time: '15 minutes ago' },
  { id: 3, user: 'Mike Johnson', action: 'deployed to production', time: '1 hour ago' },
  { id: 4, user: 'Sarah Wilson', action: 'invited a team member', time: '3 hours ago' },
  { id: 5, user: 'Tom Brown', action: 'completed onboarding', time: '5 hours ago' },
]

const alerts = [
  { id: 1, type: 'warning' as const, message: 'High memory usage detected on server-01', time: '5 min ago' },
  { id: 2, type: 'error' as const, message: 'Failed to connect to database replica', time: '12 min ago' },
  { id: 3, type: 'info' as const, message: 'Scheduled maintenance in 2 hours', time: '1 hour ago' },
]

const tableData = [
  { id: 1, name: 'Project Alpha', status: 'Active', progress: 75, owner: 'John Doe' },
  { id: 2, name: 'Project Beta', status: 'Pending', progress: 45, owner: 'Jane Smith' },
  { id: 3, name: 'Project Gamma', status: 'Active', progress: 90, owner: 'Mike Johnson' },
  { id: 4, name: 'Project Delta', status: 'Completed', progress: 100, owner: 'Sarah Wilson' },
  { id: 5, name: 'Project Epsilon', status: 'Active', progress: 30, owner: 'Tom Brown' },
]

export default function Dashboard() {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Welcome back. Here's what's happening today.
        </p>
      </header>

      {/* Stats Grid */}
      <section aria-labelledby="stats-heading" className="mb-8">
        <h2 id="stats-heading" className="sr-only">Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="stats-grid">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <section aria-labelledby="activity-heading" className="lg:col-span-2">
          <h2 id="activity-heading" className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <ActivityFeed activities={activities} />
        </section>

        {/* Alerts */}
        <section aria-labelledby="alerts-heading">
          <h2 id="alerts-heading" className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            System Alerts
          </h2>
          <AlertsList alerts={alerts} />
        </section>
      </div>

      {/* Data Table */}
      <section aria-labelledby="projects-heading" className="mt-8">
        <h2 id="projects-heading" className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Projects Overview
        </h2>
        <DataTable data={tableData} />
      </section>
    </div>
  )
}
