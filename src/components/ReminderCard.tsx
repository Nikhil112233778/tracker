'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Avatar } from './ui/Avatar'
import { ConfirmDialog } from './ConfirmDialog'
import { formatDateTime } from '@/lib/utils'
import type { ReminderWithJob } from '@/lib/reminders'

interface ReminderCardProps {
  reminder: ReminderWithJob
}

export function ReminderCard({ reminder }: ReminderCardProps) {
  const router = useRouter()
  const [isActing, setIsActing] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDone = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsActing(true)

    try {
      const res = await fetch(`/api/reminders/${reminder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_done: true }),
      })

      if (res.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error('Error marking reminder as done:', error)
      setIsActing(false)
    }
  }

  const handleSnooze = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Snooze for 2 hours
    const snoozeDate = new Date(Date.now() + 2 * 60 * 60 * 1000)

    setIsActing(true)

    try {
      const res = await fetch(`/api/reminders/${reminder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reminder_date: snoozeDate.toISOString(),
          snoozed_to: snoozeDate.toISOString(),
        }),
      })

      if (res.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error('Error snoozing reminder:', error)
      setIsActing(false)
    }
  }

  const handleDelete = async () => {
    setIsActing(true)

    try {
      const res = await fetch(`/api/reminders/${reminder.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.refresh()
      } else {
        alert('Failed to delete reminder')
      }
    } catch (error) {
      alert('Error deleting reminder')
    } finally {
      setIsActing(false)
    }
  }

  return (
    <>
      <div className="card hover:bg-surface-hover transition-colors relative group">
        <Link href={`/jobs/${reminder.job_id}`} className="absolute inset-0 z-0" />

        <div className="flex gap-3 mb-3 relative z-10">
          <Avatar company={reminder.company} size="sm" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary truncate">
              {reminder.note}
            </h3>
            <p className="text-sm text-text-secondary truncate">
              {reminder.company} · {reminder.hr_name}
            </p>
          </div>
          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setShowDeleteDialog(true)
            }}
            disabled={isActing}
            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 rounded-lg transition-all relative z-20"
            title="Delete reminder"
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

        <div className="flex items-center justify-between gap-3 relative z-10">
          <span className="text-xs text-text-muted font-mono">
            {formatDateTime(reminder.reminder_date)}
          </span>

          <div className="flex gap-2">
            <button
              onClick={handleSnooze}
              disabled={isActing}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 active:scale-95 transition-all disabled:opacity-50"
            >
              Snooze
            </button>
            <button
              onClick={handleDone}
              disabled={isActing}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 active:scale-95 transition-all disabled:opacity-50"
            >
              ✓ Done
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Reminder?"
        message="Are you sure you want to delete this reminder?"
        confirmText="Delete"
        confirmButtonClass="btn-danger"
      />
    </>
  )
}
