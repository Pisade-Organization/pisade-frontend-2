import CurrentBalanceCard from "./CurrentBalanceCard"
import WithdrawMoneyCard from "./WithdrawMoneyCard"
import Typography from "@/components/base/Typography"

interface OverviewSectionProps {
  currentBalance: number
  withdrawableAmount: number
}

export default function OverviewSection({
  currentBalance,
  withdrawableAmount,
}: OverviewSectionProps) {
  return (
    <section className="flex flex-col gap-2 lg:gap-5">
      <Typography
        variant={{ base: "title-1", lg: "headline-2" }}
        color="neutral-800"
      >
        Overview
      </Typography>

      <div className="rounded-[12px] lg:border-none border border-neutral-50 p-2 gap-2 flex lg:items-stretch lg:p-0 lg:pb-3 lg:gap-10">
        <CurrentBalanceCard amount={currentBalance} />
        <WithdrawMoneyCard amount={withdrawableAmount} />
      </div>
    </section>
  )
}
