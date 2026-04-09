import type { BookingListItem } from "@/services/bookings/types"
import type { MyTutorAvailability } from "@/services/tutor/types"
import ViewSelector from "@/views/reschedule/components/ScheduleHeader/ViewSelector"
import ScheduleCalendar from "./ScheduleCalendar"
import type { CalendarView } from "./calendar.utils"
import ScheduleHeader from "@/views/reschedule/components/ScheduleHeader"

type ScheduleRole = "student" | "tutor"

interface ScheduleContentProps {
  selectedDate: Date
  onPreviousDay: () => void
  onNextDay: () => void
  onToday: () => void
  bookings: BookingListItem[]
  isLoading: boolean
  isError: boolean
  role: ScheduleRole
  view: CalendarView
  onViewChange: (view: CalendarView) => void
  onSelectDate: (date: Date) => void
  tutorAvailabilities?: MyTutorAvailability[]
}

export default function ScheduleContent({
  selectedDate,
  onPreviousDay,
  onNextDay,
  onToday,
  bookings,
  isLoading,
  isError,
  role,
  view,
  onViewChange,
  onSelectDate,
  tutorAvailabilities = [],
}: ScheduleContentProps) {
  return (
    <section className="flex flex-col gap-3">
      <div className="lg:hidden">
        <ScheduleHeader
          weekStartDate={selectedDate}
          onPrevWeek={onPreviousDay}
          onNextWeek={onNextDay}
          onToday={onToday}
          variant="mobile"
          view={view}
          onViewChange={onViewChange}
          showViewSelector={false}
        />
      </div>
      <div className="hidden lg:block">
        <ScheduleHeader
          weekStartDate={selectedDate}
          onPrevWeek={onPreviousDay}
          onNextWeek={onNextDay}
          onToday={onToday}
          variant="desktop"
          view={view}
          onViewChange={onViewChange}
        />
      </div>
      <div className="bg-white rounded-xl space-y-4 py-3 lg:py-0 lg:space-y-0 ">
        <div className="px-4 lg:hidden">
          <ViewSelector view={view} onViewChange={onViewChange} className="rounded-md border border-neutral-50 lg:hidden" />
        </div>
        <ScheduleCalendar
          bookings={bookings}
          isLoading={isLoading}
          isError={isError}
          role={role}
          selectedDate={selectedDate}
          view={view}
          onSelectDate={onSelectDate}
          onViewChange={onViewChange}
          tutorAvailabilities={tutorAvailabilities}
        />
      </div>
    </section>
  )
}
