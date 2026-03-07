import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { TutorWalletService } from "@/services/tutor-wallet";
import type { TutorWalletSummary } from "@/services/tutor-wallet/types";
import { settingsQueryKeys } from "../queryKeys";

export function useTutorWalletSummary() {
  return useQuery<TutorWalletSummary, AxiosError>({
    queryKey: settingsQueryKeys.tutorWalletSummary(),
    queryFn: () => TutorWalletService.getSummary(),
    retry: 1,
  });
}
