import { CONVERSATION_ICONS, type Conversation } from '@/lib/types'
import { formatDateTime } from '@/lib/utils'

interface ConversationTimelineProps {
  conversations: Conversation[]
}

export function ConversationTimeline({
  conversations,
}: ConversationTimelineProps) {
  if (conversations.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <svg
          className="w-12 h-12 mx-auto mb-2 text-gray-300"
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
    <div className="space-y-4">
      {conversations.map((conv, index) => {
        const isFirst = index === 0
        const icon = CONVERSATION_ICONS[conv.type] || '📝'

        return (
          <div key={conv.id} className="flex gap-3">
            {/* Timeline dot and line */}
            <div className="flex flex-col items-center">
              <div
                className={`w-2 h-2 rounded-full ${
                  isFirst ? 'bg-accent' : 'bg-gray-300'
                } flex-shrink-0 mt-1.5`}
              />
              {index < conversations.length - 1 && (
                <div className="w-0.5 h-full bg-gray-200 mt-1" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{icon}</span>
                <span className="text-sm font-medium text-gray-700">
                  {conv.type}
                </span>
                <span className="text-xs text-gray-400 font-mono ml-auto">
                  {formatDateTime(conv.date)}
                </span>
              </div>
              <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">
                {conv.summary}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
