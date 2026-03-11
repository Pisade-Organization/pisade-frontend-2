import TutorImage from "./TutorImage"
import DateOverlay from "./DateOverlay"
import LessonTitle from "./LessonTitle"
import LessonStatus from "./LessonStatus"
import LessonDescription from "./LessonDescription"
import TutorInfo from "./TutorInfo"
import CTA from "./CTA"
import { LessonStatusType } from "./LessonStatus/types"

interface ClassManagementCardProps {
  bookingId: string
  avatarUrl: string
  date: Date
  title: string
  startTime: Date
  endTime: Date
  status: LessonStatusType
  description: string
  tutorFullName: string
  tutorAvatarUrl: string
}

export default function ClassManagementCard({
  bookingId,
  avatarUrl,
  date,
  title,
  startTime,
  endTime,
  status,
  description,
  tutorFullName,
  tutorAvatarUrl
}: ClassManagementCardProps) {
  const canReschedule = status === LessonStatusType.Upcoming || status === LessonStatusType.Processing
  const canCancel = status === LessonStatusType.Upcoming || status === LessonStatusType.Processing

  return (
    <div className="border-b border-neutral-50 pb-4 flex flex-col lg:flex-row gap-4 lg:gap-6">
      {/* Image section with date overlay */}
      <div className="w-auto relative flex-shrink-0">
        <TutorImage avatarUrl={avatarUrl} />
        <DateOverlay date={date} />
      </div>

      {/* Details section */}
      <div className="flex-1 flex flex-col gap-2 lg:gap-3">
        <LessonTitle title={title} />
        <LessonStatus startTime={startTime} endTime={endTime} status={status} />
        <LessonDescription description={description} />
        <TutorInfo avatarUrl={tutorAvatarUrl} fullName={tutorFullName} />
      </div>

      {/* CTA buttons section */}
      <div className="lg:flex-shrink-0">
        <CTA bookingId={bookingId} canReschedule={canReschedule} canCancel={canCancel} />
      </div>
    </div>    
  )
}
