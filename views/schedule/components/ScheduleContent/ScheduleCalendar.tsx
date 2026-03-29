import Typography from "@/components/base/Typography"
import type { BookingListItem } from "@/services/bookings/types"
import ClassManagementCard from "@/views/class-management/components/ClassManagementCard"
import { LessonStatusType } from "@/views/class-management/components/ClassManagementCard/LessonStatus/types"

type ScheduleRole = "student" | "tutor"

interface ScheduleCalendarProps {
  bookings: BookingListItem[]
  isLoading: boolean
  isError: boolean
  role: ScheduleRole
  selectedDate: Date
}

function mapLessonStatus(status: string): LessonStatusType | null {
  if (status === "CONFIRMED") return LessonStatusType.Upcoming
  if (status === "PENDING_PAYMENT") return LessonStatusType.Processing
  if (status === "COMPLETED") return LessonStatusType.Completed
  if (status === "CANCELLED") return LessonStatusType.Cancelled
  return null
}

function buildDescription(status: string): string {
  if (status === "CONFIRMED") return "Your class is confirmed. Join when the room opens."
  if (status === "PENDING_PAYMENT") return "Payment is still pending for this reservation."
  if (status === "COMPLETED") return "This class has been completed."
  if (status === "CANCELLED") return "This class was cancelled."
  return ""
}

function formatSelectedDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })
}

export default function ScheduleCalendar({
  bookings,
  isLoading,
  isError,
  role,
  selectedDate,
}: ScheduleCalendarProps) {
  const visibleBookings = bookings.filter((booking) => {
    if (role === "student") {
      return booking.status !== "EXPIRED" && mapLessonStatus(booking.status) !== null
    }

    return mapLessonStatus(booking.status) !== null
  })

  if (isLoading) {
    return (
      <section className="rounded-xl border border-neutral-50 bg-white p-6">
        <Typography variant="body-2" color="neutral-500">Loading schedule...</Typography>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="rounded-xl border border-red-100 bg-red-25 p-6">
        <Typography variant="body-2" color="red-normal">
          Unable to load this day&apos;s schedule right now.
        </Typography>
      </section>
    )
  }

  if (visibleBookings.length === 0) {
    return (
      <section className="rounded-xl border border-neutral-50 bg-white p-6">
        <Typography variant="title-2" color="neutral-900">
          No classes on {formatSelectedDate(selectedDate)}
        </Typography>
        <Typography variant="body-2" color="neutral-500" className="mt-2">
          {role === "tutor"
            ? "New bookings for this day will show up here automatically."
            : "Your booked and pending lessons for this day will appear here."}
        </Typography>
      </section>
    )
  }

  return (
    <section className="rounded-xl border border-neutral-50 bg-white p-4 lg:p-6">
      <div className="flex flex-col gap-4">
        {visibleBookings.map((booking) => {
          const mappedStatus = mapLessonStatus(booking.status) as LessonStatusType

          const counterparty = role === "student" ? booking.tutor : booking.student
          const name = counterparty?.name ?? (role === "student" ? "Tutor" : "Student")
          const avatarUrl = counterparty?.avatarUrl ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`

          return (
            <ClassManagementCard
              key={booking.id}
              bookingId={booking.id}
              avatarUrl={avatarUrl}
              date={new Date(booking.schedule.startTime)}
              title={`Class with ${name}`}
              startTime={new Date(booking.schedule.startTime)}
              endTime={new Date(booking.schedule.endTime)}
              status={mappedStatus}
              description={buildDescription(booking.status)}
              tutorFullName={name}
              tutorAvatarUrl={avatarUrl}
              meetingUrl={booking.meeting?.url ?? null}
              canJoin={booking.meeting?.canJoin ?? booking.allowedActions.join}
              joinAvailableAt={booking.meeting?.joinAvailableAt ? new Date(booking.meeting.joinAvailableAt) : null}
              canRescheduleOverride={role === "student" ? booking.allowedActions.reschedule : false}
              canCancelOverride={role === "student" ? booking.allowedActions.cancel : false}
              joinLabel={role === "student" ? "Join class" : "Join class link"}
              showSecondaryActions={role === "student"}
            />
          )
        })}
      </div>
    </section>
  )
}
