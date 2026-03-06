import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow, format, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeTime(date: string): string {
  try {
    const parsedDate = parseISO(date)
    return formatDistanceToNow(parsedDate, { addSuffix: true })
  } catch {
    return 'Unknown'
  }
}

export function formatDateTime(date: string): string {
  try {
    const parsedDate = parseISO(date)
    return format(parsedDate, 'MMM d, h:mm a')
  } catch {
    return date
  }
}

export function formatDate(date: string): string {
  try {
    const parsedDate = parseISO(date)
    return format(parsedDate, 'MMM d, yyyy')
  } catch {
    return date
  }
}

// Generate a consistent color for company avatars based on company name
export function getCompanyAvatarColor(company: string): string {
  const colors = [
    '#2563EB', // blue
    '#16A34A', // green
    '#D97706', // orange
    '#8B5CF6', // purple
    '#DC2626', // red
    '#0891B2', // cyan
    '#EA580C', // deep orange
    '#7C3AED', // violet
  ]

  // Simple hash function to pick a consistent color
  let hash = 0
  for (let i = 0; i < company.length; i++) {
    hash = company.charCodeAt(i) + ((hash << 5) - hash)
  }

  const index = Math.abs(hash) % colors.length
  return colors[index]
}

// Get initials from company name (first 2 letters)
export function getCompanyInitials(company: string): string {
  return company.slice(0, 2).toUpperCase()
}
