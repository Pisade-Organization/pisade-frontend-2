import Typography from "@/components/base/Typography"

interface CheckoutRowI {
  label: string;
  price: number;
}

export default function CheckoutRow({
  label, 
  price
}: CheckoutRowI) {
  return (
    <div className="w-full flex justify-between items-center">
      <Typography variant={{ base: "body-3" }} color="neutral-300">
        { label }
      </Typography>

      <Typography variant={{ base: "label-3" }} color="neutral-900">
        { price }฿
      </Typography>
    </div>
  )
}
