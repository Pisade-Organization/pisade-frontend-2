"use client"
import { useState } from "react"
import BaseButton from "@/components/base/BaseButton"
import Typography from "@/components/base/Typography"
import { UserRoundX } from "lucide-react"
import { ArrowRight } from "lucide-react"
import BaseTextArea from "@/components/base/BaseTextArea"

interface ReasonStepProps {
  onBack: () => void
  onConfirm: (reason?: string) => void
}

export default function ReasonStep({
  onBack,
  onConfirm,
}: ReasonStepProps) {
  const [reason, setReason] = useState<string>("")

  const handleConfirm = () => {
    onConfirm(reason.trim() || undefined)
  }

  return (
    <div className="pt-6 pb-4 px-4 flex flex-col gap-4 bg-white rounded-2xl border border-neutral-50">
      <div className="w-full flex flex-col gap-3">
        <div className="w-14 h-14 bg-red-light rounded-full flex justify-center items-center p-[14px]">
          <UserRoundX className="w-7 h-7 text-red-normal" />
        </div>

        <Typography variant={{ base: "headline-5" }} color="neutral-900">
          We're sorry to see you go. <br />
          Could you briefly tell us why you are leaving?
        </Typography>

        <Typography variant={{ base: "body-3" }} color="neutral-500">
          This action is permanent and cannot be undone.
        </Typography>
      </div>

      <BaseTextArea 
        placeholder="Type your answer..."
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      
      <div className="w-full flex justify-between items-center">
        <Typography 
          variant={{ base: "label-3" }} 
          color="neutral-900"
          className="cursor-pointer"
          onClick={onBack}
        > 
          Keep Account
        </Typography>

        <BaseButton
          textColor="white"
          borderColor="red-normal"
          onClick={handleConfirm}
        >
          Delete Account
        </BaseButton>
      </div>
    </div>
  )
}