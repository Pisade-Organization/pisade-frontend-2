import { LessonStatusType } from "./types"
import Typography from "@/components/base/Typography"
import { Dot } from "lucide-react"

interface LessonStatusProps {
  startTime: Date
  endTime: Date
  status: LessonStatusType
}

function isToday(date: Date): boolean {
  const today = new Date()
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}

function isTomorrow(date: Date): boolean {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return (
    date.getFullYear() === tomorrow.getFullYear() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getDate() === tomorrow.getDate()
  )
}

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}.${minutes}`
}

function formatDateLabel(date: Date): string {
  if (isToday(date)) {
    return "Today"
  }
  if (isTomorrow(date)) {
    return "Tomorrow"
  }
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  return date.toLocaleDateString(undefined, options)
}

export default function LessonStatus({ startTime, endTime, status }: LessonStatusProps) {
  const dateLabel = formatDateLabel(startTime)
  const formattedStartTime = formatTime(startTime)
  const formattedEndTime = formatTime(endTime)
  const dateTimeString = `${dateLabel}, ${formattedStartTime} - ${formattedEndTime}`

  return (
    <div className="w-full inline-flex ">
      <Typography variant={{ base: "label-4", lg: "label-2" }} color="electric-violet-700">{status}</Typography>
      <Dot className="text-neutral-100 w-[3.5px] h-[3.5px]" />
      <Typography variant={{ base: "label-4", lg: "label-2" }} color="neutral-500">{dateTimeString}</Typography>
    </div>
  )
}