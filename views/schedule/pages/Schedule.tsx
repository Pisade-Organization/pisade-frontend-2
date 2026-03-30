"use client"

import { useMemo, useState } from "react"
import Navbar from "@/components/Navbar"
import MobileBackground from "../components/MobileBackground"
import SidebarLayout from "../components/SidebarLayout"
import ScheduleContent from "../components/ScheduleContent"
import { useBookings } from "@/hooks/bookings/queries"
import { useMyProfile, useMyWalletSummary, useTutorWalletSummary } from "@/hooks/settings/queries"
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
  const [activeView, setActiveView] = useState<CalendarView>("week")

  const { from, to } = useMemo(() => {
    const range = getVisibleRange(selectedDate, activeView)

    return {
      from: range.from.toISOString(),
      to: range.to.toISOString(),
    }
  }, [selectedDate, activeView])
  const { data: bookingsData, isLoading, isError } = useBookings({ from, to, limit: 100 })
  const { data: profile } = useMyProfile()
  const { data: walletSummary } = useMyWalletSummary(role === "student")
  const { data: tutorWalletSummary } = useTutorWalletSummary(role === "tutor")

  const bookings = bookingsData?.data ?? []

  const fullName = profile?.profile?.fullName ?? (role === "student" ? "Student" : "Tutor")
  const timezone = profile?.profile?.timezone ?? "Asia/Bangkok"

  const summaryLabel = role === "student" ? "Wallet balance" : "Total earnings"
  const summaryValue = role === "student"
    ? formatCurrency(walletSummary?.balance ?? 0)
    : formatCurrency(tutorWalletSummary?.totalEarnings ?? 0)
  const actionLabel = role === "student" ? "Top Up Wallet" : "View Wallet"
  const actionHref = role === "student" ? "/student/wallet" : "/tutor/wallet"

  const handleSelectDate = (date: Date) => {
    setSelectedDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
  }

  const handlePreviousDay = () => {
    setSelectedDate((prev) => shiftDate(prev, activeView, -1))
  }

  const handleNextDay = () => {
    setSelectedDate((prev) => shiftDate(prev, activeView, 1))
  }

  return (
    <div className="w-full min-h-screen bg-[#efeff3]">
      <Navbar variant={navbarVariant} />

      <main className="w-full lg:px-4 lg:py-4">
        <section className="lg:hidden">
          <div className="w-full overflow-hidden">
            <MobileBackground />
          </div>

          <div className="mt-4 px-4">
            <SidebarLayout
              fullName={fullName}
              timezone={timezone}
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
              summaryLabel={summaryLabel}
              summaryValue={summaryValue}
              actionLabel={actionLabel}
              actionHref={actionHref}
            />
          </div>
        </section>

        <section className="px-4 pb-8 pt-4 lg:hidden">
          <ScheduleContent
            selectedDate={selectedDate}
            onPreviousDay={handlePreviousDay}
            onNextDay={handleNextDay}
            bookings={bookings}
            isLoading={isLoading}
            isError={isError}
            role={role}
            view={activeView}
            onViewChange={setActiveView}
            onSelectDate={handleSelectDate}
          />
        </section>

        <section className="hidden w-full lg:grid lg:grid-cols-[276px_minmax(0,1fr)] lg:gap-4">
          <SidebarLayout
            fullName={fullName}
            timezone={timezone}
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
            bookings={bookings}
            isLoading={isLoading}
            isError={isError}
            role={role}
            view={activeView}
            onViewChange={setActiveView}
            onSelectDate={handleSelectDate}
          />
        </section>
      </main>
    </div>
  )
}
