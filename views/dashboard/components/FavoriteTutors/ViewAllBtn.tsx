"use client"
import BaseButton from "@/components/base/BaseButton"
import Typography from "@/components/base/Typography"
import { usePathname, useRouter } from "next/navigation"

export default function ViewAllBtn() { 
  const router = useRouter()
  const pathname = usePathname()
  const locale = pathname?.split("/")[1]
  const localePrefix = locale === "en" || locale === "th" ? `/${locale}` : "/en"

  return (
    <>
      {/* MOBILE */}
      <button className="lg:hidden" onClick={() => router.push(`${localePrefix}/student/tutors/favorites`)}>
        <Typography 
          variant={{ base: "label-2" }}
          color="electric-violet-600"
          underline
        >
          View all
        </Typography>

      </button>

      {/* DESKTOP */}
      <BaseButton
        variant="secondary"
        typeStyle="outline"
        className="hidden lg:flex"
        onClick={() => router.push(`${localePrefix}/student/tutors/favorites`)}
      >
        View all
      </BaseButton>
    </>
  )
}
