import Image from "next/image"

export default function UserAvatar({ avatarUrl, fullName }: { avatarUrl?: string; fullName?: string }) {
  const initials = (fullName || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

  if (!avatarUrl) {
    return (
      <div className="rounded-full w-8 h-8 bg-neutral-200 text-neutral-700 flex items-center justify-center text-xs font-medium">
        {initials || ""}
      </div>
    )
  }

  return (
    <Image
      src={avatarUrl}
      alt={fullName ? `${fullName} Profile picture` : "Profile picture"}
      width={32}
      height={32}
      className="rounded-full w-8 h-8 "
    />
  )
}


