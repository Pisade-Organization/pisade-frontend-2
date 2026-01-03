import Typography from "@/components/base/Typography";
import type { PaymentMethodSelectorI } from "../PaymentMethodSelector/types";

type PaymentMethod = PaymentMethodSelectorI["method"]

interface PaymentFormsHeaderProps {
  selectedMethod: PaymentMethod;
}

export default function PaymentFormsHeader({ selectedMethod }: PaymentFormsHeaderProps) {
  // Hide for PROMPTPAY and APPLE_PAY
  if (selectedMethod !== "CARD" && selectedMethod !== "GOOGLE_PAY") {
    return null;
  }

  const headerText = selectedMethod === "CARD" ? "Card information" : "Google pay";

  return (
    <Typography variant={{ base: "label-2", lg: "title-2" }} color="neutral-900">
      {headerText}
    </Typography>
  )
}

