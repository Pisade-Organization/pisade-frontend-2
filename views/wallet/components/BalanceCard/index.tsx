"use client"

import BaseButton from "@/components/base/BaseButton"
import Typography from "@/components/base/Typography"
import useMediaQuery from "@/hooks/useMediaQuery"
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Eye, EyeOff, Info } from "lucide-react"
import { useState } from "react"
import type { WalletRole } from "@/views/wallet/types"

interface BalanceCardProps {
  availableBalance: number
  temporarilyHold: number
  role: WalletRole
  onCtaClick?: () => void
}

function HoldInfoPopover({ role, isDesktop }: { role: WalletRole; isDesktop: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const description =
    role === "student"
      ? "This amount covers wallet transactions that are still processing, such as a top-up or booking payment. It will update automatically once the payment succeeds or fails."
      : "This amount is reserved for transactions that are still being processed and is not available to withdraw yet."

  if (isDesktop) {
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverAnchor asChild>
          <button
            type="button"
            aria-label="What temporarily hold means"
            aria-expanded={isOpen}
            className="rounded-full text-neutral-100 outline-none transition-colors hover:text-neutral-200 focus-visible:text-neutral-200"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
          >
            <Info className="h-4 w-4" />
          </button>
        </PopoverAnchor>
        <PopoverContent
          side="top"
          align="start"
          sideOffset={10}
          className="w-[260px] rounded-[12px] border border-neutral-50 bg-white p-3 shadow-[0_12px_32px_rgba(17,24,39,0.12)]"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <Typography variant="body-4" color="neutral-500" className="leading-6">
            {description}
          </Typography>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="What temporarily hold means"
          aria-expanded={isOpen}
          className="rounded-full text-neutral-100 outline-none transition-colors active:text-neutral-200"
        >
          <Info className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        sideOffset={8}
        className="w-[220px] rounded-[12px] border border-neutral-50 bg-white p-3 shadow-[0_12px_32px_rgba(17,24,39,0.12)]"
      >
        <Typography variant="body-4" color="neutral-500" className="leading-6">
          {description}
        </Typography>
      </PopoverContent>
    </Popover>
  )
}

export default function BalanceCard({
  availableBalance,
  temporarilyHold,
  role,
  onCtaClick,
}: BalanceCardProps) {
  const ctaLabel = role === "student" ? "Top-up" : "Withdraw"
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [isBalanceHidden, setIsBalanceHidden] = useState(false)

  const displayAvailableBalance = isBalanceHidden ? "***" : `฿${availableBalance}`
  const displayTemporarilyHold = isBalanceHidden ? "***" : `฿${temporarilyHold}`

  if (isDesktop) {
    return (
      <section className="flex w-full items-center gap-6 rounded-[12px] border border-deep-royal-indigo-50 px-7 py-4">
        <button
          type="button"
          onClick={() => setIsBalanceHidden((prev) => !prev)}
          aria-label={isBalanceHidden ? "Show balance" : "Hide balance"}
        >
          {isBalanceHidden ? (
            <EyeOff className="h-7 w-7 text-neutral-100" />
          ) : (
            <Eye className="h-7 w-7 text-neutral-100" />
          )}
        </button>

        <div className="h-[54px] w-px rounded-[12px] bg-deep-royal-indigo-50" />

        <div className="flex min-w-[220px] flex-1 flex-col gap-2 px-2">
          <Typography variant="body-3" color="neutral-500">
            Available balance
          </Typography>
          <Typography variant="headline-4" color="neutral-800">
            {displayAvailableBalance}
          </Typography>
        </div>

        <div className="h-[54px] w-px rounded-[12px] bg-deep-royal-indigo-50" />

        <div className="flex min-w-[220px] flex-1 flex-col gap-2 px-2">
          <div className="flex items-center gap-1">
            <Typography variant="body-3" color="neutral-500">
              Temporarily hold
            </Typography>
            <HoldInfoPopover role={role} isDesktop />
          </div>
          <Typography variant="headline-4" color="neutral-800">
            {displayTemporarilyHold}
          </Typography>
        </div>

        <BaseButton className="ml-auto" variant="secondary" onClick={onCtaClick}>
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
            {displayAvailableBalance}
          </Typography>
        </div>

        <div className="h-[54px] w-px rounded-[12px] bg-deep-royal-indigo-50" />

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-1">
            <Typography variant="body-3" color="neutral-500">
              Temporarily hold
            </Typography>
            <HoldInfoPopover role={role} isDesktop={false} />
          </div>
          <Typography variant="headline-4" color="neutral-800">
            {displayTemporarilyHold}
          </Typography>
        </div>
      </div>

      <BaseButton className="w-full lg:w-fit" variant="secondary" onClick={onCtaClick}>
        {ctaLabel}
      </BaseButton>
    </section>
  )
}
