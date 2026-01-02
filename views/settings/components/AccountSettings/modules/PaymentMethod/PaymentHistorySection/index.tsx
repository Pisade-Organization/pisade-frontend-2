"use client"
import { Link } from "@/i18n/navigation"
import BaseButton from "@/components/base/BaseButton"
import PaymentHistoryRowMobile from "@/views/settings/components/AccountSettings/modules/PaymentHistory/PaymentHistoryTable/PaymentHistoryRowMobile"
import Typography from "@/components/base/Typography"
import { PaymentHistoryItem } from "@/views/settings/components/AccountSettings/modules/PaymentHistory"
import { PaymentStatus } from "@/views/onboarding/types/paymentStatus.types"

// Mock data - first 3 items from payment history
const mockPaymentHistory: PaymentHistoryItem[] = [
  {
    date: "Oct 13, 2025",
    time: "14:30",
    price: 29.90,
    lastFourDigits: "1627",
    cardType: "Mastercard",
    status: PaymentStatus.COMPLETE
  },
  {
    date: "Oct 12, 2025",
    time: "16:45",
    price: 29.90,
    lastFourDigits: "1627",
    cardType: "Mastercard",
    status: PaymentStatus.PROCESSING
  },
  {
    date: "Oct 11, 2025",
    time: "10:20",
    price: 29.90,
    lastFourDigits: "",
    cardType: "Promptpay Qr",
    status: PaymentStatus.COMPLETE
  }
]

export default function PaymentHistorySection() {
  return (
    <div className="w-full flex flex-col gap-4 lg:hidden">
      <Typography variant={{ base: "title-2" }} color="neutral-900">
        Payment history
      </Typography>
      
      <div className="w-full flex flex-col">
        {mockPaymentHistory.map((item, index) => (
          <PaymentHistoryRowMobile
            key={index}
            date={item.date}
            time={item.time}
            price={item.price}
            lastFourDigits={item.lastFourDigits}
            cardType={item.cardType}
            status={item.status}
          />
        ))}
      </div>

      <Link href="/settings/student/payment-history">
        <BaseButton 
          typeStyle="outline" 
          variant="secondary"
          className="w-full"
        >
          View All
        </BaseButton>
      </Link>
    </div>
  )
}

