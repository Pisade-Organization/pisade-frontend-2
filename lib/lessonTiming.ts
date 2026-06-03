export type LessonDisplayStatus =
  | "Upcoming"
  | "Booked"
  | "In-progress"
  | "Completed"
  | "Processing"
  | "Cancelled"
  | string

type LessonTimingInput = {
  status: string
  startTime: Date
  endTime: Date
  now?: Date
}

type JoinTimingInput = {
  joinAvailableAt: Date | null | undefined
  endTime: Date
  meetingUrl?: string | null
  now?: Date
}

export function getLiveLessonStatus({
  status,
  startTime,
  endTime,
  now = new Date(),
}: LessonTimingInput): LessonDisplayStatus {
  if (status !== "CONFIRMED") {
    return status
  }

  if (now < startTime) {
    return "Booked"
  }

  if (now <= endTime) {
    return "In-progress"
  }

  return "Completed"
}

export function isLessonJoinableNow({
  joinAvailableAt,
  endTime,
  meetingUrl,
  now = new Date(),
}: JoinTimingInput): boolean {
  if (!meetingUrl) {
    return false
  }

  if (now > endTime) {
    return false
  }

  if (joinAvailableAt && now < joinAvailableAt) {
    return false
  }

  return true
}

export function getJoinButtonLabel({
  joinAvailableAt,
  endTime,
  meetingUrl,
  now = new Date(),
  actionLabel = "Join class",
}: JoinTimingInput & { actionLabel?: string }): string {
  if (!meetingUrl) {
    return "Join unavailable"
  }

  if (now > endTime) {
    return "Class ended"
  }

  if (joinAvailableAt && now < joinAvailableAt) {
    return `Available at ${joinAvailableAt.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}`
  }

  return actionLabel
}
