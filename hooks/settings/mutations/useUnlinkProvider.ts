import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ProfileService } from "@/services/profile";
import type { UnlinkProviderResponse } from "@/services/profile/types";
import { settingsQueryKeys } from "../queryKeys";

export function useUnlinkProvider() {
  const queryClient = useQueryClient();

  return useMutation<UnlinkProviderResponse, AxiosError, string>({
    mutationFn: (providerId) => ProfileService.unlinkProvider(providerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsQueryKeys.providers() });
      queryClient.invalidateQueries({ queryKey: settingsQueryKeys.profile() });
    },
  });
}
