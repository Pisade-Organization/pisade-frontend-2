"use client"
import { Role } from "@/types/role.enum"
import { useMemo } from "react"
import type { Transaction } from "../components/TransactionHistory/types"
import { TransactionStatus } from "../components/TransactionHistory/badges/TransactionStatusBadge/types"
import { PaymentMethod } from "../components/TransactionHistory/badges/PaymentMethodBadge/types"
import DashboardPage from "./DashboardPage"
import { useTutorTransactions } from "@/hooks/settings/queries"
import { useMyProfile } from "@/hooks/settings/queries"
import { useTutorWalletSummary } from "@/hooks/settings/queries"
import { useBookings } from "@/hooks/bookings/queries"

function mapTutorStatus(status: string): TransactionStatus {
  if (status === "SUCCESS") return TransactionStatus.COMPLETED
  if (status === "FAILED" || status === "CANCELLED") return TransactionStatus.CANCELLED
  return TransactionStatus.PROCESSING
}

function mapTutorPaymentMethod(reference: string | null): PaymentMethod {
  if ((reference ?? "").toUpperCase().includes("BANK")) {
    return PaymentMethod.BANK_TRANSFER
  }

  return PaymentMethod.PROMPTPAY
}

export default function TutorDashboardPage() {
  const { data: profile } = useMyProfile()
  const { data: tutorWalletSummary } = useTutorWalletSummary()
  const { data: tutorTransactions = [] } = useTutorTransactions()
  const { data: upcoming } = useBookings({ view: "upcoming", limit: 100 })
  const { data: completed } = useBookings({ status: "COMPLETED", limit: 100 })
  const { data: cancelled } = useBookings({ status: "CANCELLED", limit: 100 })

  const todayRange = useMemo(() => {
    const start = new Date()
    start.setHours(0, 0, 0, 0)

    const end = new Date(start)
    end.setDate(end.getDate() + 1)

    return {
      from: start.toISOString(),
      to: end.toISOString(),
    }
  }, [])

  const { data: todayBookingData } = useBookings({
    from: todayRange.from,
    to: todayRange.to,
    limit: 100,
  })

  const transactions: Transaction[] = tutorTransactions.map((transaction) => ({
    id: transaction.id,
    title: transaction.type,
    amount: String(transaction.amount),
    date: transaction.createdAt,
    paymentMethod: mapTutorPaymentMethod(transaction.reference),
    status: mapTutorStatus(transaction.status),
  }))

  const upcomingBooking = upcoming?.data?.[0]

  const handleViewAll = () => {
    console.log("View all transactions")
  }

  const handleShowMore = () => {
    console.log("Show more transactions")
  }

  return (
    <DashboardPage
      navbarVariant="tutor_dashboard"
      role={Role.TUTOR}
      transactions={transactions}
      stats={{
        completedLessons: completed?.data?.length ?? 0,
        scheduledLessons: upcoming?.data?.length ?? 0,
        skippedLessons: cancelled?.data?.length ?? 0,
        goal: Math.round(tutorWalletSummary?.totalEarnings ?? 0),
      }}
      onViewAll={handleViewAll}
      onShowMore={handleShowMore}
      heroProps={{
        fullName: profile?.profile?.fullName ?? "Tutor",
        todayLessonCounts: todayBookingData?.data?.length ?? 0,
        lessonTitle: "Upcoming class",
        tutorName: upcomingBooking?.student?.name ?? "",
        avatarUrl: upcomingBooking?.student?.avatarUrl ?? "",
        lessonTime: upcomingBooking
          ? new Date(upcomingBooking.schedule.startTime)
          : new Date(),
        meetingUrl: upcomingBooking?.meeting?.url ?? null,
        canJoin: upcomingBooking?.meeting?.canJoin ?? false,
        joinAvailableAt: upcomingBooking?.meeting?.joinAvailableAt
          ? new Date(upcomingBooking.meeting.joinAvailableAt)
          : null,
        actionLabel: "Join class link",
        headerText: "Upcoming class",
        showNextLessonCard: Boolean(upcomingBooking),
      }}
    />
  )
}
