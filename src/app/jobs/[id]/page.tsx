import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Avatar } from '@/components/ui/Avatar'
import { StatusPill } from '@/components/ui/StatusPill'
import { ConversationTimeline } from '@/components/ConversationTimeline'
import { JobDetailActions } from '@/components/JobDetailActions'
import { BottomNav } from '@/components/BottomNav'
import { formatRelativeTime } from '@/lib/utils'
import type { Job, Conversation, Reminder } from '@/lib/types'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getJobDetails(id: string) {
  try {
    const headersList = await headers()
    const host = headersList.get('host') || 'localhost:3000'
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    const baseUrl = `${protocol}://${host}`

    const res = await fetch(`${baseUrl}/api/jobs/${id}`, {
      cache: 'no-store',
    })

    if (!res.ok) return null

    const data = await res.json()
    return data.success ? data.data : null
  } catch (error) {
    console.error('Error fetching job details:', error)
    return null
  }
}

async function getAllReminders() {
  try {
    const headersList = await headers()
    const host = headersList.get('host') || 'localhost:3000'
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    const baseUrl = `${protocol}://${host}`

    const res = await fetch(`${baseUrl}/api/reminders`, {
      cache: 'no-store',
    })

    if (!res.ok) return []

    const data = await res.json()
    return data.success ? data.data : []
  } catch (error) {
    return []
  }
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [details, allReminders] = await Promise.all([
    getJobDetails(id),
    getAllReminders(),
  ])

  if (!details) {
    notFound()
  }

  const { job, conversations, reminder } = details as {
    job: Job
    conversations: Conversation[]
    reminder: Reminder | null
  }

  const lastContactDate = conversations[0]?.date || job.created_at

  return (
    <div className="min-h-screen bg-background pb-44">
      <div className="max-w-md mx-auto">
        {/* Top Bar */}
        <div className="sticky top-0 bg-background z-10 px-4 py-3 flex items-center justify-between border-b border-border">
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
          <StatusPill status={job.status} />
          <Link href={`/jobs/${id}/edit`}>
            <button className="p-2 -mr-2 hover:bg-surface-hover rounded-lg transition-colors text-text-primary">
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </Link>
        </div>

        {/* Company Hero */}
        <div className="px-4 py-8 text-center">
          <div className="flex justify-center mb-4">
            <Avatar company={job.company} size="lg" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">
            {job.company}
          </h1>
          <p className="text-text-secondary">{job.role}</p>
        </div>

        <div className="px-4 space-y-4">
          {/* HR Contact Card */}
          <div className="card">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-text-primary">{job.hr_name}</h3>
                <p className="text-sm text-text-secondary mb-2">
                  Last contact: {formatRelativeTime(lastContactDate)}
                </p>
                {job.hr_email && (
                  <a
                    href={`mailto:${job.hr_email}`}
                    className="text-sm text-accent hover:underline block mb-1"
                  >
                    {job.hr_email}
                  </a>
                )}
                {job.hr_phone && (
                  <a
                    href={`tel:${job.hr_phone}`}
                    className="text-sm text-accent hover:underline block"
                  >
                    {job.hr_phone}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          {(job.source || job.salary_info || job.notes) && (
            <div className="card space-y-3">
              {job.source && (
                <div>
                  <div className="text-xs text-text-muted uppercase tracking-wide mb-1">
                    Source
                  </div>
                  <div className="text-sm text-text-primary">{job.source}</div>
                </div>
              )}
              {job.salary_info && (
                <div>
                  <div className="text-xs text-text-muted uppercase tracking-wide mb-1">
                    Salary Info
                  </div>
                  <div className="text-sm text-text-primary">{job.salary_info}</div>
                </div>
              )}
              {job.notes && (
                <div>
                  <div className="text-xs text-text-muted uppercase tracking-wide mb-1">
                    Notes
                  </div>
                  <div className="text-sm text-text-primary whitespace-pre-wrap">
                    {job.notes}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Reminder Card */}
          {reminder && (
            <div
              className="card border-2"
              style={{ borderColor: '#D97706', backgroundColor: '#78350F20' }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">⏰</span>
                <div className="flex-1">
                  <div className="font-semibold text-text-primary mb-1">
                    {reminder.note}
                  </div>
                  <div className="text-sm text-text-secondary font-mono">
                    {new Date(reminder.reminder_date).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs uppercase tracking-wide text-text-muted font-semibold">
                Timeline
              </h2>
              <span className="text-xs text-text-muted font-mono">
                {conversations.length} update{conversations.length !== 1 ? 's' : ''}
              </span>
            </div>
            <ConversationTimeline conversations={conversations} />
          </div>
        </div>

        {/* Fixed Bottom Actions */}
        <JobDetailActions jobId={parseInt(id)} hasReminder={!!reminder} />
      </div>

      {/* Bottom Navigation */}
      <BottomNav reminderCount={allReminders.length} />
    </div>
  )
}
