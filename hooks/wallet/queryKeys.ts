export const walletQueryKeys = {
  all: ["wallet"] as const,
  summary: () => [...walletQueryKeys.all, "summary"] as const,
  transactions: () => [...walletQueryKeys.all, "transactions"] as const,
  withdrawals: () => [...walletQueryKeys.all, "withdrawals"] as const,
}
