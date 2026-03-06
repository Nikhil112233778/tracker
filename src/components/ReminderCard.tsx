'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Avatar } from './ui/Avatar'
import { formatDateTime } from '@/lib/utils'
import type { ReminderWithJob } from '@/lib/reminders'

interface ReminderCardProps {
  reminder: ReminderWithJob
}

export function ReminderCard({ reminder }: ReminderCardProps) {
  const router = useRouter()
  const [isActing, setIsActing] = useState(false)

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

  return (
    <Link href={`/jobs/${reminder.job_id}`}>
      <div className="card hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex gap-3 mb-3">
          <Avatar company={reminder.company} size="sm" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {reminder.note}
            </h3>
            <p className="text-sm text-gray-600 truncate">
              {reminder.company} · {reminder.hr_name}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-gray-500 font-mono">
            {formatDateTime(reminder.reminder_date)}
          </span>

          <div className="flex gap-2">
            <button
              onClick={handleSnooze}
              disabled={isActing}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 active:scale-95 transition-all disabled:opacity-50"
            >
              Snooze
            </button>
            <button
              onClick={handleDone}
              disabled={isActing}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-green-50 text-green-700 hover:bg-green-100 active:scale-95 transition-all disabled:opacity-50"
            >
              ✓ Done
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
