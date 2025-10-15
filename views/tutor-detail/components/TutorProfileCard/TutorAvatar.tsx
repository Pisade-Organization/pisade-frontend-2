"use client"
import Image from "next/image"

export default function TutorAvatar({
    avatarUrl,
    fullName,
}: {
    avatarUrl: string
    fullName: string
}) {
    return (
        <div className="relative w-20 h-20 lg:w-48 lg:h-48 shrink-0 rounded-full">
            <Image
                src={avatarUrl}
                width={192}
                height={192}
                alt={`Tutor profile of ${fullName}`}
                className="rounded-full w-20 h-20 lg:w-48 lg:h-48 object-cover relative z-10"
            />

            <div 
            className="
                w-4 h-4 lg:w-5 lg:h-5
                border-2 border-white
                rounded-full 
                absolute
                bg-green-600
                left-1 top-1 lg:left-7 lg:top-2
                z-20
            "
            
            ></div>
        </div>
    )
}