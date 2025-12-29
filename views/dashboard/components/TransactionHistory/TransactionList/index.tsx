import TransactionCard from "../TransactionCard"
import TransactionTable from "../TransactionTable"
import { TransactionListI } from "./types"

export function TransactionList({
  layout,
  transactions,
  columns
}: TransactionListI) {
  if (layout === "table") {
    return (
      <TransactionTable
        transactions={transactions}
        columns={columns ?? ([] as const)}
      />
    )
  }

  return (
    <div className="space-y-2">
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
        />
      ))}
    </div>
  )
}