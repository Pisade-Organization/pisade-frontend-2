import type { EarningsTransaction } from "@/views/tutor-earnings/types"

export interface TransactionsTableDesktopProps {
  rows: EarningsTransaction[]
}

export interface TransactionRowDesktopProps {
  row: EarningsTransaction
}
