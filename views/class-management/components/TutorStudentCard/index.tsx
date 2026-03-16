import Image from "next/image"
import BaseButton from "@/components/base/BaseButton"
import Typography from "@/components/base/Typography"
import { LessonStatusType } from "../ClassManagementCard/LessonStatus/types"

interface TutorStudentCardProps {
  bookingId: string
  avatarUrl: string
  date: Date
  title: string
  startTime: Date
  endTime: Date
  status: LessonStatusType
  description: string
  studentFullName: string
}

function formatTimeRange(startTime: Date, endTime: Date) {
  const formatTime = (value: Date) =>
    value.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })

  return `${formatTime(startTime)} - ${formatTime(endTime)}`
}

export default function TutorStudentCard({
  bookingId,
  avatarUrl,
  date,
  title,
  startTime,
  endTime,
  status,
  description,
  studentFullName,
}: TutorStudentCardProps) {
  const isActiveStudent =
    status === LessonStatusType.Upcoming ||
    status === LessonStatusType.Processing ||
    status === LessonStatusType.InProgress

  return (
    <article className="rounded-2xl border border-neutral-50 bg-white p-4 lg:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3 lg:gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-xl lg:h-16 lg:w-16">
            <Image src={avatarUrl} fill alt="Student avatar" className="object-cover" />
          </div>

          <div className="flex flex-col gap-1">
            <Typography variant={{ base: "title-3", lg: "title-2" }} color="neutral-900">
              {studentFullName}
            </Typography>
            <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-500">
              {title}
            </Typography>
            <Typography variant={{ base: "body-4", lg: "body-3" }} color="neutral-500">
              {date.toLocaleDateString()} · {formatTimeRange(startTime, endTime)}
            </Typography>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:flex-col lg:items-end">
          <div className="rounded-full bg-neutral-25 px-3 py-1">
            <Typography variant="body-4" color="neutral-700">
              {isActiveStudent ? "Active student" : "Past student"}
            </Typography>
          </div>
          <Typography variant="body-4" color="neutral-400">
            #{bookingId}
          </Typography>
        </div>
      </div>

      <div className="mt-3">
        <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-500">
          {description}
        </Typography>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <BaseButton typeStyle="default">Message</BaseButton>
        <BaseButton typeStyle="outline">View profile</BaseButton>
      </div>
    </article>
  )
}
