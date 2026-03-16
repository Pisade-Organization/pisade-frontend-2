"use client"

import { useSearchParams } from "next/navigation"
import ChatPage from "@/views/chat/pages/Chat"

export default function MessagesPage() {
  const searchParams = useSearchParams()
  const roleParam = searchParams.get("role")
  const role = roleParam === "tutor" ? "tutor" : "student"

  return <ChatPage role={role} />
}
