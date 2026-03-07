import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ProfileService } from "@/services/profile";
import type {
  UpdateMyPhoneNumberDto,
  UpdateMyPhoneNumberResponse,
} from "@/services/profile/types";
import { settingsQueryKeys } from "../queryKeys";

export function useUpdateMyPhoneNumber() {
  const queryClient = useQueryClient();

  return useMutation<UpdateMyPhoneNumberResponse, AxiosError, UpdateMyPhoneNumberDto>({
    mutationFn: (payload) => ProfileService.updateMyPhoneNumber(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsQueryKeys.profile() });
    },
  });
}
