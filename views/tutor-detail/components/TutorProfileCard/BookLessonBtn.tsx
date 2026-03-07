"use client";

import BaseButton from "@/components/base/BaseButton";
import { usePathname, useRouter } from "next/navigation";
import { startTransition } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

interface BookLessonBtnProps {
    tutorId: string;
}

export default function BookLessonBtn({ tutorId }: BookLessonBtnProps) {
    const router = useRouter();
    const pathname = usePathname();
    const isDesktop = useMediaQuery("(min-width: 1024px)")
    const locale = pathname.split("/")[1] || "en";
    const bookingPath = `/${locale}/bookings/${tutorId}`;

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering parent card clicks
        
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
        <BaseButton className="w-full" onClick={handleClick}>
            Book lesson
        </BaseButton>
    );
}
