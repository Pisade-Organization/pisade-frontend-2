"use client"

import { useState } from "react"

import { MastercardIcon } from "@/components/icons/common"
import Typography from "@/components/base/Typography"
import { EllipsisVertical } from "lucide-react"
import type { WalletBankAccount } from "@/views/wallet/types"

interface BankAccountCardProps {
  account: WalletBankAccount
}

export default function BankAccountCard({ account }: BankAccountCardProps) {
  const lastFourDigits = account.lastFourDigits ?? account.accountNumber?.slice(-4) ?? "0000"
  const maskedAccountNumber = `**** **** **** ${lastFourDigits}`
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <article className="relative flex flex-col gap-1 border border-neutral-50 bg-white px-4 py-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Typography variant="label-2" color="neutral-800">
            {account.accountName}
          </Typography>
          {account.isDefault ? (
            <div className="rounded-[4px] bg-electric-violet-25 px-2 py-[2px]">
              <Typography variant="body-4" color="electric-violet-400">
                Default
              </Typography>
            </div>
          ) : null}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Open bank card actions"
          >
            <EllipsisVertical className="h-4 w-4 text-neutral-200" />
          </button>

          <div
            aria-hidden={!isMenuOpen}
            className={`absolute right-0 top-6 z-10 min-w-[168px] origin-top-right overflow-hidden rounded-[12px] border border-neutral-50 bg-white shadow-[0px_1px_12px_0px_#0000001A] transition-all duration-150 ease-out ${
              isMenuOpen
                ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                : "pointer-events-none -translate-y-1 scale-95 opacity-0"
            }`}
          >
            <button
              type="button"
              className="w-full border-b border-neutral-50 bg-white px-4 py-[10px] text-left"
              onClick={() => setIsMenuOpen(false)}
            >
              <Typography variant="body-3" color="neutral-700">
                Set as default
              </Typography>
            </button>

            <button
              type="button"
              className="w-full bg-white px-4 py-[10px] text-left"
              onClick={() => setIsMenuOpen(false)}
            >
              <Typography variant="body-3" color="red-normal">
                Delete card
              </Typography>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <MastercardIcon width={24} height={16} />
        <Typography variant="label-3" color="neutral-700">
          {maskedAccountNumber}
        </Typography>
      </div>
    </article>
  )
}
