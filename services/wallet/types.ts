export type WalletTransactionType =
  | "PAYMENT"
  | "REFUND"
  | "TOPUP"
  | "COMMISSION"
  | "WITHDRAW"
  | string;

export type WalletTransactionStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "CANCELLED"
  | string;

export interface Wallet {
  id?: string;
  balance?: number;
  currency?: string;
  [key: string]: unknown;
}

export interface WalletSummary {
  walletId?: string;
  balance?: number;
  totalTopUp?: number;
  totalSpent?: number;
  pending?: number;
  [key: string]: unknown;
}

export interface WalletTransaction {
  id: string;
  type?: WalletTransactionType;
  status?: WalletTransactionStatus;
  amount?: number;
  fee?: number;
  reference?: string | null;
  providerRef?: string | null;
  createdAt?: string;
  [key: string]: unknown;
}

export interface GetWalletTransactionsParams {
  page?: number;
  limit?: number;
  type?: WalletTransactionType;
  status?: WalletTransactionStatus;
}

export interface WalletTransactionsResponse {
  transactions?: WalletTransaction[];
  total?: number;
  page?: number;
  limit?: number;
  [key: string]: unknown;
}
