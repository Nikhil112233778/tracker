'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BottomSheet } from './BottomSheet'
import type { ConversationType } from '@/lib/types'

interface JobDetailActionsProps {
  jobId: number
  hasReminder: boolean
}

const conversationTypes: ConversationType[] = [
  'Call',
  'Email',
  'LinkedIn',
  'WhatsApp',
  'In Person',
  'Other',
]

export function JobDetailActions({ jobId, hasReminder }: JobDetailActionsProps) {
  const router = useRouter()
  const [isConvSheetOpen, setIsConvSheetOpen] = useState(false)
  const [isReminderSheetOpen, setIsReminderSheetOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Conversation form state
  const [convType, setConvType] = useState<ConversationType>('Call')
  const [convDate, setConvDate] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [convSummary, setConvSummary] = useState('')

  // Reminder form state
  const [reminderDate, setReminderDate] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [reminderTime, setReminderTime] = useState('10:00')
  const [reminderNote, setReminderNote] = useState('')

  const handleAddConversation = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!convSummary.trim()) return

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: jobId,
          type: convType,
          date: new Date(convDate).toISOString(),
          summary: convSummary,
        }),
      })

      if (res.ok) {
        setConvSummary('')
        setIsConvSheetOpen(false)
        router.refresh()
      }
    } catch (error) {
      console.error('Error adding conversation:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSetReminder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reminderNote.trim()) return

    setIsSubmitting(true)

    try {
      const dateTime = new Date(`${reminderDate}T${reminderTime}`)

      const res = await fetch('/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: jobId,
          reminder_date: dateTime.toISOString(),
          note: reminderNote,
        }),
      })

      if (res.ok) {
        setReminderNote('')
        setIsReminderSheetOpen(false)
        router.refresh()
      }
    } catch (error) {
      console.error('Error setting reminder:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Fixed Bottom Bar - Above BottomNav */}
      <div className="fixed bottom-20 left-0 right-0 bg-surface border-t border-border p-4">
        <div className="max-w-md mx-auto flex gap-3">
          <button
            onClick={() => setIsReminderSheetOpen(true)}
            className="btn-secondary flex-1"
          >
            {hasReminder ? 'Update Reminder' : 'Set Reminder'}
          </button>
          <button
            onClick={() => setIsConvSheetOpen(true)}
            className="btn-primary flex-1"
          >
            + Add Update
          </button>
        </div>
      </div>

      {/* Add Conversation Bottom Sheet */}
      <BottomSheet
        isOpen={isConvSheetOpen}
        onClose={() => setIsConvSheetOpen(false)}
      >
        <h2 className="text-xl font-bold mb-4 text-text-primary">Add Conversation</h2>
        <form onSubmit={handleAddConversation} className="space-y-4">
          {/* Type selector */}
          <div>
            <label className="label">Type</label>
            <div className="grid grid-cols-3 gap-2">
              {conversationTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setConvType(type)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    convType === type
                      ? 'bg-accent text-white'
                      : 'bg-surface-hover text-text-primary hover:bg-border'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="label">Date</label>
            <input
              type="date"
              value={convDate}
              onChange={(e) => setConvDate(e.target.value)}
              className="input-field"
              required
            />
          </div>

          {/* Summary */}
          <div>
            <label className="label">What did you discuss?</label>
            <textarea
              value={convSummary}
              onChange={(e) => setConvSummary(e.target.value)}
              placeholder="e.g., Discussed technical round details and project expectations"
              className="input-field min-h-[100px] resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full"
          >
            {isSubmitting ? 'Saving...' : 'Save Update'}
          </button>
        </form>
      </BottomSheet>

      {/* Set Reminder Bottom Sheet */}
      <BottomSheet
        isOpen={isReminderSheetOpen}
        onClose={() => setIsReminderSheetOpen(false)}
      >
        <h2 className="text-xl font-bold mb-4 text-text-primary">
          {hasReminder ? 'Update Reminder' : 'Set Reminder'}
        </h2>
        <form onSubmit={handleSetReminder} className="space-y-4">
          {/* Date */}
          <div>
            <label className="label">Date</label>
            <input
              type="date"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="input-field"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="label">Time</label>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="input-field"
              required
            />
          </div>

          {/* Note */}
          <div>
            <label className="label">What to do?</label>
            <input
              type="text"
              value={reminderNote}
              onChange={(e) => setReminderNote(e.target.value)}
              placeholder="e.g., Call Priya about interview results"
              className="input-field"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full"
          >
            {isSubmitting ? 'Saving...' : hasReminder ? 'Update Reminder' : 'Set Reminder'}
          </button>
        </form>
      </BottomSheet>
    </>
  )
}
