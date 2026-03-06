'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Avatar } from './ui/Avatar'
import { StatusPill } from './ui/StatusPill'
import { ConfirmDialog } from './ConfirmDialog'
import { formatRelativeTime } from '@/lib/utils'
import type { JobWithLastConversation } from '@/lib/types'

interface JobCardProps {
  job: JobWithLastConversation
}

export function JobCard({ job }: JobCardProps) {
  const router = useRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.refresh()
      } else {
        alert('Failed to delete job')
      }
    } catch (error) {
      alert('Error deleting job')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <div className="card hover:bg-surface-hover transition-colors mb-3 relative group">
        <Link href={`/jobs/${job.id}`} className="absolute inset-0 z-0" />

        <div className="flex gap-3 relative z-10">
          {/* Company Avatar */}
          <Avatar company={job.company} size="sm" />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-text-primary truncate">
                  {job.company}
                </h3>
                <p className="text-sm text-text-secondary truncate">{job.role}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusPill status={job.status} />
                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setShowDeleteDialog(true)
                  }}
                  disabled={isDeleting}
                  className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 rounded-lg transition-all relative z-20"
                  title="Delete job"
                >
                  <svg
                    className="w-4 h-4 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Last conversation preview */}
            {job.lastConversation && (
              <p className="text-sm text-text-muted truncate mt-2">
                {job.lastConversation.summary}
              </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between mt-3 text-xs">
              <span className="text-text-secondary">{job.hr_name}</span>
              <span className="text-text-muted font-mono">
                {formatRelativeTime(job.updated_at)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Job?"
        message={`Are you sure you want to delete ${job.company}? This will also delete all conversations and reminders.`}
        confirmText="Delete"
        confirmButtonClass="btn-danger"
      />
    </>
  )
}
