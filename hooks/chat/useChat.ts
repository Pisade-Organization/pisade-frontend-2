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
  ChatConversationPreferenceAction,
  ChatConversationsAck,
  ChatHistoryAck,
  ChatMessageDto,
  ChatPreferenceAck,
  ChatSendAck,
  ChatSendAttachmentInput,
} from "@/services/chat/types"

export interface UseChatReturn {
  conversations: ChatConversationDto[]
  messagesByPeer: Record<string, ChatMessageDto[]>
  typingPeers: Record<string, boolean>
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
  reloadConversations: () => Promise<void>
  markRead: (messageId: string) => void
  markConversationRead: (peerUserId: string) => void
  sendTyping: (receiverId: string, isTyping: boolean) => void
  updateConversationPreference: (
    peerUserId: string,
    action: ChatConversationPreferenceAction,
  ) => Promise<boolean>
}

export function useChat(): UseChatReturn {
  const { data: session } = useSession()
  const accessToken = (session as any)?.access_token as string | undefined
  const currentUserId = session?.user?.id

  const [conversations, setConversations] = useState<ChatConversationDto[]>([])
  const [messagesByPeer, setMessagesByPeer] = useState<Record<string, ChatMessageDto[]>>({})
  const [typingPeers, setTypingPeers] = useState<Record<string, boolean>>({})
  const [isConnected, setIsConnected] = useState(false)
  const [isLoadingConversations, setIsLoadingConversations] = useState(true)
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const loadedPeers = useRef(new Set<string>())
  const loadConversationsRef = useRef<(() => Promise<void>) | null>(null)
  const typingTimeouts = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  const reloadConversations = useCallback(async () => {
    if (loadConversationsRef.current) {
      await loadConversationsRef.current()
    }
  }, [])

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

    loadConversationsRef.current = loadConversations

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

      let peerFound = false
      setConversations((prev) => {
        const idx = prev.findIndex((c) => c.peerUser.id === peerUserId)
        if (idx === -1) {
          return prev
        }
        peerFound = true
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

      if (!peerFound) {
        void loadConversations()
      }
    }

    const onTyping = ({ senderId, isTyping }: { senderId: string; isTyping: boolean }) => {
      clearTimeout(typingTimeouts.current[senderId])
      setTypingPeers((prev) => ({ ...prev, [senderId]: isTyping }))
      if (isTyping) {
        typingTimeouts.current[senderId] = setTimeout(() => {
          setTypingPeers((prev) => ({ ...prev, [senderId]: false }))
        }, 3000)
      }
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    socket.on("chat.message", onNewMessage)
    socket.on("chat.typing", onTyping)

    if (socket.connected) {
      onConnect()
    }

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
      socket.off("chat.message", onNewMessage)
      socket.off("chat.typing", onTyping)
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
        // Mark received messages as read after history loads
        for (const msg of ack.data) {
          if (!msg.read && msg.senderId === peerUserId) {
            void emitWithAck("chat.read", { messageId: msg.id }).catch(() => {})
          }
        }
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

  const markConversationRead = useCallback((peerUserId: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.peerUser.id === peerUserId ? { ...c, unreadCount: 0 } : c)),
    )
    const messages = messagesByPeer[peerUserId] ?? []
    for (const msg of messages) {
      if (!msg.read && msg.senderId === peerUserId) {
        void emitWithAck("chat.read", { messageId: msg.id }).catch(() => {})
      }
    }
  }, [messagesByPeer])

  const sendTyping = useCallback((receiverId: string, isTyping: boolean) => {
    void emitWithAck("chat.typing", { receiverId, isTyping }).catch(() => {})
  }, [])

  const updateConversationPreference = useCallback(
    async (
      peerUserId: string,
      action: ChatConversationPreferenceAction,
    ): Promise<boolean> => {
      try {
        const ack = await emitWithAck<ChatPreferenceAck>("chat.preference", {
          peerUserId,
          action,
        })

        if (!ack.ok || !ack.data) return false

        setConversations((prev) => {
          if (ack.data?.isHidden) {
            return prev.filter((conversation) => conversation.peerUser.id !== peerUserId)
          }

          return prev.map((conversation) =>
            conversation.peerUser.id === peerUserId
              ? {
                  ...conversation,
                  isMuted: ack.data!.isMuted,
                  isBlocked: ack.data!.isBlocked,
                  isReported: ack.data!.isReported,
                }
              : conversation,
          )
        })

        return true
      } catch {
        return false
      }
    },
    [],
  )

  return {
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
  }
}
