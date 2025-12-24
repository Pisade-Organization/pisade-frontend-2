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
    <div className="flex flex-col items-center">
      <DayLabel label={label} isPast={isPast} />
      <DateNumber date={date} isPast={isPast} isCurrent={isCurrent} />
    </div>
  )
}