"use client";

import BaseButton from "@/components/base/BaseButton";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, startTransition } from "react";

interface BookLessonBtnProps {
    tutorId: string;
}

export default function BookLessonBtn({ tutorId }: BookLessonBtnProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        checkDesktop();
        window.addEventListener("resize", checkDesktop);
        return () => window.removeEventListener("resize", checkDesktop);
    }, []);

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