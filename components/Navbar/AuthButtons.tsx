"use client"

import { useTranslations } from "next-intl"
import BaseButton from "../base/BaseButton"

interface AuthButtonsProps {
  onSigninClick: () => void
  onBecomeTutorClick: () => void
}

export default function AuthButtons({ onSigninClick, onBecomeTutorClick }: AuthButtonsProps) {
  const t = useTranslations("nav")
  return (
    <>
      <BaseButton
        variant="secondary"
        typeStyle="outline"
        className="text-white border-white/50 hover:bg-transparent"
        onClick={onBecomeTutorClick}
      >
        {t("becomeTutor")}
      </BaseButton>
      <BaseButton onClick={onSigninClick}>{t("signIn")}</BaseButton>
    </>
  )
}

