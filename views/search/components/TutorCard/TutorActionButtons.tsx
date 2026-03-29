"use client";

import { cn } from "@/lib/utils"
import { Calendar } from "lucide-react"
import { Heart } from "lucide-react"
import { MessageCircle } from "lucide-react"
import BaseButton from "@/components/base/BaseButton"
import AuthRequiredModal from "@/components/dialogs/AuthRequiredModal"
import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { startTransition, useState } from "react"
import useMediaQuery from "@/hooks/useMediaQuery"

interface TutorActionButtonsProps {
    className?: string;
    tutorId: string;
    tutorUserId?: string;
    tutorFullName?: string;
    tutorAvatarUrl?: string;
}

export default function TutorActionButtons({
    className,
    tutorId,
    tutorUserId,
    tutorFullName,
    tutorAvatarUrl,
}: TutorActionButtonsProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { status } = useSession()
    const isDesktop = useMediaQuery("(min-width: 1024px)")
    const locale = pathname.split("/")[1] || "en";
    const bookingPath = `/${locale}/bookings/${tutorId}`;
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

    const handleBookLessonClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering parent card clicks

        if (status !== "authenticated") {
            setIsAuthModalOpen(true)
            return
        }
        
        if (isDesktop) {
            // On desktop: use startTransition for non-blocking navigation
            startTransition(() => {
                router.replace(bookingPath);
            });
        } else {
            // On mobile: use normal navigation
            router.push(bookingPath);
        }
    };

    const handleMessageClick = (e: React.MouseEvent) => {
        e.stopPropagation()

        if (status !== "authenticated") {
            setIsAuthModalOpen(true)
            return
        }

        if (!tutorUserId) {
            return
        }

        const query = new URLSearchParams({
            peerUserId: tutorUserId,
            ...(tutorFullName ? { peerName: tutorFullName } : {}),
            ...(tutorAvatarUrl ? { peerAvatarUrl: tutorAvatarUrl } : {}),
        })

        router.push(`/${locale}/messages?${query.toString()}`)
    }

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation()

        if (status !== "authenticated") {
            setIsAuthModalOpen(true)
        }
    }

    return (
        <>
            <div className={cn("w-full flex justify-between lg:justify-end items-center gap-x-2" , className)}>
                
                <div className="flex justify-center items-center gap-x-1">
                    <button type="button" aria-label="Open tutor schedule" onClick={(e) => e.stopPropagation()}>
                        <Calendar size={44} className="p-[10px] text-neutral-700"/>
                    </button>

                    <button type="button" aria-label="Add tutor to favorites" onClick={handleFavoriteClick}>
                        <Heart size={44} className="p-[10px] text-neutral-700"/>
                    </button>

                    <button type="button" aria-label="Message tutor" onClick={handleMessageClick}>
                        <MessageCircle size={44} className="p-[10px] text-neutral-700"/>
                    </button>
                </div>

                <BaseButton onClick={handleBookLessonClick}>
                    Book lesson
                </BaseButton>
            </div>

            <AuthRequiredModal
                open={isAuthModalOpen}
                onOpenChange={setIsAuthModalOpen}
                tutorAvatarUrl={tutorAvatarUrl}
            />
        </>
    )
}
