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
}: WeekNavigatorProps) {
  return (
    <div className="w-full 
      flex items-center justify-between
      lg:gap-[10px]
      py-3 px-4 lg:py-3 lg:px-3
      border border-neutral-100
      rounded-xl
    ">

      {variant === 'desktop' && (
        <div className="inline-flex gap-[10px]">
          <PrevButton onClick={onPrevWeek} />
          <NextButton onClick={onNextWeek} />
        </div>
      )}

      <DateRangeLabel 
        startDate={startDate}
        endDate={endDate}
      />

      {variant === 'mobile' && (
        <div className="inline-flex gap-2">
          <PrevButton onClick={onPrevWeek} />
          <NextButton onClick={onNextWeek} />
        </div>
      )}
    </div>
  )
}