"use client"
import Typography from "@/components/base/Typography"
import Image from "next/image"
export default function NextLessonHeader({
    lessonTitle,
    tutorName,
    avatarUrl,
    headerText = "Next lesson"
}: {
    lessonTitle: string,
    tutorName: string,
    avatarUrl: string,
    headerText?: string
}) {
    return (
        <div className="flex flex-col justify-center items-start gap-1">

            <Typography variant="body-4" color="white" className="opacity-80">
                {headerText}
            </Typography>

            <Typography variant="headline-5" color="white">
                {lessonTitle} (50-min lesson)
            </Typography>

            <div className="flex justify-center items-center py-[2px] gap-2">
                <Image 
                    src={avatarUrl}
                    alt={`Profile picture of ${tutorName}`}
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full"
                />

                <Typography variant="body-3" color="white" className="opacity-80">
                    {tutorName}
                </Typography>

            </div>

        </div>
    )
}