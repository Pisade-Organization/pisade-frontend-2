import Typography from "@/components/base/Typography"
import { Info } from "lucide-react"

interface WithdrawMoneyCardProps {
  amount: number
}

function formatBaht(amount: number) {
  return `${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}฿`
}

export default function WithdrawMoneyCard({ amount }: WithdrawMoneyCardProps) {
  return (
    <div className="rounded-[8px] p-3 lg:p-0 flex flex-col gap-3 lg:gap-1 justify-start items-start lg:flex-1 lg:h-full lg:max-w-[330px]">

        <div className="flex gap-2 justify-start items-center">
          <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-500">Withdraw money</Typography>
          <Info className="w-5 h-5 text-neutral-100" />
        </div>

        <div className="flex items-center lg:min-h-[48px]">
          <Typography variant={{ base: "headline-5", lg: "headline-3" }} color="neutral-800">
            {formatBaht(amount)}
          </Typography>
        </div>

    </div>
  )
}
