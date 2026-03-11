"use client"

import { useState, useMemo } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/footer/Footer"
import ClassStatusTabs from "../components/ClassStatusTabs"
import ClassManagementCard from "../components/ClassManagementCard"
import EmptyState from "../components/EmptyState"
import { ClassStatus } from "../components/ClassStatusTabs/types"
import { LessonStatusType } from "../components/ClassManagementCard/LessonStatus/types"

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
  },
]

export default function ClassManagementPage() {
  const [currentStatus, setCurrentStatus] = useState<ClassStatus>(ClassStatus.UPCOMING)

  const filteredClasses = useMemo(() => {
    return currentStatus === ClassStatus.UPCOMING
      ? MOCK_CLASSES.filter((classItem) => [LessonStatusType.Upcoming, LessonStatusType.Processing].includes(classItem.status))
      : MOCK_CLASSES.filter((classItem) => [LessonStatusType.Completed, LessonStatusType.Cancelled].includes(classItem.status))
  }, [currentStatus])

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar variant="student_dashboard" />

      <div className="flex flex-1 flex-col">
        <div className="w-full">
          <ClassStatusTabs
            currentStatus={currentStatus}
            setCurrentStatus={setCurrentStatus}
          />
        </div>

        <div className="w-full flex flex-1 flex-col px-4 py-6 lg:px-20 lg:py-8">
          {filteredClasses.length > 0 ? (
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
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <EmptyState />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
