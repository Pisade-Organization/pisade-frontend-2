import ScheduleContentHeader from "./ScheduleContentHeader"
import ScheduleCalendar from "./ScheduleCalendar"

export default function ScheduleContent() {
  return (
    <section className="flex flex-col gap-3">
      <ScheduleContentHeader />
      <ScheduleCalendar />
    </section>
  )
}
