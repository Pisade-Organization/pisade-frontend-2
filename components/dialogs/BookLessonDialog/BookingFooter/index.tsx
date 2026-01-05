"use client";

import BaseButton from "@/components/base/BaseButton";
import { useRouter, usePathname } from "next/navigation";
import { startTransition } from "react";

interface BookingFooterProps {
  tutorId: string;
}

export default function BookingFooter({ tutorId }: BookingFooterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleContinue = () => {
    const locale = pathname.split("/")[1] || "en";
    const checkoutPath = `/${locale}/checkout/${tutorId}`;
    
    // Use startTransition for non-blocking navigation on desktop
    startTransition(() => {
      router.push(checkoutPath);
    });
  };

  return (
    <BaseButton 
      className="w-full"
      onClick={handleContinue}
    >
      Continue
    </BaseButton>
  );
}