"use client";

import BaseButton from "@/components/base/BaseButton";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

interface BookLessonBtnProps {
    tutorId: string;
}

export default function BookLessonBtn({ tutorId }: BookLessonBtnProps) {
    const router = useRouter();
    const isDesktop = useMediaQuery("(min-width: 1024px)")

    const handleClick = (e: React.MouseEvent) => {
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
        <BaseButton className="w-full" onClick={handleClick}>
            Book lesson
        </BaseButton>
    );
}
