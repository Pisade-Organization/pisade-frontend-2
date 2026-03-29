export interface ChatConversationPeerUser {
  id: string;
  role: "STUDENT" | "TUTOR" | "ADMIN";
  fullName: string;
  avatarUrl: string | null;
}

export interface ChatConversationLastMessage {
  id: string;
  senderId: string;
  receiverId: string;
  lessonId: string | null;
  content: string | null;
  type: string;
  createdAt: string;
  read: boolean;
}

export interface ChatConversationDto {
  peerUser: ChatConversationPeerUser;
  lastMessage: ChatConversationLastMessage;
  unreadCount: number;
  lastActiveAt: string;
}

export interface ChatMessageDto {
  id: string;
  lessonId: string | null;
  senderId: string;
  receiverId: string;
  content: string | null;
  type: string;
  createdAt: string;
  read: boolean;
  replyToId?: string | null;
  replyTo?: {
    id: string;
    senderId: string;
    content: string | null;
    createdAt: string;
  } | null;
  attachments?: ChatAttachmentDto[];
}

export interface ChatAttachmentDto {
  id: string;
  kind: "IMAGE" | "FILE";
  mimeType: string;
  originalName: string;
  sizeBytes: number;
  storageKey: string;
  signedUrl: string;
  createdAt: string;
}

export interface ChatConversationsAck {
  ok: boolean;
  data?: ChatConversationDto[];
  error?: string;
}

export interface ChatHistoryAck {
  ok: boolean;
  data?: ChatMessageDto[];
  nextCursor?: string;
  error?: string;
}

export interface ChatSendAck {
  ok: boolean;
  id?: string;
  error?: string;
}

export interface ChatSendAttachmentInput {
  kind: "IMAGE" | "FILE";
  mimeType: string;
  originalName: string;
  sizeBytes: number;
  storageKey: string;
}
