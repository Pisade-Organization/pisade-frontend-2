
"use client"
import Typography from "@/components/base/Typography"
import { useState } from "react"

export default function TutorBio({ bio }: { bio: string }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const shouldTruncate = bio.length > 200
    const displayText = isExpanded ? bio : bio.substring(0, 200)

    return (
        <div className="w-full">
            <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-500">
                {displayText}
                {shouldTruncate && !isExpanded && "..."}
            </Typography>
            {shouldTruncate && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-body-3 lg:text-body-2 text-neutral-500 underline transition-colors "
                >
                    {isExpanded ? "Show less" : "Learn more"}
                </button>
            )}
        </div>
    )
}