"use client"

import { useMemo, useState } from "react"
import Navbar from "@/components/Navbar"
import MobileBackground from "../components/MobileBackground"
import SidebarLayout from "../components/SidebarLayout"
import ScheduleContent from "../components/ScheduleContent"
import { useBookings } from "@/hooks/bookings/queries"
import { useMyProfile, useMyWalletSummary, useTutorWalletSummary } from "@/hooks/settings/queries"

type ScheduleRole = "student" | "tutor"

type SchedulePageProps = {
  navbarVariant?: "student_dashboard" | "tutor_dashboard"
  role?: ScheduleRole
}

function getDayRange(date: Date) {
  const start = new Date(date)
  start.setHours(0, 0, 0, 0)

  const end = new Date(start)
  end.setDate(end.getDate() + 1)
  end.setMilliseconds(end.getMilliseconds() - 1)

  return {
    from: start.toISOString(),
    to: end.toISOString(),
  }
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

  const { from, to } = useMemo(() => getDayRange(selectedDate), [selectedDate])
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
    setSelectedDate((prev) => {
      const next = new Date(prev)
      next.setDate(next.getDate() - 1)
      return next
    })
  }

  const handleNextDay = () => {
    setSelectedDate((prev) => {
      const next = new Date(prev)
      next.setDate(next.getDate() + 1)
      return next
    })
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
          />
        </section>
      </main>
    </div>
  )
}
