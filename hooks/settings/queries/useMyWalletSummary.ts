import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { WalletService } from "@/services/wallet";
import type { WalletSummary } from "@/services/wallet/types";
import { settingsQueryKeys } from "../queryKeys";

export function useMyWalletSummary() {
  return useQuery<WalletSummary, AxiosError>({
    queryKey: settingsQueryKeys.walletSummary(),
    queryFn: () => WalletService.getMyWalletSummary(),
    retry: 1,
  });
}
