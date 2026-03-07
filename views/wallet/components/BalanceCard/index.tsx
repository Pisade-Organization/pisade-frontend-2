"use client"

import BaseButton from "@/components/base/BaseButton"
import Typography from "@/components/base/Typography"
import useMediaQuery from "@/hooks/useMediaQuery"
import { Eye, Info } from "lucide-react"
import type { WalletRole } from "@/views/wallet/types"

interface BalanceCardProps {
  availableBalance: number
  temporarilyHold: number
  role: WalletRole
}

export default function BalanceCard({
  availableBalance,
  temporarilyHold,
  role,
}: BalanceCardProps) {
  const ctaLabel = role === "student" ? "Top-up" : "Withdraw"
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  if (isDesktop) {
    return (
      <section className="flex w-full items-center gap-6 rounded-[12px] border border-deep-royal-indigo-50 px-7 py-4">
        <Eye className="h-7 w-7 text-neutral-100" />

        <div className="h-[54px] w-px rounded-[12px] bg-deep-royal-indigo-50" />

        <div className="flex min-w-[220px] flex-1 flex-col gap-2 px-2">
          <Typography variant="body-3" color="neutral-500">
            Available balance
          </Typography>
          <Typography variant="headline-4" color="neutral-800">
            ฿{availableBalance}
          </Typography>
        </div>

        <div className="h-[54px] w-px rounded-[12px] bg-deep-royal-indigo-50" />

        <div className="flex min-w-[220px] flex-1 flex-col gap-2 px-2">
          <div className="flex items-center gap-1">
            <Typography variant="body-3" color="neutral-500">
              Temporarily hold
            </Typography>
            <Info className="h-4 w-4 text-neutral-100" />
          </div>
          <Typography variant="headline-4" color="neutral-800">
            ฿{temporarilyHold}
          </Typography>
        </div>

        <BaseButton className="ml-auto" variant="secondary">
          {ctaLabel}
        </BaseButton>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-5 rounded-[12px] border border-neutral-50 px-4 py-6">
      <div className="flex items-center gap-6">
        <div className="flex flex-1 flex-col gap-2">
          <Typography variant="body-3" color="neutral-500">
            Current balance
          </Typography>
          <Typography variant="headline-4" color="neutral-800">
            ฿{availableBalance}
          </Typography>
        </div>

        <div className="h-[54px] w-px rounded-[12px] bg-deep-royal-indigo-50" />

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-1">
            <Typography variant="body-3" color="neutral-500">
              Temporarily hold
            </Typography>
            <Info className="h-4 w-4 text-neutral-100" />
          </div>
          <Typography variant="headline-4" color="neutral-800">
            ฿{temporarilyHold}
          </Typography>
        </div>
      </div>

      <BaseButton className="w-full lg:w-fit" variant="secondary">
        {ctaLabel}
      </BaseButton>
    </section>
  )
}
