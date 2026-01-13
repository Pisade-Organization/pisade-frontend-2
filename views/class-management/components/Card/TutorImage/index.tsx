import Image from "next/image";

interface TutorImageI {
  avatarUrl: string;
}

export default function TutorImage({ avatarUrl }: TutorImageI ) {
  return (
    <Image 
      src={avatarUrl}
      alt="Tutor avatar"
      className="w-[100px] h-[100px] lg:w-[264px] lg:h-[149px] rounded-lg lg:rounded-xl"
    />
  )
}