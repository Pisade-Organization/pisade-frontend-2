"use client"
import { ChevronLeft } from "lucide-react"
import Typography from "@/components/base/Typography"
import { useRouter } from "next/navigation"

export default function AccountSettingsHeader() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="w-full flex justify-start items-center lg:gap-4">
      <button 
        onClick={handleBack}
        className="rounded-lg bg-white p-[10px] flex justify-center items-center hover:opacity-80 transition-opacity cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6 text-neutral-700"/>
      </button>
      <Typography variant={{ base: "headline-5", lg: "headline-3" }} color="neutral-900">
        Account Settings
      </Typography>
    </div>
  )
}