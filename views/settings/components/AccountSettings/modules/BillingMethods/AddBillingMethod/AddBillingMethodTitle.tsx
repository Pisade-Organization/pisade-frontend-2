import Typography from "@/components/base/Typography";
import { ChevronLeft } from "lucide-react";

interface AddBillingMethodTitleProps {
  onBack?: () => void
}

export default function AddBillingMethodTitle({ onBack }: AddBillingMethodTitleProps) {
  return (
    <div className="w-full flex justify-start items-center gap-[10px]">
      {onBack && (
        <button 
          className="lg:hidden"
          onClick={onBack}
          aria-label="Go back"
        >
          <ChevronLeft size={24} className="text-neutral-700"/>
        </button>
      )}

      <Typography variant={{ base: "title-1", lg: "headline-5"}} color="neutral-900">
        Add Billing Methods
      </Typography>
    </div>
  )
}