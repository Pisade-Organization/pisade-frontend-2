"use client"
import Image from "next/image"

export default function TutorFlagAndSubject({
    flagUrl,
    subject
}: {
    flagUrl: string
    subject: string
}) {
    return (
        <div className="flex justify-center items-center gap-x-2">
            
            {/* FLAG */}
            <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full overflow-hidden">
                <Image src={flagUrl} alt="Flag image" width={24} height={24} className="rounded-full w-4 h-4 lg:w-5 lg:h-5" />
            </div>

            {/* SUBJECT */}
            <div className="text-neutral-500 text-label-3 lg:text-body-2">
                {subject}
            </div>
        </div>
    )
}