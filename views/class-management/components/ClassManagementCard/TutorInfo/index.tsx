import Image from "next/image"
import Typography from "@/components/base/Typography"

interface TutorInfoI {
  avatarUrl: string;
  fullName: string;
}

export default function TutorInfo({ avatarUrl, fullName }: TutorInfoI ) {
  return (
    <div className="w-full inline-flex justify-start gap-2">

      <div className="relative rounded-full w-[18px] h-[18px] lg:w-[23px] lg:h-[23px]">
        <Image 
          src={avatarUrl}
          fill
          alt="Tutor avatar"
          className="rounded-full object-cover"
        />
      </div>

      <Typography variant={{ base: "body-4", lg: "body-2" }} color="neutral-500">
        { fullName }
      </Typography>
    </div>
  )
}