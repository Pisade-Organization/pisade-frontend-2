import { cn } from "@/lib/utils"
import type { BookingListItem } from "@/services/bookings/types"
import {
  buildPositionedEvents,
  formatTimeRange,
  formatHourLabel,
  getHourRows,
  getMonthGridDays,
  getStatusTone,
  getWeekDays,
  isSameDay,
  mapBookingsToEvents,
  type CalendarEventItem,
  type CalendarView,
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
}

const HOUR_HEIGHT = 72

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
      <section className="min-w-[760px] rounded-[28px] border border-white/70 bg-white p-3 shadow-[0_18px_50px_rgba(87,72,162,0.08)] lg:p-4">
        <div className="grid grid-cols-7 gap-2">
          {weekdays.map((weekday) => (
            <div key={weekday} className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
              {weekday}
            </div>
          ))}

          {days.map((day) => {
            const dayEvents = events.filter((event) => isSameDay(event.start, day)).sort((left, right) => left.start.getTime() - right.start.getTime())
            const inMonth = day.getMonth() === selectedDate.getMonth()
            const isSelected = isSameDay(day, selectedDate)

            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => {
                  onSelectDate(day)
                  onViewChange("day")
                }}
                className={cn(
                  "flex min-h-[140px] flex-col rounded-[22px] border p-3 text-left transition hover:border-[#CFC7FF] hover:bg-[#FBFAFF]",
                  isSelected ? "border-[#CFC7FF] bg-[#F8F5FF]" : "border-[#F0EDF8] bg-[#FCFCFE]"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn("text-sm font-semibold", inMonth ? "text-neutral-900" : "text-neutral-300")}>{day.getDate()}</span>
                  {isSameDay(day, new Date()) ? (
                    <span className="rounded-full bg-[#EEE9FF] px-2 py-1 text-[11px] font-semibold text-[#5F43EA]">Today</span>
                  ) : null}
                </div>

                <div className="mt-3 flex flex-1 flex-col gap-2">
                  {dayEvents.slice(0, 2).map((event) => {
                    const tone = getStatusTone(event.status)

                    return (
                      <div
                        key={event.id}
                        className="rounded-xl border px-2 py-1.5"
                        style={{
                          backgroundColor: tone.background,
                          borderColor: tone.border,
                        }}
                      >
                        <p className="truncate text-xs font-semibold text-neutral-900">{event.participantName}</p>
                        <p className="mt-0.5 text-[11px] text-neutral-500">
                          {event.start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                        </p>
                      </div>
                    )
                  })}

                  {dayEvents.length > 2 ? (
                    <p className="text-xs font-semibold text-[#5F43EA]">+{dayEvents.length - 2} more</p>
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

function DayColumn({ day, events }: { day: Date; events: CalendarEventItem[] }) {
  const gridHeight = getHourRows().length * HOUR_HEIGHT
  const positionedEvents = buildPositionedEvents(events)

  return (
    <div className="relative border-l border-[#EEEAF8] first:border-l-0">
      {getHourRows().map((hour) => (
        <div
          key={`${day.toISOString()}-${hour}`}
          className="absolute left-0 right-0 border-t border-[#F1EDF9]"
          style={{ top: hour * HOUR_HEIGHT }}
        />
      ))}

      <div className="relative" style={{ height: gridHeight }}>
        {positionedEvents.map((event) => {
          const startMinutes = event.start.getHours() * 60 + event.start.getMinutes()
          const endMinutes = event.end.getHours() * 60 + event.end.getMinutes()
          const top = (startMinutes / 60) * HOUR_HEIGHT
          const height = Math.max(((endMinutes - startMinutes) / 60) * HOUR_HEIGHT, 56)
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
}: {
  selectedDate: Date
  events: CalendarEventItem[]
  view: CalendarView
}) {
  const columns = view === "day" ? [selectedDate] : getWeekDays(selectedDate)
  const gridHeight = getHourRows().length * HOUR_HEIGHT

  return (
    <div className="overflow-auto">
      <div className="min-w-[760px] rounded-[28px] border border-white/70 bg-white shadow-[0_18px_50px_rgba(87,72,162,0.08)]">
        <div className="grid grid-cols-[72px_minmax(0,1fr)]">
          <div className="border-b border-[#EEEAF8] bg-[#FAFAFE]" />

          <div
            className="grid border-b border-[#EEEAF8] bg-[#FAFAFE]"
            style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(160px, 1fr))` }}
          >
            {columns.map((day) => {
              const isSelected = isSameDay(day, selectedDate)
              const isToday = isSameDay(day, new Date())

              return (
                <div key={day.toISOString()} className="border-l border-[#EEEAF8] px-3 py-4 first:border-l-0">
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
              )
            })}
          </div>

          <div className="relative border-r border-[#EEEAF8] bg-[#FCFBFF]" style={{ height: gridHeight }}>
            {getHourRows().map((hour) => (
              <div
                key={hour}
                className="absolute left-0 right-0 border-t border-[#F1EDF9]"
                style={{ top: hour * HOUR_HEIGHT }}
              >
                <span className="absolute -top-3 left-3 bg-[#FCFBFF] px-1 text-xs font-medium text-neutral-400">
                  {formatHourLabel(hour)}
                </span>
              </div>
            ))}
          </div>

          <div
            className="grid"
            style={{
              height: gridHeight,
              gridTemplateColumns: `repeat(${columns.length}, minmax(160px, 1fr))`,
            }}
          >
            {columns.map((day) => {
              const dayEvents = events.filter((event) => isSameDay(event.start, day))

              return <DayColumn key={day.toISOString()} day={day} events={dayEvents} />
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
}: ScheduleCalendarProps) {
  const events = mapBookingsToEvents(bookings, role)

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

  if (view === "month") {
    return <MonthView selectedDate={selectedDate} events={events} onSelectDate={onSelectDate} onViewChange={onViewChange} />
  }

  return <TimeCalendar selectedDate={selectedDate} events={events} view={view} />
}
