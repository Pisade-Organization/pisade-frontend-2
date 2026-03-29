"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ChevronLeft, Search, SlidersHorizontal, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Typography from "@/components/base/Typography";
import useMediaQuery from "@/hooks/useMediaQuery";
import {
  connectChatSocket,
  disconnectChatSocket,
  emitWithAck,
  getChatSocket,
} from "@/services/chat/socketClient";
import type {
  ChatConversationDto,
  ChatConversationsAck,
  ChatHistoryAck,
  ChatMessageDto,
  ChatSendAttachmentInput,
  ChatSendAck,
} from "@/services/chat/types";
import ConversationList from "../components/ConversationList";
import MessageThread from "../components/MessageThread";
import type { ChatConversation, ChatMessage, ChatRole } from "../mock";

interface ChatPageProps {
  role?: ChatRole;
  initialPeerUserId?: string;
  initialPeerName?: string;
  initialPeerAvatarUrl?: string;
}

function normalizeAvatarUrl(value?: string | null) {
  if (!value) return "";
  const normalized = value.trim();

  if (!normalized) return "";
  if (normalized.toLowerCase() === "null") return "";
  if (normalized.toLowerCase() === "undefined") return "";

  return normalized;
}

function toTimeLabel(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function toBubbleTimeLabel(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return isToday ? `Today ${time}` : `${date.toLocaleDateString()} ${time}`;
}

function createDraftConversation(
  peerUserId: string,
  peerName?: string,
  peerAvatarUrl?: string,
): ChatConversation {
  const safeAvatarUrl = normalizeAvatarUrl(peerAvatarUrl);

  return {
    id: peerUserId,
    peerUserId,
    name: peerName || "Tutor",
    avatarUrl: safeAvatarUrl || "https://ui-avatars.com/api/?name=Tutor",
    subtitle: "Tutor",
    lastMessage: "",
    lastMessageAt: "",
    unreadCount: 0,
    isOnline: false,
    messages: [],
  };
}

function mapConversation(conversation: ChatConversationDto): ChatConversation {
  const subtitle = conversation.peerUser.role === "TUTOR" ? "Tutor" : "Student";
  const safeAvatarUrl = normalizeAvatarUrl(conversation.peerUser.avatarUrl);
  const fallbackAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.peerUser.fullName)}`;

  return {
    id: conversation.peerUser.id,
    peerUserId: conversation.peerUser.id,
    name: conversation.peerUser.fullName,
    avatarUrl: safeAvatarUrl || fallbackAvatarUrl,
    subtitle,
    lastMessage: conversation.lastMessage.content || "",
    lastMessageAt: toTimeLabel(conversation.lastMessage.createdAt),
    unreadCount: conversation.unreadCount,
    isOnline: false,
    messages: [],
  };
}

function mapMessage(message: ChatMessageDto, currentUserId: string): ChatMessage {
  const replyTo = message.replyTo
    ? {
        id: message.replyTo.id,
        sender: (message.replyTo.senderId === currentUserId ? "me" : "them") as "me" | "them",
        text: message.replyTo.content || "",
        createdAt: message.replyTo.createdAt,
      }
    : null;

  return {
    id: message.id,
    sender: message.senderId === currentUserId ? "me" : "them",
    text: message.content || "",
    time: toBubbleTimeLabel(message.createdAt),
    createdAt: message.createdAt,
    replyTo,
    attachments: (message.attachments || []).map((attachment) => ({
      id: attachment.id,
      kind: attachment.kind,
      mimeType: attachment.mimeType,
      originalName: attachment.originalName,
      sizeBytes: attachment.sizeBytes,
      storageKey: attachment.storageKey,
      url: attachment.signedUrl,
      createdAt: attachment.createdAt,
    })),
  };
}

export default function ChatPage({
  role = "student",
  initialPeerUserId,
  initialPeerName,
  initialPeerAvatarUrl,
}: ChatPageProps) {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { status, data: session } = useSession();

  const token = session?.access_token;
  const currentUserId = session?.user?.id;
  const currentUserAvatarUrl = normalizeAvatarUrl(session?.user?.avatarUrl);
  const currentUserName = session?.user?.fullName || "Me";

  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState("");
  const [showMobileThread, setShowMobileThread] = useState(false);

  const activeConversationIdRef = useRef("");
  const hasLoadedInitialConversationsRef = useRef(false);

  useEffect(() => {
    activeConversationIdRef.current = activeConversationId;
  }, [activeConversationId]);

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeConversationId),
    [activeConversationId, conversations],
  );

  const loadHistory = useCallback(
    async (peerUserId: string) => {
      if (!currentUserId) return;

      const history = await emitWithAck<ChatHistoryAck>("chat.history", {
        peerUserId,
        limit: 50,
      });

      if (!history.ok) {
        throw new Error(history.error || "Unable to load chat history");
      }

      const mappedMessages = (history.data || []).map((item) =>
        mapMessage(item, currentUserId),
      );

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === peerUserId
            ? {
                ...conversation,
                messages: mappedMessages,
              }
            : conversation,
        ),
      );
    },
    [currentUserId],
  );

  const loadConversations = useCallback(async (options?: { silent?: boolean }) => {
    const response = await emitWithAck<ChatConversationsAck>("chat.conversations", {
      limit: 50,
    });

    if (!response.ok) {
      throw new Error(response.error || "Unable to load conversations");
    }

    let mapped = (response.data || []).map(mapConversation);

    if (initialPeerUserId) {
      const existingConversation = mapped.find((conversation) => conversation.id === initialPeerUserId);

      if (!existingConversation) {
        mapped = [
          createDraftConversation(initialPeerUserId, initialPeerName, initialPeerAvatarUrl),
          ...mapped,
        ];
      } else {
        const safeInitialAvatarUrl = normalizeAvatarUrl(initialPeerAvatarUrl);

        mapped = mapped.map((conversation) =>
          conversation.id === initialPeerUserId
            ? {
                ...conversation,
                name: initialPeerName || conversation.name,
                avatarUrl: safeInitialAvatarUrl || conversation.avatarUrl,
              }
            : conversation,
        );
      }
    }

    let nextActiveConversationId = "";
    let shouldLoadHistoryForConversationId = "";

    setConversations((prev) => {
      const previousById = new Map(prev.map((conversation) => [conversation.id, conversation]));

      const merged = mapped.map((conversation) => {
        const previous = previousById.get(conversation.id);
        if (!previous) {
          return conversation;
        }

        return {
          ...conversation,
          messages: previous.messages,
        };
      });

      const preferredConversationId = activeConversationIdRef.current;
      const hasPreferredConversation = Boolean(
        preferredConversationId && merged.some((conversation) => conversation.id === preferredConversationId),
      );

      nextActiveConversationId = hasPreferredConversation
        ? preferredConversationId
        : (initialPeerUserId &&
            merged.find((conversation) => conversation.id === initialPeerUserId)?.id) ||
          merged[0]?.id ||
          "";

      const selectedConversation = merged.find(
        (conversation) => conversation.id === nextActiveConversationId,
      );

      if (selectedConversation && selectedConversation.messages.length === 0) {
        shouldLoadHistoryForConversationId = selectedConversation.id;
      }

      return merged;
    });

    if (nextActiveConversationId && nextActiveConversationId !== activeConversationIdRef.current) {
      setActiveConversationId(nextActiveConversationId);
    }

    if (!isDesktop && nextActiveConversationId && !options?.silent) {
      setShowMobileThread(true);
    }

    if (shouldLoadHistoryForConversationId) {
      await loadHistory(shouldLoadHistoryForConversationId);
    }
  }, [initialPeerAvatarUrl, initialPeerName, initialPeerUserId, isDesktop, loadHistory]);

  useEffect(() => {
    if (status !== "authenticated" || !token || !currentUserId) {
      return;
    }

    const socket = connectChatSocket(token);

    const onConnect = () => {
      setIsConnected(true);

      if (!hasLoadedInitialConversationsRef.current) {
        setIsLoading(true);
        loadConversations()
          .then(() => {
            hasLoadedInitialConversationsRef.current = true;
          })
          .catch((error) => {
            console.error("Failed to load chat conversations:", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
        return;
      }

      loadConversations({ silent: true }).catch((error) => {
        console.error("Failed to silently sync chat conversations:", error);
      });
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onMessage = (message: ChatMessageDto) => {
      const mine = message.senderId === currentUserId;
      const peerUserId = mine ? message.receiverId : message.senderId;
      const mappedMessage = mapMessage(message, currentUserId);
      const lastMessageLabel =
        message.content || ((message.attachments?.length || 0) > 0 ? "Sent an attachment" : "");

      setConversations((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === peerUserId);

        if (existingIndex < 0) {
          const draft = createDraftConversation(peerUserId);
          draft.lastMessage = lastMessageLabel;
          draft.lastMessageAt = toTimeLabel(message.createdAt);
          draft.messages = [mappedMessage];
          draft.unreadCount = mine ? 0 : 1;
          return [draft, ...prev];
        }

        const updated = [...prev];
        const current = updated[existingIndex];
        const exists = current.messages.some((item) => item.id === mappedMessage.id);
        const isActive = activeConversationIdRef.current === current.id;

        updated[existingIndex] = {
          ...current,
          lastMessage: lastMessageLabel,
          lastMessageAt: toTimeLabel(message.createdAt),
          unreadCount: !mine && !isActive ? current.unreadCount + 1 : current.unreadCount,
          messages: exists ? current.messages : [...current.messages, mappedMessage],
        };

        const [recent] = updated.splice(existingIndex, 1);
        return [recent, ...updated];
      });
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chat.message", onMessage);

    if (socket.connected) {
      onConnect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chat.message", onMessage);
      disconnectChatSocket();
    };
  }, [currentUserId, loadConversations, status, token]);

  const handleSelectConversation = async (id: string) => {
    setActiveConversationId(id);
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === id
          ? {
              ...conversation,
              unreadCount: 0,
            }
          : conversation,
      ),
    );

    try {
      await loadHistory(id);
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }

    if (!isDesktop) {
      setShowMobileThread(true);
    }
  };

  const handleSend = async (
    value: string,
    replyToId?: string,
    attachments?: ChatSendAttachmentInput[],
  ): Promise<boolean> => {
    if (!activeConversation || !isConnected) {
      return false;
    }

    setIsSending(true);

    try {
      const socket = getChatSocket();
      if (!socket) {
        throw new Error("Chat is disconnected");
      }

      const result = await emitWithAck<ChatSendAck>("chat.send", {
        receiverId: activeConversation.peerUserId,
        content: value,
        replyToId,
        attachments,
      });

      if (!result.ok) {
        throw new Error(result.error || "Unable to send message");
      }

      return true;
    } catch (error) {
      console.error("Failed to send message:", error);
      return false;
    } finally {
      setIsSending(false);
    }
  };

  const showListPane = isDesktop || !showMobileThread;
  const showThreadPane = isDesktop || showMobileThread;
  const mockUnreadCount = conversations.reduce((sum, item) => sum + item.unreadCount, 0);

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
                  <div className="mx-4 flex items-center gap-2 rounded-[12px] border border-neutral-50 bg-white px-3 py-2">
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
              currentUserId={currentUserId}
              myAvatarUrl={currentUserAvatarUrl}
              myName={currentUserName}
              onBack={() => setShowMobileThread(false)}
              onSend={handleSend}
              isSending={isSending}
              isConnected={isConnected}
              className="rounded-none border-0"
            />
          ) : null}

          {!isLoading && !activeConversation ? (
            <section className="flex h-full min-h-0 items-center justify-center border border-neutral-50 bg-white">
              <Typography variant="body-2" color="neutral-500">
                No conversations yet.
              </Typography>
            </section>
          ) : null}
        </div>
      </main>
    </div>
  );
}
