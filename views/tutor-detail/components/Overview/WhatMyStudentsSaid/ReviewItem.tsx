"use client"
import Image from "next/image"
import { Star } from "lucide-react"
export default function ReviewItem({
    avatarUrl,
    fullName,
    avgRating,
    review
}: {
    avatarUrl: string
    fullName: string
    avgRating: number
    review: string
}) {
    return (
        <div className="flex flex-col justify-center items-start gap-y-3">
            {/* AVATAR + NAME + STARS */}
            <div className="flex justify-center items-center gap-x-[10px]">
                <Image 
                    src={avatarUrl} 
                    alt={`${fullName}'s profile picture`} 
                    width={47}
                    height={47}
                    className="rounded-full" 
                />

                <div className="flex flex-col justify-center items-start gap-y-1">
                    
                    <div className="text-title-2 text-neutral-900">
                        { fullName }
                    </div>

                    <div className="flex justify-center items-center gap-x-1">
                    {[...Array(Math.floor(avgRating))].map((_, idx) => (
                        <Star key={idx} fill="#FFB130" color="#FFB130" size={20} />
                    ))}
                    {avgRating - Math.floor(avgRating) >= 0.5 && (
                        <Star
                            key="half"
                            fill="url(#half-gradient)"
                            color="#FFB130"
                            size={20}
                        >
                            <svg width="0" height="0">
                                <defs>
                                    <linearGradient id="half-gradient">
                                        <stop offset="50%" stopColor="#FFB130" />
                                        <stop offset="50%" stopColor="white" stopOpacity="1" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </Star>
                    )}
                    </div>

                </div>
            </div>

            {/* REVIEW TEXT */}
            <div className="text-body-2 text-neutral-600">
                {review}
            </div>
        </div>
    )
}