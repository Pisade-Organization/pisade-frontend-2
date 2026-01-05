import Typography from "@/components/base/Typography";
import Image from "next/image";

interface TutorMetaI {
  fullName: string;
  subject: string;
  countryUrl: string;
}

export default function TutorMeta({
  fullName,
  subject,
  countryUrl
}: TutorMetaI) {
  return (
    <div className="w-full flex flex-col gap-1">
      <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-900">
        { fullName }
      </Typography>

      <div className="flex justify-start items-center gap-2">
        <Image 
          width={18}
          height={18}
          className="rounded-full"
          src={countryUrl}
          alt="Country Flag"
        />

        <Typography variant="body-2" color="neutral-500">
          { subject }
        </Typography>
      </div>
    </div>
  )
}