import { INotification } from "@/models/notification.interface";
import useSWR from "swr";

export default function useNotifications({
  userId,
  id,
}: {
  userId: number;
  id?: number;
}) {
  //   if (!userId && !id) return [];
  const {
    data: notifications,
    mutate: mutateNotifications,
    isLoading: notificationsIsLoading,
  } = useSWR<INotification[]>(`/api/notifications?user=${userId}`, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Never retry on 404.
      // if (error.status === 404) return;

      // Never retry for a specific key.
      // if (key === "/api/user") return;

      // Only retry up to 10 times.
      if (retryCount >= 3) return;

      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
    refreshInterval: 1000,
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return { notifications, mutateNotifications, notificationsIsLoading };
}
