import LessonCard from "../LessonCard";
import type { LessonCardI } from "../LessonCard"

interface ScheduleColumnI {
  lessons: LessonCardI[];
}

export default function ScheduleColumn({
  lessons
}: ScheduleColumnI) {
  const limitedLessons = lessons.slice(0, 3)
  
  return (
    <div className="w-full flex flex-col">
      {limitedLessons.map((lesson, index) => (
        <LessonCard
          key={index}
          {...lesson}
        />
      ))}
    </div>
  )
}