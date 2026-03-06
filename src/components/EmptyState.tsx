interface EmptyStateProps {
  title: string
  description: string
  icon?: string
  action?: React.ReactNode
}

export function EmptyState({
  title,
  description,
  icon = '📋',
  action,
}: EmptyStateProps) {
  return (
    <div className="card text-center py-12">
      <div className="text-5xl mb-4">{icon}</div>
      <h2 className="text-xl font-semibold mb-2 text-gray-900">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      {action}
    </div>
  )
}
