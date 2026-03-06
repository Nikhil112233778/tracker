import { differenceInDays, isToday, isTomorrow, parseISO, isPast } from 'date-fns'

export type ReminderGroup = 'Overdue' | 'Today' | 'Tomorrow' | 'This Week' | 'Later'

export interface ReminderWithJob {
  id: number
  job_id: number
  reminder_date: string
  note: string
  is_done: boolean
  snoozed_to: string | null
  created_at: string
  company: string
  hr_name: string
  role: string
}

export function groupReminders(reminders: ReminderWithJob[]): Record<ReminderGroup, ReminderWithJob[]> {
  const groups: Record<ReminderGroup, ReminderWithJob[]> = {
    Overdue: [],
    Today: [],
    Tomorrow: [],
    'This Week': [],
    Later: [],
  }

  reminders.forEach(reminder => {
    const date = parseISO(reminder.reminder_date)
    const now = new Date()

    if (isPast(date) && !isToday(date)) {
      groups.Overdue.push(reminder)
    } else if (isToday(date)) {
      groups.Today.push(reminder)
    } else if (isTomorrow(date)) {
      groups.Tomorrow.push(reminder)
    } else if (differenceInDays(date, now) <= 7) {
      groups['This Week'].push(reminder)
    } else {
      groups.Later.push(reminder)
    }
  })

  return groups
}

export const REMINDER_GROUP_COLORS: Record<ReminderGroup, { text: string; bg: string }> = {
  Overdue: { text: '#DC2626', bg: '#FEF2F2' },
  Today: { text: '#2563EB', bg: '#EEF2FF' },
  Tomorrow: { text: '#D97706', bg: '#FFFBEB' },
  'This Week': { text: '#8B5CF6', bg: '#F5F3FF' },
  Later: { text: '#6B7280', bg: '#F3F4F6' },
}
