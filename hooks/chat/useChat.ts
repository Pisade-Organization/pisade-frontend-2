"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"
import {
  connectChatSocket,
  disconnectChatSocket,
  emitWithAck,
} from "@/services/chat/socketClient"
import type {
  ChatConversationDto,
  ChatConversationsAck,
  ChatHistoryAck,
  ChatMessageDto,
  ChatSendAck,
  ChatSendAttachmentInput,
} from "@/services/chat/types"

export interface UseChatReturn {
  conversations: ChatConversationDto[]
  messagesByPeer: Record<string, ChatMessageDto[]>
  isConnected: boolean
  isLoadingConversations: boolean
  isLoadingHistory: boolean
  isSending: boolean
  sendMessage: (
    receiverId: string,
    content: string,
    replyToId?: string,
    attachments?: ChatSendAttachmentInput[],
  ) => Promise<boolean>
  loadHistory: (peerUserId: string) => Promise<void>
  markRead: (messageId: string) => void
}

export function useChat(): UseChatReturn {
  const { data: session } = useSession()
  const accessToken = (session as any)?.access_token as string | undefined
  const currentUserId = session?.user?.id

  const [conversations, setConversations] = useState<ChatConversationDto[]>([])
  const [messagesByPeer, setMessagesByPeer] = useState<Record<string, ChatMessageDto[]>>({})
  const [isConnected, setIsConnected] = useState(false)
  const [isLoadingConversations, setIsLoadingConversations] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const loadedPeers = useRef(new Set<string>())

  useEffect(() => {
    if (!accessToken) return

    const socket = connectChatSocket(accessToken)

    const loadConversations = async () => {
      setIsLoadingConversations(true)
      try {
        const ack = await emitWithAck<ChatConversationsAck>("chat.conversations", { limit: 20 })
        if (ack.ok && ack.data) {
          setConversations(ack.data)
        }
      } finally {
        setIsLoadingConversations(false)
      }
    }

    const onConnect = () => {
      setIsConnected(true)
      void loadConversations()
    }

    const onDisconnect = () => setIsConnected(false)

    const onNewMessage = (message: ChatMessageDto) => {
      const peerUserId =
        message.senderId === currentUserId ? message.receiverId : message.senderId

      setMessagesByPeer((prev) => {
        const existing = prev[peerUserId] ?? []
        if (existing.some((m) => m.id === message.id)) return prev
        return { ...prev, [peerUserId]: [...existing, message] }
      })

      setConversations((prev) => {
        const idx = prev.findIndex((c) => c.peerUser.id === peerUserId)
        if (idx === -1) return prev
        const updated = [...prev]
        updated[idx] = {
          ...updated[idx],
          lastMessage: {
            ...updated[idx].lastMessage,
            id: message.id,
            content: message.content,
            type: message.type,
            createdAt: message.createdAt,
            read: message.read,
            senderId: message.senderId,
            receiverId: message.receiverId,
          },
          lastActiveAt: message.createdAt,
          unreadCount:
            message.senderId !== currentUserId
              ? updated[idx].unreadCount + 1
              : updated[idx].unreadCount,
        }
        return updated
      })
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    socket.on("chat.message", onNewMessage)

    if (socket.connected) {
      onConnect()
    }

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
      socket.off("chat.message", onNewMessage)
      disconnectChatSocket()
      setIsConnected(false)
      loadedPeers.current.clear()
    }
  }, [accessToken, currentUserId])

  const loadHistory = useCallback(async (peerUserId: string) => {
    if (loadedPeers.current.has(peerUserId)) return
    setIsLoadingHistory(true)
    try {
      const ack = await emitWithAck<ChatHistoryAck>("chat.history", {
        peerUserId,
        limit: 50,
      })
      if (ack.ok && ack.data) {
        setMessagesByPeer((prev) => ({ ...prev, [peerUserId]: ack.data! }))
        loadedPeers.current.add(peerUserId)
      }
    } finally {
      setIsLoadingHistory(false)
    }
  }, [])

  const sendMessage = useCallback(
    async (
      receiverId: string,
      content: string,
      replyToId?: string,
      attachments?: ChatSendAttachmentInput[],
    ): Promise<boolean> => {
      setIsSending(true)
      try {
        const ack = await emitWithAck<ChatSendAck>("chat.send", {
          receiverId,
          content: content || undefined,
          replyToId,
          attachments,
        })
        return ack.ok
      } catch {
        return false
      } finally {
        setIsSending(false)
      }
    },
    [],
  )

  const markRead = useCallback((messageId: string) => {
    void emitWithAck("chat.read", { messageId }).catch(() => {})
  }, [])

  return {
    conversations,
    messagesByPeer,
    isConnected,
    isLoadingConversations,
    isLoadingHistory,
    isSending,
    sendMessage,
    loadHistory,
    markRead,
  }
}
