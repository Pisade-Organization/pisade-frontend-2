"use client"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { MessageCircle } from "lucide-react"
import BaseButton from "@/components/base/BaseButton"
import Typography from "@/components/base/Typography"

export default function Card({
    avatarUrl,
    fromTime,
    toTime,
    subject,
    tutorName
}: {
    avatarUrl: string
    fromTime: string
    toTime: string
    subject: string
    tutorName: string
}) {
    return (
        <div className="flex flex-col justify-center items-center rounded-xl border border-neutral-50 ">

            <Image 
                src={avatarUrl}
                alt={`Profile picture of ${tutorName}`}
                width={331}
                height={175}
                className="w-[220px] h-[124px] lg:w-[331px] lg:h-[175px] rounded-t-xl"
            />

            <div className="w-full flex flex-col items-start py-2 px-3 lg:py-3 lg:px-4 gap-3 bg-white rounded-b-xl">

                {/* Mobile: order-1, Desktop: order-2 */}
                <Typography variant={{ base: "title-3", lg: "title-1" }} color="neutral-900" className="order-1 lg:order-2">
                    {subject} with {tutorName.split(' ')[0]}
                </Typography>

                {/* Mobile: order-2, Desktop: order-1 */}
                <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-500" className="order-2 lg:order-1">
                    {fromTime} - {toTime}
                </Typography>

                {/* Mobile: order-3, Desktop: order-3 */}
                <div className="flex justify-center items-center gap-2 order-3">
                    <Image 
                        src={avatarUrl}
                        alt={`Profile picture of ${tutorName}`}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                    />

                    <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-500">
                        {tutorName}
                    </Typography>
                </div>
            </div>


        </div>
    )
}