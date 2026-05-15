"use client"
import BaseButton from "@/components/base/BaseButton"
import { usePathname, useRouter } from "next/navigation"

export default function ViewFullScheduleBtn() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = pathname?.split("/")[1]
  const localePrefix = locale === "en" || locale === "th" ? `/${locale}` : "/en"

  return (
    <BaseButton
      variant="secondary"
      typeStyle="outline"
      className="w-full lg:w-auto"
      onClick={() => router.push(`${localePrefix}/student/schedule`)}
    >
      View full schedule
    </BaseButton>
  )
}
