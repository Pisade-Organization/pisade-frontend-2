import PaymentMethodTitle from "./PaymentMethodTitle"
import QRPaymentSection from "./QRPaymentSection"

export default function PaymentMethod() {
  return (
    <div className="py-2 w-full flex flex-col gap-4">
      <PaymentMethodTitle />
      {/* TODO: Bank account linked missing */}
      <QRPaymentSection />
    </div>
  )
}