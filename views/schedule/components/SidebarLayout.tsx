import StudentInfoCard from "./StudentInfoCard"
import DateCalendar from "./DateCalendar"
import CancellationPolicy from "./CancellationPolicy"

export default function SidebarLayout() {
  return (
    <section className="rounded-xl flex flex-col gap-[2px] max-w-[276px]">
      <StudentInfoCard />
      <DateCalendar />
      <CancellationPolicy />
    </section>
  )
}