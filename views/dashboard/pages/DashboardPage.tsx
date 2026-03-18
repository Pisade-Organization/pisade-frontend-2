"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/footer/Footer"

import Hero from "../components/Hero"
import TodayLessons from "../components/TodayLessons"
import StatsOverview from "../components/StatsOverview"
import WeeklyStudyPlan from "../components/WeeklyStudyPlan"
import FavoriteTutors from "../components/FavoriteTutors"
import TransactionHistory from "../components/TransactionHistory"

import { Role } from "@/types/role.enum"
import type { Transaction } from "../components/TransactionHistory/types"
import useMediaQuery from "@/hooks/useMediaQuery"
import { PageRoot } from "@/components/layout/PagePrimitives"

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
    showNextLessonCard?: boolean
  }
  transactions: Transaction[]
  stats: {
    completedLessons: number
    scheduledLessons: number
    skippedLessons: number
    goal: number
  }
  onViewAll?: () => void
  onShowMore?: () => void
}

export default function DashboardPage({
  navbarVariant,
  role,
  heroProps,
  transactions,
  stats,
  onViewAll,
  onShowMore,
}: DashboardPageProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const layout = isDesktop ? "table" : "card"
  const statCards = [
    { label: "Completed Lessons" as const, value: stats.completedLessons },
    { label: "Scheduled Lessons" as const, value: stats.scheduledLessons },
    { label: "Skipped Lessons" as const, value: stats.skippedLessons },
    { label: "Goal" as const, value: stats.goal },
  ]

  const dashboardSections =
    role === Role.STUDENT
      ? [
          { className: "w-full order-2 lg:order-1", content: <TodayLessons /> },
          { className: "w-full order-1 lg:order-2", content: <StatsOverview stats={statCards} /> },
          { className: "w-full order-3", content: <WeeklyStudyPlan /> },
          { className: "w-full order-4", content: <FavoriteTutors /> },
          {
            className: "w-full order-5",
            content: (
              <TransactionHistory
                role={role}
                transactions={transactions}
                layout={layout}
                onViewAll={onViewAll}
                onShowMore={onShowMore}
              />
            ),
          },
        ]
      : [
          { className: "w-full order-1", content: <StatsOverview stats={statCards} /> },
          {
            className: "w-full order-2",
            content: (
              <TransactionHistory
                role={role}
                transactions={transactions}
                layout={layout}
                onViewAll={onViewAll}
                onShowMore={onShowMore}
              />
            ),
          },
        ]

  return (
    <PageRoot className="items-center">
      <Navbar variant={navbarVariant} />
      <Hero {...heroProps} />

      {dashboardSections.map((section) => (
        <div key={section.className} className={section.className}>
          {section.content}
        </div>
      ))}

      <div className="w-full order-last">
        <Footer />
      </div>
    </PageRoot>
  )
}
