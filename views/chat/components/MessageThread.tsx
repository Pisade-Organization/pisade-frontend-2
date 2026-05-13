import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { BellOff, ChevronLeft, EyeOff, Flag, MoreHorizontal, UserX } from "lucide-react"
import Typography from "@/components/base/Typography"
import BaseButton from "@/components/base/BaseButton"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import MessageBubble from "./MessageBubble"
import MessageComposer from "./MessageComposer"
import type { ChatConversation, ChatMessage } from "../mock"
import type { ChatConversationPreferenceAction, ChatSendAttachmentInput } from "@/services/chat/types"

interface MessageThreadProps {
  conversation: ChatConversation
  isMobile: boolean
  currentUserId?: string
  myAvatarUrl?: string
  myName?: string
  onBack: () => void
  onBookLesson?: () => void
  onConversationPreference?: (
    peerUserId: string,
    action: ChatConversationPreferenceAction,
  ) => Promise<boolean>
  onTyping?: (isTyping: boolean) => void
  isPeerTyping?: boolean
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

const actionItems = [
  { label: "Hide Message", icon: EyeOff, action: "HIDE" },
  { label: "Mute Message Notifications", icon: BellOff, action: "MUTE" },
  { label: "Block User", icon: UserX, action: "BLOCK" },
  { label: "Report User", icon: Flag, action: "REPORT" },
] as const

export default function MessageThread({
  conversation,
  isMobile,
  currentUserId,
  myAvatarUrl,
  myName,
  onBack,
  onBookLesson,
  onConversationPreference,
  onTyping,
  isPeerTyping,
  onSend,
  isSending,
  isConnected,
  className,
}: MessageThreadProps) {
  const [avatarLoadFailed, setAvatarLoadFailed] = useState(false)
  const [replyTarget, setReplyTarget] = useState<ChatMessage | null>(null)
  const [isActionsOpen, setIsActionsOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setAvatarLoadFailed(false)
  }, [conversation.avatarUrl, conversation.id])

  useEffect(() => {
    setReplyTarget(null)
  }, [conversation.id])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [conversation.messages, isPeerTyping])

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
    <section className={`flex h-full min-h-0 flex-col bg-white ${className ?? ""}`}>
      <div className="flex items-center gap-2 border-b border-neutral-50 px-3 py-3 lg:px-4">
        {isMobile ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to conversation list"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-neutral-25"
          >
            <ChevronLeft size={18} className="text-neutral-700" />
          </button>
        ) : null}

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="relative h-10 w-10 shrink-0">
            <div className="h-full w-full overflow-hidden rounded-full bg-neutral-100">
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
            </div>

            {conversation.isOnline ? (
              <span className="absolute top-[29px] left-[30px] h-2.5 w-2.5 rounded-full border border-white bg-green-500" />
            ) : null}
          </div>

          <div className="min-w-0">
            <p className="truncate text-body-2 text-neutral-900">{conversation.name}</p>
            <p className="truncate text-body-4 text-neutral-500">{conversation.subtitle}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-5">
          <BaseButton variant="primary" onClick={onBookLesson}>
            Book lesson
          </BaseButton>
          <Popover open={isActionsOpen} onOpenChange={setIsActionsOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                aria-label="More options"
                className="inline-flex shrink-0 cursor-pointer items-center justify-center"
              >
                <MoreHorizontal size={24} className="text-neutral-100" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-full max-w-[240px] rounded-xl border border-neutral-50 bg-white p-2"
            >
              {actionItems.map((item, index) => {
                const Icon = item.icon
                const isDanger = item.label === "Report User"
                return (
                  <button
                    key={item.label}
                    type="button"
                    className={`w-full cursor-pointer bg-white px-2 py-3 text-left transition-all hover:bg-neutral-50 ${
                      index === 0 ? "rounded-t-xl" : ""
                    } ${
                      index === actionItems.length - 1 ? "rounded-b-xl" : ""
                    }`}
                    onClick={() => {
                      void onConversationPreference?.(conversation.peerUserId, item.action)
                        .then((ok) => {
                          if (ok) setIsActionsOpen(false)
                        })
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${isDanger ? "text-red-normal" : "text-neutral-700"}`} />
                      <Typography variant="body-3" color={isDanger ? "red-normal" : "neutral-700"}>
                        {item.label}
                      </Typography>
                    </div>
                  </button>
                )
              })}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 space-y-2 overflow-y-auto bg-[rgba(249,247,251,1)] p-6">
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

        {isPeerTyping ? (
          <div className="flex items-center gap-2 pl-1">
            <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full bg-neutral-100">
              {conversation.avatarUrl ? (
                <Image src={conversation.avatarUrl} alt={conversation.name} width={28} height={28} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-neutral-700">
                  {initialLabel}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 rounded-2xl bg-white px-4 py-3 shadow-sm">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:300ms]" />
            </div>
          </div>
        ) : null}
      </div>

      <MessageComposer
        onSend={onSend}
        disabled={Boolean(isSending) || isConnected === false}
        replyTarget={replyTarget}
        onCancelReply={() => setReplyTarget(null)}
        onTyping={onTyping}
        currentUserId={currentUserId}
      />
    </section>
  )
}
