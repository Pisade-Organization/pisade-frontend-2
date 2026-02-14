"use client"
import { Role } from "@/types/role.enum"
import type { Transaction } from "../components/TransactionHistory/types"
import { TransactionStatus } from "../components/TransactionHistory/badges/TransactionStatusBadge/types"
import { PaymentMethod } from "../components/TransactionHistory/badges/PaymentMethodBadge/types"
import DashboardPage from "./DashboardPage"

// Mock transaction data for tutor
const mockTransactions: Transaction[] = [
  {
    id: "TXN101",
    title: "Earnings from Mathematics Lessons",
    lessonsCount: 8,
    amount: "4000",
    date: "2024-01-15",
    paymentMethod: PaymentMethod.PROMPTPAY,
    status: TransactionStatus.COMPLETED
  },
  {
    id: "TXN102",
    title: "Physics Tutoring Earnings",
    lessonsCount: 5,
    amount: "2500",
    date: "2024-01-20",
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    status: TransactionStatus.COMPLETED
  },
  {
    id: "TXN103",
    title: "Chemistry Course Payment",
    lessonsCount: 12,
    amount: "6000",
    date: "2024-01-25",
    paymentMethod: PaymentMethod.PROMPTPAY,
    status: TransactionStatus.PROCESSING
  },
  {
    id: "TXN104",
    title: "English Conversation Earnings",
    lessonsCount: 4,
    amount: "2000",
    date: "2024-02-01",
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    status: TransactionStatus.COMPLETED
  },
  {
    id: "TXN105",
    title: "Biology Study Group Payment",
    lessonsCount: 6,
    amount: "3000",
    date: "2024-02-05",
    paymentMethod: PaymentMethod.PROMPTPAY,
    status: TransactionStatus.CANCELLED
  }
]

export default function TutorDashboardPage() {
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
      transactions={mockTransactions}
      onViewAll={handleViewAll}
      onShowMore={handleShowMore}
      heroProps={{
        fullName: "Alex Kim",
        todayLessonCounts: 3,
        lessonTitle: "Algebra II: Quadratic Equations",
        tutorName: "Sophia Lee",
        avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg",
        lessonTime: new Date(Date.now() + 60 * 60 * 1000),
        headerText: "Upcoming class",
      }}
    />
  )
}
