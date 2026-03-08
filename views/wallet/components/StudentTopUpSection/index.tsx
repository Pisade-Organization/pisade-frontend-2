"use client"

import BaseButton from "@/components/base/BaseButton"
import Typography from "@/components/base/Typography"
import SecurePaymentIcon from "@/components/icons/common/SecurePaymentIcon"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ChevronRight, LogIn } from "lucide-react"
import { useState } from "react"

interface StudentTopUpSectionProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function StudentTopUpSection({ open, onOpenChange }: StudentTopUpSectionProps) {
  const [amount, setAmount] = useState("")
  const quickAmounts = [50, 100, 200, 500, 1000, 2000]
  const handleAmountChange = (value: string) => {
    const digitsOnly = value.replace(/[^0-9]/g, "")
    setAmount(digitsOnly)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-32px)] max-w-[480px] overflow-hidden rounded-[16px] border border-neutral-50 p-0 sm:rounded-[16px]">
        <DialogTitle className="sr-only">Top-up</DialogTitle>

        <div className="rounded-t-[16px] px-5 py-4">
          <div className="flex items-center justify-center gap-2">
            <LogIn className="h-6 w-6 text-electric-violet-400" />
            <Typography variant="title-2" color="electric-violet-400">
              Top-up
            </Typography>
          </div>
        </div>

        <div className="rounded-b-[16px] border-t border-neutral-50 pt-4 px-5 pb-5 flex flex-col gap-5">
          <div className="flex flex-col gap-[10px]">
            <Typography variant="label-3" color="neutral-800">
              Top-up Amount
            </Typography>

            <input
              type="text"
              inputMode="numeric"
              value={amount}
              onChange={(event) => handleAmountChange(event.target.value)}
              placeholder="Enter amount"
              className="w-full rounded-[12px] border border-neutral-50 px-4 py-3 text-body-3 text-neutral-700 outline-none placeholder:text-neutral-300"
            />

            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(String(value))}
                  className="rounded-[8px] border border-neutral-50 py-2 px-3"
                >
                  <Typography variant="body-3" color="neutral-700">
                    ฿{value}
                  </Typography>
                </button>
              ))}
            </div>
          </div>

          <div className="py-3 px-4 flex gap-3 rounded-[8px] bg-electric-violet-25">
            <SecurePaymentIcon className="shrink-0" />

            <div className="flex flex-col gap-[2px]">
              <Typography variant="label-3" color="neutral-800">
                Secure Payment Processed by Pisade
              </Typography>
              <Typography variant="body-4" color="neutral-500">
                Your transaction is protected with industry-leading encryption.
              </Typography>
            </div>

            <ChevronRight className="h-6 w-6 text-electric-violet-400" />
          </div>

          <div />
        <BaseButton>
          Top-Up
        </BaseButton>
        </div>

      </DialogContent>
    </Dialog>
  )
}
