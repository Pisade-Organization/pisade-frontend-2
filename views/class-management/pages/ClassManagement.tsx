"use client"

import { useState, useMemo } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/footer/Footer"
import ClassStatusTabs from "../components/ClassStatusTabs"
import ClassManagementCard from "../components/ClassManagementCard"
import EmptyState from "../components/EmptyState"
import { ClassStatus } from "../components/ClassStatusTabs/types"
import { LessonStatusType } from "../components/ClassManagementCard/LessonStatus/types"
import { useBookings } from "@/hooks/bookings/queries"

function mapLessonStatus(status: string): LessonStatusType {
  if (status === "CONFIRMED") return LessonStatusType.Upcoming
  if (status === "COMPLETED") return LessonStatusType.Completed
  if (status === "CANCELLED") return LessonStatusType.Cancelled
  if (status === "PENDING_PAYMENT") return LessonStatusType.Processing
  return LessonStatusType.Upcoming
}

export default function ClassManagementPage() {
  const [currentStatus, setCurrentStatus] = useState<ClassStatus>(ClassStatus.UPCOMING)
  const view = currentStatus === ClassStatus.UPCOMING ? "upcoming" : "past"
  const { data } = useBookings({ view, limit: 100 })

  const classes = useMemo(() => {
    return (data?.data ?? []).map((booking) => {
      const startTime = new Date(booking.schedule.startTime)
      const endTime = new Date(booking.schedule.endTime)
      const tutor = booking.tutor

      return {
        id: booking.id,
        avatarUrl: tutor?.avatarUrl ?? "https://ui-avatars.com/api/?name=Tutor",
        date: startTime,
        title: "Booked lesson",
        startTime,
        endTime,
        status: mapLessonStatus(booking.status),
        description: `Payment status: ${booking.payment.status}`,
        tutorFullName: tutor?.name ?? "Tutor",
        tutorAvatarUrl: tutor?.avatarUrl ?? "https://ui-avatars.com/api/?name=Tutor",
      }
    })
  }, [data?.data])

  const filteredClasses = classes

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar variant="student_dashboard" />
      
      <div className="w-full flex flex-col px-4 lg:px-20 py-6 lg:py-8">
        {/* Tabs */}
        <div className="w-full mb-6 lg:mb-8">
          <ClassStatusTabs 
            currentStatus={currentStatus}
            setCurrentStatus={setCurrentStatus}
          />
        </div>

        {/* Cards or Empty State */}
        <div className="w-full flex flex-col gap-4">
          {filteredClasses.length > 0 ? (
            filteredClasses.map((classItem) => (
              <ClassManagementCard
                key={classItem.id}
                avatarUrl={classItem.avatarUrl}
                date={classItem.date}
                title={classItem.title}
                startTime={classItem.startTime}
                endTime={classItem.endTime}
                status={classItem.status}
                description={classItem.description}
                tutorFullName={classItem.tutorFullName}
                tutorAvatarUrl={classItem.tutorAvatarUrl}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
