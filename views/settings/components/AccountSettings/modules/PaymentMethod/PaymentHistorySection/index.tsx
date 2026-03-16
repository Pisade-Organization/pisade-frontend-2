"use client"
import { Link } from "@/i18n/navigation"
import BaseButton from "@/components/base/BaseButton"
import PaymentHistoryRowMobile from "@/views/settings/components/AccountSettings/modules/PaymentHistory/PaymentHistoryTable/PaymentHistoryRowMobile"
import Typography from "@/components/base/Typography"
import { PaymentHistoryItem } from "@/views/settings/components/AccountSettings/modules/PaymentHistory"
import { PaymentStatus } from "@/views/onboarding/types/paymentStatus.types"
import { useStudentTransactions } from "@/hooks/settings/queries"

function mapStatus(status: string): PaymentStatus {
  if (status === "Completed") return PaymentStatus.COMPLETE
  if (status === "Cancel") return PaymentStatus.FAILED
  return PaymentStatus.PROCESSING
}

function normalizePaymentMethod(paymentMethod: string | null | undefined): string {
  if (!paymentMethod) {
    return "Wallet"
  }

  if (paymentMethod.startsWith("pi_")) {
    return "PromptPay QR"
  }

  return paymentMethod
}

export default function PaymentHistorySection() {
  const { data: transactions = [] } = useStudentTransactions()
  const history: PaymentHistoryItem[] = transactions.slice(0, 3).map((item) => {
    const date = new Date(item.date)
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
      price: Number(item.amount),
      lastFourDigits: "",
      cardType: normalizePaymentMethod(item.paymentMethod),
      status: mapStatus(item.status),
    }
  })

  return (
    <div className="w-full flex flex-col gap-4 lg:hidden">
      <Typography variant={{ base: "title-2" }} color="neutral-900">
        Payment history
      </Typography>
      
      <div className="w-full flex flex-col">
        {history.map((item, index) => (
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
