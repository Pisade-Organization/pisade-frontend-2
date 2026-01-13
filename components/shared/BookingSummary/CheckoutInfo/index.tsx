import CheckoutRow from "./CheckoutRow";
import TotalRow from "./TotalRow";
import Typography from "@/components/base/Typography";

interface CheckoutInfoI {
  lessonPrice: number;
  processingFee: number;
  total: number;
}

export default function CheckoutInfo({
  lessonPrice,
  processingFee,
  total
}: CheckoutInfoI) {
  return (
    <div className="w-full flex flex-col gap-3 lg:gap-5">

    <Typography variant="title-2" color="neutral-900" className="hidden lg:block">
      Checkout info
    </Typography>

    <div className="w-full flex flex-col gap-3 lg:gap-2">
      <CheckoutRow 
        label="50 mins lesson"
        price={lessonPrice}
      />

      <CheckoutRow 
        label="Processing fee"
        price={processingFee}
      />
    </div>

    <div className="w-full border-t border-neutral-100 border-dashed hidden lg:block"/>

    <TotalRow 
      label="Total"
      price={total}
    />
  </div>
  )
}
