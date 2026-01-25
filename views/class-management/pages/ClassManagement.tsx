"use client"

import { useState, useMemo } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/footer/Footer"
import ClassStatusTabs from "../components/ClassStatusTabs"
import ClassManagementCard from "../components/ClassManagementCard"
import EmptyState from "../components/EmptyState"
import { ClassStatus } from "../components/ClassStatusTabs/types"
import { LessonStatusType } from "../components/ClassManagementCard/LessonStatus/types"

// Mock data for classes
const mockClasses = [
  {
    id: "1",
    avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    date: new Date(2024, 8, 4), // September 4, 2024
    title: "English TEFL Lesson (50-min lessons)",
    startTime: new Date(2024, 8, 4, 13, 0), // Sep 4, 2024, 13:00
    endTime: new Date(2024, 8, 4, 15, 0), // Sep 4, 2024, 15:00
    status: LessonStatusType.Upcoming,
    description: "(Description) Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tutorFullName: "Laura Evelyn",
    tutorAvatarUrl: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: "2",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    date: new Date(2024, 8, 5),
    title: "Mathematics Advanced Calculus",
    startTime: new Date(2024, 8, 5, 10, 0),
    endTime: new Date(2024, 8, 5, 11, 30),
    status: LessonStatusType.Upcoming,
    description: "Advanced calculus concepts and problem-solving techniques.",
    tutorFullName: "John Smith",
    tutorAvatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: "3",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    date: new Date(2024, 7, 28),
    title: "Spanish Conversation Practice",
    startTime: new Date(2024, 7, 28, 14, 0),
    endTime: new Date(2024, 7, 28, 15, 0),
    status: LessonStatusType.Completed,
    description: "Conversational Spanish practice with native speaker.",
    tutorFullName: "Maria Garcia",
    tutorAvatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "4",
    avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    date: new Date(2024, 7, 25),
    title: "Physics: Quantum Mechanics",
    startTime: new Date(2024, 7, 25, 9, 0),
    endTime: new Date(2024, 7, 25, 10, 30),
    status: LessonStatusType.Completed,
    description: "Introduction to quantum mechanics principles.",
    tutorFullName: "David Chen",
    tutorAvatarUrl: "https://randomuser.me/api/portraits/men/45.jpg"
  }
]

export default function ClassManagementPage() {
  const [currentStatus, setCurrentStatus] = useState<ClassStatus>(ClassStatus.UPCOMING)

  // Filter classes based on current status
  const filteredClasses = useMemo(() => {
    return mockClasses.filter(classItem => {
      if (currentStatus === ClassStatus.UPCOMING) {
        return classItem.status === LessonStatusType.Upcoming || 
               classItem.status === LessonStatusType.Booked ||
               classItem.status === LessonStatusType.InProgress
      } else if (currentStatus === ClassStatus.COMPLETED) {
        return classItem.status === LessonStatusType.Completed
      }
      return false
    })
  }, [currentStatus])

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
