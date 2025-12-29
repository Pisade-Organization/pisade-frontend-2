import Typography from "@/components/base/Typography";
import { PaymentMethodBadgeProps, PAYMENT_METHOD_LABEL_MAP, PaymentMethod } from "./types";

export default function PaymentMethodBadge({ method }: PaymentMethodBadgeProps) {
  const label = PAYMENT_METHOD_LABEL_MAP[method as PaymentMethod] || method;
  return (
    <Typography variant="body-3" color="neutral-500">
      {label}
    </Typography>
  );
}