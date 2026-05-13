import BaseButton from "@/components/base/BaseButton"

interface AddBillingMethodCTAProps {
  onCancel?: () => void
  onSubmit?: () => void
  isLoading?: boolean
}

export default function AddBillingMethodCTA({
  onCancel,
  onSubmit,
  isLoading,
}: AddBillingMethodCTAProps) {
  return (
    <div className="w-full flex lg:justify-between justify-center items-center gap-2">
      <BaseButton variant="secondary" typeStyle="borderless" onClick={onCancel} disabled={isLoading}>
        Cancel
      </BaseButton>

      <BaseButton variant="primary" onClick={onSubmit} disabled={isLoading}>
        {isLoading ? "Saving..." : "Add payment"}
      </BaseButton>
    </div>
  )
}