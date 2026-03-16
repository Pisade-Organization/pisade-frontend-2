"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Search, SlidersHorizontal, X } from "lucide-react"
import Navbar from "@/components/Navbar"
import Typography from "@/components/base/Typography"
import useMediaQuery from "@/hooks/useMediaQuery"
import ConversationList from "../components/ConversationList"
import MessageThread from "../components/MessageThread"
import { mockConversations, type ChatConversation, type ChatRole } from "../mock"

interface ChatPageProps {
  role?: ChatRole
}

function getCurrentTimeLabel() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function ChatPage({ role = "student" }: ChatPageProps) {
  const router = useRouter()
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [conversations, setConversations] = useState<ChatConversation[]>(mockConversations)
  const [activeConversationId, setActiveConversationId] = useState(mockConversations[0]?.id ?? "")
  const [showMobileThread, setShowMobileThread] = useState(false)

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeConversationId) ?? conversations[0],
    [activeConversationId, conversations],
  )

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id)
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === id
          ? {
              ...conversation,
              unreadCount: 0,
            }
          : conversation,
      ),
    )

    if (!isDesktop) {
      setShowMobileThread(true)
    }
  }

  const handleSend = (value: string) => {
    setConversations((prev) =>
      prev.map((conversation) => {
        if (conversation.id !== activeConversation?.id) return conversation

        return {
          ...conversation,
          lastMessage: value,
          lastMessageAt: getCurrentTimeLabel(),
          messages: [
            ...conversation.messages,
            {
              id: `${conversation.id}-${conversation.messages.length + 1}`,
              sender: "me",
              text: value,
              time: getCurrentTimeLabel(),
            },
          ],
        }
      }),
    )
  }

  const showListPane = isDesktop || !showMobileThread
  const showThreadPane = isDesktop || showMobileThread
  const mockUnreadCount = 5

  return (
    <div className={`flex h-[100dvh] flex-col ${isDesktop ? "bg-neutral-25" : "bg-white"}`}>
      {isDesktop ? <Navbar variant={role === "tutor" ? "tutor_dashboard" : "student_dashboard"} /> : null}

      <main className={`flex-1 ${isDesktop ? "overflow-hidden" : ""}`}>
        <div className="grid h-full grid-cols-1 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-0">
          {showListPane ? (
            isDesktop ? (
              <ConversationList
                conversations={conversations}
                activeConversationId={activeConversation?.id ?? ""}
                onSelectConversation={handleSelectConversation}
                className="rounded-none border-0 lg:border-r lg:border-neutral-50"
              />
            ) : (
              <section className="relative left-1/2 flex h-full min-h-0 w-screen -translate-x-1/2 flex-col gap-5 py-4">
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      aria-label="Go back"
                      className="inline-flex h-11 w-11 items-center justify-center"
                    >
                      <ChevronLeft className="h-6 w-6 text-neutral-700" />
                    </button>

                    <div className="flex items-center gap-[10px]">
                      <Typography variant="headline-5" color="neutral-900">
                        Messaging
                      </Typography>
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-electric-violet-400">
                        <Typography variant="body-4" className="text-white">
                          {mockUnreadCount}
                        </Typography>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => router.back()}
                    aria-label="Close messaging"
                    className="flex h-11 w-11 items-center justify-center"
                  >
                    <X className="h-5 w-5 text-neutral-700" />
                  </button>
                </div>

                <div className="flex min-h-0 flex-1 flex-col gap-4 bg-white">
                  <div className="flex items-center gap-2 rounded-[12px] border border-neutral-50 bg-white px-3 py-2 mx-4">
                    <Search className="h-5 w-5 text-neutral-50" />
                    <Typography variant="body-3" color="neutral-300" className="w-full text-left">
                      Search
                    </Typography>
                    <SlidersHorizontal className="h-4 w-4 text-neutral-50" />
                  </div>

                  <ConversationList
                    conversations={conversations}
                    activeConversationId={activeConversation?.id ?? ""}
                    onSelectConversation={handleSelectConversation}
                    showHeader={false}
                    className="min-h-0 w-full flex-1 rounded-none border-0 bg-transparent p-0"
                  />
                </div>
              </section>
            )
          ) : null}

          {showThreadPane && activeConversation ? (
            <MessageThread
              conversation={activeConversation}
              isMobile={!isDesktop}
              onBack={() => setShowMobileThread(false)}
              onSend={handleSend}
              className="rounded-none border-0"
            />
          ) : null}
        </div>
      </main>
    </div>
  )
}
