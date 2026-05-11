import { buildPositionedEvents, getHourRows } from "../calendar.utils"
import { getHourlyRangePoints, getTimeGridRowHeight } from "./constants"
import EventCard from "./EventCard"
import type { DayColumnProps } from "./types"
import type { CSSProperties } from "react"

export default function DayColumn({
  day,
  events,
  view,
  range,
}: DayColumnProps) {
  const rowHeight = getTimeGridRowHeight(view)
  const rowPoints = range ? getHourlyRangePoints(range) : getHourRows().map((hour) => hour * 60)
  const gridHeight = rowPoints.length > 0 ? Math.max((rowPoints.length - 1) * rowHeight, rowHeight) : rowHeight
  const slotStarts = rowPoints.slice(0, -1)
  const positionedEvents = buildPositionedEvents(events)
  const startOffsetMinutes = range?.startMinutes ?? 0

  return (
    <div className="relative overflow-hidden border-l border-[#EEEAF8] first:border-l-0">
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
                />
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
          const eventTop = top + 1
          const eventHeight = Math.max(height - 2, 1)
          const widthPercent = 100 / event.laneCount
          const gap = event.laneCount > 1 ? 6 : 0
          const isWeekView = view === "week"

          if (isWeekView) {
            return (
              <div key={event.id}>
                <div
                  className="absolute flex left-[var(--event-left)] w-[var(--event-width)] md:hidden"
                  style={{
                    top: eventTop,
                    height: eventHeight,
                    "--event-left": `calc(${event.lane * widthPercent}% + ${event.lane * gap}px)`,
                    "--event-width": `calc(${widthPercent}% - ${gap}px)`,
                  } as CSSProperties}
                >
                  <EventCard event={event} compact={height < 80} view={view} />
                </div>
                <div
                  className="absolute inset-x-0 hidden md:flex"
                  style={{ top: eventTop, height: eventHeight }}
                >
                  <EventCard event={event} compact={height < 80} view={view} />
                </div>
              </div>
            )
          }

          return (
            <div
              key={event.id}
              className="absolute flex left-[var(--event-left)] w-[var(--event-width)]"
              style={{
                top: eventTop,
                height: eventHeight,
                "--event-left": `calc(${event.lane * widthPercent}% + ${event.lane * gap}px)`,
                "--event-width": `calc(${widthPercent}% - ${gap}px)`,
              } as CSSProperties}
            >
              <EventCard event={event} compact={height < 80} view={view} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
