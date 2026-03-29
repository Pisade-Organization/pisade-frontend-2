"use client"

import BaseButton from "@/components/base/BaseButton"
import Typography from "@/components/base/Typography"
import SecurePaymentIcon from "@/components/icons/common/SecurePaymentIcon"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useCreateTopup } from "@/hooks/settings/mutations"
import { settingsQueryKeys } from "@/hooks/settings/queryKeys"
import { WalletService } from "@/services/wallet"
import { useQueryClient } from "@tanstack/react-query"
import { ChevronRight, LogIn } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { AxiosError } from "axios"

interface StudentTopUpSectionProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function StudentTopUpSection({ open, onOpenChange }: StudentTopUpSectionProps) {
  const queryClient = useQueryClient()
  const createTopup = useCreateTopup()
  const [amount, setAmount] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [providerRef, setProviderRef] = useState<string | null>(null)
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
  const [expiresAt, setExpiresAt] = useState<string | null>(null)
  const [isPolling, setIsPolling] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const quickAmounts = [100, 200, 500, 1000, 2000, 5000]

  const minimumAmount = 100
  const amountValue = Number(amount || 0)
  const isValidAmount = Number.isFinite(amountValue) && amountValue >= minimumAmount

  const expiresAtText = useMemo(() => {
    if (!expiresAt) return null

    const expiresAtDate = new Date(expiresAt)
    if (Number.isNaN(expiresAtDate.getTime())) return null

    return expiresAtDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }, [expiresAt])

  const resetState = () => {
    setAmount("")
    setError(null)
    setProviderRef(null)
    setQrCodeUrl(null)
    setExpiresAt(null)
    setIsPolling(false)
    setIsSuccess(false)
  }

  const getErrorMessage = (unknownError: unknown, fallback: string) => {
    if (unknownError instanceof AxiosError) {
      const data = unknownError.response?.data as {
        error?: { message?: string | string[] }
        message?: string | string[]
      } | undefined

      const message = data?.error?.message ?? data?.message

      if (typeof message === "string" && message.trim()) {
        return message
      }

      if (Array.isArray(message) && message.length > 0) {
        return message[0]
      }
    }

    if (unknownError instanceof Error && unknownError.message.trim()) {
      return unknownError.message
    }

    return fallback
  }

  const handleAmountChange = (value: string) => {
    const digitsOnly = value.replace(/[^0-9]/g, "")
    setAmount(digitsOnly)
    setError(null)
  }

  const handleCreateTopup = async () => {
    if (!isValidAmount) {
      setError(`Minimum amount is ${minimumAmount}฿`)
      return
    }

    setError(null)

    try {
      const response = await createTopup.mutateAsync({ amount: amountValue })

      if (!response.qrCodeUrl) {
        setError("PromptPay QR code was not returned. Please try again.")
        setProviderRef(null)
        setQrCodeUrl(null)
        setExpiresAt(null)
        setIsPolling(false)
        return
      }

      setProviderRef(response.providerRef)
      setQrCodeUrl(response.qrCodeUrl)
      setExpiresAt(response.expiresAt ?? null)
      setIsSuccess(false)
      setIsPolling(true)
    } catch (requestError) {
      setError(
        getErrorMessage(
          requestError,
          "Unable to generate QR code right now. Please try again.",
        ),
      )
    }
  }

  useEffect(() => {
    if (!open || !isPolling || !providerRef) {
      return
    }

    const intervalId = window.setInterval(async () => {
      try {
        const verifyResult = await WalletService.verifyTopup({ providerRef })

        if (verifyResult.status === "SUCCESS") {
          setIsPolling(false)
          setIsSuccess(true)

          await queryClient.invalidateQueries({ queryKey: settingsQueryKeys.walletSummary() })
          await queryClient.invalidateQueries({ queryKey: settingsQueryKeys.wallet() })
          await queryClient.invalidateQueries({ queryKey: [...settingsQueryKeys.all, "wallet-transactions"] })
          return
        }

        if (verifyResult.status === "FAILED") {
          setIsPolling(false)
          setError("Top-up failed. Please try again.")
        }
      } catch {
        // Continue polling on temporary failures.
      }
    }, 3000)

    return () => window.clearInterval(intervalId)
  }, [isPolling, open, providerRef, queryClient])

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetState()
    }

    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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

        <div className="rounded-b-[16px] border-t border-neutral-50 px-5 pt-4 pb-5 flex flex-col gap-5">
          {isSuccess ? (
            <div className="flex flex-col gap-4">
              <Typography variant="title-2" color="neutral-900">
                Top-up successful
              </Typography>
              <Typography variant="body-3" color="neutral-500">
                Your wallet balance has been updated.
              </Typography>
              <BaseButton onClick={() => handleOpenChange(false)}>Done</BaseButton>
            </div>
          ) : (
            <>
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
                      onClick={() => handleAmountChange(String(value))}
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

              {error ? (
                <Typography variant="body-3" color="red-normal">
                  {error}
                </Typography>
              ) : null}

              {qrCodeUrl ? (
                <div className="flex flex-col items-start gap-2">
                  <Typography variant="body-3" color="neutral-500">
                    Scan this PromptPay QR code to complete your payment.
                  </Typography>
                  <img src={qrCodeUrl} alt="PromptPay QR code" className="h-48 w-48 object-contain" />
                  {expiresAtText ? (
                    <Typography variant="body-4" color="neutral-400">
                      QR expires at {expiresAtText}
                    </Typography>
                  ) : null}
                </div>
              ) : null}

              <BaseButton
                onClick={handleCreateTopup}
                disabled={createTopup.isPending || isPolling}
              >
                {createTopup.isPending
                  ? "Generating..."
                  : qrCodeUrl
                    ? "Regenerate QR"
                    : "Top-Up"}
              </BaseButton>
            </>
          )}
        </div>

      </DialogContent>
    </Dialog>
  )
}
