import Link from 'next/link'
import { ReminderCard } from '@/components/ReminderCard'
import { EmptyState } from '@/components/EmptyState'
import { BottomNav } from '@/components/BottomNav'
import { groupReminders, REMINDER_GROUP_COLORS, type ReminderGroup, type ReminderWithJob } from '@/lib/reminders'
import { headers } from 'next/headers'

export const revalidate = 10 // Revalidate every 10 seconds

async function getReminders() {
  try {
    const headersList = await headers()
    const host = headersList.get('host') || 'localhost:3000'
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    const baseUrl = `${protocol}://${host}`

    const res = await fetch(`${baseUrl}/api/reminders`, {
      next: { revalidate: 10 },
    })

    if (!res.ok) return []

    const data = await res.json()
    return data.success ? data.data : []
  } catch (error) {
    console.error('Error fetching reminders:', error)
    return []
  }
}

export default async function RemindersPage() {
  const reminders = await getReminders()
  const grouped = groupReminders(reminders)

  const hasReminders = reminders.length > 0
  const groups: ReminderGroup[] = ['Overdue', 'Today', 'Tomorrow', 'This Week', 'Later']

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background z-10 px-4 py-3 flex items-center border-b border-border">
          <Link href="/">
            <button className="p-2 -ml-2 hover:bg-surface-hover rounded-lg transition-colors text-text-primary">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </Link>
          <h1 className="text-lg font-semibold ml-2 text-text-primary">Reminders</h1>
          {hasReminders && (
            <span className="ml-auto text-sm text-text-secondary">
              {reminders.length} reminder{reminders.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="px-4 pt-4">
          {hasReminders ? (
            <div className="space-y-6">
              {groups.map((groupName) => {
                const groupReminders = grouped[groupName]
                if (groupReminders.length === 0) return null

                const colors = REMINDER_GROUP_COLORS[groupName]

                return (
                  <div key={groupName}>
                    {/* Group Header */}
                    <div
                      className="text-xs font-semibold uppercase tracking-wide mb-3 px-3 py-1.5 rounded-full inline-block"
                      style={{ color: colors.text, backgroundColor: colors.bg }}
                    >
                      {groupName} ({groupReminders.length})
                    </div>

                    {/* Group Reminders */}
                    <div className="space-y-3">
                      {groupReminders.map((reminder) => (
                        <ReminderCard key={reminder.id} reminder={reminder} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <EmptyState
              icon="✓"
              title="All clear"
              description="No reminders set. Add one from any job."
            />
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav reminderCount={reminders.length} />
    </div>
  )
}
