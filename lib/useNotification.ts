import { INotification } from "@/models/notification.interface";
import useSWR from "swr";

export default function useNotification({ id }: { id: number }) {
  const {
    data: notification,
    mutate: mutateNotification,
    isLoading: notificationIsLoading,
    error: notificationError
  } = useSWR<INotification>(`/api/notifications?id=${id}`, {
    refreshInterval: 1000,
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return { notification, mutateNotification, notificationIsLoading, notificationError };
}
