"use client"
import { useEffect, useMemo, useState } from "react"
import { z } from "zod"
import { AxiosError } from "axios"
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
import { useCreateTopup } from "@/hooks/settings/mutations"
import { WalletService } from "@/services/wallet"
import { useQueryClient } from "@tanstack/react-query"
import { settingsQueryKeys } from "@/hooks/settings/queryKeys"

const amountSchema = z.string()
  .regex(/^[0-9]*$/, "Amount must contain only numbers")
  .refine((val) => val === "" || parseInt(val) >= 100, {
    message: "Minimum amount is 100฿"
  })

interface PromptPayTopUpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type TopupStep = "form" | "success"

export default function PromptPayTopUpDialog({
  open,
  onOpenChange,
}: PromptPayTopUpDialogProps) {
  const queryClient = useQueryClient()
  const createTopup = useCreateTopup()

  const [amount, setAmount] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [step, setStep] = useState<TopupStep>("form")
  const [providerRef, setProviderRef] = useState<string | null>(null)
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
  const [expiresAt, setExpiresAt] = useState<string | null>(null)
  const [isPolling, setIsPolling] = useState(false)

  const expiresAtText = useMemo(() => {
    if (!expiresAt) {
      return null
    }

    const date = new Date(expiresAt)
    if (Number.isNaN(date.getTime())) {
      return null
    }

    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }, [expiresAt])

  const resetState = () => {
    setAmount("")
    setError("")
    setStep("form")
    setProviderRef(null)
    setQrCodeUrl(null)
    setExpiresAt(null)
    setIsPolling(false)
  }

  const getErrorMessage = (unknownError: unknown, fallback: string) => {
    if (unknownError instanceof AxiosError) {
      const data = unknownError.response?.data as any
      if (typeof data?.error?.message === "string") {
        return data.error.message
      }
      if (typeof data?.message === "string") {
        return data.message
      }
    }

    if (unknownError instanceof Error) {
      return unknownError.message
    }

    return fallback
  }

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

  const handleGenerateQrCode = async () => {
    const result = amountSchema.safeParse(amount)
    if (!result.success) {
      setError(result.error.issues[0]?.message || "Invalid amount")
      return
    }

    setError("")

    try {
      const response = await createTopup.mutateAsync({ amount: parseInt(amount, 10) })

      setProviderRef(response.providerRef)
      setQrCodeUrl(response.qrCodeUrl)
      setExpiresAt(response.expiresAt ?? null)
      setStep("form")
      setIsPolling(true)
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Failed to generate PromptPay QR code."))
    }
  }

  useEffect(() => {
    if (!open || !isPolling || !providerRef) {
      return
    }

    const intervalId = window.setInterval(async () => {
      try {
        const verification = await WalletService.verifyTopup({ providerRef })

        if (verification.status === "SUCCESS") {
          setIsPolling(false)
          setStep("success")
          await queryClient.invalidateQueries({ queryKey: settingsQueryKeys.walletSummary() })
          await queryClient.invalidateQueries({ queryKey: settingsQueryKeys.wallet() })
          await queryClient.invalidateQueries({ queryKey: settingsQueryKeys.walletTransactions({}) })
          return
        }

        if (verification.status === "FAILED") {
          setIsPolling(false)
          setError("Top up failed. Please try again.")
        }
      } catch {
        // Keep polling; transient errors can happen.
      }
    }, 3000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [open, isPolling, providerRef, queryClient])

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetState()
    }

    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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

          {step === "form" ? (
            <>
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

              <BaseButton onClick={handleGenerateQrCode} disabled={createTopup.isPending}>
                {createTopup.isPending ? "Generating..." : "Generate QR Code"}
              </BaseButton>

              {qrCodeUrl ? (
                <>
                  <div className="w-full border-b border-neutral-100" />

                  <div className="w-full flex flex-col items-center gap-3">
                    <Typography variant={{ base: "body-3" }} color="neutral-300">
                      Scan the QR code to pay
                    </Typography>

                    <img
                      src={qrCodeUrl}
                      alt="PromptPay QR code"
                      className="w-[200px] h-[200px] object-contain"
                    />

                    {expiresAtText ? (
                      <Typography variant={{ base: "body-3" }} color="neutral-400">
                        QR expires at {expiresAtText}
                      </Typography>
                    ) : null}

                    {error ? (
                      <Typography variant={{ base: "body-3" }} color="red-normal">
                        {error}
                      </Typography>
                    ) : null}

                    <BaseButton
                      variant="secondary"
                      onClick={() => {
                        setQrCodeUrl(null)
                        setProviderRef(null)
                        setExpiresAt(null)
                        setIsPolling(false)
                        setError("")
                      }}
                    >
                      Regenerate QR
                    </BaseButton>
                  </div>
                </>
              ) : null}
            </>
          ) : null}

          {step === "success" ? (
            <div className="w-full flex flex-col gap-4 items-center">
              <Typography variant={{ base: "headline-5" }} color="neutral-900" className="text-center">
                Top up successful
              </Typography>

              <Typography variant={{ base: "body-3" }} color="neutral-500" className="text-center">
                Your wallet balance has been updated.
              </Typography>

              <BaseButton onClick={() => handleOpenChange(false)} className="w-full">
                Done
              </BaseButton>
            </div>
          ) : null}
        </div>

      </DialogContent>
    </Dialog>
  )
}
