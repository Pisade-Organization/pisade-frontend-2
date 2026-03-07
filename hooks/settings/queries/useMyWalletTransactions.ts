import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { WalletService } from "@/services/wallet";
import type {
  GetWalletTransactionsParams,
  WalletTransactionsResponse,
} from "@/services/wallet/types";
import { settingsQueryKeys } from "../queryKeys";

export function useMyWalletTransactions(params: GetWalletTransactionsParams = {}) {
  return useQuery<WalletTransactionsResponse, AxiosError>({
    queryKey: settingsQueryKeys.walletTransactions(params),
    queryFn: () => WalletService.getMyWalletTransactions(params),
    retry: 1,
  });
}
