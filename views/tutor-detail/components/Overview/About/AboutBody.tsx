

"use client"

import { useState } from "react"
import useMediaQuery from "@/hooks/useMediaQuery"

export default function AboutBody({
    about
}: {
    about: string
}) {
    const isDesktop = useMediaQuery("(min-width: 1024px)")
    const isMobile = !isDesktop
    const [isExpanded, setIsExpanded] = useState(false)

    const shouldTruncate = isMobile && about && about.length > 300 && !isExpanded
    const displayedText = shouldTruncate ? `${about.slice(0, 300)}…` : about

    return (
        <div className="text-neutral-500 text-body-3 lg:text-body-2">
            {displayedText}
            {isMobile && about && about.length > 300 && !isExpanded && (
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
