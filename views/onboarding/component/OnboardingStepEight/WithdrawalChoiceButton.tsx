import { Smartphone } from "lucide-react"
import { Landmark } from "lucide-react"
import Typography from "@/components/base/Typography";
import { WithdrawalMethod } from "@/views/onboarding/types/withdrawalMethod.types";
export default function WithdrawalChoiceButton({
  title,
  withdrawalMethod,
  setWithdrawalMethod
}: {
  title: WithdrawalMethod;
  withdrawalMethod: WithdrawalMethod;
  setWithdrawalMethod: (withdrawalMethod: WithdrawalMethod) => void;
}) {
  return (
    <button 
    onClick={() => setWithdrawalMethod(title)}
    className="
    w-full
    rounded-[12px] border border-neutral-50
    flex items-center py-3 px-4 gap-3
    ">

      <div className="rounded-full h-5 w-5 flex justify-center items-center border border-neutral-100 transition-all">
        { withdrawalMethod === title && (
          <div className="rounded-full w-3 h-3 bg-electric-violet-500 transition-all" />
        )}
      </div>

      {/* ICON */}
      { title === "Prompt Pay" && <Smartphone size={24} className="text-neutral-200"  />}
      { title === "Bank transfer" && <Landmark size={24} className="text-neutral-200" />}

      <Typography variant="body-3" color="neutral-900">
        { title }
      </Typography>
    </button>
  )
}