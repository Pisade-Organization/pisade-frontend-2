"use client"
import { Role } from "@/types/role.enum"
import { useMemo } from "react"
import type { Transaction } from "../components/TransactionHistory/types"
import { TransactionStatus } from "../components/TransactionHistory/badges/TransactionStatusBadge/types"
import { PaymentMethod } from "../components/TransactionHistory/badges/PaymentMethodBadge/types"
import DashboardPage from "./DashboardPage"
import { useTutorTransactions } from "@/hooks/settings/queries"
import { useMyProfile } from "@/hooks/settings/queries"
import { useBookings } from "@/hooks/bookings/queries"

function mapTutorStatus(status: string): TransactionStatus {
  if (status === "SUCCESS") return TransactionStatus.COMPLETED
  if (status === "FAILED" || status === "CANCELLED") return TransactionStatus.CANCELLED
  return TransactionStatus.PROCESSING
}

export default function TutorDashboardPage() {
  const { data: profile } = useMyProfile()
  const { data: tutorTransactions = [] } = useTutorTransactions()
  const { data: upcoming } = useBookings({ view: "upcoming", limit: 1 })

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
    paymentMethod: PaymentMethod.PROMPTPAY,
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
      onViewAll={handleViewAll}
      onShowMore={handleShowMore}
      heroProps={{
        fullName: profile?.profile?.fullName ?? "Tutor",
        todayLessonCounts: todayBookingData?.data?.length ?? 0,
        lessonTitle: "Upcoming class",
        tutorName: upcomingBooking?.student?.name ?? "Student",
        avatarUrl:
          upcomingBooking?.student?.avatarUrl ?? "https://ui-avatars.com/api/?name=Student",
        lessonTime: upcomingBooking
          ? new Date(upcomingBooking.schedule.startTime)
          : new Date(),
        headerText: "Upcoming class",
      }}
    />
  )
}
