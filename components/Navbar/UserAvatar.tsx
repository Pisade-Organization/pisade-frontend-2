"use client"

export default function UserAvatar({ avatarUrl, fullName, size = 44, className = "" }: { avatarUrl?: string; fullName?: string; size?: number; className?: string }) {
  const initials = (fullName || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

  return (
    <div
      className={`relative rounded-full overflow-hidden bg-neutral-200 text-neutral-700 flex items-center justify-center text-xs font-medium flex-shrink-0 ${className}`.trim()}
      style={{ width: size, height: size }}
    >
      <span className="select-none">{initials}</span>
      {avatarUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl}
          alt={fullName ? `${fullName} Profile picture` : "Profile picture"}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = "none" }}
        />
      )}
    </div>
  )
}
