import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ProfileService } from "@/services/profile";
import type { MyNotificationsResponse } from "@/services/profile/types";
import { settingsQueryKeys } from "../queryKeys";

export function useMyNotifications() {
  return useQuery<MyNotificationsResponse, AxiosError>({
    queryKey: settingsQueryKeys.notifications(),
    queryFn: () => ProfileService.getMyNotifications(),
    retry: 1,
  });
}
