"use client"
import { useRef, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import Typography from "@/components/base/Typography"
import BaseButton from "@/components/base/BaseButton"
import AddBillingMethodDescription from "./AddBillingMethodDescription"
import BillingMethodOption, { BillingMethodOptionProps } from "./BillingMethodOption"
import { MastercardIcon, VisaIcon } from "@/components/icons/common"
import CardForm, { CardFormHandle } from "./forms/CardForm"
import AddBillingMethodTitle from "./AddBillingMethodTitle"
import AddBillingMethodCTA from "./AddBillingMethodCTA"
import { useSavePaymentMethod } from "@/hooks/payments/usePaymentMethodsMutations"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "")

interface DesktopAddBillingMethodDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function AddBillingMethodForm({ onClose }: { onClose: () => void }) {
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
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save card. Please try again.")
    }
  }

  return (
    <div className="p-4 rounded-2xl bg-white flex flex-col w-full gap-5">

      <div className="w-full flex justify-between items-start">
        <div className="w-full flex flex-col items-start gap-1">
          <AddBillingMethodTitle />
          <AddBillingMethodDescription />
        </div>

        <DialogClose asChild>
          <button
            className="w-11 h-11 p-[10px]"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-neutral-700" />
          </button>
        </DialogClose>
      </div>

      <div className="w-full flex flex-col gap-2">
        <Typography variant={{ base: "label-3" }} color="neutral-800">
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
      </div>

      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : null}

      {selectedMethod && (
        <AddBillingMethodCTA
          onCancel={onClose}
          onSubmit={handleSubmit}
          isLoading={saveMethod.isPending}
        />
      )}
    </div>
  )
}

export default function DesktopAddBillingMethodDialog({
  open,
  onOpenChange,
}: DesktopAddBillingMethodDialogProps) {
  const handleClose = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="
          [&>button]:hidden
          rounded-2xl sm:rounded-2xl
          p-0
          w-[700px]
        "
      >
        <DialogTitle className="sr-only">
          Add Billing Method
        </DialogTitle>

        <DialogClose asChild>
          <button
            aria-label="Close"
            className="absolute top-4 right-4 w-11 h-11 flex justify-center items-center z-10"
          >
            <X className="w-6 h-6 text-neutral-700"/>
          </button>
        </DialogClose>

        <Elements stripe={stripePromise}>
          <AddBillingMethodForm onClose={handleClose} />
        </Elements>
      </DialogContent>
    </Dialog>
  )
}
