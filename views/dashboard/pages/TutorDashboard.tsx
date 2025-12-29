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
      <Navbar variant="tutor_dashboard" />
      <Hero 
        fullName="Alex Kim"
        title="Upcoming class"
        todayLessonCounts={3}
        lessonTitle="Algebra II: Quadratic Equations"
        tutorName="Sophia Lee"
        avatarUrl="https://randomuser.me/api/portraits/women/65.jpg"
        lessonTime={new Date(Date.now() + 60 * 60 * 1000)}
        headerText="Upcoming class"
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
          role={Role.TUTOR}
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