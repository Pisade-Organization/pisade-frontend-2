import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { TutorService } from "@/services/tutor";
import type { TutorTransaction } from "@/services/tutor/types";
import { settingsQueryKeys } from "../queryKeys";

export function useTutorTransactions() {
  return useQuery<TutorTransaction[], AxiosError>({
    queryKey: settingsQueryKeys.tutorTransactions(),
    queryFn: () => TutorService.getMyTutorTransactions(),
    retry: 1,
  });
}
