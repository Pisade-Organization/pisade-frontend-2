"use client"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function TutorAvatar({
    avatarUrl,
    fullName,
    className
}: {
    avatarUrl: string
    fullName: string
    className?: string
}) {
    const [currentSrc, setCurrentSrc] = useState(avatarUrl || "/images/avatars/default-avatar.svg")

    useEffect(() => {
        setCurrentSrc(avatarUrl || "/images/avatars/default-avatar.svg")
    }, [avatarUrl])

    return (
        <div className={cn("relative w-20 h-20 lg:w-48 lg:h-48 shrink-0 rounded-full",
            className
        )}>
            <div className="relative z-10 h-full w-full overflow-hidden rounded-full bg-neutral-200">
                <img
                    src={currentSrc}
                    alt={`Tutor profile of ${fullName}`}
                    className="h-full w-full object-cover"
                    onError={() => {
                        if (currentSrc !== "/images/avatars/default-avatar.svg") {
                            setCurrentSrc("/images/avatars/default-avatar.svg")
                        }
                    }}
                />
            </div>

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
