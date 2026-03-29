import { useEffect, useState } from "react"
import Typography from "@/components/base/Typography"
import type { ChatMessage } from "../mock"

interface MessageBubbleProps {
  message: ChatMessage
  myAvatarUrl?: string
  myName?: string
  peerAvatarUrl?: string
  peerName: string
  showAvatar?: boolean
  timeLabel?: string
  onReply?: (message: ChatMessage) => void
}

function getInitials(name?: string) {
  if (!name) return ""

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

function formatAttachmentSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function MessageBubble({
  message,
  myAvatarUrl,
  myName,
  peerAvatarUrl,
  peerName,
  showAvatar = false,
  timeLabel,
  onReply,
}: MessageBubbleProps) {
  const isMine = message.sender === "me"
  const avatarUrl = isMine ? myAvatarUrl : peerAvatarUrl
  const avatarName = isMine ? myName : peerName
  const initials = getInitials(avatarName)
  const [avatarLoadFailed, setAvatarLoadFailed] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [startX, setStartX] = useState<number | null>(null)
  const [activePointerId, setActivePointerId] = useState<number | null>(null)
  const [didReply, setDidReply] = useState(false)

  useEffect(() => {
    setAvatarLoadFailed(false)
  }, [avatarUrl])

  useEffect(() => {
    setDragOffset(0)
    setStartX(null)
    setActivePointerId(null)
    setDidReply(false)
  }, [message.id])

  const canSwipeToReply = !isMine && Boolean(onReply)

  return (
    <div
      className={`flex items-end gap-2 ${isMine ? "justify-end" : "justify-start"}`}
      onPointerDown={(event) => {
        if (!canSwipeToReply) return
        setStartX(event.clientX)
        setActivePointerId(event.pointerId)
        setDidReply(false)
      }}
      onPointerMove={(event) => {
        if (!canSwipeToReply || startX === null || activePointerId !== event.pointerId) return

        const deltaX = event.clientX - startX
        const nextOffset = Math.max(0, Math.min(deltaX, 44))
        setDragOffset(nextOffset)

        if (deltaX >= 36 && !didReply) {
          onReply?.(message)
          setDidReply(true)
        }
      }}
      onPointerUp={(event) => {
        if (activePointerId !== event.pointerId) return
        setDragOffset(0)
        setStartX(null)
        setActivePointerId(null)
      }}
      onPointerCancel={() => {
        setDragOffset(0)
        setStartX(null)
        setActivePointerId(null)
      }}
    >
      {!isMine && showAvatar ? (
        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border-[1.5px] border-white bg-neutral-100">
          {avatarUrl && !avatarLoadFailed ? (
            <img
              src={avatarUrl}
              alt={avatarName ? `${avatarName} profile picture` : "Profile picture"}
              className="h-full w-full object-cover"
              onError={() => setAvatarLoadFailed(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold text-neutral-700">
              {initials}
            </div>
          )}
        </div>
      ) : null}

      <div
        className="flex max-w-[85%] flex-col gap-1 transition-transform duration-100 lg:max-w-[70%]"
        style={!isMine ? { transform: `translateX(${dragOffset}px)` } : undefined}
      >
        {timeLabel ? (
          <Typography variant="body-4" color="neutral-300" className="text-right">
            {timeLabel}
          </Typography>
        ) : null}
        {message.replyTo ? (
          <div className={`rounded-[10px] p-3 ${isMine ? "bg-white/20" : "bg-neutral-25"}`}>
            <Typography variant="body-4" color={isMine ? "white" : "neutral-400"} className="mb-1">
              {message.replyTo.sender === "me" ? "You" : peerName}
            </Typography>
            <Typography
              variant="body-3"
              color={isMine ? "white" : "neutral-800"}
              className="leading-relaxed"
            >
              {message.replyTo.text}
            </Typography>
          </div>
        ) : null}
        {message.attachments && message.attachments.length > 0 ? (
          <div className="mb-2 grid gap-2">
            {message.attachments.map((attachment) => {
              const isImage = attachment.kind === "IMAGE"

              if (isImage) {
                return (
                  <button
                    key={attachment.id}
                    type="button"
                    onClick={() => window.open(attachment.url, "_blank", "noopener,noreferrer")}
                    className="overflow-hidden rounded-[10px]"
                  >
                    <img
                      src={attachment.url}
                      alt={attachment.originalName}
                      className="max-h-48 w-full rounded-[10px] object-cover"
                    />
                  </button>
                )
              }

              return (
                <button
                  key={attachment.id}
                  type="button"
                  onClick={() => window.open(attachment.url, "_blank", "noopener,noreferrer")}
                  className={`flex items-center justify-between rounded-[10px] p-3 text-left ${
                    isMine ? "bg-white/20" : "bg-neutral-25"
                  }`}
                >
                  <div className="min-w-0">
                    <Typography variant="body-3" color={isMine ? "white" : "neutral-800"} className="truncate">
                      {attachment.originalName}
                    </Typography>
                    <Typography variant="body-4" color={isMine ? "white" : "neutral-400"}>
                      {formatAttachmentSize(attachment.sizeBytes)}
                    </Typography>
                  </div>
                </button>
              )
            })}
          </div>
        ) : null}
        {message.text ? (
          <div
            className={`rounded-[10px] p-3 ${
              isMine ? "bg-electric-violet-600 text-white" : "bg-white text-neutral-800"
            }`}
          >
            <Typography variant="body-3" color={isMine ? "white" : "neutral-800"} className="leading-relaxed">
              {message.text}
            </Typography>
          </div>
        ) : null}
      </div>

      {isMine && showAvatar ? (
        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border-[1.5px] border-white bg-neutral-100">
          {avatarUrl && !avatarLoadFailed ? (
            <img
              src={avatarUrl}
              alt={avatarName ? `${avatarName} profile picture` : "Profile picture"}
              className="h-full w-full object-cover"
              onError={() => setAvatarLoadFailed(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold text-neutral-700">
              {initials}
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
