"use client"

import { useSearchParams } from "next/navigation"
import ChatPage from "@/views/chat/pages/Chat"

export default function MessagesPage() {
  const searchParams = useSearchParams()
  const roleParam = searchParams.get("role")
  const peerUserId = searchParams.get("peerUserId") ?? undefined
  const peerName = searchParams.get("peerName") ?? undefined
  const peerAvatarUrl = searchParams.get("peerAvatarUrl") ?? undefined
  const role = roleParam === "tutor" ? "tutor" : "student"

  return (
    <ChatPage
      role={role}
      initialPeerUserId={peerUserId}
      initialPeerName={peerName}
      initialPeerAvatarUrl={peerAvatarUrl}
    />
  )
}
