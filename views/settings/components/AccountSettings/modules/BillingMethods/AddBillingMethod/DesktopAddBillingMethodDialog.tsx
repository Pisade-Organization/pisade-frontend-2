"use client"
import { useState } from "react"
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
import { MastercardIcon, VisaIcon, PaypalIcon } from "@/components/icons/common"
import CardForm from "./forms/CardForm"
import PaypalForm from "./forms/PaypalForm"
import AddBillingMethodTitle from "./AddBillingMethodTitle"
import AddBillingMethodCTA from "./AddBillingMethodCTA"

interface DesktopAddBillingMethodDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function DesktopAddBillingMethodDialog({
  open,
  onOpenChange,
}: DesktopAddBillingMethodDialogProps) {
  const [selectedMethod, setSelectedMethod] = useState<BillingMethodOptionProps["value"] | null>(null)

  const handleClose = () => {
    onOpenChange(false)
    // Reset selection when dialog closes
    setTimeout(() => {
      setSelectedMethod(null)
    }, 200)
  }

  const handleSubmit = () => {
    // TODO: Handle form submission
    console.log("Submit billing method:", selectedMethod)
    handleClose()
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
        {/* Dialog Title for accessibility - visually hidden since there's a visible title */}
        <DialogTitle className="sr-only">
          Add Billing Method
        </DialogTitle>

        {/* Custom Close Button (top-right, exact position control) */}
        <DialogClose asChild>
          <button
            aria-label="Close"
            className="absolute top-4 right-4 w-11 h-11 flex justify-center items-center z-10"
          >
            <X className="w-6 h-6 text-neutral-700"/>
          </button>
        </DialogClose>

        {/* Dialog Content */}
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

          {selectedMethod && (
            <AddBillingMethodCTA 
              onCancel={handleClose}
              onSubmit={handleSubmit}
            />
          )}
        </div>

      </DialogContent>
    </Dialog>
  )
}