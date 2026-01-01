import BaseButton from "@/components/base/BaseButton"
import Typography from "@/components/base/Typography"
import { UserRoundX } from "lucide-react"
import { ArrowRight } from "lucide-react"

const WARNING_ITEMS = [
  {
    label: "Data Loss:",
    description: "All your saved data, profile information, and activity history will be permanently deleted.",
  },
  {
    label: "Access Loss:",
    description: "You will immediately lose access to all platform services, including your scheduled lessons and messages.",
  },
  {
    label: "Balance/Credits:",
    description: "Any remaining credit, lesson balance, or gift cards will be forfeited and non-refundable.",
  },
  {
    label: "Recovery:",
    description: "You will not be able to recover your account later.",
  },
]

interface ConfirmStepProps {
  onCancel: () => void
  onContinue: () => void
}

export default function ConfirmStep({
  onCancel,
  onContinue,
}: ConfirmStepProps) {
  return (
    <div className="w-full pt-6 pb-4 px-4 flex flex-col gap-4 bg-white">
      <div className="w-full flex flex-col items-center gap-3">
        <div className="w-14 h-14 bg-red-light rounded-full flex justify-center items-center p-[14px]">
          <UserRoundX className="w-7 h-7 text-red-normal" />
        </div>

        <Typography variant={{ base: "headline-5" }} color="neutral-900">
          Are you sure you want to <br />
          delete your account?
        </Typography>

        <Typography variant={{ base: "body-3" }} color="neutral-500">
          This action is permanent and cannot be undone.
        </Typography>
      </div>

      <ul className="list-disc list-outside p-4 flex flex-col gap-3 rounded-xl border border-neutral-50 pl-6">
        {WARNING_ITEMS.map((item, index) => (
          <li key={index}>
            <Typography variant={{ base: "label-3" }} color="neutral-900" as="span">
              {item.label}{" "}
            </Typography>
            <Typography variant={{ base: "body-3" }} color="neutral-400" as="span">
              {item.description}
            </Typography>
          </li>
        ))}
      </ul>

      <div className="w-full flex justify-between items-center">
        <BaseButton 
          variant="secondary"
          typeStyle="borderless"
          onClick={onCancel}
        > 
          Keep Account
        </BaseButton>

        <BaseButton
          typeStyle="outline"
          iconRight={<ArrowRight className="w-5 h-5 text-red-normal group-hover:text-white" />}
          textColor="red-normal"
          borderColor="red-normal"
          className="hover:bg-red-normal hover:text-white "
          onClick={onContinue}
        >
          Continue
        </BaseButton>
      </div>
    </div>
  )
}