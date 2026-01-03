import Image from "next/image";

interface TutorAvatarI {
  avatarUrl: string;
}

export default function TutorAvatar({
  avatarUrl
}: TutorAvatarI) {
  return (
    <Image 
      src={avatarUrl}
      alt="Tutor avatar"
      className="w-20 h-20 rounded-xl lg:w-[72px] lg:h-[72px] lg:rounded-full"
    />
  )
}