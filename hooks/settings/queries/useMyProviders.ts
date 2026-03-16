import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ProfileService } from "@/services/profile";
import type { LinkedProvider } from "@/services/profile/types";
import { settingsQueryKeys } from "../queryKeys";

export function useMyProviders() {
  return useQuery<LinkedProvider[], AxiosError>({
    queryKey: settingsQueryKeys.providers(),
    queryFn: () => ProfileService.getMyProviders(),
    retry: 1,
  });
}
