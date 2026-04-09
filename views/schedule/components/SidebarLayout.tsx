import StudentInfoCard from "./StudentInfoCard"
import DateCalendar from "./DateCalendar"
import CancellationPolicy from "./CancellationPolicy"
import MobileBackground from "./MobileBackground"

interface SidebarLayoutProps {
  fullName: string
  avatarUrl?: string | null
  timezone: string
  tutorRanking?: "STARTER" | "PRO" | "MASTER" | null
  avgRating?: number | null
  studentsCount?: number | null
  hoursTaught?: number | null
  selectedDate: Date
  onSelectDate: (date: Date) => void
  summaryLabel?: string
  summaryValue?: string
  actionLabel?: string
  actionHref?: string
  showCalendar?: boolean
  showBookingRules?: boolean
}

export default function SidebarLayout({
  fullName,
  avatarUrl,
  timezone,
  tutorRanking,
  avgRating,
  studentsCount,
  hoursTaught,
  selectedDate,
  onSelectDate,
  summaryLabel,
  summaryValue,
  actionLabel,
  actionHref,
  showCalendar = true,
  showBookingRules = true,
}: SidebarLayoutProps) {
  return (
    <section className="flex max-w-full flex-col gap-[2px] lg:max-w-[276px]">
      <div className="relative overflow-hidden rounded-xl lg:overflow-visible lg:rounded-none">
        <MobileBackground className="absolute inset-x-0 top-0 h-[136px] w-full object-cover lg:hidden" />
        <div className="relative px-4 pb-4 pt-[68px] lg:px-0 lg:pb-0 lg:pt-0">
          <StudentInfoCard
            fullName={fullName}
            avatarUrl={avatarUrl}
            timezone={timezone}
            tutorRanking={tutorRanking}
            avgRating={avgRating}
            studentsCount={studentsCount}
            hoursTaught={hoursTaught}
            summaryLabel={summaryLabel}
            summaryValue={summaryValue}
            actionLabel={actionLabel}
            actionHref={actionHref}
          />
        </div>
      </div>
      {showCalendar ? (
        <div className="px-4 lg:px-0">
          <DateCalendar selectedDate={selectedDate} onSelectDate={onSelectDate} />
        </div>
      ) : null}
      {showBookingRules ? (
        <div className="px-4 lg:px-0">
          <CancellationPolicy />
        </div>
      ) : null}
    </section>
  )
}
