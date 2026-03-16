import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { WalletService } from "@/services/wallet";
import type { CreateTopupDto, CreateTopupResponse } from "@/services/wallet/types";

export function useCreateTopup() {
  return useMutation<CreateTopupResponse, AxiosError, CreateTopupDto>({
    mutationFn: (payload) => WalletService.createTopup(payload),
  });
}
