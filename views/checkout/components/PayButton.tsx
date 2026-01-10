import BaseButton from "@/components/base/BaseButton"

interface PayButtonProps {
  paymentMethod: string;
}

export default function PayButton({ paymentMethod }: PayButtonProps) {
  return (
    <>
      {/* Desktop - Normal flow */}
      <div className="hidden lg:block pt-3">
        <BaseButton className="w-full">
          Pay with {paymentMethod}
        </BaseButton>
      </div>

      {/* Mobile - Sticky at bottom */}
      <div className="sticky bottom-0 z-50 px-4 py-7 bg-white lg:hidden">
        <BaseButton className="w-full">
          Pay with {paymentMethod}
        </BaseButton>
      </div>
    </>
  )
}