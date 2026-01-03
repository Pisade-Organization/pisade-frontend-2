import Image from "next/image";

interface TutorAvatarI {
  avatarUrl: string;
}

export default function TutorAvatar({
  avatarUrl
}: TutorAvatarI) {
  return (
    <div className="relative w-20 h-20 lg:w-[72px] lg:h-[72px] shrink-0 rounded-xl lg:rounded-full overflow-hidden">
      <Image 
        src={avatarUrl}
        alt="Tutor avatar"
        fill
        className="object-cover"
      />
    </div>
  )
}