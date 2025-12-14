import { useState } from 'react'

type Project = {
  id: number
  name: string
  status: string
  progress: number
  owner: string
}

type DataTableProps = {
  data: Project[]
}

const statusStyles: Record<string, string> = {
  Active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
}

export default function DataTable({ data }: DataTableProps) {
  const [filter, setFilter] = useState('')
  const [sortField, setSortField] = useState<keyof Project>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (field: keyof Project) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredData = data
    .filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.owner.toLowerCase().includes(filter.toLowerCase()) ||
      item.status.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortField]
      const bVal = b[sortField]
      const modifier = sortDirection === 'asc' ? 1 : -1

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal) * modifier
      }
      return ((aVal as number) - (bVal as number)) * modifier
    })

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden" data-testid="data-table">
      {/* Search Filter */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <input
          type="search"
          placeholder="Search projects..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full max-w-xs px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          data-testid="table-search"
          aria-label="Search projects"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full" role="grid">
          <thead className="bg-slate-50 dark:bg-slate-700/50">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => handleSort('name')}
                aria-sort={sortField === 'name' ? sortDirection === 'asc' ? 'ascending' : 'descending' : 'none'}
              >
                <div className="flex items-center gap-1">
                  Project
                  {sortField === 'name' && (
                    <span aria-hidden="true">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => handleSort('status')}
                aria-sort={sortField === 'status' ? sortDirection === 'asc' ? 'ascending' : 'descending' : 'none'}
              >
                <div className="flex items-center gap-1">
                  Status
                  {sortField === 'status' && (
                    <span aria-hidden="true">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => handleSort('progress')}
                aria-sort={sortField === 'progress' ? sortDirection === 'asc' ? 'ascending' : 'descending' : 'none'}
              >
                <div className="flex items-center gap-1">
                  Progress
                  {sortField === 'progress' && (
                    <span aria-hidden="true">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => handleSort('owner')}
                aria-sort={sortField === 'owner' ? sortDirection === 'asc' ? 'ascending' : 'descending' : 'none'}
              >
                <div className="flex items-center gap-1">
                  Owner
                  {sortField === 'owner' && (
                    <span aria-hidden="true">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {filteredData.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                data-testid="table-row"
              >
                <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">
                  {item.name}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusStyles[item.status] || ''}`}
                    data-testid="status-badge"
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${item.progress}%` }}
                        role="progressbar"
                        aria-valuenow={item.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{item.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                  {item.owner}
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                  No projects found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
