import type { EarningsTransaction } from "@/views/tutor-earnings/types"
import Typography from "@/components/base/Typography"
import TransactionRowDesktop from "./TransactionRowDesktop"
import type { TransactionsTableDesktopProps } from "./types"

export default function TransactionsTableDesktop({ rows }: TransactionsTableDesktopProps) {
  return (
    <div className="overflow-x-auto rounded-xl bg-white">
      <table className="w-full min-w-[980px] border-collapse">
        <thead>
          <tr className="rounded-[4px] border-b border-neutral-50 bg-electric-violet-25 text-left">
            <th className="px-5 py-3">
              <Typography variant="title-3" color="neutral-800">ID</Typography>
            </th>
            <th className="px-5 py-3">
              <Typography variant="title-3" color="neutral-800">Transaction</Typography>
            </th>
            <th className="px-5 py-3 text-left">
              <Typography variant="title-3" color="neutral-800">Amount</Typography>
            </th>
            <th className="px-5 py-3">
              <Typography variant="title-3" color="neutral-800">Payment method</Typography>
            </th>
            <th className="px-5 py-3">
              <Typography variant="title-3" color="neutral-800">Date</Typography>
            </th>
            <th className="px-5 py-3">
              <Typography variant="title-3" color="neutral-800">Status</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <TransactionRowDesktop key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
