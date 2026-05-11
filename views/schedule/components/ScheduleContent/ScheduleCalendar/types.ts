import type { BookingListItem } from "@/services/bookings/types"
import type { MyTutorAvailability } from "@/services/tutor/types"
import type { CalendarEventItem, CalendarView, TimeGridRange } from "../calendar.utils"

export type ScheduleRole = "student" | "tutor"

export interface ScheduleCalendarProps {
  bookings: BookingListItem[]
  isLoading: boolean
  isError: boolean
  role: ScheduleRole
  selectedDate: Date
  view: CalendarView
  onSelectDate: (date: Date) => void
  onViewChange: (view: CalendarView) => void
  tutorAvailabilities?: MyTutorAvailability[]
}

export interface EventCardProps {
  event: CalendarEventItem
  compact?: boolean
  view: CalendarView
}

export interface DayColumnProps {
  day: Date
  events: CalendarEventItem[]
  view: CalendarView
  range?: TimeGridRange | null
}

export interface MonthViewProps {
  selectedDate: Date
  events: CalendarEventItem[]
  onSelectDate: (date: Date) => void
  onViewChange: (view: CalendarView) => void
}

export interface TimeCalendarProps {
  selectedDate: Date
  events: CalendarEventItem[]
  view: CalendarView
  onViewChange: (view: CalendarView) => void
  range?: TimeGridRange | null
}

export interface TimeCalendarSkeletonProps {
  selectedDate: Date
  view: CalendarView
  range?: TimeGridRange | null
}
