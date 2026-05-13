import { useEffect, useState } from "react"
import Typography from "@/components/base/Typography"
import { BellOff, EllipsisVertical, EyeOff, Flag, UserX } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { ChatConversation } from "../mock"
import type { ChatConversationPreferenceAction } from "@/services/chat/types"

interface ConversationItemProps {
  conversation: ChatConversation
  isActive: boolean
  onClick: () => void
  onConversationPreference: (
    peerUserId: string,
    action: ChatConversationPreferenceAction,
  ) => Promise<boolean>
}

function truncateWithDots(value: string, limit = 38) {
  if (value.length <= limit) return value
  return `${value.slice(0, limit).trimEnd()}...`
}

export default function ConversationItem({
  conversation,
  isActive,
  onClick,
  onConversationPreference,
}: ConversationItemProps) {
  const isUnread = conversation.unreadCount > 0
  const [avatarLoadFailed, setAvatarLoadFailed] = useState(false)
  const [isActionsOpen, setIsActionsOpen] = useState(false)

  useEffect(() => {
    setAvatarLoadFailed(false)
  }, [conversation.avatarUrl, conversation.id])

  const initialLabel = conversation.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()

  const actionItems = [
    { label: "Hide Message", icon: EyeOff, action: "HIDE" },
    { label: "Mute Message Notifications", icon: BellOff, action: "MUTE" },
    { label: "Block User", icon: UserX, action: "BLOCK" },
    { label: "Report User", icon: Flag, action: "REPORT" },
  ] as const

  const handleItemKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleItemKeyDown}
      className={`flex w-full cursor-pointer items-start px-4 py-3 text-left transition-colors lg:rounded-xl lg:border lg:px-3 ${
        isUnread ? "border-b-0 bg-electric-violet-50" : "border-b border-neutral-50 bg-white"
      } ${
        isActive
          ? "lg:border-electric-violet-200 lg:bg-electric-violet-50/40"
          : "lg:border-neutral-50 lg:bg-white lg:hover:bg-neutral-25"
      }`}
    >
      <div className="flex w-full items-start gap-2">
        <div className="relative h-10 w-10 shrink-0">
          <div className="h-full w-full overflow-hidden rounded-full bg-neutral-100">
            {conversation.avatarUrl && !avatarLoadFailed ? (
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

        <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
          <div className="flex items-start justify-between gap-2">
            <Typography variant="label-3" color="neutral-800" className="truncate">
              {conversation.name}
            </Typography>
            <div className="flex items-start gap-2">
              <Typography variant="body-4" color="neutral-300">
                {conversation.lastMessageAt}
              </Typography>
              <Popover open={isActionsOpen} onOpenChange={setIsActionsOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    aria-label={`Open actions for ${conversation.name}`}
                    className="inline-flex items-center justify-center lg:hidden"
                    onClick={(event) => {
                      event.stopPropagation()
                    }}
                  >
                    <EllipsisVertical className="h-4 w-4 text-neutral-300" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="w-full max-w-[240px] rounded-xl border border-neutral-50 bg-white p-2"
                  onClick={(event) => event.stopPropagation()}
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
                      onClick={(event) => {
                        event.stopPropagation()
                        void onConversationPreference(conversation.peerUserId, item.action)
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
          <div className="flex items-center gap-1.5">
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
    </div>
  )
}
