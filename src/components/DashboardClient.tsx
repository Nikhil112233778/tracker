'use client'

import { useState, useMemo } from 'react'
import { JobCard } from './JobCard'
import { EmptyState } from './EmptyState'
import { DashboardNotifications } from './DashboardNotifications'
import { StatusFilter } from './StatusFilter'
import { BottomNav } from './BottomNav'
import Link from 'next/link'
import type { Job, JobStatus } from '@/lib/types'

interface DashboardClientProps {
  jobs: Job[]
  reminderCount: number
}

export function DashboardClient({ jobs, reminderCount }: DashboardClientProps) {
  const [selectedStatus, setSelectedStatus] = useState<JobStatus | 'All'>('All')

  const filteredJobs = useMemo(() => {
    if (selectedStatus === 'All') return jobs
    return jobs.filter((job) => job.status === selectedStatus)
  }, [jobs, selectedStatus])

  const hasJobs = jobs.length > 0
  const hasFilteredJobs = filteredJobs.length > 0

  return (
    <div className="min-h-screen pb-28">
      <div className="max-w-md mx-auto px-5 py-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-[28px] font-bold text-text-primary tracking-tight mb-1.5">
                Job Tracker
              </h1>
              <p className="text-[13px] text-text-secondary font-medium">
                {hasJobs
                  ? `${jobs.length} job${jobs.length !== 1 ? 's' : ''}${reminderCount > 0 ? ` · ${reminderCount} reminder${reminderCount > 1 ? 's' : ''}` : ''}`
                  : 'Track your job applications'}
              </p>
            </div>
          </div>

          {/* Filter */}
          {hasJobs && (
            <div className="flex items-center justify-between gap-3">
              <StatusFilter
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
              />
              {selectedStatus !== 'All' && (
                <button
                  onClick={() => setSelectedStatus('All')}
                  className="text-[13px] font-medium text-text-secondary hover:text-accent transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </header>

        {/* PWA Notifications */}
        <DashboardNotifications />

        {/* Job List or Empty State */}
        {hasJobs ? (
          hasFilteredJobs ? (
            <div>
              {filteredJobs.map((job: Job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="🔍"
              title={`No ${selectedStatus} jobs`}
              description="Try selecting a different status filter"
              action={
                <button
                  onClick={() => setSelectedStatus('All')}
                  className="btn-secondary"
                >
                  Show All Jobs
                </button>
              }
            />
          )
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

      {/* Bottom Navigation */}
      <BottomNav reminderCount={reminderCount} />
    </div>
  )
}
