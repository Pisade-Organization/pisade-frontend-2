import { Settings } from "lucide-react";
import Typography from "@/components/base/Typography";
import { BaseSwitch } from "@/components/base/Switch";

interface DefaultPaymentMethodToggleProps {
  isDefault: boolean;
  onChange?: (checked: boolean) => void;
}

export default function DefaultPaymentMethodToggle({
  isDefault,
  onChange,
}: DefaultPaymentMethodToggleProps) {
  return (
    <div className="w-full flex items-center gap-4">
      <Settings className="w-6 h-6 text-neutral-500" />

      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <Typography variant="label-3" color="neutral-500">
            Set as default payment method
          </Typography>

          <Typography variant="body-4" color="neutral-400">
            This method will be selected automatically for your out going payments.
          </Typography>
        </div>
        <BaseSwitch checked={isDefault} onChange={onChange} />
      </div>
    </div>
  );
}

