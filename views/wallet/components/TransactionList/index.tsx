import type { WalletTransactionItem } from "@/views/wallet/types"

interface TransactionListProps {
  items?: WalletTransactionItem[]
}

export default function TransactionList({ items }: TransactionListProps) {
  void items
  return null
}
