import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { WalletService } from "@/services/wallet";
import type { Wallet } from "@/services/wallet/types";
import { settingsQueryKeys } from "../queryKeys";

export function useMyWallet() {
  return useQuery<Wallet, AxiosError>({
    queryKey: settingsQueryKeys.wallet(),
    queryFn: () => WalletService.getMyWallet(),
    retry: 1,
  });
}
