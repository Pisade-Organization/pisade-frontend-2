import Image from "next/image"
import Typography from "@/components/base/Typography"
export default function TutorHeader({
    fullName,
    flagUrl,
    subject
}: {
    fullName: string,
    flagUrl: string,
    subject: string,
}) {
    return (
        <div className="w-full flex flex-col justify-center items-start gap-y-1">
            {/* NAME + FLAG */}
            <div className="flex justify-center items-center gap-x-3">
                {/* FULL NAME */}

                <Typography variant={{ base: "title-2", lg: "headline-4" }} color="neutral-900">
                    { fullName }
                </Typography>

                {/* FLAG */}
                <Image
                    src={flagUrl}
                    width={24}
                    height={24}
                    alt="Flag country"
                    className="border rounded-full w-6 h-6 object-cover relative z-10"
                />
            </div>

            {/* SUBJECT */}
            <Typography variant={{ base: "body-3", lg: "label-2" }} color="neutral-500">
                {subject}
            </Typography>

        </div>


    )
}