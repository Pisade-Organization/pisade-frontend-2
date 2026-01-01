import Typography from "@/components/base/Typography"
import { Mail } from "lucide-react"
import BaseButton from "@/components/base/BaseButton"

interface EmailSentStepProps {
  onClose: () => void
}

export default function EmailSentStep({
  onClose,
}: EmailSentStepProps) {
  return (
    <div className="pt-6 pb-4 px-4 flex flex-col items-center w-full gap-4 bg-white">
      <div className="w-14 h-14 bg-red-light rounded-full flex justify-center items-center">
        <Mail className="w-7 h-7 text-red-normal"/>
      </div>

      <div className="w-full flex flex-col items-center gap-1">
        <Typography variant={{ base: "headline-5" }} color="neutral-900">
          We've sent a confirmation link to your email.
        </Typography>

        <div className="w-full flex flex-col items-center">
          <Typography variant={{ base: "body-3" }} color="neutral-500" className="text-center">
            To complete the permanent deletion process, please access your inbox and click the confirmation link. 
          </Typography>

          <Typography variant={{ base: "body-3" }} color="red-normal">
            Link Expires in 24 Hours.
          </Typography>
        </div>
      </div>

      <BaseButton variant="secondary" onClick={onClose} className="w-full">
        Got it!
      </BaseButton>
    </div>
  )
}