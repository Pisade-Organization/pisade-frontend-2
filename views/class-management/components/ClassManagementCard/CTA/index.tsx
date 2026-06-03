"use client"

import { useParams, useRouter } from "next/navigation"
import BaseButton from "@/components/base/BaseButton"
import { useNow } from "@/hooks/useNow"
import { getJoinButtonLabel, isLessonJoinableNow } from "@/lib/lessonTiming"

interface CTAProps {
  bookingId: string
  canReschedule: boolean
  canCancel: boolean
  meetingUrl: string | null
  canJoin: boolean
  joinAvailableAt: Date | null
  endTime: Date
  joinLabel?: string
  showSecondaryActions?: boolean
}

export default function CTA({
  bookingId,
  canReschedule,
  canCancel,
  meetingUrl,
  canJoin,
  joinAvailableAt,
  endTime,
  joinLabel,
  showSecondaryActions,
}: CTAProps) {
  const params = useParams()
  const router = useRouter()
  const locale = typeof params?.locale === "string" ? params.locale : "en"
  const now = useNow()
  const joinableNow = isLessonJoinableNow({
    meetingUrl,
    joinAvailableAt,
    endTime,
    now,
  }) || canJoin
  const isJoinDisabled = !joinableNow
  const joinText = joinLabel ?? "Join class"
  const disabledLabel = getJoinButtonLabel({
    meetingUrl,
    joinAvailableAt,
    endTime,
    now,
    actionLabel: joinText,
  })
  const handleJoin = () => {
    if (!joinableNow || !meetingUrl) {
      return
    }

    window.open(meetingUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="flex flex-col gap-2 lg:min-w-44">
      {meetingUrl ? (
        <BaseButton className="w-full" onClick={handleJoin} disabled={isJoinDisabled}>
          {disabledLabel}
        </BaseButton>
      ) : (
        <BaseButton className="w-full" disabled>
          {disabledLabel}
        </BaseButton>
      )}

      {showSecondaryActions ? (
        <>
          <BaseButton
            className="w-full"
            typeStyle="outline"
            disabled={!canReschedule}
            onClick={() => {
              if (!canReschedule) return
              router.push(`/${locale}/bookings/reschedule/${bookingId}`)
            }}
          >
            Reschedule
          </BaseButton>
          <BaseButton
            className="w-full"
            typeStyle="borderless"
            disabled={!canCancel}
            onClick={() => {
              if (!canCancel) return
              router.push(`/${locale}/bookings/cancel/${bookingId}`)
            }}
          >
            Cancel booking
          </BaseButton>
        </>
      ) : null}

      <p className="text-center text-body-4 text-neutral-400">#{bookingId}</p>
    </div>
  )
}
