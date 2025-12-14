import { useEffect } from 'react'

export type ToastType = 'success' | 'error' | 'info'

type ToastProps = {
  message: string
  type: ToastType
  isVisible: boolean
  onClose: () => void
  duration?: number
}

const toastStyles: Record<ToastType, string> = {
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-blue-600 text-white',
}

const toastIcons: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
}

export default function Toast({
  message,
  type,
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  return (
    <div
      className="fixed bottom-4 right-4 z-50 animate-slide-up"
      role="status"
      aria-live="polite"
      data-testid="toast"
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${toastStyles[type]}`}
        data-testid={`toast-${type}`}
      >
        <span className="text-lg" aria-hidden="true">
          {toastIcons[type]}
        </span>
        <p className="font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-2 hover:opacity-80 transition-opacity"
          aria-label="Close notification"
          data-testid="toast-close"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
