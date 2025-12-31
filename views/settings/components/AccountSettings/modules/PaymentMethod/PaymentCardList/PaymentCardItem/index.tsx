
interface PaymentCardItemI {
  lastFourDigits: string;
  expiryDate: string;
  isDefault: boolean;
  isEnabled: boolean;
}
export default function PaymentCardItem({
  lastFourDigits,
  expiryDate,
  isDefault,
  isEnabled
}: PaymentCardItemI) {
  return (
    <div>

    </div>
  )
}