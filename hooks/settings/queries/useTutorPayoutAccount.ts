import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { TutorWalletService } from "@/services/tutor-wallet";
import type { TutorPayoutAccount } from "@/services/tutor-wallet/types";
import { settingsQueryKeys } from "../queryKeys";

export function useTutorPayoutAccount(enabled = true) {
  return useQuery<TutorPayoutAccount, AxiosError>({
    queryKey: settingsQueryKeys.tutorPayoutAccount(),
    queryFn: () => TutorWalletService.getPayoutAccount(),
    retry: 1,
    enabled,
  });
}
