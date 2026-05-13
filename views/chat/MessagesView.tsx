"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { ChevronLeft, X } from "lucide-react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import useMediaQuery from "@/hooks/useMediaQuery"
import { useChat } from "@/hooks/chat/useChat"
import ConversationList from "./components/ConversationList"
import MessageThread from "./components/MessageThread"
import type { ChatConversation, ChatMessage, ChatAttachment } from "./mock"
import type {
  ChatConversationDto,
  ChatConversationPreferenceAction,
  ChatMessageDto,
  ChatSendAttachmentInput,
} from "@/services/chat/types"

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return ""
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return "now"
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h`
  return date.toLocaleDateString([], { month: "short", day: "numeric" })
}

function isRecentlyActive(dateStr: string, withinMinutes = 5): boolean {
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return false
  return Date.now() - date.getTime() <= withinMinutes * 60 * 1000
}

function adaptMessage(dto: ChatMessageDto, currentUserId: string): ChatMessage {
  return {
    id: dto.id,
    sender: dto.senderId === currentUserId ? "me" : "them",
    text: dto.content ?? "",
    time: new Date(dto.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    createdAt: dto.createdAt,
    replyTo: dto.replyTo
      ? {
          id: dto.replyTo.id,
          sender: dto.replyTo.senderId === currentUserId ? "me" : "them",
          text: dto.replyTo.content ?? "",
          createdAt: dto.replyTo.createdAt,
        }
      : null,
    attachments: dto.attachments?.map(
      (a): ChatAttachment => ({
        id: a.id,
        kind: a.kind,
        mimeType: a.mimeType,
        originalName: a.originalName,
        sizeBytes: a.sizeBytes,
        storageKey: a.storageKey,
        url: a.signedUrl,
        createdAt: a.createdAt,
      }),
    ),
  }
}

function adaptConversation(
  dto: ChatConversationDto,
  currentUserId: string,
  messages: ChatMessageDto[],
): ChatConversation {
  return {
    id: dto.peerUser.id,
    peerUserId: dto.peerUser.id,
    name: dto.peerUser.fullName,
    avatarUrl: dto.peerUser.avatarUrl ?? "",
    subtitle: dto.peerUser.role === "TUTOR" ? "Tutor" : "Student",
    lastMessage: dto.lastMessage?.content ?? "",
    lastMessageAt: dto.lastMessage ? formatRelativeTime(dto.lastMessage.createdAt) : "",
    lastMessageCreatedAt: dto.lastMessage?.createdAt ?? dto.lastActiveAt,
    unreadCount: dto.unreadCount,
    isOnline: isRecentlyActive(dto.lastActiveAt),
    isMuted: dto.isMuted,
    isBlocked: dto.isBlocked,
    isReported: dto.isReported,
    messages: messages.map((m) => adaptMessage(m, currentUserId)),
  }
}

export default function MessagesView() {
  const router = useRouter()
  const params = useParams()
  const { data: session } = useSession()
  const currentUserId = session?.user?.id ?? ""
  const userSession = session?.user as any
  const searchParams = useSearchParams()
  const locale = typeof params?.locale === "string" ? params.locale : ""
  const localePrefix = locale ? `/${locale}` : ""

  const isMobile = useMediaQuery("(max-width: 1023px)")
  const [activePeerId, setActivePeerId] = useState<string | null>(
    searchParams.get("peerUserId"),
  )
  const [showThread, setShowThread] = useState(Boolean(searchParams.get("peerUserId")))
  const [peerNameFromUrl, setPeerNameFromUrl] = useState(searchParams.get("peerName") ?? "")
  const [peerAvatarFromUrl, setPeerAvatarFromUrl] = useState(searchParams.get("peerAvatarUrl") ?? "")
  const [tutorIdFromUrl, setTutorIdFromUrl] = useState(searchParams.get("tutorId") ?? "")

  const {
    conversations,
    messagesByPeer,
    typingPeers,
    isConnected,
    isLoadingConversations,
    isLoadingHistory,
    isSending,
    sendMessage,
    loadHistory,
    reloadConversations,
    markRead,
    markConversationRead,
    sendTyping,
    updateConversationPreference,
  } = useChat()

  useEffect(() => {
    const peerId = searchParams.get("peerUserId")
    const peerName = searchParams.get("peerName") ?? ""
    const peerAvatar = searchParams.get("peerAvatarUrl") ?? ""
    if (peerId && peerId !== activePeerId) {
      setActivePeerId(peerId)
      setShowThread(true)
    }
    if (peerName) setPeerNameFromUrl(peerName)
    if (peerAvatar) setPeerAvatarFromUrl(peerAvatar)
    const tId = searchParams.get("tutorId") ?? ""
    if (tId) setTutorIdFromUrl(tId)
  }, [searchParams, activePeerId])

  useEffect(() => {
    if (activePeerId) {
      void loadHistory(activePeerId)
      markConversationRead(activePeerId)
    }
  }, [activePeerId, loadHistory, markConversationRead])

  const handleSelectConversation = (peerId: string) => {
    setActivePeerId(peerId)
    setShowThread(true)
    void loadHistory(peerId)
    markConversationRead(peerId)
  }

  const handleBack = () => {
    setShowThread(false)
  }

  const handleSend = async (
    content: string,
    replyToId?: string,
    attachments?: ChatSendAttachmentInput[],
  ): Promise<boolean> => {
    if (!activePeerId) return false
    const isNewConversation = !conversations.some((c) => c.peerUser.id === activePeerId)
    const ok = await sendMessage(activePeerId, content, replyToId, attachments)
    if (ok && isNewConversation) {
      await reloadConversations()
    }
    return ok
  }

  const handleConversationPreference = (
    peerUserId: string,
    action: ChatConversationPreferenceAction,
  ) => {
    return updateConversationPreference(peerUserId, action)
  }

  const adaptedConversations = conversations.map((c) =>
    adaptConversation(c, currentUserId, messagesByPeer[c.peerUser.id] ?? []),
  )

  const activeConversationDto = activePeerId
    ? conversations.find((c) => c.peerUser.id === activePeerId) ?? null
    : null

  const activeConversation: ChatConversation | null = activePeerId
    ? activeConversationDto
      ? adaptConversation(activeConversationDto, currentUserId, messagesByPeer[activePeerId] ?? [])
      : {
          id: activePeerId,
          peerUserId: activePeerId,
          name: peerNameFromUrl || "Unknown",
          avatarUrl: peerAvatarFromUrl,
          subtitle: "Tutor",
          lastMessage: "",
          lastMessageAt: "",
          lastMessageCreatedAt: "",
          unreadCount: 0,
          isOnline: false,
          isMuted: false,
          isBlocked: false,
          isReported: false,
          messages: (messagesByPeer[activePeerId] ?? []).map((m) => adaptMessage(m, currentUserId)),
        }
    : null

  const activeTutorId = activeConversationDto?.tutorId ?? tutorIdFromUrl ?? null

  const handleBookLesson = () => {
    if (!activeTutorId) return
    router.push(`${localePrefix}/bookings/${activeTutorId}`)
  }

  const showList = !isMobile || !showThread
  const showMessages = activeConversation && (!isMobile || showThread)
  const unreadCount = conversations.reduce((total, conversation) => total + conversation.unreadCount, 0)

  return (
    <div className="flex h-full min-h-0 flex-col">
      {isMobile && showList ? (
        <header className="flex items-center justify-between border-b border-neutral-50 px-4 pb-3 pt-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back"
              className="inline-flex h-9 w-9 items-center justify-center"
            >
              <ChevronLeft size={22} className="text-neutral-700" />
            </button>
            <h1 className="text-headline-5 text-neutral-900">Messaging</h1>
            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-electric-violet-400 text-[14px] font-semibold leading-none text-white">
              {unreadCount}
            </span>
          </div>

          <button
            type="button"
            onClick={() => router.push(`${localePrefix}/student/dashboard`)}
            aria-label="Close messaging"
            className="inline-flex h-9 w-9 items-center justify-center"
          >
            <X size={20} className="text-neutral-700" />
          </button>
        </header>
      ) : null}

      <div className="flex min-h-0 flex-1 divide-x divide-neutral-50">
        {showList && (
          <div className={isMobile ? "w-full" : "w-[300px] shrink-0 xl:w-[340px]"}>
            {isLoadingConversations ? (
              <div className="flex h-full items-center justify-center bg-white">
                <p className="text-body-3 text-neutral-400">Loading...</p>
              </div>
            ) : (
              <ConversationList
                conversations={adaptedConversations}
                activeConversationId={activePeerId ?? ""}
                onSelectConversation={handleSelectConversation}
                onConversationPreference={handleConversationPreference}
                showHeader={!isMobile}
              />
            )}
          </div>
        )}

        {showMessages ? (
          <div className="min-w-0 flex-1">
            <MessageThread
              conversation={activeConversation}
              isMobile={isMobile}
              currentUserId={currentUserId}
              myAvatarUrl={userSession?.avatarUrl ?? undefined}
              myName={userSession?.fullName ?? undefined}
              onBack={handleBack}
              onSend={handleSend}
              onBookLesson={handleBookLesson}
              onConversationPreference={handleConversationPreference}
              onTyping={(isTyping) => activePeerId && sendTyping(activePeerId, isTyping)}
              isPeerTyping={activePeerId ? (typingPeers[activePeerId] ?? false) : false}
              isSending={isSending || isLoadingHistory}
              isConnected={isConnected}
            />
          </div>
        ) : !isMobile ? (
          <div className="flex min-w-0 flex-1 items-center justify-center bg-white">
            <p className="text-body-2 text-neutral-400">Select a conversation to start messaging</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
