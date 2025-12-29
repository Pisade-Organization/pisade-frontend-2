"use client"
import { useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Title from "./Title"
import DateRangeNavigator from "./DateRangeNavigator"
import PastSegment from "./TimelineIndicator/PastSegment"
import FutureSegment from "./TimelineIndicator/FutureSegment"
import DayCell from "./DayCell"
import NoScheduleClassesState from "./NoScheduledClassesState"
import ViewFullScheduleBtn from "./ViewFullScheduleBtn"
import ScheduleColumn from "./ScheduleCalendar/ScheduleColumn"
import type { LessonCardI } from "./ScheduleCalendar/LessonCard"

export default function WeeklyStudyPlan() {
  // State for currentDate - always the second day in the 7-day range
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
  
  // Helper function to format date as YYYY-MM-DD
  const formatDateKey = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Helper function to check if date is today
  const isToday = (date: Date): boolean => {
    const today = new Date()
    return formatDateKey(date) === formatDateKey(today)
  }

  // Helper function to check if date is in the past
  const isDatePast = (date: Date): boolean => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const compareDate = new Date(date)
    compareDate.setHours(0, 0, 0, 0)
    return compareDate < today
  }

  // Calculate startDate (1 day before currentDate to make currentDate the second day)
  const startDate = new Date(currentDate)
  startDate.setDate(startDate.getDate() - 1)
  
  // Generate 7 days with labels and dates
  const dayLabels: ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + index)
    const dayOfWeek = date.getDay()
    // Convert Sunday (0) to index 6, Monday (1) to 0, etc.
    const labelIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    const label = dayLabels[labelIndex]
    const dateNumber = date.getDate()
    const dateKey = formatDateKey(date)
    const isPast = isDatePast(date)
    const isCurrent = isToday(date)
    
    return {
      label,
      date: dateNumber,
      dateKey,
      fullDate: date,
      isPast,
      isCurrent
    }
  })

  // Mock lessons data - generate based on date
  // In production, this would come from an API based on the date range
  const getMockLessonsForDate = (date: Date, dayIndex: number): Omit<LessonCardI, 'isPast' | 'isUpcoming'>[] => {
    // Use date hash to generate consistent but different lessons for different dates
    const dateHash = date.getTime() % 1000
    const dayOfWeek = date.getDay()
    
    // Pattern: Some days have lessons, some don't, based on date
    const hasLessons = (dateHash + dayOfWeek) % 3 !== 0
    
    if (!hasLessons) return []
    
    const tutors = [
      { fullName: "Sophia Lee", subjectName: "Mathematics", avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg" },
      { fullName: "David Chen", subjectName: "Computer Science", avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg" },
      { fullName: "Maria Garcia", subjectName: "Spanish", avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg" },
      { fullName: "John Smith", subjectName: "Chemistry", avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg" },
      { fullName: "Emma Wilson", subjectName: "Biology", avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg" },
      { fullName: "James Brown", subjectName: "History", avatarUrl: "https://randomuser.me/api/portraits/men/56.jpg" },
      { fullName: "Lisa Anderson", subjectName: "Art", avatarUrl: "https://randomuser.me/api/portraits/women/33.jpg" },
      { fullName: "Sarah Kim", subjectName: "Korean", avatarUrl: "https://randomuser.me/api/portraits/women/51.jpg" },
    ]
    
    const times = [
      { startTime: "09:00", endTime: "10:00" },
      { startTime: "10:00", endTime: "11:00" },
      { startTime: "11:00", endTime: "12:00" },
      { startTime: "13:00", endTime: "14:00" },
      { startTime: "14:00", endTime: "15:00" },
      { startTime: "15:00", endTime: "16:00" },
      { startTime: "16:00", endTime: "17:00" },
    ]
    
    // Generate 1-3 lessons based on date hash
    const numLessons = ((dateHash % 3) + 1)
    const lessons: Omit<LessonCardI, 'isPast' | 'isUpcoming'>[] = []
    
    for (let i = 0; i < numLessons; i++) {
      const tutorIndex = (dateHash + i) % tutors.length
      const timeIndex = (dateHash + i * 2) % times.length
      lessons.push({
        ...tutors[tutorIndex],
        ...times[timeIndex]
      })
    }
    
    // Sort by start time
    return lessons.sort((a, b) => a.startTime.localeCompare(b.startTime))
  }

  // Get all lessons for the week and determine which one is upcoming
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // First pass: collect all lessons with their dates
  const allLessonsWithDates: Array<{ date: Date, dateKey: string, lesson: Omit<LessonCardI, 'isPast' | 'isUpcoming'>, dayIndex: number }> = []
  days.forEach((day, index) => {
    const lessons = getMockLessonsForDate(day.fullDate, index)
    lessons.forEach(lesson => {
      allLessonsWithDates.push({
        date: day.fullDate,
        dateKey: day.dateKey,
        lesson,
        dayIndex: index
      })
    })
  })

  // Find the first upcoming lesson (earliest future lesson)
  let upcomingLessonKey: string | null = null
  const futureLessons = allLessonsWithDates
    .filter(item => {
      const lessonDate = new Date(item.date)
      lessonDate.setHours(0, 0, 0, 0)
      return lessonDate >= today
    })
    .sort((a, b) => {
      // Sort by date, then by start time
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      if (dateA !== dateB) return dateA - dateB
      return a.lesson.startTime.localeCompare(b.lesson.startTime)
    })

  if (futureLessons.length > 0) {
    upcomingLessonKey = futureLessons[0].dateKey + '-' + futureLessons[0].lesson.startTime
  }

  // Generate lessons for each day with proper isPast and isUpcoming flags
  const mockWeeklyLessons = days.map((day, dayIndex) => {
    const rawLessons = getMockLessonsForDate(day.fullDate, dayIndex)
    const lessonDate = new Date(day.fullDate)
    lessonDate.setHours(0, 0, 0, 0)
    const isPast = lessonDate < today

    return rawLessons.map((lesson, lessonIndex) => {
      const lessonKey = day.dateKey + '-' + lesson.startTime
      const isUpcoming = lessonKey === upcomingLessonKey

      return {
        ...lesson,
        isPast,
        isUpcoming
      }
    })
  })

  const hasLessons = mockWeeklyLessons.some(dayLessons => dayLessons.length > 0)

  return (
    <div className="w-full flex flex-col 
    gap-4 lg:gap-5 py-5 px-4 md:px-20 md:py-[60px]
    ">
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
          {/* Mobile: Swiper */}
          <div className="w-full lg:hidden">
            <Swiper
              spaceBetween={8}
              slidesPerView="auto"
              className="!pb-0"
            >
              {days.map((day, index) => {
                const lessons = mockWeeklyLessons[index] || []
                
                return (
                  <SwiperSlide key={index} className="!w-auto min-w-[106px]">
                    <div className="w-full flex flex-col gap-2">
                      {/* Timeline Indicator Segment */}
                      <div className="w-full">
                        {day.isPast ? <PastSegment /> : <FutureSegment />}
                      </div>
                      
                      {/* Day Cell */}
                      <DayCell
                        label={day.label}
                        date={day.date}
                        isPast={day.isPast}
                        isCurrent={day.isCurrent}
                      />
                      
                      {/* Schedule Column */}
                      <ScheduleColumn lessons={lessons} />
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>

          {/* Desktop: Flex Layout */}
          <div className="hidden lg:flex w-full justify-between gap-1">
            {days.map((day, index) => {
              const lessons = mockWeeklyLessons[index] || []
              
              return (
                <div key={index} className="w-full flex flex-col gap-2 lg:gap-3">
                  {/* Timeline Indicator Segment */}
                  <div className="w-full">
                    {day.isPast ? <PastSegment /> : <FutureSegment />}
                  </div>
                  
                  {/* Day Cell */}
                  <DayCell
                    label={day.label}
                    date={day.date}
                    isPast={day.isPast}
                    isCurrent={day.isCurrent}
                  />
                  
                  {/* Schedule Column */}
                  <ScheduleColumn lessons={lessons} />
                </div>
              )
            })}
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