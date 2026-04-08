"use client"

import Link from "next/link"
import BaseButton from "@/components/base/BaseButton"

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

export default function CTA({
  bookingId,
  canReschedule,
  canCancel,
  meetingUrl,
  canJoin,
  joinAvailableAt,
  joinLabel,
  showSecondaryActions,
}: CTAProps) {
  const isJoinDisabled = !meetingUrl || !canJoin
  const joinText = joinLabel ?? "Join class"
  const disabledLabel = joinAvailableAt
    ? `Available at ${joinAvailableAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    : "Join unavailable"

  return (
    <div className="flex flex-col gap-2 lg:min-w-44">
      {meetingUrl ? (
        <Link href={meetingUrl} target="_blank" rel="noreferrer">
          <BaseButton className="w-full" disabled={isJoinDisabled}>
            {isJoinDisabled ? disabledLabel : joinText}
          </BaseButton>
        </Link>
      ) : (
        <BaseButton className="w-full" disabled>
          {disabledLabel}
        </BaseButton>
      )}

      {showSecondaryActions ? (
        <>
          <BaseButton className="w-full" typeStyle="outline" disabled={!canReschedule}>
            Reschedule
          </BaseButton>
          <BaseButton className="w-full" typeStyle="borderless" disabled={!canCancel}>
            Cancel booking
          </BaseButton>
        </>
      ) : null}

      <p className="text-center text-body-4 text-neutral-400">#{bookingId}</p>
    </div>
  )
}
