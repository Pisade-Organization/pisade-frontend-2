"use client"

import { useMemo, useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/footer/Footer"
import Typography from "@/components/base/Typography"
import { PageContainer, PageRoot } from "@/components/layout/PagePrimitives"
import { useBookings } from "@/hooks/bookings/queries"
import type { BookingListItem } from "@/services/bookings/types"
import ClassManagementCard from "../components/ClassManagementCard"
import ClassStatusTabs from "../components/ClassStatusTabs"
import { ClassStatus } from "../components/ClassStatusTabs/types"
import EmptyState from "../components/EmptyState"
import TutorStudentCard from "../components/TutorStudentCard"
import { LessonStatusType } from "../components/ClassManagementCard/LessonStatus/types"

type ClassManagementRole = "student" | "tutor"

type ClassManagementPageProps = {
  role: ClassManagementRole
}

const DEFAULT_AVATAR_URL = "/images/avatars/default-avatar.svg"

function mapBookingStatusToLessonStatus(status: string): LessonStatusType {
  if (status === "COMPLETED") return LessonStatusType.Completed
  if (status === "CANCELLED" || status === "EXPIRED") return LessonStatusType.Cancelled
  if (status === "IN_PROGRESS") return LessonStatusType.InProgress
  if (status === "PROCESSING") return LessonStatusType.Processing
  if (status === "CONFIRMED") return LessonStatusType.Booked
  return LessonStatusType.Upcoming
}

function formatStatusLabel(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function sortBookings(bookings: BookingListItem[], currentStatus: ClassStatus) {
  return [...bookings].sort((left, right) => {
    const leftTime = new Date(left.schedule.startTime).getTime()
    const rightTime = new Date(right.schedule.startTime).getTime()

    return currentStatus === ClassStatus.UPCOMING ? leftTime - rightTime : rightTime - leftTime
  })
}

export default function ClassManagementPage({ role }: ClassManagementPageProps) {
  const [currentStatus, setCurrentStatus] = useState<ClassStatus>(ClassStatus.UPCOMING)
  const upcomingQuery = useBookings({ view: "upcoming", limit: 100 })
  const completedQuery = useBookings({ view: "past", limit: 100 })

  const bookings = useMemo(() => {
    const data =
      currentStatus === ClassStatus.UPCOMING
        ? (upcomingQuery.data?.data ?? [])
        : (completedQuery.data?.data ?? [])

    return sortBookings(data, currentStatus)
  }, [completedQuery.data?.data, currentStatus, upcomingQuery.data?.data])

  const isLoading =
    currentStatus === ClassStatus.UPCOMING ? upcomingQuery.isLoading : completedQuery.isLoading
  const isError = currentStatus === ClassStatus.UPCOMING ? upcomingQuery.isError : completedQuery.isError
  const navbarVariant = role === "student" ? "student_dashboard" : "tutor_dashboard"
  const title = role === "student" ? "Class management" : "Student classes"
  const description =
    role === "student"
      ? "Keep upcoming lessons, joins, and past sessions in one place."
      : "Track upcoming sessions and your past student classes from one place."

  return (
    <PageRoot className="bg-[#efeff3]">
      <Navbar variant={navbarVariant} />

      <PageContainer className="flex-1">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 lg:gap-6">
          <section className="overflow-hidden rounded-2xl border border-neutral-50 bg-white">
            <div className="flex flex-col gap-2 px-5 pb-4 pt-5 lg:px-[60px] lg:pb-5 lg:pt-8">
              <Typography variant={{ base: "headline-5", lg: "headline-3" }} color="neutral-900">
                {title}
              </Typography>
              <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-500">
                {description}
              </Typography>
            </div>

            <ClassStatusTabs
              currentStatus={currentStatus}
              setCurrentStatus={setCurrentStatus}
              labels={{
                upcoming: role === "student" ? "Upcoming" : "Upcoming",
                completed: role === "student" ? "Completed" : "Past",
              }}
            />

            <div className="px-5 py-5 lg:px-[60px] lg:py-8">
              {isError ? (
                <div className="rounded-xl border border-red-100 bg-red-25 px-4 py-3 text-body-3 text-red-normal">
                  Unable to load classes right now. Please try again.
                </div>
              ) : null}

              {isLoading ? (
                <div className="py-12 text-center text-body-3 text-neutral-400">Loading classes...</div>
              ) : null}

              {!isLoading && !isError && bookings.length === 0 ? (
                <EmptyState role={role} />
              ) : null}

              {!isLoading && !isError && bookings.length > 0 ? (
                <div className="flex flex-col gap-5">
                  {bookings.map((booking) => {
                    const startTime = new Date(booking.schedule.startTime)
                    const endTime = new Date(booking.schedule.endTime)
                    const participant =
                      role === "student"
                        ? {
                            fullName: booking.tutor?.name ?? "Tutor",
                            avatarUrl: booking.tutor?.avatarUrl ?? DEFAULT_AVATAR_URL,
                          }
                        : {
                            fullName: booking.student?.name ?? "Student",
                            avatarUrl: booking.student?.avatarUrl ?? DEFAULT_AVATAR_URL,
                          }

                    const status = mapBookingStatusToLessonStatus(booking.status)
                    const statusLabel = formatStatusLabel(booking.status)

                    if (role === "student") {
                      return (
                        <ClassManagementCard
                          key={booking.id}
                          bookingId={booking.id}
                          avatarUrl={participant.avatarUrl}
                          date={startTime}
                          title="Scheduled class"
                          startTime={startTime}
                          endTime={endTime}
                          status={status}
                          description={`Booking status: ${statusLabel}`}
                          tutorFullName={participant.fullName}
                          tutorAvatarUrl={participant.avatarUrl}
                          meetingUrl={booking.meeting?.url ?? null}
                          canJoin={booking.meeting?.canJoin ?? false}
                          joinAvailableAt={booking.meeting?.joinAvailableAt ? new Date(booking.meeting.joinAvailableAt) : null}
                          canRescheduleOverride={booking.allowedActions.reschedule}
                          canCancelOverride={booking.allowedActions.cancel}
                          showSecondaryActions
                        />
                      )
                    }

                    return (
                      <TutorStudentCard
                        key={booking.id}
                        bookingId={booking.id}
                        avatarUrl={participant.avatarUrl}
                        date={startTime}
                        title="Booked class"
                        startTime={startTime}
                        endTime={endTime}
                        status={status}
                        description={`Booking status: ${statusLabel}`}
                        studentFullName={participant.fullName}
                      />
                    )
                  })}
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </PageContainer>

      <Footer />
    </PageRoot>
  )
}
