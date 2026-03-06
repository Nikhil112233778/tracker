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
    <div className="card text-center py-16">
      <div className="text-6xl mb-6 opacity-80">{icon}</div>
      <h2 className="text-[17px] font-semibold mb-2 text-text-primary tracking-tight">
        {title}
      </h2>
      <p className="text-[13px] text-text-muted mb-8 leading-relaxed">{description}</p>
      {action}
    </div>
  )
}
