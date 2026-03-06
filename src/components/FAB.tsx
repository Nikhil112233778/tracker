'use client'

import Link from 'next/link'

export function FAB() {
  return (
    <Link href="/jobs/new">
      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-accent hover:bg-accent-hover
                   text-white rounded-full shadow-lg hover:shadow-xl
                   transition-all active:scale-95 flex items-center justify-center
                   text-2xl font-light z-50"
        aria-label="Add new job"
      >
        +
      </button>
    </Link>
  )
}
