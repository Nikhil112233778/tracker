'use client'

import { useState, useEffect } from 'react'
import { useNotifications } from '@/hooks/useNotifications'

export function NotificationPermissionBanner() {
  const { permission, isSupported, requestPermission } = useNotifications()
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Show banner if notifications are supported but not granted or denied
    if (isSupported && permission === 'default' && !isDismissed) {
      // Check if user has set any reminders (if yes, show banner)
      fetch('/api/reminders')
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data.length > 0) {
            setIsVisible(true)
          }
        })
        .catch(() => {
          // Silently fail
        })
    } else {
      setIsVisible(false)
    }
  }, [permission, isSupported, isDismissed])

  const handleEnable = async () => {
    const result = await requestPermission()
    if (result === 'granted') {
      setIsVisible(false)
    }
  }

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
    // Save dismissal to localStorage
    localStorage.setItem('notificationBannerDismissed', 'true')
  }

  // Check if previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('notificationBannerDismissed')
    if (dismissed) {
      setIsDismissed(true)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="bg-accent/10 border-l-4 border-accent p-4 mb-4 rounded-lg">
      <div className="flex items-start gap-3">
        <span className="text-2xl">🔔</span>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">
            Enable Reminder Notifications
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Get notified when your job reminders are due. Never miss a follow-up!
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleEnable}
              className="text-sm bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-hover transition-colors"
            >
              Enable Notifications
            </button>
            <button
              onClick={handleDismiss}
              className="text-sm text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Not Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
