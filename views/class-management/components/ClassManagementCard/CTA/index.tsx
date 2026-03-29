import BaseButton from "@/components/base/BaseButton"
import { useRouter, useParams } from "next/navigation"

interface CTAProps {
  bookingId: string
  canReschedule: boolean
  canCancel: boolean
  meetingUrl: string | null
  canJoin: boolean
  joinAvailableAt: Date | null
  joinLabel?: string
  showSecondaryActions?: boolean
}

function getJoinLabel(joinAvailableAt: Date | null, defaultLabel: string) {
  if (!joinAvailableAt) {
    return defaultLabel
  }

  return `Available ${joinAvailableAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })}`
}

export default function CTA({
  bookingId,
  canReschedule,
  canCancel,
  meetingUrl,
  canJoin,
  joinAvailableAt,
  joinLabel = "Join class",
  showSecondaryActions = true,
}: CTAProps) {
  const router = useRouter()
  const params = useParams()
  const locale = (params?.locale as string | undefined) ?? "en"

  const handleReschedule = () => {
    if (!canReschedule) return
    router.push(`/${locale}/bookings/reschedule/${bookingId}`)
  }

  const handleCancel = () => {
    if (!canCancel) return
    router.push(`/${locale}/bookings/cancel/${bookingId}`)
  }

  const handleJoin = () => {
    if (!canJoin || !meetingUrl) return
    window.open(meetingUrl, "_blank", "noopener,noreferrer")
  }

  const joinDisabled = !canJoin || !meetingUrl
  const resolvedJoinLabel = joinDisabled
    ? getJoinLabel(joinAvailableAt, joinLabel)
    : joinLabel

  return (
    <>
      {/* Desktop: 2 rows - Join class on top, Reschedule and Cancel side by side */}
      <div className="hidden lg:flex flex-col gap-2 w-full lg:w-auto lg:min-w-[140px]">
        <BaseButton className="w-full" typeStyle="default" variant="primary" onClick={handleJoin} disabled={joinDisabled}>
          {resolvedJoinLabel}
        </BaseButton>
        {showSecondaryActions ? (
          <div className="grid grid-cols-2 gap-2">
            <BaseButton className="w-full" typeStyle="outline" variant="primary" onClick={handleReschedule} disabled={!canReschedule}>
              Reschedule
            </BaseButton>
            <BaseButton className="w-full" typeStyle="outline" variant="primary" onClick={handleCancel} disabled={!canCancel}>
              Cancel
            </BaseButton>
          </div>
        ) : null}
      </div>

      {/* Mobile: Cancel on left, Reschedule and Join class grouped on right */}
      <div className="flex flex-row justify-between items-center gap-2 lg:hidden w-full">
        {showSecondaryActions ? (
          <BaseButton typeStyle="borderless" variant="primary" className="px-0" onClick={handleCancel} disabled={!canCancel}>
            Cancel
          </BaseButton>
        ) : <div />}
        <div className="flex flex-row gap-2">
          {showSecondaryActions ? (
            <BaseButton typeStyle="outline" variant="primary" onClick={handleReschedule} disabled={!canReschedule}>
              Reschedule
            </BaseButton>
          ) : null}
          <BaseButton typeStyle="default" variant="primary" onClick={handleJoin} disabled={joinDisabled}>
            {resolvedJoinLabel}
          </BaseButton>
        </div>
      </div>
    </>
  )
}
