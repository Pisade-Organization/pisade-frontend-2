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
                width={567} 
                height={320} 
                src={videoThumbnailUrl} 
                alt={`Introduction video of ${fullName}`}
                className="w-[343px] h-[194px] lg:w-[567px] lg:h-[320px] rounded-t-[8px]"
            />

            <div className="absolute w-11 h-11 rounded-full bg-[#0B002B] bg-opacity-50">
                <Play size={28} fill="white" color="white"/>
            </div>
        </div>
    )
}