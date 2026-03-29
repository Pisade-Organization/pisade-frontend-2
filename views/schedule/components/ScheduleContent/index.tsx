import type { BookingListItem } from "@/services/bookings/types"
import ScheduleContentHeader from "./ScheduleContentHeader"
import ScheduleCalendar from "./ScheduleCalendar"

type ScheduleRole = "student" | "tutor"

interface ScheduleContentProps {
  selectedDate: Date
  onPreviousDay: () => void
  onNextDay: () => void
  bookings: BookingListItem[]
  isLoading: boolean
  isError: boolean
  role: ScheduleRole
}

export default function ScheduleContent({
  selectedDate,
  onPreviousDay,
  onNextDay,
  bookings,
  isLoading,
  isError,
  role,
}: ScheduleContentProps) {
  return (
    <section className="flex flex-col gap-3">
      <ScheduleContentHeader
        selectedDate={selectedDate}
        onPreviousDay={onPreviousDay}
        onNextDay={onNextDay}
      />
      <ScheduleCalendar
        bookings={bookings}
        isLoading={isLoading}
        isError={isError}
        role={role}
        selectedDate={selectedDate}
      />
    </section>
  )
}
