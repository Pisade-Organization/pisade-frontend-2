import Typography from "@/components/base/Typography"
import DefaultPaymentMethodToggle from "./DefaultPaymentMethodToggle"

interface OthersSectionI {
  isDefault: boolean;
  onDefaultChange?: (checked: boolean) => void;
}

export default function OthersSection({
  isDefault,
  onDefaultChange,
}: OthersSectionI) {
  return (
    <div className="w-full flex flex-col gap-6 py-5 px-4">
      <Typography variant="label-2" color="neutral-800">
        Others
      </Typography>

      <DefaultPaymentMethodToggle 
        isDefault={isDefault}
        onChange={onDefaultChange}
      />
    </div>
  )
}