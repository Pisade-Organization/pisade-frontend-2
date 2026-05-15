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

export interface TutorPayoutExternalAccount {
  id: string;
  bankName: string | null;
  country: string | null;
  currency: string | null;
  isDefault: boolean;
  last4: string | null;
  status: string | null;
}

export interface TutorPayoutAccount {
  accountId: string | null;
  isConnected: boolean;
  detailsSubmitted: boolean;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  country: string | null;
  defaultCurrency: string | null;
  requirementsDue: string[];
  externalAccounts: TutorPayoutExternalAccount[];
}

export interface TutorPayoutAccountLinkResponse {
  url: string;
  expiresAt?: string | null;
}

export interface CreateTutorPayoutAccountLinkDto {
  locale?: string;
}

export interface RequestTutorWithdrawDto {
  amount: number;
  method?: 'BANK' | 'PAYPAL';
  accountInfo?: string;
}

export interface RequestTutorWithdrawResponse {
  message?: string;
  withdrawalId?: string;
  status?: string;
  amount?: number;
  method?: string;
  accountInfo?: string;
  [key: string]: unknown;
}
