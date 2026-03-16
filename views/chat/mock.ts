export type ChatRole = "student" | "tutor"

export interface ChatMessage {
  id: string
  sender: "me" | "them"
  text: string
  time: string
}

export interface ChatConversation {
  id: string
  name: string
  avatarUrl: string
  subtitle: string
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
  isOnline: boolean
  messages: ChatMessage[]
}

export const mockConversations: ChatConversation[] = [
  {
    id: "conv-1",
    name: "Alana Somchai Degrey",
    avatarUrl: "https://i.pravatar.cc/120?img=9",
    subtitle: "English Coach",
    lastMessage:
      "Hi there! Our company provides null services. Please visit our website for more information about our services, including our sitemap, FAQ page, and more. Thank you for your interest in our company!",
    lastMessageAt: "1 hour ago",
    unreadCount: 1,
    isOnline: true,
    messages: [
      { id: "m-1", sender: "them", text: "Hi! Ready for the next session?", time: "09:58" },
      { id: "m-2", sender: "me", text: "Yes, I reviewed the homework.", time: "10:02" },
      {
        id: "m-3",
        sender: "them",
        text: "Great, let us continue with speaking drills tomorrow.",
        time: "10:24",
      },
    ],
  },
  {
    id: "conv-2",
    name: "Nhung Truong",
    avatarUrl: "https://i.pravatar.cc/120?img=32",
    subtitle: "Business English",
    lastMessage:
      "Hi there! Our company provides null services. Please visit our website for more information about our services, including our sitemap, FAQ page, and more.",
    lastMessageAt: "1 day ago",
    unreadCount: 0,
    isOnline: false,
    messages: [
      { id: "m-4", sender: "them", text: "Can we move this Friday class 30 minutes later?", time: "Yesterday" },
    ],
  },
  {
    id: "conv-3",
    name: "Quyen Le",
    avatarUrl: "https://i.pravatar.cc/120?img=25",
    subtitle: "IELTS Speaking",
    lastMessage: "Hi there! Our company provides null services.",
    lastMessageAt: "3 mins ago",
    unreadCount: 0,
    isOnline: true,
    messages: [
      { id: "m-5", sender: "me", text: "Thanks for the detailed feedback!", time: "Mon" },
      { id: "m-6", sender: "them", text: "I shared your feedback notes in the doc.", time: "Mon" },
    ],
  },
]
