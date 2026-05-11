"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import useMediaQuery from "@/hooks/useMediaQuery"
import { useChat } from "@/hooks/chat/useChat"
import ConversationList from "./components/ConversationList"
import MessageThread from "./components/MessageThread"
import type { ChatConversation, ChatMessage, ChatAttachment } from "./mock"
import type { ChatConversationDto, ChatMessageDto, ChatSendAttachmentInput } from "@/services/chat/types"

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
    unreadCount: dto.unreadCount,
    isOnline: false,
    messages: messages.map((m) => adaptMessage(m, currentUserId)),
  }
}

export default function MessagesView() {
  const { data: session } = useSession()
  const currentUserId = session?.user?.id ?? ""
  const userSession = session?.user as any
  const searchParams = useSearchParams()

  const isMobile = useMediaQuery("(max-width: 1023px)")
  const [activePeerId, setActivePeerId] = useState<string | null>(
    searchParams.get("peerUserId"),
  )
  const [showThread, setShowThread] = useState(Boolean(searchParams.get("peerUserId")))

  const {
    conversations,
    messagesByPeer,
    isConnected,
    isLoadingConversations,
    isLoadingHistory,
    isSending,
    sendMessage,
    loadHistory,
    markRead,
  } = useChat()

  useEffect(() => {
    const peerId = searchParams.get("peerUserId")
    if (peerId && peerId !== activePeerId) {
      setActivePeerId(peerId)
      setShowThread(true)
    }
  }, [searchParams, activePeerId])

  useEffect(() => {
    if (activePeerId) {
      void loadHistory(activePeerId)
    }
  }, [activePeerId, loadHistory])

  const handleSelectConversation = (peerId: string) => {
    setActivePeerId(peerId)
    setShowThread(true)
    void loadHistory(peerId)
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
    const ok = await sendMessage(activePeerId, content, replyToId, attachments)
    return ok
  }

  const adaptedConversations = conversations.map((c) =>
    adaptConversation(c, currentUserId, messagesByPeer[c.peerUser.id] ?? []),
  )

  const activeConversationDto = activePeerId
    ? conversations.find((c) => c.peerUser.id === activePeerId) ?? null
    : null

  const activeConversation = activeConversationDto
    ? adaptConversation(
        activeConversationDto,
        currentUserId,
        messagesByPeer[activePeerId!] ?? [],
      )
    : null

  const showList = !isMobile || !showThread
  const showMessages = activeConversation && (!isMobile || showThread)

  return (
    <div className="flex h-full min-h-0 gap-4">
      {showList && (
        <div className={isMobile ? "w-full" : "w-[300px] shrink-0 xl:w-[340px]"}>
          {isLoadingConversations ? (
            <div className="flex h-full items-center justify-center rounded-2xl border border-neutral-50 bg-white">
              <p className="text-body-3 text-neutral-400">Loading...</p>
            </div>
          ) : (
            <ConversationList
              conversations={adaptedConversations}
              activeConversationId={activePeerId ?? ""}
              onSelectConversation={handleSelectConversation}
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
            isSending={isSending || isLoadingHistory}
            isConnected={isConnected}
          />
        </div>
      ) : !isMobile ? (
        <div className="flex min-w-0 flex-1 items-center justify-center rounded-2xl border border-neutral-50 bg-white">
          <p className="text-body-2 text-neutral-400">Select a conversation to start messaging</p>
        </div>
      ) : null}
    </div>
  )
}
