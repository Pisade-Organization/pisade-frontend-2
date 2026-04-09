"use client"

import { useMemo, useState } from "react"
import useMediaQuery from "@/hooks/useMediaQuery"
import { buildBookingAvailabilityFromTutor } from "@/lib/bookingAvailability"
import AvailabilityGrid from "@/components/dialogs/BookLessonDialog/AvailabilityGrid"
import WeekNavigator from "@/views/reschedule/components/ScheduleHeader/WeekNavigator"
import TimezoneSelector from "@/views/reschedule/components/ScheduleHeader/TimezoneSelector"

interface AvailabilityCalendarProps {
  availability: {
    [key: string]: Array<{ start: string; end: string }>
  }
}

function getWeekStart(date: Date): Date {
  const start = new Date(date)
  const day = start.getDay()
  const diff = day === 0 ? -6 : 1 - day
  start.setDate(start.getDate() + diff)
  start.setHours(0, 0, 0, 0)
  return start
}

export default function AvailabilityCalendar({ availability }: AvailabilityCalendarProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [timezone, setTimezone] = useState("Etc/GMT+11")
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; startTime: string } | null>(null)
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => getWeekStart(new Date()))

  const weekAvailability = useMemo(
    () => buildBookingAvailabilityFromTutor(availability, currentWeekStart),
    [availability, currentWeekStart],
  )

  const startDate = useMemo(() => new Date(currentWeekStart), [currentWeekStart])
  const endDate = useMemo(() => {
    const end = new Date(currentWeekStart)
    end.setDate(end.getDate() + 6)
    return end
  }, [currentWeekStart])

  const handlePrevWeek = () => {
    const next = new Date(currentWeekStart)
    next.setDate(next.getDate() - 7)
    setCurrentWeekStart(next)
  }

  const handleNextWeek = () => {
    const next = new Date(currentWeekStart)
    next.setDate(next.getDate() + 7)
    setCurrentWeekStart(next)
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex flex-col gap-2 lg:flex-row lg:justify-start lg:items-center lg:gap-3">
        <div className="w-full lg:flex-1 lg:min-w-0">
          <WeekNavigator
            startDate={startDate}
            endDate={endDate}
            variant={isDesktop ? "desktop" : "mobile"}
            onPrevWeek={handlePrevWeek}
            onNextWeek={handleNextWeek}
            view="week"
          />
        </div>

        <div className="w-full lg:flex-1 lg:min-w-0">
          <TimezoneSelector timezone={timezone} onTimezoneChange={setTimezone} />
        </div>
      </div>

      <div className="w-full">
        <AvailabilityGrid
          availability={weekAvailability}
          selectedSlot={selectedSlot ?? undefined}
          onSlotSelect={(date, startTime) => setSelectedSlot({ date, startTime })}
          indicatorSegmentClassName="max-w-[128px]"
        />
      </div>
    </div>
  )
}
