"use client"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { MessageCircle } from "lucide-react"
import BaseButton from "@/components/base/BaseButton"

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
        <div className="flex flex-col justify-center items-center rounded-[12px] border border-neutral-50">

            <Image 
                src={avatarUrl}
                alt={`Profile picture of ${tutorName}`}
                width={331}
                height={175}
                className="w-[220px] h-[124px] lg:w-[331px] lg:h-[175px]"
            />

            <div className="flex flex-col justify-center items-start gap-3 py-2 px-3">
                
                {/* Mobile: Subject first, Desktop: Time first */}
                <h1 className="text-title-3 lg:text-title-1 text-neutral-900 lg:order-2">
                    {subject} with {tutorName.split(' ')[0]}
                </h1>
                
                <h5 className="text-body-3 lg:text-body-2 text-neutral-500 lg:order-1">
                    {fromTime} - {toTime}
                </h5>

                <div className="flex justify-center items-center gap-2">
                    <Image 
                        src={avatarUrl}
                        alt={`Profile picture of ${tutorName}`}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                    />

                    <h5 className="text-body-3 lg:text-body-2 text-neutral-500">
                        {tutorName}
                    </h5>

                </div>
            </div>

            <div className="hidden lg:flex justify-between items-center ">
                
                <div className="flex justify-center items-center">
                    <button className="w-10 h-10 flex justify-center items-center">
                        <Calendar size={20} className="text-neutral-700" />
                    </button>

                    <button className="w-10 h-10 flex justify-center items-center">
                        <MessageCircle size={20} className="text-neutral-700" />
                    </button>

                </div>

                <BaseButton typeStyle="outline">
                    Join class
                </BaseButton>
                
            </div>

        </div>
    )
}