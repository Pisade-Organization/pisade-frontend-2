import BaseButton from "@/components/base/BaseButton"
import { useRouter, useParams } from "next/navigation"

interface CTAProps {
  bookingId: string
  canReschedule: boolean
  canCancel: boolean
}

export default function CTA({ bookingId, canReschedule, canCancel }: CTAProps) {
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

  return (
    <>
      {/* Desktop: 2 rows - Join class on top, Reschedule and Cancel side by side */}
      <div className="hidden lg:flex flex-col gap-2 w-full lg:w-auto lg:min-w-[140px]">
        <BaseButton className="w-full" typeStyle="default" variant="primary">
          Join class
        </BaseButton>
        <div className="grid grid-cols-2 gap-2">
          <BaseButton className="w-full" typeStyle="outline" variant="primary" onClick={handleReschedule} disabled={!canReschedule}>
            Reschedule
          </BaseButton>
          <BaseButton className="w-full" typeStyle="outline" variant="primary" onClick={handleCancel} disabled={!canCancel}>
            Cancel
          </BaseButton>
        </div>
      </div>

      {/* Mobile: Cancel on left, Reschedule and Join class grouped on right */}
      <div className="flex flex-row justify-between items-center gap-2 lg:hidden w-full">
        <BaseButton typeStyle="borderless" variant="primary" className="px-0" onClick={handleCancel} disabled={!canCancel}>
          Cancel
        </BaseButton>
        <div className="flex flex-row gap-2">
          <BaseButton typeStyle="outline" variant="primary" onClick={handleReschedule} disabled={!canReschedule}>
            Reschedule
          </BaseButton>
          <BaseButton typeStyle="default" variant="primary">
            Join class
          </BaseButton>
        </div>
      </div>
    </>
  )
}
