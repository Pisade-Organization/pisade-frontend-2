import Image from "next/image"
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
        <div className="flex flex-col justify-between items-center gap-y-1">
            {/* NAME + FLAG */}
            <div className="flex justify-center items-center gap-x-3">
                {/* FULL NAME */}
                <div className="text-title-2 lg:text-headline-4 text-neutral-900">
                    { fullName }
                </div>

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
            <div className="w-full text-left text-body-3 lg:text-label-2 text-neutral-500">
                {subject}
            </div>
        </div>


    )
}