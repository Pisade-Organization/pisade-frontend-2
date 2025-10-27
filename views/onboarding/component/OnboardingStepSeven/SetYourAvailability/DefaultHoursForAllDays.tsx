import Typography from "@/components/base/Typography"
import { BaseSwitch } from "@/components/base/Switch"

interface DefaultHoursForAllDaysProps {
  onToggle?: (checked: boolean) => void;
}

export default function DefaultHoursForAllDays({ onToggle }: DefaultHoursForAllDaysProps) {
  return (
    <div className="w-full flex justify-between items-center gap-2 py-3 px-6 rounded-[8px] bg-neutral-25 lg:bg-transparent border-0 lg:border lg:border-neutral-50  ">
      
      <div className="flex flex-col lg:flex-row justify-center items-start gap-x-2">
        <Typography variant="label-3" color="neutral-900">
          Default hours for all days
        </Typography>

        <Typography variant="body-3" color="neutral-400">
          (Set once to apply the same working hours from Monday to Sunday)
        </Typography>
      </div>

      <BaseSwitch onChange={onToggle} />


    </div>
  )
}