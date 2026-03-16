import ConversationItem from "./ConversationItem"
import type { ChatConversation } from "../mock"

interface ConversationListProps {
  conversations: ChatConversation[]
  activeConversationId: string
  onSelectConversation: (id: string) => void
  className?: string
  showHeader?: boolean
}

export default function ConversationList({
  conversations,
  activeConversationId,
  onSelectConversation,
  className,
  showHeader = true,
}: ConversationListProps) {
  return (
    <aside className={`flex h-full min-h-0 flex-col rounded-2xl border border-neutral-50 bg-white p-3 lg:p-4 ${className ?? ""}`}>
      {showHeader ? (
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-title-2 text-neutral-900">Messages</h2>
        </div>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col gap-0 overflow-y-auto lg:gap-2 lg:pr-1">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isActive={conversation.id === activeConversationId}
            onClick={() => onSelectConversation(conversation.id)}
          />
        ))}
      </div>
    </aside>
  )
}
