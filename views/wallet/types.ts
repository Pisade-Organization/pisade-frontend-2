export type WalletRole = "student" | "tutor"

export interface WalletPageProps {
  role: WalletRole
}

export interface WalletTransactionItem {
  id: string
  title: string
  amountLabel: string
  dateLabel: string
  statusLabel?: string
}

export interface WalletBankAccount {
  id: string
  bankName?: string
  accountName: string
  accountNumber?: string
  lastFourDigits?: string
  isDefault?: boolean
}
