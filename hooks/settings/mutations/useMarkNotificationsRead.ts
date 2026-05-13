import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ProfileService } from "@/services/profile"
import { settingsQueryKeys } from "../queryKeys"

export function useMarkNotificationRead() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: (id) => ProfileService.updateNotificationStatus(id, true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsQueryKeys.notifications() })
    },
  })
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string[]>({
    mutationFn: async (ids) => {
      await Promise.all(ids.map((id) => ProfileService.updateNotificationStatus(id, true)))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsQueryKeys.notifications() })
    },
  })
}
