"use client"

import { useState, useMemo } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/footer/Footer"
import BaseButton from "@/components/base/BaseButton"
import ClassStatusTabs from "../components/ClassStatusTabs"
import ClassManagementCard from "../components/ClassManagementCard"
import EmptyState from "../components/EmptyState"
import { ClassStatus } from "../components/ClassStatusTabs/types"
import { LessonStatusType } from "../components/ClassManagementCard/LessonStatus/types"
import { useInfiniteBookings } from "@/hooks/bookings/queries"
import type { BookingListItem, GetBookingsParams } from "@/services/bookings/types"

type ClassManagementPageProps = {
  navbarVariant?: "student_dashboard" | "tutor_dashboard"
  role?: "student" | "tutor"
}

const MOCK_CLASSES = [
  {
    id: "class-001",
    avatarUrl: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=640&h=360&fit=crop",
    date: new Date("2026-03-11T10:00:00"),
    title: "Conversational English - Intermediate",
    startTime: new Date("2026-03-11T10:00:00"),
    endTime: new Date("2026-03-11T11:00:00"),
    status: LessonStatusType.Upcoming,
    description: "Zoom lesson with speaking drills and pronunciation feedback.",
    tutorFullName: "Emma Collins",
    tutorAvatarUrl: "https://i.pravatar.cc/150?img=5",
    meetingUrl: null,
    canJoin: false,
    joinAvailableAt: null,
  },
  {
    id: "class-002",
    avatarUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=640&h=360&fit=crop",
    date: new Date("2026-03-12T14:30:00"),
    title: "Business Writing Essentials",
    startTime: new Date("2026-03-12T14:30:00"),
    endTime: new Date("2026-03-12T15:30:00"),
    status: LessonStatusType.Processing,
    description: "Payment pending. Your seat is reserved until checkout completes.",
    tutorFullName: "Nathan Lee",
    tutorAvatarUrl: "https://i.pravatar.cc/150?img=12",
    meetingUrl: null,
    canJoin: false,
    joinAvailableAt: null,
  },
  {
    id: "class-003",
    avatarUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=640&h=360&fit=crop",
    date: new Date("2026-03-05T19:00:00"),
    title: "IELTS Speaking Mock Test",
    startTime: new Date("2026-03-05T19:00:00"),
    endTime: new Date("2026-03-05T20:00:00"),
    status: LessonStatusType.Completed,
    description: "Completed successfully. Band estimate: 6.5 to 7.0.",
    tutorFullName: "Sophia Nguyen",
    tutorAvatarUrl: "https://i.pravatar.cc/150?img=32",
    meetingUrl: null,
    canJoin: false,
    joinAvailableAt: null,
  },
  {
    id: "class-004",
    avatarUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=640&h=360&fit=crop",
    date: new Date("2026-03-03T08:00:00"),
    title: "Grammar Foundations",
    startTime: new Date("2026-03-03T08:00:00"),
    endTime: new Date("2026-03-03T09:00:00"),
    status: LessonStatusType.Cancelled,
    description: "Cancelled by student due to schedule conflict.",
    tutorFullName: "Daniel Park",
    tutorAvatarUrl: "https://i.pravatar.cc/150?img=18",
    meetingUrl: null,
    canJoin: false,
    joinAvailableAt: null,
  },
]

interface ClassCardItem {
  id: string
  avatarUrl: string
  date: Date
  title: string
  startTime: Date
  endTime: Date
  status: LessonStatusType
  description: string
  tutorFullName: string
  tutorAvatarUrl: string
  meetingUrl: string | null
  canJoin: boolean
  joinAvailableAt: Date | null
}

function mapLessonStatus(status: string): LessonStatusType | null {
  if (status === "CONFIRMED") return LessonStatusType.Upcoming
  if (status === "PENDING_PAYMENT") return LessonStatusType.Processing
  if (status === "COMPLETED") return LessonStatusType.Completed
  return null
}

function buildDescription(status: string): string {
  if (status === "CONFIRMED") {
    return "Your class is confirmed. Please join on time."
  }

  if (status === "PENDING_PAYMENT") {
    return "Payment pending. Please complete checkout to secure your class."
  }

  if (status === "COMPLETED") {
    return "Completed successfully."
  }

  return ""
}

function mapBookingToClassCard(booking: BookingListItem): ClassCardItem | null {
  const mappedStatus = mapLessonStatus(booking.status)
  if (!mappedStatus) {
    return null
  }

  const tutorName = booking.tutor?.name ?? "Tutor"
  const avatarUrl = booking.tutor?.avatarUrl ?? "https://ui-avatars.com/api/?name=Tutor"

  return {
    id: booking.id,
    avatarUrl,
    date: new Date(booking.schedule.startTime),
    title: `Class with ${tutorName}`,
    startTime: new Date(booking.schedule.startTime),
    endTime: new Date(booking.schedule.endTime),
    status: mappedStatus,
    description: buildDescription(booking.status),
    tutorFullName: tutorName,
    tutorAvatarUrl: avatarUrl,
    meetingUrl: booking.meeting?.url ?? null,
    canJoin: booking.allowedActions.join && Boolean(booking.meeting?.canJoin),
    joinAvailableAt: booking.meeting?.joinAvailableAt
      ? new Date(booking.meeting.joinAvailableAt)
      : null,
  }
}

export default function ClassManagementPage({
  navbarVariant = "student_dashboard",
  role = "student",
}: ClassManagementPageProps) {
  const [currentStatus, setCurrentStatus] = useState<ClassStatus>(ClassStatus.UPCOMING)
  const statusLabels =
    role === "tutor"
      ? {
          upcoming: "Active students",
          completed: "Past students",
        }
      : undefined

  const bookingParams = useMemo<GetBookingsParams>(() => {
    if (currentStatus === ClassStatus.UPCOMING) {
      return { view: "upcoming", limit: 10 }
    }

    return { view: "past", status: "COMPLETED", limit: 10 }
  }, [currentStatus])

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteBookings(bookingParams, role === "student")

  const studentClasses = useMemo(() => {
    const allBookings = (data?.pages ?? []).flatMap((page) => page.data)
    return allBookings
      .map(mapBookingToClassCard)
      .filter((item): item is ClassCardItem => item !== null)
  }, [data?.pages])

  const filteredClasses = role === "student" ? studentClasses : MOCK_CLASSES

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar variant={navbarVariant} />

      <div className="flex flex-1 flex-col">
        <div className="w-full">
          <ClassStatusTabs
            currentStatus={currentStatus}
            setCurrentStatus={setCurrentStatus}
            labels={statusLabels}
          />
        </div>

        <div className="w-full flex flex-1 flex-col px-4 py-6 lg:px-20 lg:py-8">
          {role === "student" && isLoading ? (
            <div className="flex flex-1 items-center justify-center text-neutral-400">
              Loading classes...
            </div>
          ) : null}

          {role === "student" && isError ? (
            <div className="mb-4 rounded-lg border border-red-100 bg-red-25 p-4 text-red-normal">
              Unable to load classes right now. Please try again.
            </div>
          ) : null}

          {!isLoading && filteredClasses.length > 0 ? (
            <div className="w-full flex flex-col gap-4">
              {filteredClasses.map((classItem) => (
                <ClassManagementCard
                  key={classItem.id}
                  bookingId={classItem.id}
                  avatarUrl={classItem.avatarUrl}
                  date={classItem.date}
                  title={classItem.title}
                  startTime={classItem.startTime}
                  endTime={classItem.endTime}
                  status={classItem.status}
                  description={classItem.description}
                  tutorFullName={classItem.tutorFullName}
                  tutorAvatarUrl={classItem.tutorAvatarUrl}
                  meetingUrl={classItem.meetingUrl}
                  canJoin={classItem.canJoin}
                  joinAvailableAt={classItem.joinAvailableAt}
                />
              ))}

              {role === "student" && hasNextPage ? (
                <div className="mt-2 flex justify-center">
                  <BaseButton
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? "Loading..." : "Load more"}
                  </BaseButton>
                </div>
              ) : null}
            </div>
          ) : !isLoading ? (
            <div className="flex flex-1 items-center justify-center">
              <EmptyState />
            </div>
          ) : null}
        </div>
      </div>

      <Footer />
    </div>
  )
}
