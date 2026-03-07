"use client";

import BaseButton from "@/components/base/BaseButton";

interface BookingFooterProps {
  onContinue: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function BookingFooter({
  onContinue,
  disabled = false,
  isLoading = false,
}: BookingFooterProps) {
  return (
    <BaseButton 
      className="w-full"
      onClick={onContinue}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Continuing..." : "Continue"}
    </BaseButton>
  );
}
