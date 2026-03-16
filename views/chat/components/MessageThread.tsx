import { ChevronLeft } from "lucide-react"
import MessageBubble from "./MessageBubble"
import MessageComposer from "./MessageComposer"
import type { ChatConversation } from "../mock"

interface MessageThreadProps {
  conversation: ChatConversation
  isMobile: boolean
  onBack: () => void
  onSend: (value: string) => void
  className?: string
}

export default function MessageThread({
  conversation,
  isMobile,
  onBack,
  onSend,
  className,
}: MessageThreadProps) {
  return (
    <section className={`flex h-full min-h-0 flex-col rounded-2xl border border-neutral-50 bg-white ${className ?? ""}`}>
      <div className="flex items-center gap-2 border-b border-neutral-50 px-3 py-3 lg:px-4">
        {isMobile ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to conversation list"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-25"
          >
            <ChevronLeft size={18} className="text-neutral-700" />
          </button>
        ) : null}

        <div className="flex min-w-0 items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-700">
            {conversation.name
              .split(" ")
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase()}
            {conversation.isOnline ? (
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-white bg-green-500" />
            ) : null}
          </div>

          <div className="min-w-0">
            <p className="truncate text-body-2 text-neutral-900">{conversation.name}</p>
            <p className="truncate text-body-4 text-neutral-500">{conversation.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-3 lg:px-4 lg:py-4">
        {conversation.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      <MessageComposer onSend={onSend} />
    </section>
  )
}
