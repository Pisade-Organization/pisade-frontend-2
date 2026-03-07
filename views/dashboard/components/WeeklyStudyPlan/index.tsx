"use client"
import { useMemo, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import Title from "./Title"
import DateRangeNavigator from "./DateRangeNavigator"
import PastSegment from "./TimelineIndicator/PastSegment"
import FutureSegment from "./TimelineIndicator/FutureSegment"
import DayCell from "./DayCell"
import NoScheduleClassesState from "./NoScheduledClassesState"
import ViewFullScheduleBtn from "./ViewFullScheduleBtn"
import ScheduleColumn from "./ScheduleCalendar/ScheduleColumn"
import type { LessonCardI } from "./ScheduleCalendar/LessonCard"
import { useWeeklyPlan } from "@/hooks/dashboard/queries"

const dayLabels: ("Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun")[] = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
]

function toDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function getWeekStartReference(currentDate: Date): Date {
  const reference = new Date(currentDate)
  reference.setDate(reference.getDate() - 1)
  reference.setHours(0, 0, 0, 0)
  return reference
}

export default function WeeklyStudyPlan() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const handleNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  const startDate = useMemo(() => getWeekStartReference(currentDate), [currentDate])
  const startDateKey = useMemo(() => toDateKey(startDate), [startDate])

  const { data: weeklyPlan = [] } = useWeeklyPlan(startDateKey)

  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + index)
      const dayOfWeek = date.getDay()
      const labelIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1
      const label = dayLabels[labelIndex]
      const dateKey = toDateKey(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const isPast = new Date(dateKey) < today
      const isCurrent = toDateKey(today) === dateKey

      return {
        label,
        date: date.getDate(),
        dateKey,
        isPast,
        isCurrent,
      }
    })
  }, [startDate])

  const lessonsByDate = useMemo(() => {
    const map = new Map<string, LessonCardI[]>()
    weeklyPlan.forEach((day) => {
      const items = day.lessons.map((lesson) => {
        const start = new Date(lesson.scheduledAt)
        const end = new Date(start)
        end.setMinutes(end.getMinutes() + lesson.duration)
        const startTime = start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
        const endTime = end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })

        return {
          isPast: false,
          isUpcoming: false,
          fullName: lesson.tutor.user.profile?.fullName ?? "Tutor",
          subjectName: "Lesson",
          startTime,
          endTime,
          avatarUrl: lesson.tutor.user.profile?.avatarUrl ?? "https://ui-avatars.com/api/?name=Tutor",
        }
      })
      map.set(day.date, items)
    })
    return map
  }, [weeklyPlan])

  const allLessons = useMemo(() => {
    return days.flatMap((day) =>
      (lessonsByDate.get(day.dateKey) ?? []).map((lesson) => ({ dayKey: day.dateKey, ...lesson })),
    )
  }, [days, lessonsByDate])

  const upcomingLessonKey = useMemo(() => {
    const now = new Date()
    const future = allLessons
      .filter((lesson) => new Date(`${lesson.dayKey}T${lesson.startTime}:00`) >= now)
      .sort(
        (a, b) =>
          new Date(`${a.dayKey}T${a.startTime}:00`).getTime() -
          new Date(`${b.dayKey}T${b.startTime}:00`).getTime(),
      )

    if (future.length === 0) return null
    return `${future[0].dayKey}-${future[0].startTime}`
  }, [allLessons])

  const weeklyLessons = useMemo(() => {
    return days.map((day) => {
      const rawLessons = lessonsByDate.get(day.dateKey) ?? []
      return rawLessons.map((lesson) => ({
        ...lesson,
        isPast: day.isPast,
        isUpcoming: `${day.dateKey}-${lesson.startTime}` === upcomingLessonKey,
      }))
    })
  }, [days, lessonsByDate, upcomingLessonKey])

  const hasLessons = weeklyLessons.some((dayLessons) => dayLessons.length > 0)

  return (
    <div className="w-full flex flex-col gap-4 lg:gap-5 py-5 px-4 md:px-20 md:py-[60px]">
      <div className="w-full flex flex-col lg:flex-row justify-between gap-4 lg:gap-0">
        <Title />
        <DateRangeNavigator
          currentDate={currentDate}
          onPreviousWeek={handlePreviousWeek}
          onNextWeek={handleNextWeek}
        />
      </div>

      {hasLessons ? (
        <>
          <div className="w-full lg:hidden">
            <Swiper spaceBetween={8} slidesPerView="auto" className="!pb-0">
              {days.map((day, index) => (
                <SwiperSlide key={day.dateKey} className="!w-auto min-w-[106px]">
                  <div className="w-full flex flex-col gap-2">
                    <div className="w-full">{day.isPast ? <PastSegment /> : <FutureSegment />}</div>
                    <DayCell
                      label={day.label}
                      date={day.date}
                      isPast={day.isPast}
                      isCurrent={day.isCurrent}
                    />
                    <ScheduleColumn lessons={weeklyLessons[index] ?? []} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="hidden lg:flex w-full justify-between gap-1">
            {days.map((day, index) => (
              <div key={day.dateKey} className="w-full flex flex-col gap-2 lg:gap-3">
                <div className="w-full">{day.isPast ? <PastSegment /> : <FutureSegment />}</div>
                <DayCell
                  label={day.label}
                  date={day.date}
                  isPast={day.isPast}
                  isCurrent={day.isCurrent}
                />
                <ScheduleColumn lessons={weeklyLessons[index] ?? []} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <NoScheduleClassesState />
      )}

      <div className="w-full lg:hidden">
        <ViewFullScheduleBtn />
      </div>
    </div>
  )
}
