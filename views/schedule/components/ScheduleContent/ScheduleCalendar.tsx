import { cn } from "@/lib/utils"
import type { BookingListItem } from "@/services/bookings/types"
import type { MyTutorAvailability } from "@/services/tutor/types"
import Typography from "@/components/base/Typography"
import { Plus } from "lucide-react"
import {
  buildPositionedEvents,
  formatMinutesLabel,
  formatTimeRange,
  formatHourLabel,
  getHourRows,
  getMonthGridDays,
  getStatusTone,
  getTutorAvailabilityRange,
  getWeekDays,
  isSameDay,
  mapBookingsToEvents,
  type CalendarEventItem,
  type CalendarView,
  type TimeGridRange,
} from "./calendar.utils"

type ScheduleRole = "student" | "tutor"

interface ScheduleCalendarProps {
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

const HOUR_HEIGHT = 72
const DAY_VIEW_HOUR_HEIGHT = 96

function getHourlyRangePoints(range: TimeGridRange) {
  const points: number[] = []

  for (let minutes = range.startMinutes; minutes <= range.endMinutes; minutes += 60) {
    points.push(minutes)
  }

  return points
}

function getTimeGridRowHeight(view: CalendarView) {
  return view === "day" ? DAY_VIEW_HOUR_HEIGHT : HOUR_HEIGHT
}

function EmptyState({ message }: { message: string }) {
  return (
    <section className="rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_18px_50px_rgba(87,72,162,0.08)] lg:p-8">
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[24px] border border-dashed border-[#E6E2F5] bg-[linear-gradient(180deg,#fbfbff_0%,#f4f2fb_100%)] px-6 text-center">
        <div className="mb-3 rounded-full bg-[#F0ECFF] px-4 py-2 text-sm font-semibold text-[#5F43EA]">Schedule is clear</div>
        <h3 className="text-xl font-semibold text-neutral-900">No classes in this range</h3>
        <p className="mt-2 max-w-md text-sm text-neutral-500">{message}</p>
      </div>
    </section>
  )
}

function EventCard({ event, compact = false }: { event: CalendarEventItem; compact?: boolean }) {
  const tone = getStatusTone(event.status)
  const initials = event.participantName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      className={cn(
        "h-full overflow-hidden rounded-2xl border p-2 text-left shadow-[0_10px_24px_rgba(37,20,104,0.08)]",
        compact ? "rounded-xl p-2" : "p-3"
      )}
      style={{
        backgroundColor: tone.background,
        borderColor: tone.border,
      }}
    >
      <div className="flex items-start gap-2">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: tone.accent }}
        >
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">{tone.label}</p>
            {!compact ? <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: tone.accent }} /> : null}
          </div>
          <p className={cn("truncate font-semibold text-neutral-900", compact ? "mt-1 text-sm" : "mt-1 text-[15px]")}>{event.title}</p>
          <p className="mt-1 truncate text-xs text-neutral-500">{formatTimeRange(event.start, event.end)}</p>
        </div>
      </div>
    </div>
  )
}

function MonthView({
  selectedDate,
  events,
  onSelectDate,
  onViewChange,
}: {
  selectedDate: Date
  events: CalendarEventItem[]
  onSelectDate: (date: Date) => void
  onViewChange: (view: CalendarView) => void
}) {
  const days = getMonthGridDays(selectedDate)
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="overflow-auto">
      <section className="min-w-[760px] overflow-hidden rounded-xl border border-white/70 bg-white shadow-[0_18px_50px_rgba(87,72,162,0.08)]">
        <div className="grid grid-cols-7 border-b border-[#EEEAF8] bg-white">
          {weekdays.map((weekday) => (
            <div key={weekday} className="flex flex-col items-center border border-white bg-[rgba(241,241,241,0.6)] py-2">
              <Typography variant="body-4" color="neutral-300" className="uppercase">
                {weekday}
              </Typography>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {days.map((day) => {
            const dayEvents = events.filter((event) => isSameDay(event.start, day)).sort((left, right) => left.start.getTime() - right.start.getTime())
            const inMonth = day.getMonth() === selectedDate.getMonth()
            const isSelected = isSameDay(day, selectedDate)
            const isToday = isSameDay(day, new Date())

            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => {
                  onSelectDate(day)
                  onViewChange("day")
                }}
                className={cn(
                  "min-h-[116px] border-b border-r border-[#EEEAF8] px-3 py-2 text-left align-top transition hover:bg-[#FBFAFF]",
                  isSelected && "bg-[#F8F5FF]"
                )}
              >
                <div className="flex items-start gap-2">
                  <Typography
                    variant="body-3"
                    color={inMonth ? "neutral-900" : "neutral-200"}
                    className={cn("font-semibold", isToday && inMonth && "text-[#5F43EA]")}
                  >
                    {day.getDate()}
                  </Typography>
                </div>

                <div className="mt-2 flex flex-col gap-1.5">
                  {dayEvents.length > 0 ? (
                    <div className="flex items-center gap-1">
                      {dayEvents.slice(0, 4).map((event) => {
                        const tone = getStatusTone(event.status)

                        return <span key={event.id} className="h-2 w-2 rounded-full" style={{ backgroundColor: tone.accent }} />
                      })}
                    </div>
                  ) : null}
                </div>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function DayColumn({
  day,
  events,
  view,
  range,
}: {
  day: Date
  events: CalendarEventItem[]
  view: CalendarView
  range?: TimeGridRange | null
}) {
  const rowHeight = getTimeGridRowHeight(view)
  const rowPoints = range ? getHourlyRangePoints(range) : getHourRows().map((hour) => hour * 60)
  const gridHeight = rowPoints.length > 0 ? Math.max((rowPoints.length - 1) * rowHeight, rowHeight) : rowHeight
  const slotStarts = rowPoints.slice(0, -1)
  const positionedEvents = buildPositionedEvents(events)
  const startOffsetMinutes = range?.startMinutes ?? 0

  return (
    <div className="relative border-l border-[#EEEAF8] first:border-l-0">
      {rowPoints.map((minutes) => (
        <div
          key={`${day.toISOString()}-${minutes}`}
          className="absolute left-0 right-0 border-t border-[#F1EDF9]"
          style={{ top: range ? ((minutes - startOffsetMinutes) / 60) * rowHeight : (minutes / 60) * rowHeight }}
        />
      ))}

      <div className="relative" style={{ height: gridHeight }}>
        {view === "day"
          ? slotStarts.map((minutes) => {
              const top = range ? ((minutes - startOffsetMinutes) / 60) * rowHeight : (minutes / 60) * rowHeight

              return (
                <div
                  key={`${day.toISOString()}-slot-${minutes}`}
                  className="group absolute inset-x-0"
                  style={{ top, height: rowHeight }}
                >
                  <div className="absolute left-2 right-2 top-1/2 h-[2px] -translate-y-1/2 bg-electric-violet-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute left-2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-violet-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute right-2 top-1/2 h-4 w-4 translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-violet-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-electric-violet-500 opacity-0 transition-opacity group-hover:opacity-100">
                    <Plus className="h-5 w-5 text-white" />
                  </div>
                </div>
              )
            })
          : null}

        {positionedEvents.map((event) => {
          const startMinutes = event.start.getHours() * 60 + event.start.getMinutes()
          const endMinutes = event.end.getHours() * 60 + event.end.getMinutes()
          const top = range ? ((startMinutes - startOffsetMinutes) / 60) * rowHeight : (startMinutes / 60) * rowHeight
          const height = Math.max(
            ((endMinutes - startMinutes) / 60) * rowHeight,
            56,
          )
          const widthPercent = 100 / event.laneCount
          const gap = 6

          return (
            <div
              key={event.id}
              className="absolute px-[3px]"
              style={{
                top,
                height,
                left: `calc(${event.lane * widthPercent}% + ${event.lane * gap}px)`,
                width: `calc(${widthPercent}% - ${gap}px)`,
              }}
            >
              <EventCard event={event} compact={height < 80} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TimeCalendar({
  selectedDate,
  events,
  view,
  onViewChange,
  range,
}: {
  selectedDate: Date
  events: CalendarEventItem[]
  view: CalendarView
  onViewChange: (view: CalendarView) => void
  range?: TimeGridRange | null
}) {
  const rowHeight = getTimeGridRowHeight(view)
  const columns = view === "day" ? [selectedDate] : getWeekDays(selectedDate)
  const rowPoints = range ? getHourlyRangePoints(range) : getHourRows().map((hour) => hour * 60)
  const gridHeight = rowPoints.length > 0 ? Math.max((rowPoints.length - 1) * rowHeight, rowHeight) : rowHeight
  const startOffsetMinutes = range?.startMinutes ?? 0

  return (
    <div className={cn(view === "week" ? "overflow-x-auto overflow-y-hidden touch-pan-x" : "overflow-auto")}>
      <div className={cn(
        "overflow-hidden rounded-xl border border-white/70 bg-white shadow-[0_18px_50px_rgba(87,72,162,0.08)]",
        view === "week" ? "min-w-full lg:min-w-[760px]" : "min-w-[760px]"
      )}>
        <div className="grid grid-cols-[72px_minmax(0,1fr)]">
          <div className="rounded-tl-xl border-b border-[#EEEAF8] bg-white" />

          <div
            className={cn(
              "grid border-b border-[#EEEAF8] bg-white",
              view === "week" ? "grid-cols-7 lg:[grid-template-columns:repeat(7,minmax(160px,1fr))]" : "grid-cols-1"
            )}
          >
            {columns.map((day) => {
              const isToday = isSameDay(day, new Date())

              if (view === "week") {
                return (
                  <div
                    key={day.toISOString()}
                    className="flex flex-col items-center border border-white bg-[rgba(241,241,241,0.6)] py-2"
                  >
                    <Typography variant="body-4" color={isToday ? "electric-violet-700" : "neutral-300"} className="uppercase">
                      {day.toLocaleDateString("en-US", { weekday: "short" })}
                    </Typography>
                    <Typography variant="body-4" color={isToday ? "electric-violet-700" : "neutral-300"}>
                      {day.getDate()}
                    </Typography>
                  </div>
                )
              }

              const isSelected = isSameDay(day, selectedDate)

              return (
                <div key={day.toISOString()} className="border-l border-[#EEEAF8] px-3 py-4 first:border-l-0">
                  <div className={cn(view === "day" ? "hidden" : "block")}>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                      {day.toLocaleDateString("en-US", { weekday: "short" })}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-semibold",
                          isSelected
                            ? "bg-[#EEE9FF] text-[#5F43EA]"
                            : isToday
                              ? "bg-[#F5F4FB] text-neutral-900"
                              : "bg-transparent text-neutral-700"
                        )}
                      >
                        {day.getDate()}
                      </span>
                      <span className="text-sm text-neutral-500">
                        {day.toLocaleDateString("en-US", { month: "short", year: columns.length === 1 ? "numeric" : undefined })}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="relative border-r border-[#EEEAF8] bg-white" style={{ height: gridHeight }}>
            {rowPoints.map((minutes) => (
              <div
                key={minutes}
                className="absolute left-0 right-0 border-t border-[#F1EDF9]"
                style={{ top: range ? ((minutes - startOffsetMinutes) / 60) * rowHeight : (minutes / 60) * rowHeight }}
              >
                <Typography
                  variant="body-3"
                  color="neutral-400"
                  className="absolute -top-3 left-3 bg-white px-1"
                >
                  {range ? formatMinutesLabel(minutes) : formatHourLabel(minutes / 60)}
                </Typography>
              </div>
            ))}
          </div>

          <div
            className={cn(
              "grid",
              view === "week" ? "grid-cols-7 lg:[grid-template-columns:repeat(7,minmax(160px,1fr))]" : "grid-cols-1"
            )}
            style={{ height: gridHeight }}
          >
            {columns.map((day) => {
              const dayEvents = events.filter((event) => isSameDay(event.start, day))

              return <DayColumn key={day.toISOString()} day={day} events={dayEvents} view={view} range={range} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

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
  const shouldRenderTimeGrid = events.length > 0 || (role === "tutor" && isTimeGridView && tutorAvailabilityRange !== null)

  if (isLoading) {
    return (
      <section className="rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_18px_50px_rgba(87,72,162,0.08)] lg:p-8">
        <div className="grid gap-3">
          <div className="h-8 w-48 animate-pulse rounded-full bg-neutral-100" />
          <div className="h-[520px] animate-pulse rounded-[24px] bg-neutral-100" />
        </div>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="rounded-[28px] border border-red-100 bg-red-25 p-6 shadow-[0_18px_50px_rgba(87,72,162,0.06)] lg:p-8">
        <p className="text-sm font-medium text-red-normal">Unable to load your calendar right now.</p>
      </section>
    )
  }

  if (!shouldRenderTimeGrid && events.length === 0) {
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

  if (view === "month") {
    return <MonthView selectedDate={selectedDate} events={events} onSelectDate={onSelectDate} onViewChange={onViewChange} />
  }

  return <TimeCalendar selectedDate={selectedDate} events={events} view={view} onViewChange={onViewChange} range={tutorAvailabilityRange} />
}
