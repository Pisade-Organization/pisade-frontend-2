"use client"

import { useState } from "react"
import PaymentMethodOption from "./PaymentMethodOption"
import type { PaymentMethodSelectorI } from "./types"
import { ScanQrCode, CreditCard } from "lucide-react"
import { ApplePayIcon, GooglePayIcon } from "@/components/icons/common"
import PaymentFormsHeader from "../PaymentForms/PaymentFormsHeader"
import CardForm from "../PaymentForms/CardForm"

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
      icon: <ApplePayIcon width={24} height={24} />
    },
    {
      method: "GOOGLE_PAY",
      label: "Google Pay",
      icon: <GooglePayIcon width={24} height={24} />
    }
  ]

  return (
    <div className="w-full flex flex-col gap-4">
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

      {/* Show CardForm for CARD and GOOGLE_PAY */}
      {(selectedMethod === "CARD" || selectedMethod === "GOOGLE_PAY") && (
        <div className="w-full flex flex-col gap-2">
          <PaymentFormsHeader selectedMethod={selectedMethod} />
          <CardForm />
        </div>
      )}
    </div>
  )
}