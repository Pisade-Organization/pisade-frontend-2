"use client"

import Typography from "@/components/base/Typography"
import useMediaQuery from "@/hooks/useMediaQuery"
import { ChevronLeft, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

export default function WalletHeader() {
  const router = useRouter()
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  if (isDesktop) {
    return (
      <Typography variant="headline-2" color="neutral-800">
        My Wallet
      </Typography>
    )
  }

  return (
    <div className="flex justify-between border-b border-[#F5F5F5]/20 px-4 py-3">
      <div className="flex items-center gap-[10px]">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex items-center justify-center"
        >
          <ChevronLeft size={24} className="text-neutral-700" />
        </button>
        <Typography variant="headline-5" color="neutral-900">
          My Wallet
        </Typography>
        <Eye size={20} className="text-neutral-300" />
      </div>
    </div>
  )
}
