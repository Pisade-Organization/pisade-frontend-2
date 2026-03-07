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
import { useDashboardSummary } from "@/hooks/dashboard/queries"
import { useTutorWalletSummary } from "@/hooks/settings/queries"
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
  const { data: studentSummary } = useDashboardSummary()
  const { data: tutorWalletSummary } = useTutorWalletSummary()

  const stats =
    role === Role.STUDENT
      ? [
          { label: "Completed Lessons" as const, value: studentSummary?.completedLessons ?? 0 },
          { label: "Scheduled Lessons" as const, value: studentSummary?.scheduledLessons ?? 0 },
          { label: "Skipped Lessons" as const, value: studentSummary?.skippedLessons ?? 0 },
          { label: "Goal" as const, value: 0 },
        ]
      : [
          { label: "Completed Lessons" as const, value: 0 },
          { label: "Scheduled Lessons" as const, value: 0 },
          { label: "Skipped Lessons" as const, value: 0 },
          { label: "Goal" as const, value: Math.round(tutorWalletSummary?.totalEarnings ?? 0) },
        ]

  const dashboardSections = [
    { className: "w-full order-2 lg:order-1", content: <TodayLessons /> },
    { className: "w-full order-1 lg:order-2", content: <StatsOverview stats={stats} /> },
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
