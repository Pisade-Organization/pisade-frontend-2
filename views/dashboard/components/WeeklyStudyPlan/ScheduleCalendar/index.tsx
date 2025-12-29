import ScheduleColumn from "./ScheduleColumn"
import type { LessonCardI } from "./LessonCard"

interface ScheduleCalendarI {
  weeklyLessons?: LessonCardI[][]
}

export default function ScheduleCalendar({
  weeklyLessons = []
}: ScheduleCalendarI) {
  // Ensure we have 7 columns (one for each day)
  const columns = Array.from({ length: 7 }, (_, index) => 
    weeklyLessons[index] || []
  )

  return (
    <div className="w-full flex justify-between">
      {columns.map((lessons, index) => (
        <ScheduleColumn
          key={index}
          lessons={lessons}
        />
      ))}
    </div>
  )
}

