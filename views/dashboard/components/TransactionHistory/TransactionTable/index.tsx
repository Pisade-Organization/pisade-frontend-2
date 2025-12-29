import type { TransactionTableI } from "./types"
import TransactionTableHeader from "./TransactionTableHeader"
import TransactionTableRow from "./TransactionTableRow"

export default function TransactionTable({
  transactions,
  columns
}: TransactionTableI) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed border-collapse">
        <TransactionTableHeader columns={columns} />
        <tbody className="w-full ">
          {transactions.map((tx) => (
            <TransactionTableRow key={tx.id} transaction={tx} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  )
}