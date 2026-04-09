import Typography from "@/components/base/Typography"
import type { WeekNavigatorProps } from "./types";
import DateRangeLabel from "./DateRangeLabel";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";

export default function WeekNavigator({
  startDate,
  endDate,
  variant,
  onPrevWeek,
  onNextWeek,
  onToday,
  view,
}: WeekNavigatorProps) {
  if (variant === "mobile") {
    return (
      <div className="flex items-center justify-center gap-2 px-4">
        {onToday ? (
          <button type="button" onClick={onToday} className="rounded-md bg-white px-3 h-10">
            <Typography variant="title-3" color="electric-violet-400">Today</Typography>
          </button>
        ) : null}

        <div className="flex flex-1 items-center justify-between rounded-md bg-white px-3 h-10">
          <DateRangeLabel startDate={startDate} endDate={endDate} view={view} />
          <div className="flex gap-3">
            <PrevButton onClick={onPrevWeek} />
            <NextButton onClick={onNextWeek} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full lg:w-fit flex items-center justify-between gap-[10px] py-3 px-4 lg:py-3 lg:px-3 border border-neutral-50 rounded-xl">
      <div className="flex items-center gap-[10px]">
        {onToday ? (
          <button type="button" onClick={onToday} className="rounded-md bg-white px-3 h-10 border border-neutral-50">
            <Typography variant="title-3" color="electric-violet-400">Today</Typography>
          </button>
        ) : null}

        <DateRangeLabel 
          startDate={startDate}
          endDate={endDate}
          view={view}
        />
      </div>

      <div className={variant === 'desktop' ? "inline-flex gap-[10px]" : "inline-flex gap-2"}>
        <PrevButton onClick={onPrevWeek} />
        <NextButton onClick={onNextWeek} />
      </div>
    </div>
  )
}
