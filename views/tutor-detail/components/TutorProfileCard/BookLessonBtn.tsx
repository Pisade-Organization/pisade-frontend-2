"use client";

import BaseButton from "@/components/base/BaseButton";
import AuthRequiredModal from "@/components/dialogs/AuthRequiredModal";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { startTransition, useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

interface BookLessonBtnProps {
    tutorId: string;
    tutorAvatarUrl?: string;
}

export default function BookLessonBtn({ tutorId, tutorAvatarUrl }: BookLessonBtnProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { status } = useSession()
    const isDesktop = useMediaQuery("(min-width: 1024px)")
    const locale = pathname.split("/")[1] || "en";
    const bookingPath = `/${locale}/bookings/${tutorId}`;
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

    const handleClick = (e: React.MouseEvent) => {
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

    return (
        <>
            <BaseButton className="w-full" onClick={handleClick}>
                Book lesson
            </BaseButton>

            <AuthRequiredModal
                open={isAuthModalOpen}
                onOpenChange={setIsAuthModalOpen}
                tutorAvatarUrl={tutorAvatarUrl}
            />
        </>
    );
}
