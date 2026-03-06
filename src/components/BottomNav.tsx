'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface BottomNavProps {
  reminderCount?: number
}

export function BottomNav({ reminderCount = 0 }: BottomNavProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-40">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {/* Home / Jobs */}
          <Link href="/">
            <button
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                isActive('/')
                  ? 'text-accent'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <svg
                className="w-6 h-6"
                fill={isActive('/') ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs font-medium">Jobs</span>
            </button>
          </Link>

          {/* Create New Job - Center Button */}
          <Link href="/jobs/new">
            <button className="flex flex-col items-center -mt-6">
              <div className="w-14 h-14 rounded-full bg-accent hover:bg-accent-hover flex items-center justify-center shadow-lg transition-all active:scale-95">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-text-secondary mt-1">
                Add Job
              </span>
            </button>
          </Link>

          {/* Reminders */}
          <Link href="/reminders">
            <button
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors relative ${
                isActive('/reminders')
                  ? 'text-accent'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <svg
                className="w-6 h-6"
                fill={isActive('/reminders') ? 'currentColor' : 'none'}
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
                <span className="absolute top-1 right-2 w-5 h-5 text-xs flex items-center justify-center bg-red-500 text-white rounded-full font-mono">
                  {reminderCount > 9 ? '9+' : reminderCount}
                </span>
              )}
              <span className="text-xs font-medium">Reminders</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
