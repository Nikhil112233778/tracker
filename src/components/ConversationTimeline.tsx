'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CONVERSATION_ICONS, type Conversation } from '@/lib/types'
import { formatDateTime } from '@/lib/utils'
import { ConfirmDialog } from './ConfirmDialog'

interface ConversationTimelineProps {
  conversations: Conversation[]
}

export function ConversationTimeline({
  conversations,
}: ConversationTimelineProps) {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/conversations/${deleteId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.refresh()
      } else {
        alert('Failed to delete conversation')
      }
    } catch (error) {
      alert('Error deleting conversation')
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  if (conversations.length === 0) {
    return (
      <div className="text-center py-8 text-text-muted">
        <svg
          className="w-12 h-12 mx-auto mb-2 text-text-muted/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <p className="text-sm">No conversations yet</p>
        <p className="text-xs mt-1">Tap "+ Add Update" to log your first interaction</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
      {conversations.map((conv, index) => {
        const isFirst = index === 0
        const icon = CONVERSATION_ICONS[conv.type] || '📝'

        return (
          <div key={conv.id} className="flex gap-3 group">
            {/* Timeline dot and line */}
            <div className="flex flex-col items-center">
              <div
                className={`w-2 h-2 rounded-full ${
                  isFirst ? 'bg-accent' : 'bg-border'
                } flex-shrink-0 mt-1.5`}
              />
              {index < conversations.length - 1 && (
                <div className="w-0.5 h-full bg-border mt-1" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{icon}</span>
                <span className="text-sm font-medium text-text-secondary">
                  {conv.type}
                </span>
                <span className="text-xs text-text-muted font-mono ml-auto">
                  {formatDateTime(conv.date)}
                </span>
                {/* Delete Button */}
                <button
                  onClick={() => setDeleteId(conv.id)}
                  disabled={isDeleting}
                  className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 rounded-lg transition-all"
                  title="Delete conversation"
                >
                  <svg
                    className="w-3.5 h-3.5 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
                {conv.summary}
              </p>
            </div>
          </div>
        )
      })}
      </div>

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Conversation?"
        message="Are you sure you want to delete this conversation? This action cannot be undone."
        confirmText="Delete"
        confirmButtonClass="btn-danger"
      />
    </>
  )
}
