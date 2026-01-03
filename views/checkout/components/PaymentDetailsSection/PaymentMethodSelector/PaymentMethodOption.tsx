import { ReactNode } from "react"
import Typography from "@/components/base/Typography";

interface PaymentMethodOptionI {
  icon: ReactNode,
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function PaymentMethodOption({
  icon,
  label,
  isSelected,
  onClick
}: PaymentMethodOptionI) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl border border-neutral-50 py-3 px-4 flex justify-start items-center gap-3 hover:border-electric-violet-200 transition-colors cursor-pointer"
    >
      
      {/* RADIO */}
      <div className="w-5 h-5 flex items-center justify-center">
        <div className="w-[15px] h-[15px] rounded-full border border-neutral-100 flex items-center justify-center">
          { isSelected && (
            <div className="rounded-full w-[10px] h-[10px] bg-electric-violet-500" />
          )}
        </div>
      </div>
      
      {/* ICON */}
      {icon}

      {/* PAYMENT METHOD */}
      <Typography variant={{ base: "body-3" }} color="neutral-900">
        { label }
      </Typography>

    </button>
  )
}