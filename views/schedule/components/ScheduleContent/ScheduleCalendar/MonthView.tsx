import Typography from "@/components/base/Typography"
import { cn } from "@/lib/utils"
import { getMonthGridDays, getStatusTone, isSameDay } from "../calendar.utils"
import type { MonthViewProps } from "./types"

export default function MonthView({
  selectedDate,
  events,
  onSelectDate,
  onViewChange,
}: MonthViewProps) {
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
                  "h-full min-h-[116px] border-b border-r border-[#EEEAF8] p-2 text-center align-top transition hover:bg-[#FBFAFF] md:px-3 md:py-2 md:text-left  flex flex-col",
                  isSelected && "bg-[#F8F5FF]",
                )}
              >
                <div className="flex h-full w-full flex-col items-center md:hidden">
                  <Typography
                    variant="body-3"
                    color={inMonth ? "neutral-900" : "neutral-200"}
                    className={cn("font-semibold", isToday && inMonth && "text-[#5F43EA]")}
                  >
                    {day.getDate()}
                  </Typography>
                  {dayEvents.length > 0 ? (
                    <div className="mt-auto flex items-center gap-1">
                      {dayEvents.slice(0, 4).map((event) => {
                        const tone = getStatusTone(event.status)
                        return <span key={event.id} className="h-2 w-2 rounded-full" style={{ backgroundColor: tone.accent }} />
                      })}
                    </div>
                  ) : null}
                </div>

                <div className="hidden w-full items-start justify-start md:flex">
                  <Typography
                    variant="body-3"
                    color={inMonth ? "neutral-900" : "neutral-200"}
                    className={cn("font-semibold", isToday && inMonth && "text-[#5F43EA]")}
                  >
                    {day.getDate()}
                  </Typography>
                </div>

                <div className="mt-2 hidden flex-col gap-1.5 md:flex">
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
