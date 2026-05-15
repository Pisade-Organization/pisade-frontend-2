"use client";

import { useTranslations } from "next-intl";
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
  const t = useTranslations("booking");
  return (
    <BaseButton
      className="w-full"
      onClick={onContinue}
      disabled={disabled || isLoading}
    >
      {isLoading ? t("continuing") : t("continue")}
    </BaseButton>
  );
}
