

"use client"

import { useState } from "react"
import useMediaQuery from "@/hooks/useMediaQuery"

export default function AboutBody({
    text
}: {
    text: string
}) {
    const isDesktop = useMediaQuery("(min-width: 1024px)")
    const isMobile = !isDesktop
    const [isExpanded, setIsExpanded] = useState(false)

    const shouldTruncate = isMobile && text && text.length > 300 && !isExpanded
    const displayedText = shouldTruncate ? `${text.slice(0, 300)}…` : text

    return (
        <div className="text-neutral-500 text-body-3 lg:text-body-2">
            {displayedText}
            {isMobile && text && text.length > 300 && !isExpanded && (
                <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    className="ml-1 underline text-neutral-700"
                >
                    Learn more
                </button>
            )}
        </div>
    )
}
