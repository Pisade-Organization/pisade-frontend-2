"use client"

import { useMemo } from "react"
import OverviewSection from "@/views/tutor-earnings/components/OverviewSection"
import RecentTransactionsSection from "@/views/tutor-earnings/components/RecentTransactionsSection"
import { useTutorWalletSummary, useTutorWithdrawals } from "@/hooks/settings/queries"
import type { EarningsTransaction } from "@/views/tutor-earnings/types"

function mapStatus(status?: string): string {
  if (status === "SUCCESS") return "Completed"
  if (status === "FAILED") return "Cancel"
  if (status === "PENDING") return "Processing"
  return "Processing"
}

function mapPaymentMethod(method?: string): string {
  if (method === "BANK") return "Bank transfer"
  if (method === "PAYPAL") return "PayPal"
  return "Wallet"
}

export default function TutorEarningsAndWithdrawalsPage() {
  const { data: summary } = useTutorWalletSummary()
  const {
    data: withdrawalsData,
    isLoading: withdrawalsLoading,
    isError: withdrawalsError,
  } = useTutorWithdrawals({ page: 1, limit: 50 })

  const rows = useMemo<EarningsTransaction[]>(() => {
    return (withdrawalsData?.withdrawals ?? []).map((withdrawal) => ({
      id: String(withdrawal.id ?? "-"),
      transaction: "Withdrawal",
      amount: Number(withdrawal.amount ?? 0),
      paymentMethod: mapPaymentMethod(String(withdrawal.method ?? "")),
      dateLabel: String(withdrawal.createdAt ?? "-"),
      status: mapStatus(String(withdrawal.status ?? "PENDING")),
    }))
  }, [withdrawalsData?.withdrawals])

  const currentBalance = Number(summary?.balance ?? 0)
  const pendingPayouts = Number(summary?.pendingPayouts ?? 0)
  const withdrawableAmount = Math.max(0, currentBalance - pendingPayouts)

  return (
    <main className="mx-auto flex w-full flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <OverviewSection
        currentBalance={currentBalance}
        withdrawableAmount={withdrawableAmount}
      />
      <RecentTransactionsSection
        rows={rows}
        isLoading={withdrawalsLoading}
        isError={withdrawalsError}
      />
    </main>
  )
}
