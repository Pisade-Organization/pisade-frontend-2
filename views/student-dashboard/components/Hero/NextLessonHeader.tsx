"use client"
import Image from "next/image"
export default function NextLessonHeader({
    lessonTitle,
    tutorName,
    avatarUrl
}: {
    lessonTitle: string,
    tutorName: string,
    avatarUrl: string
}) {
    return (
        <div className="flex flex-col justify-center items-start gap-1">

            <div className="text-body-4 text-white opacity-80">
                Next lesson
            </div>

            <h1 className="text-headline-5 text-white">
                {lessonTitle} (50-min lesson)
            </h1>

            <div className="flex justify-center items-center py-[2px] gap-2">
                <Image 
                    src={avatarUrl}
                    alt={`Profile picture of ${tutorName}`}
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full"
                />

                <h2 className="text-body-3 text-white opacity-80">
                    {tutorName}
                </h2>

            </div>

        </div>
    )
}