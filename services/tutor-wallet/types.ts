export interface TutorWithdrawal {
  id?: string;
  amount?: number;
  status?: string;
  method?: string;
  accountInfo?: string;
  createdAt?: string;
  [key: string]: unknown;
}

export interface TutorWithdrawalsResponse {
  withdrawals?: TutorWithdrawal[];
  total?: number;
  page?: number;
  limit?: number;
  [key: string]: unknown;
}

export interface GetTutorWithdrawalsParams {
  page?: number;
  limit?: number;
}

export interface TutorWalletSummary {
  walletId?: string;
  balance?: number;
  totalEarnings?: number;
  totalCommission?: number;
  pendingPayouts?: number;
  [key: string]: unknown;
}
