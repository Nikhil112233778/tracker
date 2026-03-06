import { DashboardClient } from '@/components/DashboardClient'
import { headers } from 'next/headers'

export const revalidate = 10 // Revalidate every 10 seconds

async function getJobs() {
  try {
    const headersList = await headers()
    const host = headersList.get('host') || 'localhost:3000'
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    const baseUrl = `${protocol}://${host}`

    const res = await fetch(`${baseUrl}/api/jobs`, {
      next: { revalidate: 10 },
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
      next: { revalidate: 10 },
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

  return <DashboardClient jobs={jobs} reminderCount={reminders.length} />
}
