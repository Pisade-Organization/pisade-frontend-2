"use client"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import Typography from "@/components/base/Typography"
import BillingMethodOption, { BillingMethodOptionProps } from "./BillingMethodOption"
import { MastercardIcon, VisaIcon } from "@/components/icons/common"
import CardForm, { CardFormHandle } from "./forms/CardForm"
import AddBillingMethodTitle from "./AddBillingMethodTitle"
import AddBillingMethodDescription from "./AddBillingMethodDescription"
import AddBillingMethodCTA from "./AddBillingMethodCTA"
import { useSavePaymentMethod } from "@/hooks/payments/usePaymentMethodsMutations"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "")

interface MobileAddBillingMethodPageProps {
  onBack?: () => void
}

function MobileAddBillingMethodForm({ onBack }: { onBack: () => void }) {
  const [selectedMethod, setSelectedMethod] = useState<BillingMethodOptionProps["value"] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const cardFormRef = useRef<CardFormHandle>(null)
  const saveMethod = useSavePaymentMethod()

  const handleSubmit = async () => {
    if (!cardFormRef.current) return
    setError(null)
    try {
      const paymentMethodId = await cardFormRef.current.createPaymentMethod()
      await saveMethod.mutateAsync({ paymentMethodId })
      onBack()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save card. Please try again.")
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      <div className="w-full p-4 border-b border-neutral-50">
        <AddBillingMethodTitle onBack={onBack} />
      </div>

      <div className="flex-1 p-4 flex flex-col gap-5 overflow-y-auto pb-24">
        <div className="w-full flex flex-col items-start gap-1">
          <AddBillingMethodDescription />
        </div>

        <div className="w-full flex flex-col gap-2 py-4">
          <Typography variant={{ base: "label-2" }} color="neutral-800">
            Payment Method
          </Typography>

          <div className="w-full flex flex-col gap-2">
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
                  <CardForm ref={cardFormRef} />
                </div>
              )}
            </div>

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
                  <CardForm ref={cardFormRef} />
                </div>
              )}
            </div>
          </div>

          {error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : null}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-50 px-4 py-4">
        <AddBillingMethodCTA
          onCancel={onBack}
          onSubmit={handleSubmit}
          isLoading={saveMethod.isPending}
        />
      </div>
    </div>
  )
}

export default function MobileAddBillingMethodPage({
  onBack,
}: MobileAddBillingMethodPageProps) {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  return (
    <Elements stripe={stripePromise}>
      <MobileAddBillingMethodForm onBack={handleBack} />
    </Elements>
  )
}
