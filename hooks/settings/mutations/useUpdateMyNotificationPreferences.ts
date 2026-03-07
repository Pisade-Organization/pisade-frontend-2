import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ProfileService } from "@/services/profile";
import type {
  NotificationPreferences,
  UpdateNotificationPreferencesDto,
} from "@/services/profile/types";
import { settingsQueryKeys } from "../queryKeys";

export function useUpdateMyNotificationPreferences() {
  const queryClient = useQueryClient();

  return useMutation<
    NotificationPreferences,
    AxiosError,
    UpdateNotificationPreferencesDto
  >({
    mutationFn: (payload) => ProfileService.updateMyNotificationPreferences(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.notificationPreferences(),
      });
    },
  });
}
