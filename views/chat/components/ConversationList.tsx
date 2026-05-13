"use client"

import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import Typography from "@/components/base/Typography"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import ConversationItem from "./ConversationItem"
import type { ChatConversation } from "../mock"
import type { ChatConversationPreferenceAction } from "@/services/chat/types"

interface ConversationListProps {
  conversations: ChatConversation[]
  activeConversationId: string
  onSelectConversation: (id: string) => void
  onConversationPreference: (
    peerUserId: string,
    action: ChatConversationPreferenceAction,
  ) => Promise<boolean>
  className?: string
  showHeader?: boolean
}

type ConversationFilter = "Newest" | "Oldest" | "Unread" | "Blocked"

const filterOptions: ConversationFilter[] = ["Newest", "Oldest", "Unread", "Blocked"]

function getFilteredConversations(
  conversations: ChatConversation[],
  activeFilter: ConversationFilter,
) {
  if (activeFilter === "Unread") {
    return conversations.filter((conversation) => conversation.unreadCount > 0)
  }

  if (activeFilter === "Blocked") {
    return conversations.filter((conversation) => conversation.isBlocked)
  }

  const sortedConversations = [...conversations].sort((a, b) => {
    const timeA = new Date(a.lastMessageCreatedAt).getTime()
    const timeB = new Date(b.lastMessageCreatedAt).getTime()
    return activeFilter === "Oldest" ? timeA - timeB : timeB - timeA
  })

  return sortedConversations
}

export default function ConversationList({
  conversations,
  activeConversationId,
  onSelectConversation,
  onConversationPreference,
  className,
  showHeader = true,
}: ConversationListProps) {
  const [activeFilter, setActiveFilter] = useState<ConversationFilter>("Newest")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const visibleConversations = getFilteredConversations(conversations, activeFilter)

  return (
    <aside className={`flex h-full min-h-0 flex-col bg-white p-3 lg:p-4 ${className ?? ""}`}>
      {showHeader ? (
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-title-2 text-neutral-900">Messages</h2>
        </div>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col gap-4">
        <div className="flex items-center gap-2 rounded-[12px] border border-neutral-50 bg-white p-3">
          <Search className="h-5 w-5 text-neutral-100" />
          <span className="w-full text-body-3 text-neutral-300">Search</span>
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                aria-label="Open message filters"
                className="inline-flex cursor-pointer items-center justify-center"
              >
                <SlidersHorizontal className="h-5 w-5 text-neutral-100" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-full max-w-[84px] rounded-[12px] border border-neutral-50 bg-white p-2"
            >
              <div className="flex flex-col gap-1">
                {filterOptions.map((option) => {
                  const isActive = option === activeFilter

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setActiveFilter(option)
                        setIsFilterOpen(false)
                      }}
                      className={`rounded-[4px] p-2 text-left ${
                        isActive ? "bg-electric-violet-25" : "bg-white"
                      }`}
                    >
                      <Typography
                        variant="body-3"
                        color={isActive ? "electric-violet-500" : "neutral-800"}
                      >
                        {option}
                      </Typography>
                    </button>
                  )
                })}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-0 overflow-y-auto lg:gap-2 lg:pr-1">
          {visibleConversations.length === 0 ? (
            <div className="flex flex-1 items-center justify-center py-8">
              <p className="text-body-3 text-neutral-300">No conversations yet</p>
            </div>
          ) : (
            visibleConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isActive={conversation.id === activeConversationId}
                onClick={() => onSelectConversation(conversation.id)}
                onConversationPreference={onConversationPreference}
              />
            ))
          )}
        </div>
      </div>
    </aside>
  )
}
