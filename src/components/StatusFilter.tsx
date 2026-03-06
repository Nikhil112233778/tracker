'use client'

import { useState, useRef, useEffect } from 'react'
import type { JobStatus } from '@/lib/types'
import { STATUS_CONFIG } from '@/lib/types'

interface StatusFilterProps {
  selectedStatus: JobStatus | 'All'
  onStatusChange: (status: JobStatus | 'All') => void
}

export function StatusFilter({ selectedStatus, onStatusChange }: StatusFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const statuses: Array<JobStatus | 'All'> = [
    'All',
    'Applied',
    'In Touch',
    'Follow Up',
    'Interview',
    'Offer',
    'Rejected',
    'Ghosted',
  ]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 h-10 rounded-button border border-border bg-surface-elevated hover:bg-surface-hover hover:border-border-hover transition-all shadow-button text-text-primary"
      >
        <svg
          className="w-3.5 h-3.5 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        <span className="text-[13px] font-semibold">{selectedStatus}</span>
        <svg
          className={`w-3.5 h-3.5 text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-48 bg-surface-elevated border border-border rounded-button shadow-elevated overflow-hidden z-50 backdrop-blur-xl">
          {statuses.map((status) => {
            const isSelected = status === selectedStatus
            const config = status === 'All' ? null : STATUS_CONFIG[status]

            return (
              <button
                key={status}
                onClick={() => {
                  onStatusChange(status)
                  setIsOpen(false)
                }}
                className={`w-full px-3 py-2 text-left text-[13px] font-medium flex items-center gap-2.5 transition-all ${
                  isSelected
                    ? 'bg-accent/15 text-accent'
                    : 'text-text-primary hover:bg-surface-hover'
                }`}
              >
                {config && (
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: config.color }}
                  />
                )}
                <span className="flex-1">{status}</span>
                {isSelected && (
                  <svg
                    className="w-3.5 h-3.5 text-accent"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
