"use client"
import Image from "next/image"
import { cn } from "@/lib/utils"
export default function TutorAvatar({
    fullName,
    avatarUrl,
    isActive,
    className
}: {
    fullName: string,
    avatarUrl: string,
    isActive: boolean,
    className?: string
}) {
    return (
        <div className={cn("relative w-16 h-16 lg:w-24 lg:h-24 shrink-0 rounded-full",
            className
        )}>
            <Image
                src={avatarUrl}
                width={96}
                height={96}
                alt={`Tutor profile of ${fullName}`}
                className="rounded-full w-16 h-16 lg:w-24 lg:h-24 object-cover relative z-10"
            />
            {isActive && (
                <div className="absolute top-2 lg:top-3 left-0 w-[10px] h-[10px] lg:w-4 lg:h-4 bg-green-600 rounded-full border-2 border-white z-20" />
            )}
        </div>

    )
}