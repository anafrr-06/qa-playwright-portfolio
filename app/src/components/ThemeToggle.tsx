type ThemeToggleProps = {
  isDark: boolean
  onToggle: () => void
  collapsed?: boolean
}

export default function ThemeToggle({ isDark, onToggle, collapsed }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-lg transition-colors ${
        collapsed ? 'justify-center' : ''
      }`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      data-testid="theme-toggle"
      title={collapsed ? (isDark ? 'Light mode' : 'Dark mode') : undefined}
    >
      <span className="text-lg" aria-hidden="true">
        {isDark ? '☀️' : '🌙'}
      </span>
      {!collapsed && <span>{isDark ? 'Light mode' : 'Dark mode'}</span>}
    </button>
  )
}
