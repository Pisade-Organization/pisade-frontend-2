import Typography from "@/components/base/Typography"

interface PaymentConfirmationNoticeProps {
  totalAmount: number;
}

export default function PaymentConfirmationNotice({ totalAmount }: PaymentConfirmationNoticeProps) {
  const formattedAmount = `$${totalAmount.toFixed(2)}`;

  return (
    <div className="w-full flex flex-col gap-1">
      <Typography variant={{ base: "body-3" }} color="neutral-500">
        By pressing the "Confirm payment {formattedAmount}" button, you agree to{" "}
        <Typography 
          variant={{ base: "body-3" }} 
          color="neutral-700" 
          as="span" 
          className="underline cursor-pointer"
        >
          Pisade's Refund and Payment Policy.
        </Typography>
      </Typography>

      <Typography variant={{ base: "body-3" }} color="neutral-500">
        It's safe to pay on Pisade. All transactions are protected by SSL encryption.
      </Typography>
    </div>
  )
}

