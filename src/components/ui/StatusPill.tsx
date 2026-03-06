import { STATUS_CONFIG, type JobStatus } from '@/lib/types'

interface StatusPillProps {
  status: JobStatus
}

export function StatusPill({ status }: StatusPillProps) {
  const config = STATUS_CONFIG[status]

  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold font-mono uppercase tracking-wide border"
      style={{
        color: config.color,
        backgroundColor: config.bg,
        borderColor: `${config.color}30`,
      }}
    >
      {status}
    </span>
  )
}
