"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog"

import ConfirmStep from "./steps/ConfirmStep"
import ReasonStep from "./steps/ReasonStep"
import EmailSentStep from "./steps/EmailSentStep"
import { X } from "lucide-react"

type Step = "confirm" | "reason" | "emailSent"

interface DeleteAccountFlowProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function DeleteAccountFlow({
  open,
  onOpenChange,
}: DeleteAccountFlowProps) {
  const [step, setStep] = useState<Step>("confirm")

  /** Close dialog + reset flow */
  const handleClose = () => {
    onOpenChange(false)
    setStep("confirm")
  }

  /** Called when user confirms deletion (step 2) */
  const handleDeleteAccount = async (reason?: string) => {
    // 🔥 CALL API HERE
    // await deleteAccount({ reason })

    setStep("emailSent")
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="
          relative
          [&>button]:hidden
          max-w-[343px]
          lg:max-w-[436px]
        "
      >
        {/* Custom Close Button (top-right, exact position control) */}
        <DialogClose asChild>
          <button
            aria-label="Close"
            className="absolute top-4 right-4 w-11 h-11 flex justify-center items-center"
          >
            <X  className="w-6 h-6 text-neutral-700"/>
          </button>
        </DialogClose>

        {/* STEP RENDERING */}
        {step === "confirm" && (
          <ConfirmStep
            onCancel={handleClose}
            onContinue={() => setStep("reason")}
          />
        )}

        {step === "reason" && (
          <ReasonStep
            onBack={() => setStep("confirm")}
            onConfirm={handleDeleteAccount}
          />
        )}

        {step === "emailSent" && (
          <EmailSentStep onClose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  )
}
