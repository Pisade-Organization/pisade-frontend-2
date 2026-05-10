"use client"

import { useState } from "react"
import Image from "next/image"

export default function UserAvatar({ avatarUrl, fullName, size = 44, className = "" }: { avatarUrl?: string; fullName?: string; size?: number; className?: string }) {
  const [imageFailed, setImageFailed] = useState(false)
  const initials = (fullName || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

  if (!avatarUrl || imageFailed) {
    return (
      <div className={`rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center text-xs font-medium ${className}`.trim()} style={{ width: size, height: size }}>
        {initials || ""}
      </div>
    )
  }

  return (
    <Image
      src={avatarUrl}
      alt={fullName ? `${fullName} Profile picture` : "Profile picture"}
      width={size}
      height={size}
      className={`rounded-full ${className}`.trim()}
      style={{ width: size, height: size }}
      onError={() => setImageFailed(true)}
    />
  )
}
