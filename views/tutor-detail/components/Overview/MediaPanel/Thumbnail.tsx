"use client"
import Image from "next/image"
import { Play } from "lucide-react"
export default function Thumbnail({
    videoThumbnailUrl,
    videoUrl,
    fullName // for SEO Optimization in thumbnail
}: {
    videoThumbnailUrl: string
    videoUrl: string
    fullName: string
}) {
    return (
        <div className="cursor-pointer relative w-full aspect-video rounded-t-[8px]">
            <Image 
                src={videoThumbnailUrl} 
                alt={`Introduction video of ${fullName}`}
                fill
                className="object-cover w-full h-full rounded-t-[8px]"
                sizes="(min-width: 1024px) 567px, 100vw"
            />

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="shadow-md w-11 h-11 rounded-full bg-[#0B002B] bg-opacity-50 flex items-center justify-center">
                    <Play size={18} fill="white" color="white"/>
                </div>
            </div>
        </div>
    )
}