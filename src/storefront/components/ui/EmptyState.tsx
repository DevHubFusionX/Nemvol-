import { Link } from 'react-router-dom'

interface Props {
  title?: string
  message?: string
  action?: { label: string; href: string }
}

export default function EmptyState({
  title = 'Nothing here yet',
  message = 'Try adjusting your filters or check back later.',
  action,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <div className="w-14 h-14 bg-stone-100 flex items-center justify-center">
        <span className="text-2xl">🛍️</span>
      </div>
      <div>
        <p className="text-sm font-medium text-stone-700">{title}</p>
        <p className="text-xs text-stone-400 mt-1">{message}</p>
      </div>
      {action && (
        <Link to={action.href}
          className="mt-2 border border-stone-200 text-stone-600 text-xs tracking-[0.15em] uppercase px-6 py-2.5 hover:border-stone-400 transition-colors">
          {action.label}
        </Link>
      )}
    </div>
  )
}
