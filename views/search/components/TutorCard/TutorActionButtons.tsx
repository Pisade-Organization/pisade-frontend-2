"use client";

import { cn } from "@/lib/utils"
import { Calendar } from "lucide-react"
import { Heart } from "lucide-react"
import { MessageCircle } from "lucide-react"
import BaseButton from "@/components/base/BaseButton"
import { useRouter } from "next/navigation"
import { startTransition } from "react"
import useMediaQuery from "@/hooks/useMediaQuery"

interface TutorActionButtonsProps {
    className?: string;
    tutorId: string;
}

export default function TutorActionButtons({
    className,
    tutorId
}: TutorActionButtonsProps) {
    const router = useRouter();
    const isDesktop = useMediaQuery("(min-width: 1024px)")

    const handleBookLessonClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering parent card clicks
        
        if (isDesktop) {
            // On desktop: use startTransition for non-blocking navigation
            startTransition(() => {
                router.replace(`/book/${tutorId}`);
            });
        } else {
            // On mobile: use normal navigation
            router.push(`/book/${tutorId}`);
        }
    };

    return (
        <div className={cn("w-full flex justify-between lg:justify-end items-center gap-x-2" , className)}>
            
            <div className="flex justify-center items-center gap-x-1">
                <Calendar size={44} className="p-[10px] text-neutral-700"/>

                <Heart size={44} className="p-[10px] text-neutral-700"/>

                <MessageCircle size={44} className="p-[10px] text-neutral-700"/>
            </div>

            <BaseButton onClick={handleBookLessonClick}>
                Book lesson
            </BaseButton>
        </div>
    )
}
