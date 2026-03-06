'use client'

import { useEffect, useState } from 'react'
import { useNotifications } from './useNotifications'

interface DueReminder {
  id: number
  note: string
  company: string
  hr_name: string
  role: string
  reminder_date: string
  job_id: number
}

export function useReminderNotifications(enabled = true) {
  const [dueReminders, setDueReminders] = useState<DueReminder[]>([])
  const [notifiedIds, setNotifiedIds] = useState<Set<number>>(new Set())
  const { permission, showNotification } = useNotifications()

  useEffect(() => {
    if (!enabled) return

    const checkReminders = async () => {
      try {
        const res = await fetch('/api/reminders?due=true')
        const data = await res.json()

        if (data.success && Array.isArray(data.data)) {
          const reminders = data.data as DueReminder[]
          setDueReminders(reminders)

          // Show notifications for new due reminders
          if (permission === 'granted') {
            reminders.forEach((reminder) => {
              if (!notifiedIds.has(reminder.id)) {
                showNotification(`Reminder: ${reminder.note}`, {
                  body: `${reminder.company} - ${reminder.hr_name}\n${reminder.role}`,
                  tag: `reminder-${reminder.id}`,
                  requireInteraction: true,
                  data: {
                    url: `/jobs/${reminder.job_id}`,
                  },
                })

                // Mark as notified
                setNotifiedIds((prev) => new Set(prev).add(reminder.id))
              }
            })
          }
        }
      } catch (error) {
        console.error('Error checking reminders:', error)
      }
    }

    // Check immediately
    checkReminders()

    // Check every 60 seconds
    const interval = setInterval(checkReminders, 60000)

    return () => clearInterval(interval)
  }, [enabled, permission, showNotification, notifiedIds])

  return {
    dueReminders,
    count: dueReminders.length,
  }
}
