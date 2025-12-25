import Title from "./Title"
import DateRangeNavigator from "./DateRangeNavigator"
import TimelineIndicator from "./TimelineIndicator"
import DayCell from "./DayCell"
import NoScheduleClassesState from "./NoScheduledClassesState"
import ViewFullScheduleBtn from "./ViewFullScheduleBtn"

export default function WeeklyStudyPlan() {
  // Mock currentDate - always the second day in the 7-day range
  const currentDate = new Date()
  
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
    const isPast = index < 1 // First day (index 0) is past, currentDate is index 1
    const isCurrent = index === 1 // currentDate is always the second day (index 1)
    
    return {
      label,
      date: dateNumber,
      isPast,
      isCurrent
    }
  })

  return (
    <div className="w-full flex flex-col 
    gap-4 lg:gap-5 py-5 px-4 md:px-20 md:py-[60px]
    ">
      <div className="w-full flex flex-col lg:flex-row justify-between gap-4 lg:gap-0">
        <Title />
        <DateRangeNavigator currentDate={currentDate} />
      </div>

      <div className="w-full flex flex-col gap-2 lg:gap-3">
        <TimelineIndicator todayIndex={1} />
        <div className="w-full flex justify-between">
          {days.map((day, index) => (
            <DayCell
              key={index}
              label={day.label}
              date={day.date}
              isPast={day.isPast}
              isCurrent={day.isCurrent}
            />
          ))}
        </div>
      </div>

      {/* IF NO CLASS */}
      <NoScheduleClassesState />

      <div className="w-full lg:hidden">
        <ViewFullScheduleBtn />
      </div>
    </div>
  )
}