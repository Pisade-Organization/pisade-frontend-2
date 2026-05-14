"use client"

import { useEffect, useState } from "react"
import { resolveMediaUrl } from "@/lib/media"

export default function UserAvatar({ avatarUrl, fullName, size = 44, className = "" }: { avatarUrl?: string; fullName?: string; size?: number; className?: string }) {
  const initials = (fullName || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
  const resolvedAvatarUrl = resolveMediaUrl(avatarUrl)
  const [showInitials, setShowInitials] = useState(!resolvedAvatarUrl)

  useEffect(() => {
    setShowInitials(!resolvedAvatarUrl)
  }, [resolvedAvatarUrl])

  return (
    <div
      className={`relative rounded-full overflow-hidden bg-neutral-200 text-neutral-700 flex items-center justify-center text-xs font-medium flex-shrink-0 ${className}`.trim()}
      style={{ width: size, height: size }}
    >
      {showInitials ? <span className="select-none">{initials}</span> : null}
      {resolvedAvatarUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolvedAvatarUrl}
          alt={fullName ? `${fullName} Profile picture` : "Profile picture"}
          className="absolute inset-0 w-full h-full object-cover"
          onLoad={() => setShowInitials(false)}
          onError={() => setShowInitials(true)}
        />
      )}
    </div>
  )
}
