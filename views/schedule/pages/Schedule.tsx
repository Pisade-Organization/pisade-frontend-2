"use client"

import { useMemo, useState } from "react"
import Navbar from "@/components/Navbar"
import SidebarLayout from "../components/SidebarLayout"
import ScheduleContent from "../components/ScheduleContent"
import { useBookings } from "@/hooks/bookings/queries"
import { useMyProfile, useMyWalletSummary, useTutorWalletSummary } from "@/hooks/settings/queries"
import { useMyTutorProfile } from "@/hooks/settings/queries/useMyTutorProfile"
import { getVisibleRange, shiftDate, type CalendarView } from "../components/ScheduleContent/calendar.utils"

type ScheduleRole = "student" | "tutor"

type SchedulePageProps = {
  navbarVariant?: "student_dashboard" | "tutor_dashboard"
  role?: ScheduleRole
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value)
}

export default function SchedulePage({
  navbarVariant = "student_dashboard",
  role = "student",
}: SchedulePageProps) {
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const [activeView, setActiveView] = useState<CalendarView>("day")

  const { from, to } = useMemo(() => {
    const range = getVisibleRange(selectedDate, activeView)

    return {
      from: range.from.toISOString(),
      to: range.to.toISOString(),
    }
  }, [selectedDate, activeView])
  const { data: bookingsData, isLoading, isError } = useBookings({ from, to, limit: 100 })
  const { data: profile } = useMyProfile()
  const { data: tutorProfile } = useMyTutorProfile(role === "tutor")
  const { data: walletSummary } = useMyWalletSummary(role === "student")
  const { data: tutorWalletSummary } = useTutorWalletSummary(role === "tutor")

  const bookings = bookingsData?.data ?? []

  const fullName = profile?.profile?.fullName ?? (role === "student" ? "Student" : "Tutor")
  const avatarUrl = profile?.profile?.avatarUrl
  const timezone = profile?.profile?.timezone ?? "Asia/Bangkok"
  const tutorRanking = role === "tutor" ? (tutorProfile?.tutorRanking ?? null) : null
  const avgRating = role === "tutor" ? (tutorProfile?.avgRating ?? 0) : undefined
  const studentsCount = role === "tutor" ? (tutorProfile?.studentsCount ?? 0) : undefined
  const hoursTaught = role === "tutor" ? (tutorProfile?.lessonsCount ?? 0) : undefined

  const summaryLabel = role === "student" ? "Wallet balance" : undefined
  const summaryValue = role === "student"
    ? formatCurrency(walletSummary?.balance ?? 0)
    : undefined
  const actionLabel = role === "student" ? "Top Up Wallet" : "My Earnings"
  const actionHref = role === "student" ? "/student/wallet" : "/tutor/earnings-and-withdrawals"

  const handleSelectDate = (date: Date) => {
    setSelectedDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
  }

  const handlePreviousDay = () => {
    setSelectedDate((prev) => shiftDate(prev, activeView, -1))
  }

  const handleNextDay = () => {
    setSelectedDate((prev) => shiftDate(prev, activeView, 1))
  }

  const handleToday = () => {
    const today = new Date()
    setSelectedDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()))
  }

  return (
    <div className="w-full min-h-screen bg-[#efeff3]">
      <Navbar variant={navbarVariant} />

      <main className="w-full lg:px-4 lg:py-4">
        <section className="lg:hidden">
          <div>
            <SidebarLayout
              fullName={fullName}
              avatarUrl={avatarUrl}
              timezone={timezone}
              tutorRanking={tutorRanking}
              avgRating={avgRating}
              studentsCount={studentsCount}
              hoursTaught={hoursTaught}
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
              summaryLabel={summaryLabel}
              summaryValue={summaryValue}
              actionLabel={actionLabel}
              actionHref={actionHref}
              showCalendar={false}
              showBookingRules={false}
            />
          </div>
        </section>

        <section className="pb-8 pt-4 lg:hidden">
          <ScheduleContent
            selectedDate={selectedDate}
            onPreviousDay={handlePreviousDay}
            onNextDay={handleNextDay}
            onToday={handleToday}
            bookings={bookings}
            isLoading={isLoading}
            isError={isError}
            role={role}
            view={activeView}
            onViewChange={setActiveView}
            onSelectDate={handleSelectDate}
            tutorAvailabilities={role === "tutor" ? tutorProfile?.availabilities ?? [] : []}
          />
        </section>

        <section className="hidden w-full lg:grid lg:grid-cols-[276px_minmax(0,1fr)] lg:gap-4">
          <SidebarLayout
            fullName={fullName}
            avatarUrl={avatarUrl}
            timezone={timezone}
            tutorRanking={tutorRanking}
            avgRating={avgRating}
            studentsCount={studentsCount}
            hoursTaught={hoursTaught}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
            summaryLabel={summaryLabel}
            summaryValue={summaryValue}
            actionLabel={actionLabel}
            actionHref={actionHref}
          />

          <ScheduleContent
            selectedDate={selectedDate}
            onPreviousDay={handlePreviousDay}
            onNextDay={handleNextDay}
            onToday={handleToday}
            bookings={bookings}
            isLoading={isLoading}
            isError={isError}
            role={role}
            view={activeView}
            onViewChange={setActiveView}
            onSelectDate={handleSelectDate}
            tutorAvailabilities={role === "tutor" ? tutorProfile?.availabilities ?? [] : []}
          />
        </section>
      </main>
    </div>
  )
}
