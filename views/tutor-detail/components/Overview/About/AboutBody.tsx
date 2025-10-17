

"use client"

import { useEffect, useState } from "react"

export default function AboutBody({
    about
}: {
    about: string
}) {
    const [isMobile, setIsMobile] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const updateIsMobile = () => setIsMobile(window.innerWidth < 1024)
        updateIsMobile()
        window.addEventListener("resize", updateIsMobile)
        return () => window.removeEventListener("resize", updateIsMobile)
    }, [])

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