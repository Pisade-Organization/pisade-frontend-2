import type { EarningsTransaction } from "@/views/tutor-earnings/types"
import TransactionCardMobile from "./TransactionCardMobile"

export default function TransactionsCardsMobile({ rows }: { rows: EarningsTransaction[] }) {
  return (
    <div className="flex flex-col gap-3">
      {rows.map((row) => (
        <TransactionCardMobile key={row.id} row={row} />
      ))}
    </div>
  )
}
