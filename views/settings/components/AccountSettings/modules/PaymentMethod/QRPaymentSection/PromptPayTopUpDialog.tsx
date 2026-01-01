"use client"
import { useState } from "react"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import Typography from "@/components/base/Typography"
import BaseInput from "@/components/base/BaseInput"
import { Dot } from "lucide-react"
import BaseButton from "@/components/base/BaseButton"
import clsx from "clsx"

const amountSchema = z.string()
  .regex(/^[0-9]*$/, "Amount must contain only numbers")
  .refine((val) => val === "" || parseInt(val) >= 100, {
    message: "Minimum amount is 100฿"
  })

interface PromptPayTopUpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function PromptPayTopUpDialog({
  open,
  onOpenChange,
}: PromptPayTopUpDialogProps) {
  const [amount, setAmount] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, '')
    setAmount(numericValue)
    
    // Validate with Zod
    const result = amountSchema.safeParse(numericValue)
    if (!result.success) {
      setError(result.error.issues[0]?.message || "Invalid amount")
    } else {
      setError("")
    }
  }

  const handleAmountButtonClick = (selectedAmount: number) => {
    const amountString = selectedAmount.toString()
    setAmount(amountString)
    
    // Validate with Zod
    const result = amountSchema.safeParse(amountString)
    if (!result.success) {
      setError(result.error.issues[0]?.message || "Invalid amount")
    } else {
      setError("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          [&>button]:hidden
          rounded-2xl sm:rounded-2xl
          p-0
        "
      >
        {/* Dialog Title for accessibility - visually hidden since there's a visible title */}
        <DialogTitle className="sr-only">
          PromptPay Top Up
        </DialogTitle>

        {/* Custom Close Button (top-right, exact position control) */}
        <DialogClose asChild>
          <button
            aria-label="Close"
            className="absolute top-4 right-4 w-11 h-11 flex justify-center items-center z-10"
          >
            <X className="w-6 h-6 text-neutral-700"/>
          </button>
        </DialogClose>

        {/* Dialog Content */}
        <div className="p-4 rounded-2xl bg-white flex flex-col w-full gap-5">
          
          <div className="w-full flex flex-col gap-2">
            <Typography variant={{ base: "title-1" }} color="neutral-900">
              PromptPay Top Up
            </Typography>

            <div className="p-[10px] rounded-[8px] bg-neutral-25">
              <Typography variant={{ base: "body-3" }} color="neutral-500">
                Enter the amount you want to top up and scan the QR code
              </Typography>
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 ">
            <Typography variant={{ base: "label-3" }} color="neutral-800">
              Top Up amount(THB)
            </Typography>

            <BaseInput
              leftIcon={<Typography variant={{ base: "body-3" }} color="neutral-700">฿</Typography>}
              placeholder="Enter amount"
              value={amount}
              onChange={handleAmountChange}
              errorMessage={error}
              state={error ? "error" : "default"}
            />

            <div className="w-full flex justify-start items-center">
              <Typography variant={{ base: "body-3" }} color="neutral-400">
                Minimum 100฿
              </Typography>

              <Dot className="w-5 h-5 text-neutral-400"/>

              <Typography variant={{ base: "body-3" }} color="neutral-400">
                You can enter any amount
              </Typography>
            </div>
          </div>

          <div className="w-full grid grid-cols-4 gap-2">
            {[100, 500, 1000, 2000].map((amountValue) => {
              const isSelected = amount === amountValue.toString()
              return (
                <button
                  key={amountValue}
                  type="button"
                  onClick={() => handleAmountButtonClick(amountValue)}
                  className={clsx(
                    "py-2 px-3 rounded-xl border",
                    isSelected
                      ? "border-electric-violet-600 bg-electric-violet-50"
                      : "border-neutral-100"
                  )}
                >
                  <Typography 
                    variant={{ base: "body-3" }} 
                    color={isSelected ? "electric-violet-600" : "neutral-700"}
                  >
                    ฿{amountValue}
                  </Typography>
                </button>
              )
            })}
          </div>

          <BaseButton>
            Generate QR Code
          </BaseButton>
        </div>

      </DialogContent>
    </Dialog>
  )
}