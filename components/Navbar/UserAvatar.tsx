import Image from "next/image"

export default function UserAvatar({ avatarUrl, fullName }: { avatarUrl?: string; fullName?: string }) {
  if (!avatarUrl) return null
  return (
    <Image
      src={avatarUrl}
      alt={fullName ? `${fullName} Profile picture` : "Profile picture"}
      width={32}
      height={32}
      className="rounded-full w-8 h-8"
    />
  )
}


