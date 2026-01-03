"use client"

import { useState } from "react"
import PaymentMethodOption from "./PaymentMethodOption"
import type { PaymentMethodSelectorI } from "./types"
import { ScanQrCode, CreditCard } from "lucide-react"
import { GoogleIcon } from "@/components/icons/common"

type PaymentMethod = PaymentMethodSelectorI["method"]

export default function PaymentMethodSelector() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("CARD")

  const paymentMethods: Array<{
    method: PaymentMethod;
    label: string;
    icon: React.ReactNode;
  }> = [
    {
      method: "PROMPTPAY",
      label: "PromptPay",
      icon: <ScanQrCode className="w-6 h-6 text-neutral-500" />
    },
    {
      method: "CARD",
      label: "Credit/Debit Card",
      icon: <CreditCard className="w-6 h-6 text-neutral-500" />
    },
    {
      method: "APPLE_PAY",
      label: "Apple Pay",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center">
          <span className="text-neutral-500 text-xs font-semibold">🍎</span>
        </div>
      )
    },
    {
      method: "GOOGLE_PAY",
      label: "Google Pay",
      icon: <GoogleIcon width={24} height={24} />
    }
  ]

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-2 lg:gap-4">
      {paymentMethods.map(({ method, label, icon }) => (
        <PaymentMethodOption
          key={method}
          icon={icon}
          label={label}
          isSelected={selectedMethod === method}
          onClick={() => setSelectedMethod(method)}
        />
      ))}
    </div>
  )
}