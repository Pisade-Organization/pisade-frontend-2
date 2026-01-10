import Typography from "@/components/base/Typography"
import { Checkbox } from "@/components/ui/checkbox"

export default function SaveThisMethodSelect() {
  return (
    <div className="w-full inline-flex justify-start items-center gap-2 lg:gap-3">
      <Checkbox 
        className="shadow-none border border-neutral-100 rounded-sm data-[state=checked]:bg-electric-violet-500 data-[state=checked]:border-electric-violet-500"
      />

      <Typography variant="body-3" color="neutral-900">
        Save this method for future payments
      </Typography>
    </div>
  )
}