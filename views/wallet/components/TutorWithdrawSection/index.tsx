"use client"

import { useEffect, useMemo, useState } from "react"
import Typography from "@/components/base/Typography"
import BaseButton from "@/components/base/BaseButton"
import SecurePaymentIcon from "@/components/icons/common/SecurePaymentIcon"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useQueryClient } from "@tanstack/react-query"
import { ChevronRight, LogOut } from "lucide-react"
import {
  useCreateTutorPayoutAccountOnboardingLink,
  useRequestTutorWithdrawal,
} from "@/hooks/settings/mutations"
import { useTutorPayoutAccount } from "@/hooks/settings/queries"
import { settingsQueryKeys } from "@/hooks/settings/queryKeys"

interface TutorWithdrawSectionProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function TutorWithdrawSection({ open, onOpenChange }: TutorWithdrawSectionProps) {
  const [amount, setAmount] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const quickAmounts = [50, 100, 200, 500, 1000, 2000]
  const queryClient = useQueryClient()

  const payoutAccountQuery = useTutorPayoutAccount(open)
  const requestWithdrawalMutation = useRequestTutorWithdrawal()
  const onboardingLinkMutation = useCreateTutorPayoutAccountOnboardingLink()

  const payoutAccount = payoutAccountQuery.data
  const canWithdraw = payoutAccount?.payoutsEnabled ?? false
  const amountNumber = Number(amount || 0)

  useEffect(() => {
    if (!open) {
      setAmount("")
      setErrorMessage(null)
      setSuccessMessage(null)
    }
  }, [open])

  const helperText = useMemo(() => {
    if (payoutAccountQuery.isLoading) {
      return "Checking your payout account..."
    }

    if (!payoutAccount?.isConnected) {
      return "Connect your Stripe payout account before requesting a withdrawal."
    }

    if (!canWithdraw) {
      return "Stripe still needs more payout details before withdrawals can be requested."
    }

    const defaultAccount = payoutAccount.externalAccounts.find((account) => account.isDefault)
    if (!defaultAccount) {
      return "Add a default bank account in Stripe before requesting a withdrawal."
    }

    return `Your withdrawal will be reviewed against ${defaultAccount.bankName || "your default bank account"} ending in ${defaultAccount.last4 || "----"}.`
  }, [canWithdraw, payoutAccount, payoutAccountQuery.isLoading])

  const handleAmountChange = (value: string) => {
    const digitsOnly = value.replace(/[^0-9]/g, "")
    setAmount(digitsOnly)
  }

  const handleConnectStripe = async () => {
    setErrorMessage(null)

    try {
      const result = await onboardingLinkMutation.mutateAsync()
      window.location.assign(result.url)
    } catch {
      setErrorMessage("Unable to open Stripe onboarding right now.")
    }
  }

  const handleSubmit = async () => {
    setErrorMessage(null)
    setSuccessMessage(null)

    if (!canWithdraw) {
      setErrorMessage("Connect and complete Stripe onboarding before withdrawing.")
      return
    }

    if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
      setErrorMessage("Enter a valid withdrawal amount.")
      return
    }

    try {
      const result = await requestWithdrawalMutation.mutateAsync({ amount: amountNumber })
      setSuccessMessage(result.message || "Withdrawal request submitted.")
      setAmount("")

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: settingsQueryKeys.tutorWalletSummary() }),
        queryClient.invalidateQueries({ queryKey: settingsQueryKeys.tutorWithdrawals({}) }),
      ])
    } catch (error) {
      const message =
        error && typeof error === "object" && "response" in error
          ? String(
              (
                error as {
                  response?: { data?: { error?: { message?: string }; message?: string } }
                }
              ).response?.data?.error?.message ||
                (
                  error as {
                    response?: { data?: { error?: { message?: string }; message?: string } }
                  }
                ).response?.data?.message ||
                "Unable to submit withdrawal request."
            )
          : "Unable to submit withdrawal request."

      setErrorMessage(message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-32px)] max-w-[480px] overflow-hidden rounded-[16px] border border-neutral-50 p-0 sm:rounded-[16px]">
        <DialogTitle className="sr-only">Withdraw</DialogTitle>

        <div className="rounded-t-[16px] px-5 py-4">
          <div className="flex items-center justify-center gap-2">
            <LogOut className="h-6 w-6 text-electric-violet-400" />
            <Typography variant="title-2" color="electric-violet-400">
              Withdraw
            </Typography>
          </div>
        </div>

        <div className="rounded-b-[16px] border-t border-neutral-50 pt-4 px-5 pb-5 flex flex-col gap-5">
          <div className="flex flex-col gap-[10px]">
            <Typography variant="label-3" color="neutral-800">
              Withdrawal Amount
            </Typography>

            <input
              type="text"
              inputMode="numeric"
              value={amount}
              onChange={(event) => handleAmountChange(event.target.value)}
              placeholder="Enter amount"
              disabled={!canWithdraw}
              className="w-full rounded-[12px] border border-neutral-50 px-4 py-3 text-body-3 text-neutral-700 outline-none placeholder:text-neutral-300 disabled:bg-neutral-25"
            />

            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(String(value))}
                  disabled={!canWithdraw}
                  className="rounded-[8px] border border-neutral-50 py-2 px-3 disabled:opacity-50"
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
                Stripe payout account required
              </Typography>
              <Typography variant="body-4" color="neutral-500">
                {helperText}
              </Typography>
            </div>

            <ChevronRight className="h-6 w-6 text-electric-violet-400" />
          </div>

          {errorMessage ? (
            <Typography variant="body-4" color="red-normal">
              {errorMessage}
            </Typography>
          ) : null}

          {successMessage ? (
            <Typography variant="body-4" color="neutral-700">
              {successMessage}
            </Typography>
          ) : null}

          <div className="flex flex-col gap-2 sm:flex-row">
            {!canWithdraw ? (
              <BaseButton
                type="button"
                variant="secondary"
                className="w-full"
                onClick={handleConnectStripe}
                disabled={onboardingLinkMutation.isPending}
              >
                Connect Stripe
              </BaseButton>
            ) : null}

            <BaseButton
              type="button"
              variant="secondary"
              className="w-full"
              onClick={handleSubmit}
              disabled={!canWithdraw || requestWithdrawalMutation.isPending}
            >
              Request Withdrawal
            </BaseButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
