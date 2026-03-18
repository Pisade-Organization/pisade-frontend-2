"use client"
import { Role } from "@/types/role.enum"
import type { Transaction } from "../components/TransactionHistory/types"
import { TransactionStatus } from "../components/TransactionHistory/badges/TransactionStatusBadge/types"
import { PaymentMethod } from "../components/TransactionHistory/badges/PaymentMethodBadge/types"
import DashboardPage from "./DashboardPage"
import {
  useDashboardSummary,
  useDashboardTransactions,
  useNextLesson,
  useTodayLessons,
} from "@/hooks/dashboard/queries"
import { useMyProfile } from "@/hooks/settings/queries"

function mapStatus(status: string): TransactionStatus {
  if (status === "Completed") return TransactionStatus.COMPLETED
  if (status === "Cancel") return TransactionStatus.CANCELLED
  return TransactionStatus.PROCESSING
}

function mapPaymentMethod(method: string | null): PaymentMethod {
  if ((method ?? "").toUpperCase().includes("BANK")) return PaymentMethod.BANK_TRANSFER
  return PaymentMethod.PROMPTPAY
}

export default function StudentDashboardPage() {
  const { data: profile } = useMyProfile()
  const { data: summary } = useDashboardSummary()
  const { data: todayLessons = [] } = useTodayLessons()
  const { data: nextLesson } = useNextLesson()
  const { data: transactionsRaw = [] } = useDashboardTransactions()

  const transactions: Transaction[] = transactionsRaw.map((transaction) => ({
    id: transaction.id,
    title: transaction.transaction,
    amount: String(transaction.amount),
    date: transaction.date,
    paymentMethod: mapPaymentMethod(transaction.paymentMethod),
    status: mapStatus(transaction.status),
  }))

  const handleViewAll = () => {
    console.log("View all transactions")
  }

  const handleShowMore = () => {
    console.log("Show more transactions")
  }

  return (
    <DashboardPage
      navbarVariant="student_dashboard"
      role={Role.STUDENT}
      transactions={transactions}
      stats={{
        completedLessons: summary?.completedLessons ?? 0,
        scheduledLessons: summary?.scheduledLessons ?? 0,
        skippedLessons: summary?.skippedLessons ?? 0,
        goal: 0,
      }}
      onViewAll={handleViewAll}
      onShowMore={handleShowMore}
      heroProps={{
        fullName: profile?.profile?.fullName ?? "Student",
        todayLessonCounts: todayLessons.length,
        lessonTitle: "Upcoming lesson",
        tutorName: nextLesson?.tutor.user.profile?.fullName ?? "",
        avatarUrl: nextLesson?.tutor.user.profile?.avatarUrl ?? "",
        lessonTime: nextLesson ? new Date(nextLesson.scheduledAt) : new Date(),
        headerText: "Next lesson",
        showNextLessonCard: Boolean(nextLesson),
      }}
    />
  )
}
