import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ProfileService } from "@/services/profile";
import type { NotificationPreferences } from "@/services/profile/types";
import { settingsQueryKeys } from "../queryKeys";

export function useMyNotificationPreferences() {
  return useQuery<NotificationPreferences, AxiosError>({
    queryKey: settingsQueryKeys.notificationPreferences(),
    queryFn: () => ProfileService.getMyNotificationPreferences(),
    retry: 1,
  });
}
