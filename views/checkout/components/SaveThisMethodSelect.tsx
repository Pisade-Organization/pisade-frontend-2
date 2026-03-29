import Typography from "@/components/base/Typography"
import { Checkbox } from "@/components/ui/checkbox"

interface SaveThisMethodSelectProps {
  checked: boolean
  disabled?: boolean
  onCheckedChange: (checked: boolean) => void
}

export default function SaveThisMethodSelect({
  checked,
  disabled,
  onCheckedChange,
}: SaveThisMethodSelectProps) {
  return (
    <label className="w-full inline-flex justify-start items-center gap-2 lg:gap-3">
      <Checkbox
        checked={checked}
        disabled={disabled}
        onCheckedChange={(value) => onCheckedChange(value === true)}
        className="shadow-none border border-neutral-100 rounded-sm data-[state=checked]:bg-electric-violet-500 data-[state=checked]:border-electric-violet-500"
      />

      <Typography variant="body-3" color={disabled ? "neutral-400" : "neutral-900"}>
        Save this method for future payments
      </Typography>
    </label>
  )
}
