"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/footer/Footer"

import Hero from "../components/Hero"
import TodayLessons from "../components/TodayLessons"
import StatsOverview from "../components/StatsOverview"
import WeeklyStudyPlan from "../components/WeeklyStudyPlan"
import FavoriteTutors from "../components/FavoriteTutors"
import TransactionHistory from "../components/TransactionHistory"

import type { Role } from "@/types/role.enum"
import type { Transaction } from "../components/TransactionHistory/types"
import useMediaQuery from "@/hooks/useMediaQuery"

type DashboardNavbarVariant = "student_dashboard" | "tutor_dashboard"

interface DashboardPageProps {
  navbarVariant: DashboardNavbarVariant
  role: Role.STUDENT | Role.TUTOR
  heroProps: {
    fullName: string
    todayLessonCounts: number
    lessonTitle: string
    tutorName: string
    avatarUrl: string
    lessonTime: Date
    headerText?: string
  }
  transactions: Transaction[]
  onViewAll?: () => void
  onShowMore?: () => void
}

export default function DashboardPage({
  navbarVariant,
  role,
  heroProps,
  transactions,
  onViewAll,
  onShowMore,
}: DashboardPageProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const layout = isDesktop ? "table" : "card"

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Navbar variant={navbarVariant} />
      <Hero {...heroProps} />

      <div className="w-full order-2 lg:order-1">
        <TodayLessons />
      </div>

      <div className="w-full order-1 lg:order-2">
        <StatsOverview
          stats={[
            { label: "Completed Lessons", value: 15 },
            { label: "Scheduled Lessons", value: 4 },
            { label: "Skipped Lessons", value: 1 },
            { label: "Goal", value: 20 },
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
          role={role}
          transactions={transactions}
          layout={layout}
          onViewAll={onViewAll}
          onShowMore={onShowMore}
        />
      </div>

      <div className="w-full order-last">
        <Footer />
      </div>
    </div>
  )
}
