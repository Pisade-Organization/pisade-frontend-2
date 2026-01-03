"use client"

import Typography from "@/components/base/Typography"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CheckoutMobileHeader() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="w-full flex justify-start items-center gap-3 py-3 px-4">
      <button 
        onClick={handleBack}
        className="flex justify-center items-center hover:opacity-80 transition-opacity cursor-pointer"
        aria-label="Go back"
      >
        <ChevronLeft size={24} className="text-neutral-700" />
      </button>
      <Typography variant="headline-5" color="neutral-900">
        Checkout
      </Typography>
    </div>
  )
}