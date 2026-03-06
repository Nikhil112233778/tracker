// Type definitions for the application

export type JobStatus =
  | 'Applied'
  | 'In Touch'
  | 'Follow Up'
  | 'Interview'
  | 'Offer'
  | 'Rejected'
  | 'Ghosted'

export type ConversationType =
  | 'Call'
  | 'Email'
  | 'LinkedIn'
  | 'WhatsApp'
  | 'In Person'
  | 'Other'

export type JobSource =
  | 'LinkedIn'
  | 'Naukri'
  | 'Referral'
  | 'Company Site'
  | 'Indeed'
  | 'Other'

export interface Job {
  id: number
  company: string
  role: string
  hr_name: string
  hr_email?: string | null
  hr_phone?: string | null
  status: JobStatus
  source?: string | null
  notes?: string | null
  salary_info?: string | null
  created_at: string
  updated_at: string
}

export interface Conversation {
  id: number
  job_id: number
  type: ConversationType
  date: string
  summary: string
  created_at: string
}

export interface Reminder {
  id: number
  job_id: number
  reminder_date: string
  note: string
  is_done: boolean
  snoozed_to?: string | null
  created_at: string
}

export interface JobWithLastConversation extends Job {
  lastConversation?: Conversation | null
}

export interface JobWithDetails extends Job {
  conversations: Conversation[]
  reminder?: Reminder | null
}

export const STATUS_CONFIG = {
  'Applied': { color: '#2563EB', bg: '#EEF2FF' },
  'In Touch': { color: '#16A34A', bg: '#F0FDF4' },
  'Follow Up': { color: '#D97706', bg: '#FFFBEB' },
  'Interview': { color: '#8B5CF6', bg: '#F5F3FF' },
  'Offer': { color: '#7C3AED', bg: '#F5F3FF' },
  'Rejected': { color: '#DC2626', bg: '#FEF2F2' },
  'Ghosted': { color: '#6B7280', bg: '#F3F4F6' },
} as const

export const CONVERSATION_ICONS = {
  'Call': '📞',
  'Email': '✉️',
  'LinkedIn': '🔗',
  'WhatsApp': '💬',
  'In Person': '🤝',
  'Other': '📝',
} as const
