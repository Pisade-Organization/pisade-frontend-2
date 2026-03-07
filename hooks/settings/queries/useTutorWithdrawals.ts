import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { TutorWalletService } from "@/services/tutor-wallet";
import type {
  GetTutorWithdrawalsParams,
  TutorWithdrawalsResponse,
} from "@/services/tutor-wallet/types";
import { settingsQueryKeys } from "../queryKeys";

export function useTutorWithdrawals(params: GetTutorWithdrawalsParams = {}) {
  return useQuery<TutorWithdrawalsResponse, AxiosError>({
    queryKey: settingsQueryKeys.tutorWithdrawals(params),
    queryFn: () => TutorWalletService.getWithdrawals(params),
    retry: 1,
  });
}
