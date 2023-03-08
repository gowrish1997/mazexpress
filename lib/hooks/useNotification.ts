import { APIResponse } from "@/models/api.model";
import { Notification } from "@/models/entity/Notification";
import useSWR from "swr";

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
