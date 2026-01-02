import clsx from "clsx"
import Typography from "@/components/base/Typography"

export interface BillingMethodOptionProps {
  value: "mastercard" | "visa" | "paypal"
  label: string
  icon: React.ReactNode
  selected: boolean
  onSelect: (value: BillingMethodOptionProps["value"]) => void
}


export default function BillingMethodOption({
  value,
  label,
  icon,
  selected,
  onSelect,
}: BillingMethodOptionProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={clsx(
        "w-full flex items-center gap-3 border p-3 transition border-neutral-50 bg-white",
        selected ? "rounded-t-2xl" : "rounded-2xl"
      )}
    >
      <span className="w-5 h-5 flex items-center justify-center">
        <span className="w-[15px] h-[15px] rounded-full border border-neutral-100 flex items-center justify-center">
          {
            selected && <span className="w-[10px] h-[10px] rounded-full bg-electric-violet-500" />
          }
        </span>
      </span>

      {icon}
      
      <Typography variant={{ base: "label-3" }} color="neutral-700">
        { label }
      </Typography>

        
    </button>
  )
}
