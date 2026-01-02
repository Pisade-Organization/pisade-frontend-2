"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import Typography from "@/components/base/Typography"
import BillingMethodOption, { BillingMethodOptionProps } from "./BillingMethodOption"
import { MastercardIcon, VisaIcon, PaypalIcon } from "@/components/icons/common"
import CardForm from "./forms/CardForm"
import PaypalForm from "./forms/PaypalForm"
import AddBillingMethodTitle from "./AddBillingMethodTitle"
import AddBillingMethodDescription from "./AddBillingMethodDescription"
import AddBillingMethodCTA from "./AddBillingMethodCTA"

interface MobileAddBillingMethodPageProps {
  onBack?: () => void
}

export default function MobileAddBillingMethodPage({
  onBack,
}: MobileAddBillingMethodPageProps) {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<BillingMethodOptionProps["value"] | null>(null)

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  const handleCancel = () => {
    handleBack()
  }

  const handleSubmit = () => {
    // TODO: Handle form submission
    console.log("Submit billing method:", selectedMethod)
    handleBack()
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="w-full p-4 border-b border-neutral-50">
        <AddBillingMethodTitle onBack={handleBack} />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col gap-5 overflow-y-auto pb-24">
        <div className="w-full flex flex-col items-start gap-1">
          <AddBillingMethodDescription />
        </div>

        <div className="w-full flex flex-col gap-2 py-4">
          <Typography variant={{ base: "label-2" }} color="neutral-800">
            Payment Method
          </Typography>

          <div className="w-full flex flex-col gap-2">
            {/* Mastercard Option */}
            <div className="w-full flex flex-col">
              <BillingMethodOption
                value="mastercard"
                label="Mastercard"
                icon={<MastercardIcon width={24} height={16} />}
                selected={selectedMethod === "mastercard"}
                onSelect={setSelectedMethod}
              />
              {selectedMethod === "mastercard" && (
                <div className="w-full flex flex-col gap-3 border-x border-b border-neutral-50 rounded-b-2xl p-4 bg-white">
                  <CardForm />
                </div>
              )}
            </div>

            {/* Visa Option */}
            <div className="w-full flex flex-col">
              <BillingMethodOption
                value="visa"
                label="Visa"
                icon={<VisaIcon width={24} height={16} />}
                selected={selectedMethod === "visa"}
                onSelect={setSelectedMethod}
              />
              {selectedMethod === "visa" && (
                <div className="w-full flex flex-col gap-3 border-x border-b border-neutral-50 rounded-b-2xl p-4 bg-white">
                  <CardForm />
                </div>
              )}
            </div>

            {/* PayPal Option */}
            <div className="w-full flex flex-col">
              <BillingMethodOption
                value="paypal"
                label="PayPal"
                icon={<PaypalIcon width={24} height={16} />}
                selected={selectedMethod === "paypal"}
                onSelect={setSelectedMethod}
              />
              {selectedMethod === "paypal" && (
                <div className="w-full flex flex-col gap-3 border-x border-b border-neutral-50 rounded-b-2xl p-4 bg-white">
                  <PaypalForm />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed CTA at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-50 px-4 py-4">
        <AddBillingMethodCTA 
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

