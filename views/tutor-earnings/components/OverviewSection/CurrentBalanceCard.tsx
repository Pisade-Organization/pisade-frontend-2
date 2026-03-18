import Typography from "@/components/base/Typography"
import { Info } from "lucide-react"
import BaseButton from "@/components/base/BaseButton"

interface CurrentBalanceCardProps {
  amount: number
  onGetPaidClick?: () => void
}

function formatBaht(amount: number) {
  return `${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}฿`
}

export default function CurrentBalanceCard({ amount, onGetPaidClick }: CurrentBalanceCardProps) {
  return (
    <div className="rounded-[8px] p-3 lg:p-0 bg-electric-violet-25 lg:bg-white flex flex-col gap-3 lg:gap-1 items-start lg:flex-1 lg:h-full lg:max-w-[330px]">
      <div className="flex gap-2 justify-start items-center">
        <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-500">Current balance</Typography>
        <Info className="w-5 h-5 text-neutral-100" />
      </div>

      <div className="flex flex-col gap-3 lg:min-h-[48px] lg:flex-row lg:gap-4 lg:justify-start lg:items-center">
        <Typography variant={{ base: "headline-5", lg: "headline-3" }} color="neutral-800">
          {formatBaht(amount)}
        </Typography>

        <BaseButton onClick={onGetPaidClick}>
          Get Paid
        </BaseButton>
      </div>
    </div>
  )
}
