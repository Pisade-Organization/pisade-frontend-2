"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
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
    // Reset step after dialog closes to avoid showing confirm step during close animation
    setTimeout(() => {
      setStep("confirm")
    }, 200)
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
          [&>button]:hidden
          rounded-2xl sm:rounded-2xl
        "
      >
        {/* Dialog Title for accessibility - visually hidden since each step has its own heading */}
        <DialogTitle className="sr-only">
          {step === "confirm" && "Confirm Account Deletion"}
          {step === "reason" && "Delete Account Reason"}
          {step === "emailSent" && "Account Deletion Email Sent"}
        </DialogTitle>

        {/* Custom Close Button (top-right, exact position control) */}
        <DialogClose asChild>
          <button
            aria-label="Close"
            className="absolute top-4 right-4 w-11 h-11 flex justify-center items-center z-10"
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
            onBack={handleClose}
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
