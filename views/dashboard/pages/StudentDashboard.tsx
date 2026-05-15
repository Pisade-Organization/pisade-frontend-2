"use client"
import { Role } from "@/types/role.enum"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import type { Transaction } from "../components/TransactionHistory/types"
import { TransactionStatus } from "../components/TransactionHistory/badges/TransactionStatusBadge/types"
import { PaymentMethod } from "../components/TransactionHistory/badges/PaymentMethodBadge/types"
import DashboardPage from "./DashboardPage"
import {
  useDashboardSummary,
  useDashboardTransactions,
  useFavoriteTutorCards,
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
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = useSession()
  const { data: profile } = useMyProfile()
  const { data: summary } = useDashboardSummary()
  const { data: todayLessons = [] } = useTodayLessons()
  const { data: nextLesson } = useNextLesson()
  const { data: transactionsRaw = [] } = useDashboardTransactions()
  const { data: favoriteTutorPages } = useFavoriteTutorCards(12)
  const fullName = session?.user?.fullName ?? profile?.profile?.fullName ?? "Student"
  const locale = pathname?.split("/")[1]
  const localePrefix = locale === "en" || locale === "th" ? `/${locale}` : "/en"
  const savedTutorsCount = favoriteTutorPages?.pages?.[0]?.total ?? 0

  const transactions: Transaction[] = transactionsRaw.map((transaction) => ({
    id: transaction.id,
    title: transaction.transaction,
    amount: String(transaction.amount),
    date: transaction.date,
    paymentMethod: mapPaymentMethod(transaction.paymentMethod),
    status: mapStatus(transaction.status),
  }))

  const handleViewAll = () => {
    router.push(`${localePrefix}/settings/student/payment-history`)
  }

  const handleShowMore = () => {
    router.push(`${localePrefix}/settings/student/payment-history`)
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
        extra: {
          label: "Saved Tutors",
          value: savedTutorsCount,
        },
      }}
      onViewAll={handleViewAll}
      onShowMore={handleShowMore}
      heroProps={{
        fullName,
        todayLessonCounts: todayLessons.length,
        lessonTitle: "Upcoming lesson",
        tutorName: nextLesson?.tutor.user.profile?.fullName ?? "",
        avatarUrl: nextLesson?.tutor.user.profile?.avatarUrl ?? "",
        lessonTime: nextLesson ? new Date(nextLesson.scheduledAt) : new Date(),
        meetingUrl: nextLesson?.meetLink ?? null,
        canJoin: nextLesson?.canJoin ?? false,
        joinAvailableAt: nextLesson?.joinAvailableAt
          ? new Date(nextLesson.joinAvailableAt)
          : null,
        secondaryActionHref: `${localePrefix}/student/schedule`,
        actionLabel: "Join class",
        headerText: "Next lesson",
        showNextLessonCard: Boolean(nextLesson),
      }}
    />
  )
}
