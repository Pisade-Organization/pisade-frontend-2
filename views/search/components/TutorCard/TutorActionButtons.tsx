import { cn } from "@/lib/utils"
import { Calendar } from "lucide-react"
import { Heart } from "lucide-react"
import { MessageCircle } from "lucide-react"
import BaseButton from "@/components/base/BaseButton"

export default function TutorActionButtons({
    className
}: { 
    className?: string
}) {
    return (
        <div className={cn("w-full flex justify-between lg:justify-end items-center gap-x-2" , className)}>
            
            <div className="flex justify-center items-center gap-x-1">
                <Calendar size={44} className="p-[10px] text-neutral-700"/>

                <Heart size={44} className="p-[10px] text-neutral-700"/>

                <MessageCircle size={44} className="p-[10px] text-neutral-700"/>
            </div>

            <BaseButton>
                Book lesson
            </BaseButton>
        </div>
    )
}