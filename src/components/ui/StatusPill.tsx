import { STATUS_CONFIG, type JobStatus } from '@/lib/types'

interface StatusPillProps {
  status: JobStatus
}

export function StatusPill({ status }: StatusPillProps) {
  const config = STATUS_CONFIG[status]

  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-mono"
      style={{
        color: config.color,
        backgroundColor: config.bg,
      }}
    >
      {status}
    </span>
  )
}
