import Typography from "@/components/base/Typography"

interface TotalRowI {
  label: string;
  price: number;
}

export default function TotalRow({
  label, 
  price
}: TotalRowI) {
  return (
    <div className="w-full flex justify-between items-center">
      <Typography variant={{ base: "headline-5" }} color="neutral-900">
        { label }
      </Typography>

      <Typography variant={{ base: "headline-5" }} color="neutral-900">
        { price }฿
      </Typography>
    </div>
  )
}