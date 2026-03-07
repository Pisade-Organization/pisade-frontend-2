import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ProfileService } from "@/services/profile";
import type {
  UpdateMyProfileDto,
  UpdateMyProfileResponse,
} from "@/services/profile/types";
import { settingsQueryKeys } from "../queryKeys";

export function useUpdateMyProfile() {
  const queryClient = useQueryClient();

  return useMutation<UpdateMyProfileResponse, AxiosError, UpdateMyProfileDto>({
    mutationFn: (payload) => ProfileService.updateMyProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsQueryKeys.profile() });
    },
  });
}
