import BaseButton from "@/components/base/BaseButton"

interface AddBillingMethodCTAProps {
  onCancel?: () => void
  onSubmit?: () => void
}

export default function AddBillingMethodCTA({
  onCancel,
  onSubmit,
}: AddBillingMethodCTAProps) {
  return (
    <div className="w-full flex lg:justify-between justify-center items-center gap-2">
      <BaseButton variant="secondary" typeStyle="borderless" onClick={onCancel}>
        Cancel
      </BaseButton>

      <BaseButton variant="primary" onClick={onSubmit}>
        Add payment
      </BaseButton>
    </div>
  )
}