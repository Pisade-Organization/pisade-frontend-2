import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ProfileService } from "@/services/profile";
import type {
  LinkGoogleProviderDto,
  LinkGoogleProviderResponse,
} from "@/services/profile/types";
import { settingsQueryKeys } from "../queryKeys";

export function useLinkGoogleProvider() {
  const queryClient = useQueryClient();

  return useMutation<LinkGoogleProviderResponse, AxiosError, LinkGoogleProviderDto>({
    mutationFn: (payload) => ProfileService.linkGoogleProvider(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsQueryKeys.providers() });
      queryClient.invalidateQueries({ queryKey: settingsQueryKeys.profile() });
    },
  });
}
