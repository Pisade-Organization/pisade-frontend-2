import Typography from "@/components/base/Typography"
import { cn } from "@/lib/utils"
import { formatHourLabel, formatMinutesLabel, getHourRows, getTimeGridColumnHeader, getWeekDays, isSameDay } from "../calendar.utils"
import { getHourlyRangePoints, getTimeGridRowHeight } from "./constants"
import DayColumn from "./DayColumn"
import type { TimeCalendarProps } from "./types"

export default function TimeCalendar({
  selectedDate,
  events,
  view,
  onViewChange,
  range,
}: TimeCalendarProps) {
  const rowHeight = getTimeGridRowHeight(view)
  const columns = view === "day" ? [selectedDate] : getWeekDays(selectedDate)
  const rowPoints = range ? getHourlyRangePoints(range) : getHourRows().map((hour) => hour * 60)
  const gridHeight = rowPoints.length > 0 ? Math.max((rowPoints.length - 1) * rowHeight, rowHeight) : rowHeight
  const startOffsetMinutes = range?.startMinutes ?? 0

  return (
    <div className={cn(view === "week" ? "overflow-x-auto overflow-y-hidden touch-pan-x" : "overflow-auto")}>
      <div className={cn(
        "overflow-hidden rounded-xl border border-white/70 bg-white shadow-[0_18px_50px_rgba(87,72,162,0.08)]",
        view === "week" ? "min-w-full lg:min-w-[760px]" : "min-w-full",
      )}>
        <div className="grid grid-cols-[72px_minmax(0,1fr)]">
          <div className="rounded-tl-xl border-b border-[#EEEAF8] bg-white" />

          <div
            className={cn(
              "grid border-b border-[#EEEAF8] bg-white",
              view === "week" ? "grid-cols-7 lg:[grid-template-columns:repeat(7,minmax(160px,1fr))]" : "grid-cols-1",
            )}
          >
            {columns.map((day) => {
              const header = getTimeGridColumnHeader(day, selectedDate, view)

              if (view === "week") {
                return (
                  <div
                    key={day.toISOString()}
                    className="flex flex-col items-center border border-white bg-[rgba(241,241,241,0.6)] py-2"
                  >
                    <Typography variant="body-4" color={header.isToday ? "electric-violet-700" : "neutral-300"} className="uppercase">
                      {header.weekdayLabel}
                    </Typography>
                    <Typography variant="body-4" color={header.isToday ? "electric-violet-700" : "neutral-300"}>
                      {header.dayNumberLabel}
                    </Typography>
                  </div>
                )
              }

              return (
                <div key={day.toISOString()} className="border-l border-[#EEEAF8] px-3 py-4 first:border-l-0">
                  <div className={cn(header.showHeader ? "block" : "hidden")}>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                      {header.weekdayLabel}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-semibold",
                          header.isSelected
                            ? "bg-[#EEE9FF] text-[#5F43EA]"
                            : header.isToday
                              ? "bg-[#F5F4FB] text-neutral-900"
                              : "bg-transparent text-neutral-700",
                        )}
                      >
                        {header.dayNumberLabel}
                      </span>
                      <span className="text-sm text-neutral-500">
                        {header.monthLabel}
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
              view === "week" ? "grid-cols-7 lg:[grid-template-columns:repeat(7,minmax(160px,1fr))]" : "grid-cols-1",
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
