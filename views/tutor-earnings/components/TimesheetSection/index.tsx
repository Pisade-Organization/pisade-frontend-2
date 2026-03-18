import WeekSelector from "./WeekSelector"
import WeeklyTotalCard from "./WeeklyTotalCard"
import TimesheetTableMobile from "./TimesheetTableMobile"

export default function TimesheetSection() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-neutral-900">Timesheet for Oct 6 - 12 (This Week)</h2>
        <p className="text-sm text-neutral-500">Mobile weekly breakdown</p>
      </div>

      <WeekSelector week={{ label: "Oct 6 - 12", isCurrentWeek: true }} />
      <WeeklyTotalCard totalAmount={0} />
      <TimesheetTableMobile />
    </section>
  )
}
