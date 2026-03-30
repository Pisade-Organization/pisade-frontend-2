import type { BookingListItem } from "@/services/bookings/types"
import ScheduleContentHeader from "./ScheduleContentHeader"
import ScheduleCalendar from "./ScheduleCalendar"
import type { CalendarView } from "./calendar.utils"

type ScheduleRole = "student" | "tutor"

interface ScheduleContentProps {
  selectedDate: Date
  onPreviousDay: () => void
  onNextDay: () => void
  bookings: BookingListItem[]
  isLoading: boolean
  isError: boolean
  role: ScheduleRole
  view: CalendarView
  onViewChange: (view: CalendarView) => void
  onSelectDate: (date: Date) => void
}

export default function ScheduleContent({
  selectedDate,
  onPreviousDay,
  onNextDay,
  bookings,
  isLoading,
  isError,
  role,
  view,
  onViewChange,
  onSelectDate,
}: ScheduleContentProps) {
  return (
    <section className="flex flex-col gap-3">
      <ScheduleContentHeader
        selectedDate={selectedDate}
        onPreviousDay={onPreviousDay}
        onNextDay={onNextDay}
        view={view}
        onViewChange={onViewChange}
        onSelectDate={onSelectDate}
      />
      <ScheduleCalendar
        bookings={bookings}
        isLoading={isLoading}
        isError={isError}
        role={role}
        selectedDate={selectedDate}
        view={view}
        onSelectDate={onSelectDate}
        onViewChange={onViewChange}
      />
    </section>
  )
}
