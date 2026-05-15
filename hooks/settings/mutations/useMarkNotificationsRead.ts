import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ProfileService } from "@/services/profile"
import type { MyNotificationsResponse } from "@/services/profile/types"
import { settingsQueryKeys } from "../queryKeys"

interface NotificationsMutationContext {
  previousNotifications?: MyNotificationsResponse
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string, NotificationsMutationContext>({
    mutationFn: (id) => ProfileService.updateNotificationStatus(id, true),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: settingsQueryKeys.notifications() })

      const previousNotifications = queryClient.getQueryData<MyNotificationsResponse>(
        settingsQueryKeys.notifications(),
      )

      if (previousNotifications) {
        queryClient.setQueryData<MyNotificationsResponse>(
          settingsQueryKeys.notifications(),
          {
            ...previousNotifications,
            unreadCount: Math.max(
              0,
              previousNotifications.unreadCount -
                (previousNotifications.notifications.some((notification) => notification.id === id && !notification.read) ? 1 : 0),
            ),
            notifications: previousNotifications.notifications.map((notification) =>
              notification.id === id ? { ...notification, read: true, readAt: notification.readAt ?? new Date().toISOString() } : notification,
            ),
          },
        )
      }

      return { previousNotifications }
    },
    onError: (_error, _id, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(settingsQueryKeys.notifications(), context.previousNotifications)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsQueryKeys.notifications() })
    },
  })
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string[], NotificationsMutationContext>({
    mutationFn: async (ids) => {
      await Promise.all(ids.map((id) => ProfileService.updateNotificationStatus(id, true)))
    },
    onMutate: async (ids) => {
      await queryClient.cancelQueries({ queryKey: settingsQueryKeys.notifications() })

      const previousNotifications = queryClient.getQueryData<MyNotificationsResponse>(
        settingsQueryKeys.notifications(),
      )

      if (previousNotifications) {
        const idsToMarkRead = new Set(ids)
        queryClient.setQueryData<MyNotificationsResponse>(
          settingsQueryKeys.notifications(),
          {
            ...previousNotifications,
            unreadCount: 0,
            notifications: previousNotifications.notifications.map((notification) =>
              idsToMarkRead.has(notification.id)
                ? { ...notification, read: true, readAt: notification.readAt ?? new Date().toISOString() }
                : notification,
            ),
          },
        )
      }

      return { previousNotifications }
    },
    onError: (_error, _ids, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(settingsQueryKeys.notifications(), context.previousNotifications)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsQueryKeys.notifications() })
    },
  })
}
