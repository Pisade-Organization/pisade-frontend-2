"use client"
import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Hero from "../components/Hero"
import TodayLessons from "../components/TodayLessons"
import StatsOverview from "../components/StatsOverview"
import WeeklyStudyPlan from "../components/WeeklyStudyPlan"
import FavoriteTutors from "../components/FavoriteTutors"
import TransactionHistory  from "../components/TransactionHistory"
import Footer from "@/components/footer/Footer"
import { Role } from "@/types/role.enum"
import { Transaction } from "../components/TransactionHistory/types"
import { TransactionStatus } from "../components/TransactionHistory/badges/TransactionStatusBadge/types"
import { PaymentMethod } from "../components/TransactionHistory/badges/PaymentMethodBadge/types"

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
  const [layout, setLayout] = useState<"table" | "card">("card")

  useEffect(() => {
    const handleResize = () => {
      setLayout(window.innerWidth >= 1024 ? "table" : "card")
    }

    // Set initial layout
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleViewAll = () => {
    console.log("View all transactions")
  }

  const handleShowMore = () => {
    console.log("Show more transactions")
  }
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Navbar variant="student_dashboard" />
      <Hero 
        fullName="Alex Kim"
        title="Next lesson"
        todayLessonCounts={3}
        lessonTitle="Algebra II: Quadratic Equations"
        tutorName="Sophia Lee"
        avatarUrl="https://randomuser.me/api/portraits/women/65.jpg"
        lessonTime={new Date(Date.now() + 60 * 60 * 1000)}
        headerText="Next lesson"
      />

      <div className="w-full order-2 lg:order-1">
        <TodayLessons />
      </div>
      <div className="w-full order-1 lg:order-2">
        <StatsOverview 
          stats={[
            { label: "Completed Lessons", value: 15 },
            { label: "Scheduled Lessons", value: 4 },
            { label: "Skipped Lessons", value: 1 },
            { label: "Goal", value: 20 }
          ]}
        />
      </div>

      <div className="w-full order-3">
        <WeeklyStudyPlan />
      </div>

      <div className="w-full order-4">
        <FavoriteTutors />
      </div>


      <div className="w-full order-5">
        <TransactionHistory 
          role={Role.STUDENT}
          transactions={mockTransactions}
          layout={layout}
          onViewAll={handleViewAll}
          onShowMore={handleShowMore}
        />
      </div>

      <div className="w-full order-last">
        <Footer />
      </div>

    </div>
  )
}