import BaseButton from "@/components/base/BaseButton"

interface PayButtonProps {
  paymentMethod: string
  onPay: () => void
  isLoading?: boolean
  disabled?: boolean
}

export default function PayButton({ paymentMethod, onPay, isLoading, disabled }: PayButtonProps) {
  return (
    <>
      {/* Desktop - Normal flow */}
      <div className="hidden lg:block pt-3">
        <BaseButton className="w-full" onClick={onPay} disabled={disabled || isLoading}>
          {isLoading ? "Processing payment..." : `Pay with ${paymentMethod}`}
        </BaseButton>
      </div>

      {/* Mobile - Sticky at bottom */}
      <div className="sticky bottom-0 z-50 px-4 py-7 bg-white lg:hidden">
        <BaseButton className="w-full" onClick={onPay} disabled={disabled || isLoading}>
          {isLoading ? "Processing payment..." : `Pay with ${paymentMethod}`}
        </BaseButton>
      </div>
    </>
  )
}
