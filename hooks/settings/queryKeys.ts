import type { GetTutorWithdrawalsParams } from "@/services/tutor-wallet/types";
import type { GetWalletTransactionsParams } from "@/services/wallet/types";

export const settingsQueryKeys = {
  all: ["settings"] as const,

  profile: () => [...settingsQueryKeys.all, "profile"] as const,
  notifications: () => [...settingsQueryKeys.all, "notifications"] as const,
  notificationPreferences: () =>
    [...settingsQueryKeys.all, "notification-preferences"] as const,
  tutorProfile: () => [...settingsQueryKeys.all, "tutor-profile"] as const,

  studentTransactions: () => [...settingsQueryKeys.all, "student-transactions"] as const,
  tutorTransactions: () => [...settingsQueryKeys.all, "tutor-transactions"] as const,

  wallet: () => [...settingsQueryKeys.all, "wallet"] as const,
  walletSummary: () => [...settingsQueryKeys.all, "wallet-summary"] as const,
  walletTransactions: (params: GetWalletTransactionsParams) =>
    [...settingsQueryKeys.all, "wallet-transactions", params] as const,

  tutorWalletSummary: () => [...settingsQueryKeys.all, "tutor-wallet-summary"] as const,
  tutorWithdrawals: (params: GetTutorWithdrawalsParams) =>
    [...settingsQueryKeys.all, "tutor-withdrawals", params] as const,
};
