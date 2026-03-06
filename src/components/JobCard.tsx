'use client'

import Link from 'next/link'
import { Avatar } from './ui/Avatar'
import { StatusPill } from './ui/StatusPill'
import { formatRelativeTime } from '@/lib/utils'
import type { JobWithLastConversation } from '@/lib/types'

interface JobCardProps {
  job: JobWithLastConversation
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="card hover:shadow-lg transition-shadow cursor-pointer mb-3">
        <div className="flex gap-3">
          {/* Company Avatar */}
          <Avatar company={job.company} size="sm" />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                  {job.company}
                </h3>
                <p className="text-sm text-gray-600 truncate">{job.role}</p>
              </div>
              <StatusPill status={job.status} />
            </div>

            {/* Last conversation preview */}
            {job.lastConversation && (
              <p className="text-sm text-gray-500 truncate mt-2">
                {job.lastConversation.summary}
              </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between mt-3 text-xs">
              <span className="text-gray-500">{job.hr_name}</span>
              <span className="text-gray-400 font-mono">
                {formatRelativeTime(job.updated_at)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
