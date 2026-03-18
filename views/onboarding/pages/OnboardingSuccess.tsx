"use client"

import { usePathname, useRouter } from "next/navigation"
import { SuccessOnboardingBoxIcon } from "@/components/icons"
import Typography from "@/components/base/Typography"
import Navbar from "../component/Navbar"

export default function OnboardingSuccessPage() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = pathname?.split("/")?.[1]
  const safeLocale = locale === "en" || locale === "th" ? locale : "en"

  return (
    <div className="min-h-screen bg-[#F9F7FB] flex flex-col">
      <Navbar />
      <div className="flex-1 w-full pb-10 px-3 gap-10 lg:pt-8 lg:pb-20 lg:px-20 flex flex-col justify-center items-center bg-[#F9F7FB]">

        <div className="flex flex-col justify-center items-center">
          <SuccessOnboardingBoxIcon className="w-[200px] h-[200px]" />
          <div className="flex flex-col gap-2">
            <Typography className="text-center" variant={{ base: "title-1", lg: "headline-4" }} color="neutral-900">Thank you for completing registration!</Typography>
            <Typography className="text-center" variant={{ base: "body-3", lg: "body-2" }} color="neutral-500">We've received your application and are currently reviewing it. <br/>You will receive an email with the status of your application within 5 business days.</Typography>
          </div>
        </div>

      </div>
      
    </div>
  )
}
