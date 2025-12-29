import Image from "next/image"

interface AvatarI {
  avatarUrl: string;
}

export default function Avatar({ avatarUrl }: AvatarI) {
  return (
    <Image
      src={avatarUrl}
      alt="Avatar"
      width={24}
      height={24}
      className="rounded-full"
    />
  )
}