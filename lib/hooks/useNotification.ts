import { NotificationEntity } from "./../adapter/entities/NotificationEntity";
import useSWR from "swr";

export default function useNotification({ id }: { id: string }) {
  const {
    data: notification,
    mutate: mutateNotification,
    isLoading: notificationIsLoading,
    error: notificationError,
  } = useSWR<NotificationEntity>(`/api/notifications?id=${id}`, {
    // refreshInterval: 1000,
    // revalidateIfStale: true,
    // revalidateOnFocus: true,
    // revalidateOnReconnect: true,
  });

  return {
    notification,
    mutateNotification,
    notificationIsLoading,
    notificationError,
  };
}
