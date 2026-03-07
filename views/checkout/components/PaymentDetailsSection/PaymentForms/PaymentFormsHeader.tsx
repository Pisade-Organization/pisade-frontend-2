import Typography from "@/components/base/Typography";
import type { PaymentMethodSelectorI } from "../PaymentMethodSelector/types";

type PaymentMethod = PaymentMethodSelectorI["method"]

interface PaymentFormsHeaderProps {
  selectedMethod: PaymentMethod;
}

export default function PaymentFormsHeader({ selectedMethod }: PaymentFormsHeaderProps) {
  if (selectedMethod !== "CARD") {
    return null;
  }

  return (
    <Typography variant={{ base: "label-2", lg: "title-2" }} color="neutral-900">
      Card information
    </Typography>
  )
}
