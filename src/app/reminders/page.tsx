import Link from 'next/link'
import { ReminderCard } from '@/components/ReminderCard'
import { EmptyState } from '@/components/EmptyState'
import { groupReminders, REMINDER_GROUP_COLORS, type ReminderGroup, type ReminderWithJob } from '@/lib/reminders'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getReminders() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/reminders`, {
      cache: 'no-store',
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
    <div className="min-h-screen bg-background pb-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background z-10 px-4 py-3 flex items-center border-b border-gray-100">
          <Link href="/">
            <button className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors">
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
          <h1 className="text-lg font-semibold ml-2">Reminders</h1>
          {hasReminders && (
            <span className="ml-auto text-sm text-gray-500">
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
    </div>
  )
}
