import BaseButton from "@/components/base/BaseButton"

export default function CTA() {
  return (
    <div className="w-full flex flex-col lg:gap-2 lg:pt-2">
      {/* Desktop: First row - Join class */}
      <BaseButton className="w-full hidden lg:block">
        Join class
      </BaseButton>

      {/* Desktop: Second row - Reschedule and Cancel */}
      {/* Mobile: Single row - Cancel on left, Reschedule and Join class on right */}
      <div className="flex justify-between items-center gap-2 lg:flex-row">
        {/* Mobile: Cancel on left */}
        <BaseButton className="lg:flex-1 lg:order-2">
          Cancel
        </BaseButton>

        {/* Mobile: Reschedule and Join class on right */}
        <div className="flex gap-2 items-center lg:w-full lg:order-1">
          <BaseButton className="lg:flex-1">
            Reschedule
          </BaseButton>

          {/* Mobile only: Join class button */}
          <BaseButton className="lg:hidden">
            Join class
          </BaseButton>
        </div>
      </div>
    </div>
  )
}