import { JobCard } from '@/components/JobCard'
import { FAB } from '@/components/FAB'
import { EmptyState } from '@/components/EmptyState'
import { DashboardNotifications } from '@/components/DashboardNotifications'
import Link from 'next/link'
import type { Job } from '@/lib/types'

async function getJobs() {
  try {
    // In production, this would be an external API call
    // For now, using localhost
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/jobs`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch jobs')
    }

    const data = await res.json()
    return data.success ? data.data : []
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return []
  }
}

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
    return []
  }
}

export default async function Dashboard() {
  const [jobs, reminders] = await Promise.all([getJobs(), getReminders()])

  const hasJobs = jobs.length > 0
  const reminderCount = reminders.length

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Job Tracker</h1>
              <p className="text-sm text-gray-600 mt-1">
                {hasJobs
                  ? `${jobs.length} active${reminderCount > 0 ? ` · ${reminderCount} reminder${reminderCount > 1 ? 's' : ''}` : ''}`
                  : 'Track your job applications'}
              </p>
            </div>
            {reminderCount > 0 && (
              <Link href="/reminders">
                <button className="relative p-2 text-gray-600 hover:text-accent transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {reminderCount > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 text-xs flex items-center justify-center bg-red-500 text-white rounded-full font-mono">
                      {reminderCount}
                    </span>
                  )}
                </button>
              </Link>
            )}
          </div>
        </header>

        {/* PWA Notifications */}
        <DashboardNotifications />

        {/* Job List or Empty State */}
        {hasJobs ? (
          <div>
            {jobs.map((job: Job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🎯"
            title="No jobs tracked yet"
            description="Add your first job to get started"
            action={
              <Link href="/jobs/new">
                <button className="btn-primary">Add Your First Job</button>
              </Link>
            }
          />
        )}
      </div>

      {/* Floating Action Button */}
      <FAB />
    </div>
  )
}
