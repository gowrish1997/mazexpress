import { APIResponse } from "@/models/api.model";
import useSWR from "swr";
import { Notification } from "@/models/notification.model";

export default function useNotification({ id }: { id: string }) {
  const {
    data: notification,
    mutate: mutateNotification,
    isLoading: notificationIsLoading,
    error: notificationError,
  } = useSWR<APIResponse<Notification>>(`/api/notifications?id=${id}`, {
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
