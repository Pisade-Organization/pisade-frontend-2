"use client"
import { Zap } from "lucide-react"

export default function AvailableNowBadge({
    isActive
}: {
    isActive: boolean
}) {
    return (
        <div className="flex justify-center items-center py-[2px] px-2 gap-x-1 border border-deep-royal-indigo-50 rounded-[22px]">
            <Zap size={14} color="#3BA55C" fill="#3BA55C"/>

            <div className="text-body-4 lg:text-body-2 text-[#3BA55C]">Available now</div>
        </div>
    )
}