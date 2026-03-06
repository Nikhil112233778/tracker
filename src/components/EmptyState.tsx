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
      <h2 className="text-xl font-semibold mb-2 text-text-primary">{title}</h2>
      <p className="text-text-secondary mb-6">{description}</p>
      {action}
    </div>
  )
}
