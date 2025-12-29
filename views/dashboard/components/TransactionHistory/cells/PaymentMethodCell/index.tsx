import Typography from "@/components/base/Typography"
import { PaymentMethod, PAYMENT_METHOD_LABEL_MAP } from "../../badges/PaymentMethodBadge/types"

interface PaymentMethodCellProps {
  paymentMethod: PaymentMethod;
}

export default function PaymentMethodCell({ paymentMethod }: PaymentMethodCellProps) {
  return (
    <Typography variant="body-3" color="neutral-900">
      {PAYMENT_METHOD_LABEL_MAP[paymentMethod]}
    </Typography>
  )
}

