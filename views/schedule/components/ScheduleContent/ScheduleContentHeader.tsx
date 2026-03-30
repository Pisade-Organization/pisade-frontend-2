import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatHeaderLabel, type CalendarView } from "./calendar.utils"

interface ScheduleContentHeaderProps {
  selectedDate: Date
  onPreviousDay: () => void
  onNextDay: () => void
  view: CalendarView
  onViewChange: (view: CalendarView) => void
  onSelectDate: (date: Date) => void
}

const views: CalendarView[] = ["day", "week", "month"]

export default function ScheduleContentHeader({
  selectedDate,
  onPreviousDay,
  onNextDay,
  view,
  onViewChange,
  onSelectDate,
}: ScheduleContentHeaderProps) {
  return (
    <section className="rounded-[28px] border border-white/70 bg-[linear-gradient(135deg,#ffffff_0%,#f7f5ff_100%)] p-4 shadow-[0_18px_50px_rgba(87,72,162,0.08)] lg:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#EFEBFF] px-4 py-2 text-sm font-semibold text-[#6347EB]">
            <CalendarDays className="h-4 w-4" />
            Schedule
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#E7E3FF] bg-white px-2 py-2 shadow-sm">
            <button
              type="button"
              onClick={onPreviousDay}
              aria-label="Previous period"
              className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => onSelectDate(new Date())}
              className="rounded-full px-3 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
            >
              Today
            </button>

            <button
              type="button"
              onClick={onNextDay}
              aria-label="Next period"
              className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-neutral-400">Calendar view</p>
            <h2 className="text-lg font-semibold text-neutral-900 lg:text-[22px]">{formatHeaderLabel(selectedDate, view)}</h2>
          </div>
        </div>

        <div className="inline-flex w-full rounded-full border border-[#E7E3FF] bg-white p-1 lg:w-auto">
          {views.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onViewChange(item)}
              className={cn(
                "flex-1 rounded-full px-4 py-2 text-sm font-semibold capitalize transition lg:flex-none",
                item === view
                  ? "bg-[#F0ECFF] text-[#5F43EA] shadow-sm"
                  : "text-neutral-500 hover:text-neutral-800"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
