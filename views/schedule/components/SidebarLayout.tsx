import StudentInfoCard from "./StudentInfoCard"
import DateCalendar from "./DateCalendar"
import CancellationPolicy from "./CancellationPolicy"

interface SidebarLayoutProps {
  fullName: string
  timezone: string
  selectedDate: Date
  onSelectDate: (date: Date) => void
  summaryLabel: string
  summaryValue: string
  actionLabel?: string
  actionHref?: string
}

export default function SidebarLayout({
  fullName,
  timezone,
  selectedDate,
  onSelectDate,
  summaryLabel,
  summaryValue,
  actionLabel,
  actionHref,
}: SidebarLayoutProps) {
  return (
    <section className="rounded-xl flex flex-col gap-[2px] max-w-[276px]">
      <StudentInfoCard
        fullName={fullName}
        timezone={timezone}
        summaryLabel={summaryLabel}
        summaryValue={summaryValue}
        actionLabel={actionLabel}
        actionHref={actionHref}
      />
      <DateCalendar selectedDate={selectedDate} onSelectDate={onSelectDate} />
      <CancellationPolicy />
    </section>
  )
}
