export type ChatRole = "student" | "tutor";

export interface ChatMessage {
  id: string;
  sender: "me" | "them";
  text: string;
  time: string;
  createdAt: string;
  replyTo?: {
    id: string;
    sender: "me" | "them";
    text: string;
    createdAt: string;
  } | null;
  attachments?: ChatAttachment[];
}

export interface ChatAttachment {
  id: string;
  kind: "IMAGE" | "FILE";
  mimeType: string;
  originalName: string;
  sizeBytes: number;
  storageKey: string;
  url: string;
  createdAt: string;
}

export interface ChatConversation {
  id: string;
  peerUserId: string;
  name: string;
  avatarUrl: string;
  subtitle: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  isOnline: boolean;
  messages: ChatMessage[];
}
