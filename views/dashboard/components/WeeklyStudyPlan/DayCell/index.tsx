import DateNumber from "./DateNumber"
import DayLabel from "./DayLabel"

interface DayCellProps {
  label: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
  date: number
  isPast: boolean
  isCurrent: boolean
}

export default function DayCell({
  label,
  date,
  isPast,
  isCurrent
}: DayCellProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <DayLabel label={label} isPast={isPast} />
      <div className="h-10 lg:h-11 flex items-center justify-center">
        <DateNumber date={date} isPast={isPast} isCurrent={isCurrent} />
      </div>
    </div>
  )
}