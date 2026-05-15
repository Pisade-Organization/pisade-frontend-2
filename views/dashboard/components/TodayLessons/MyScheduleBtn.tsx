"use client"
import { Calendar } from "lucide-react";
import BaseButton from "@/components/base/BaseButton";
import Typography from "@/components/base/Typography";
import { usePathname, useRouter } from "next/navigation";

export default function MyScheduleBtn() {
    const router = useRouter()
    const pathname = usePathname()
    const locale = pathname?.split("/")[1]
    const localePrefix = locale === "en" || locale === "th" ? `/${locale}` : "/en"

    return (
        <>
          {/* MOBILE */}
          <button className="lg:hidden" onClick={() => router.push(`${localePrefix}/student/schedule`)}>
            <Typography variant="label-2" color="electric-violet-600" underline>
              My Schedule
            </Typography>
          </button>


          {/* DESKTOP */}
          <BaseButton
              variant="secondary"
              className="hidden lg:flex"
              iconLeft={<Calendar />}
              onClick={() => router.push(`${localePrefix}/student/schedule`)}
          >
              My Schedule
          </BaseButton>
      </>
    )
}
