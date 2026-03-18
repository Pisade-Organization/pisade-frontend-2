import TransactionsTableDesktop from "./TransactionsTableDesktop"
import TransactionsCardsMobile from "./TransactionsCardsMobile"
import Typography from "@/components/base/Typography"
import type { EarningsTransaction } from "@/views/tutor-earnings/types"

interface RecentTransactionsSectionProps {
  rows: EarningsTransaction[]
  isLoading?: boolean
  isError?: boolean
}

export default function RecentTransactionsSection({
  rows,
  isLoading = false,
  isError = false,
}: RecentTransactionsSectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <Typography variant="headline-5" color="neutral-800">Recent transactions (last 30 days)</Typography>

      {isLoading ? (
        <Typography variant="body-3" color="neutral-500">Loading transactions...</Typography>
      ) : null}

      {!isLoading && isError ? (
        <Typography variant="body-3" color="red-normal">Unable to load transactions right now.</Typography>
      ) : null}

      {!isLoading && !isError && rows.length === 0 ? (
        <Typography variant="body-3" color="neutral-500">No transactions yet.</Typography>
      ) : null}

      {!isLoading && !isError && rows.length > 0 ? (
        <>
          <div className="hidden lg:block">
            <TransactionsTableDesktop rows={rows} />
          </div>

          <div className="lg:hidden">
            <TransactionsCardsMobile rows={rows} />
          </div>
        </>
      ) : null}
    </section>
  )
}
