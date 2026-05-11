import { getTutorAvailabilityRange, mapBookingsToEvents } from "../calendar.utils"
import EmptyState from "./EmptyState"
import MonthView from "./MonthView"
import TimeCalendar from "./TimeCalendar"
import TimeCalendarSkeleton from "./TimeCalendarSkeleton"
import type { ScheduleCalendarProps } from "./types"

export default function ScheduleCalendar({
  bookings,
  isLoading,
  isError,
  role,
  selectedDate,
  view,
  onSelectDate,
  onViewChange,
  tutorAvailabilities = [],
}: ScheduleCalendarProps) {
  const events = mapBookingsToEvents(bookings, role)
  const isTimeGridView = view === "day" || view === "week"
  const tutorAvailabilityRange = role === "tutor" && isTimeGridView
    ? getTutorAvailabilityRange(tutorAvailabilities)
    : null

  if (isLoading) {
    if (view === "month") {
      return (
        <section className="rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_18px_50px_rgba(87,72,162,0.08)] lg:p-8">
          <div className="grid gap-3">
            <div className="h-8 w-48 animate-pulse rounded-full bg-neutral-100" />
            <div className="h-[520px] animate-pulse rounded-[24px] bg-neutral-100" />
          </div>
        </section>
      )
    }

    return <TimeCalendarSkeleton selectedDate={selectedDate} view={view} range={tutorAvailabilityRange} />
  }

  if (isError) {
    return (
      <section className="rounded-[28px] border border-red-100 bg-red-25 p-6 shadow-[0_18px_50px_rgba(87,72,162,0.06)] lg:p-8">
        <p className="text-sm font-medium text-red-normal">Unable to load your calendar right now.</p>
      </section>
    )
  }

  if (view === "month") {
    if (events.length === 0) {
      return (
        <EmptyState
          message={
            role === "tutor"
              ? "New bookings for the selected range will appear directly on this calendar."
              : "Once you book a lesson, it will appear here at its exact time slot."
          }
        />
      )
    }

    return <MonthView selectedDate={selectedDate} events={events} onSelectDate={onSelectDate} onViewChange={onViewChange} />
  }

  return <TimeCalendar selectedDate={selectedDate} events={events} view={view} onViewChange={onViewChange} range={tutorAvailabilityRange} />
}
