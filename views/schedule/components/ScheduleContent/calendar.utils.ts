import type { BookingListItem } from "@/services/bookings/types"

export type CalendarView = "day" | "week" | "month"

export interface CalendarEventItem {
  id: string
  title: string
  participantName: string
  avatarUrl: string | null
  start: Date
  end: Date
  status: string
}

export interface TutorAvailabilitySlot {
  dayOfWeek: number | string
  startTime: string
  endTime: string
}

export interface TimeGridRange {
  startMinutes: number
  endMinutes: number
}

export function startOfDay(date: Date) {
  const next = new Date(date)
  next.setHours(0, 0, 0, 0)
  return next
}

export function endOfDay(date: Date) {
  const next = startOfDay(date)
  next.setDate(next.getDate() + 1)
  next.setMilliseconds(next.getMilliseconds() - 1)
  return next
}

export function startOfWeek(date: Date) {
  const next = startOfDay(date)
  next.setDate(next.getDate() - next.getDay())
  return next
}

export function endOfWeek(date: Date) {
  const next = startOfWeek(date)
  next.setDate(next.getDate() + 7)
  next.setMilliseconds(next.getMilliseconds() - 1)
  return next
}

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function endOfMonth(date: Date) {
  const next = new Date(date.getFullYear(), date.getMonth() + 1, 1)
  next.setMilliseconds(next.getMilliseconds() - 1)
  return next
}

export function startOfMonthGrid(date: Date) {
  return startOfWeek(startOfMonth(date))
}

export function endOfMonthGrid(date: Date) {
  const monthEnd = endOfMonth(date)
  const next = endOfWeek(monthEnd)
  return next
}

export function shiftDate(date: Date, view: CalendarView, direction: -1 | 1) {
  const next = new Date(date)

  if (view === "day") {
    next.setDate(next.getDate() + direction)
    return next
  }

  if (view === "week") {
    next.setDate(next.getDate() + direction * 7)
    return next
  }

  return new Date(next.getFullYear(), next.getMonth() + direction, next.getDate())
}

export function getVisibleRange(date: Date, view: CalendarView) {
  if (view === "day") {
    return { from: startOfDay(date), to: endOfDay(date) }
  }

  if (view === "week") {
    return { from: startOfWeek(date), to: endOfWeek(date) }
  }

  return { from: startOfMonthGrid(date), to: endOfMonthGrid(date) }
}

export function formatHeaderLabel(date: Date, view: CalendarView) {
  if (view === "day") {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  if (view === "week") {
    const weekStart = startOfWeek(date)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)

    const sameMonth = weekStart.getMonth() === weekEnd.getMonth()
    const sameYear = weekStart.getFullYear() === weekEnd.getFullYear()

    if (sameMonth && sameYear) {
      return `${weekStart.toLocaleDateString("en-US", { month: "long" })} ${weekStart.getDate()}-${weekEnd.getDate()}, ${weekStart.getFullYear()}`
    }

    return `${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })
}

export function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  )
}

export function getWeekDays(date: Date) {
  const start = startOfWeek(date)

  return Array.from({ length: 7 }, (_, index) => {
    const next = new Date(start)
    next.setDate(start.getDate() + index)
    return next
  })
}

export function getMonthGridDays(date: Date) {
  const start = startOfMonthGrid(date)

  return Array.from({ length: 42 }, (_, index) => {
    const next = new Date(start)
    next.setDate(start.getDate() + index)
    return next
  })
}

export function getHourRows() {
  return Array.from({ length: 24 }, (_, hour) => hour)
}

export function getHalfHourRows(range: TimeGridRange) {
  const rows: number[] = []

  for (let minutes = range.startMinutes; minutes <= range.endMinutes; minutes += 30) {
    rows.push(minutes)
  }

  return rows
}

export function formatHourLabel(hour: number) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
  }).format(new Date(2026, 0, 1, hour))
}

export function formatMinutesLabel(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`
}

export function formatTimeRange(start: Date, end: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })

  return `${formatter.format(start)} - ${formatter.format(end)}`
}

export function timeToMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number)
  return hours * 60 + minutes
}

export function getTutorAvailabilityRange(availabilities: TutorAvailabilitySlot[]): TimeGridRange | null {
  if (availabilities.length === 0) {
    return null
  }

  let startMinutes = Number.POSITIVE_INFINITY
  let endMinutes = Number.NEGATIVE_INFINITY

  availabilities.forEach((slot) => {
    startMinutes = Math.min(startMinutes, timeToMinutes(slot.startTime))
    endMinutes = Math.max(endMinutes, timeToMinutes(slot.endTime))
  })

  if (!Number.isFinite(startMinutes) || !Number.isFinite(endMinutes) || endMinutes <= startMinutes) {
    return null
  }

  return {
    startMinutes,
    endMinutes,
  }
}

export function mapBookingsToEvents(bookings: BookingListItem[], role: "student" | "tutor") {
  return bookings
    .filter((booking) => {
      if (role === "student") {
        return booking.status !== "EXPIRED"
      }

      return true
    })
    .map<CalendarEventItem>((booking) => {
      const participant = role === "student" ? booking.tutor : booking.student
      const participantName = participant?.name ?? (role === "student" ? "Tutor" : "Student")

      return {
        id: booking.id,
        title: `Class with ${participantName}`,
        participantName,
        avatarUrl: participant?.avatarUrl ?? null,
        start: new Date(booking.schedule.startTime),
        end: new Date(booking.schedule.endTime),
        status: booking.status,
      }
    })
}

export function getStatusTone(status: string) {
  if (status === "CONFIRMED") {
    return {
      accent: "#6D59F0",
      background: "#F1EEFF",
      border: "#D9D0FF",
      label: "Confirmed",
    }
  }

  if (status === "PENDING_PAYMENT") {
    return {
      accent: "#D97706",
      background: "#FFF5E8",
      border: "#F4D4A5",
      label: "Pending",
    }
  }

  if (status === "COMPLETED") {
    return {
      accent: "#4B5563",
      background: "#F3F4F6",
      border: "#D1D5DB",
      label: "Completed",
    }
  }

  if (status === "CANCELLED") {
    return {
      accent: "#DC2626",
      background: "#FEF2F2",
      border: "#FECACA",
      label: "Cancelled",
    }
  }

  return {
    accent: "#334155",
    background: "#F8FAFC",
    border: "#CBD5E1",
    label: status,
  }
}

export interface PositionedEvent extends CalendarEventItem {
  lane: number
  laneCount: number
}

export function buildPositionedEvents(events: CalendarEventItem[]) {
  const sorted = [...events].sort((left, right) => {
    const startDiff = left.start.getTime() - right.start.getTime()
    if (startDiff !== 0) {
      return startDiff
    }

    return right.end.getTime() - left.end.getTime()
  })

  const groups = new Map<number, PositionedEvent[]>()
  const active: Array<{ event: PositionedEvent; groupId: number }> = []
  let groupId = -1

  sorted.forEach((event) => {
    for (let index = active.length - 1; index >= 0; index -= 1) {
      if (active[index].event.end.getTime() <= event.start.getTime()) {
        active.splice(index, 1)
      }
    }

    if (active.length === 0) {
      groupId += 1
      groups.set(groupId, [])
    }

    const usedLanes = new Set(active.map((item) => item.event.lane))
    let lane = 0
    while (usedLanes.has(lane)) {
      lane += 1
    }

    const nextEvent: PositionedEvent = {
      ...event,
      lane,
      laneCount: 1,
    }

    active.push({ event: nextEvent, groupId })
    groups.get(groupId)?.push(nextEvent)
  })

  groups.forEach((group) => {
    const laneCount = group.reduce((max, event) => Math.max(max, event.lane + 1), 1)
    group.forEach((event) => {
      event.laneCount = laneCount
    })
  })

  return Array.from(groups.values()).flat()
}
