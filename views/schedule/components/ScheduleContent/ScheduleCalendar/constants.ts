import type { CalendarView, TimeGridRange } from "../calendar.utils"

export const HOUR_HEIGHT = 72
export const DAY_VIEW_HOUR_HEIGHT = 96

export function getTimeGridRowHeight(view: CalendarView) {
  return view === "day" ? DAY_VIEW_HOUR_HEIGHT : HOUR_HEIGHT
}

export function getHourlyRangePoints(range: TimeGridRange) {
  const points: number[] = []

  for (let minutes = range.startMinutes; minutes <= range.endMinutes; minutes += 60) {
    points.push(minutes)
  }

  return points
}
