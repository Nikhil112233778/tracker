'use client'

import { useEffect } from 'react'

export function PWAHandler() {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('✅ Service Worker registered:', registration.scope)
          })
          .catch((error) => {
            console.error('❌ Service Worker registration failed:', error)
          })
      })
    }

    // Request notification permission on first visit (non-intrusive)
    if ('Notification' in window && Notification.permission === 'default') {
      // Don't request immediately - wait for user interaction
      // This will be handled by the reminder system when user sets a reminder
    }
  }, [])

  return null
}
