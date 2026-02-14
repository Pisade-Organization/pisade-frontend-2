"use client"
import { Role } from "@/types/role.enum"
import type { Transaction } from "../components/TransactionHistory/types"
import { TransactionStatus } from "../components/TransactionHistory/badges/TransactionStatusBadge/types"
import { PaymentMethod } from "../components/TransactionHistory/badges/PaymentMethodBadge/types"
import DashboardPage from "./DashboardPage"

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: "TXN001",
    title: "Mathematics Lesson Package",
    lessonsCount: 5,
    amount: "2500",
    date: "2024-01-15",
    paymentMethod: PaymentMethod.PROMPTPAY,
    status: TransactionStatus.COMPLETED
  },
  {
    id: "TXN002",
    title: "Physics Tutoring Session",
    lessonsCount: 3,
    amount: "1500",
    date: "2024-01-20",
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    status: TransactionStatus.COMPLETED
  },
  {
    id: "TXN003",
    title: "Chemistry Course",
    lessonsCount: 10,
    amount: "5000",
    date: "2024-01-25",
    paymentMethod: PaymentMethod.PROMPTPAY,
    status: TransactionStatus.PROCESSING
  },
  {
    id: "TXN004",
    title: "English Conversation Class",
    lessonsCount: 2,
    amount: "1000",
    date: "2024-02-01",
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    status: TransactionStatus.COMPLETED
  },
  {
    id: "TXN005",
    title: "Biology Study Group",
    lessonsCount: 4,
    amount: "2000",
    date: "2024-02-05",
    paymentMethod: PaymentMethod.PROMPTPAY,
    status: TransactionStatus.CANCELLED
  }
]

export default function StudentDashboardPage() {
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
        headerText: "Next lesson",
      }}
    />
  )
}
