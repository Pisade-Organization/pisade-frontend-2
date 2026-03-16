import Typography from "@/components/base/Typography"
import { EllipsisVertical } from "lucide-react"
import type { ChatConversation } from "../mock"

interface ConversationItemProps {
  conversation: ChatConversation
  isActive: boolean
  onClick: () => void
}

function truncateWithDots(value: string, limit = 38) {
  if (value.length <= limit) return value
  return `${value.slice(0, limit).trimEnd()}...`
}

export default function ConversationItem({ conversation, isActive, onClick }: ConversationItemProps) {
  const isUnread = conversation.unreadCount > 0

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-start px-4 py-3 text-left transition-colors lg:rounded-xl lg:border lg:px-3 ${
        isUnread ? "border-b-0 bg-electric-violet-50" : "border-b border-neutral-50 bg-white"
      } ${
        isActive
          ? "lg:border-electric-violet-200 lg:bg-electric-violet-50/40"
          : "lg:border-neutral-50 lg:bg-white lg:hover:bg-neutral-25"
      }`}
    >
      <div className="flex w-full items-start gap-2">
        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-neutral-100">
          <img
            src={conversation.avatarUrl}
            alt={conversation.name}
            className="h-full w-full object-cover"
          />
          {conversation.isOnline ? (
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-white bg-green-500 lg:hidden" />
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
          <div className="flex items-start justify-between gap-2">
            <Typography variant="label-3" color="neutral-800" className="truncate">
              {conversation.name}
            </Typography>
            <div className="flex items-start gap-2">
              <Typography variant="body-4" color="neutral-300">
                {conversation.lastMessageAt}
              </Typography>
              <div className="inline-flex items-center justify-center lg:hidden">
                <EllipsisVertical className="h-4 w-4 text-neutral-300" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
            {isUnread ? <span className="h-2 w-2 rounded-full bg-[#7C3AED]" /> : null}
            <Typography variant="body-3" color="neutral-500" className="truncate text-left">
              {truncateWithDots(conversation.lastMessage)}
            </Typography>
          </div>
        </div>

        {conversation.unreadCount > 0 ? (
          <div className="hidden rounded-full bg-electric-violet-500 px-2 py-0.5 text-[11px] font-semibold text-white lg:block">
            {conversation.unreadCount}
          </div>
        ) : null}
      </div>
    </button>
  )
}
