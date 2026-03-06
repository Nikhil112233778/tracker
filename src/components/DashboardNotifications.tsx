'use client'

import { useReminderNotifications } from '@/hooks/useReminderNotifications'
import { NotificationPermissionBanner } from './NotificationPermissionBanner'

export function DashboardNotifications() {
  // Enable reminder polling and notifications
  useReminderNotifications(true)

  return (
    <>
      <NotificationPermissionBanner />
    </>
  )
}
