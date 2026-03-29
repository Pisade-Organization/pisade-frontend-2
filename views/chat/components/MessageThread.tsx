import { useEffect, useMemo, useState } from "react"
import { ChevronLeft } from "lucide-react"
import Typography from "@/components/base/Typography"
import MessageBubble from "./MessageBubble"
import MessageComposer from "./MessageComposer"
import type { ChatConversation, ChatMessage } from "../mock"
import type { ChatSendAttachmentInput } from "@/services/chat/types"

interface MessageThreadProps {
  conversation: ChatConversation
  isMobile: boolean
  currentUserId?: string
  myAvatarUrl?: string
  myName?: string
  onBack: () => void
  onSend: (
    value: string,
    replyToId?: string,
    attachments?: ChatSendAttachmentInput[],
  ) => Promise<boolean>
  isSending?: boolean
  isConnected?: boolean
  className?: string
}

const GROUP_WINDOW_MS = 5 * 60 * 1000

type ThreadRenderItem =
  | {
      type: "day-divider"
      id: string
      label: string
    }
  | {
      type: "message-group"
      id: string
      messages: ChatMessage[]
      timeLabel: string
    }

function isSameDay(date: Date, target: Date) {
  return (
    date.getFullYear() === target.getFullYear() &&
    date.getMonth() === target.getMonth() &&
    date.getDate() === target.getDate()
  )
}

function getDayDividerLabel(date: Date) {
  const today = new Date()

  if (isSameDay(date, today)) {
    return "Today"
  }

  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  if (isSameDay(date, yesterday)) {
    return "Yesterday"
  }

  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function getGroupTimeLabel(date: Date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

export default function MessageThread({
  conversation,
  isMobile,
  currentUserId,
  myAvatarUrl,
  myName,
  onBack,
  onSend,
  isSending,
  isConnected,
  className,
}: MessageThreadProps) {
  const [avatarLoadFailed, setAvatarLoadFailed] = useState(false)
  const [replyTarget, setReplyTarget] = useState<ChatMessage | null>(null)

  useEffect(() => {
    setAvatarLoadFailed(false)
  }, [conversation.avatarUrl, conversation.id])

  useEffect(() => {
    setReplyTarget(null)
  }, [conversation.id])

  const initialLabel = conversation.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()

  const showImage = Boolean(conversation.avatarUrl) && !avatarLoadFailed

  const threadItems = useMemo<ThreadRenderItem[]>(() => {
    const items: ThreadRenderItem[] = []
    let currentDateKey = ""
    let currentGroup:
      | {
          sender: ChatMessage["sender"]
          lastTimestamp: number
          item: Extract<ThreadRenderItem, { type: "message-group" }>
        }
      | undefined

    for (const message of conversation.messages) {
      const date = new Date(message.createdAt)
      if (Number.isNaN(date.getTime())) {
        continue
      }

      const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

      if (dateKey !== currentDateKey) {
        currentDateKey = dateKey
        currentGroup = undefined

        items.push({
          type: "day-divider",
          id: `divider-${dateKey}`,
          label: getDayDividerLabel(date),
        })
      }

      const timestamp = date.getTime()
      const shouldStartNewGroup =
        !currentGroup ||
        currentGroup.sender !== message.sender ||
        timestamp - currentGroup.lastTimestamp > GROUP_WINDOW_MS

      if (shouldStartNewGroup) {
        const groupItem: Extract<ThreadRenderItem, { type: "message-group" }> = {
          type: "message-group",
          id: `group-${message.id}`,
          messages: [message],
          timeLabel: getGroupTimeLabel(date),
        }

        currentGroup = {
          sender: message.sender,
          lastTimestamp: timestamp,
          item: groupItem,
        }

        items.push(groupItem)
        continue
      }

      // TypeScript narrowing: currentGroup is guaranteed to be defined here
      // because shouldStartNewGroup is false only when currentGroup exists
      if (!currentGroup) continue

      currentGroup.lastTimestamp = timestamp
      currentGroup.item.timeLabel = getGroupTimeLabel(date)
      currentGroup.item.messages.push(message)
    }

    return items
  }, [conversation.messages])

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
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-neutral-100">
            {showImage ? (
              <img
                src={conversation.avatarUrl}
                alt={conversation.name}
                className="h-full w-full object-cover"
                onError={() => setAvatarLoadFailed(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-neutral-700">
                {initialLabel}
              </div>
            )}

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

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto bg-[rgba(249,247,251,1)] p-6">
        {threadItems.map((item) => {
          if (item.type === "day-divider") {
            return (
              <div key={item.id} className="flex justify-center py-1">
                <Typography variant="body-4" color="neutral-300">
                  {item.label}
                </Typography>
              </div>
            )
          }

          return (
            <div key={item.id} className="space-y-2">
              {item.messages.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  myAvatarUrl={myAvatarUrl}
                  myName={myName}
                  peerAvatarUrl={conversation.avatarUrl}
                  peerName={conversation.name}
                  showAvatar={!isMobile}
                  timeLabel={index === 0 ? item.timeLabel : undefined}
                  onReply={message.sender === "them" ? setReplyTarget : undefined}
                />
              ))}
            </div>
          )
        })}
      </div>

      <MessageComposer
        onSend={onSend}
        disabled={Boolean(isSending) || isConnected === false}
        replyTarget={replyTarget}
        onCancelReply={() => setReplyTarget(null)}
        currentUserId={currentUserId}
      />
    </section>
  )
}
