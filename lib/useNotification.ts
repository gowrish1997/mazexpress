import { INotification } from "@/models/notification.interface";
import useSWR from "swr";

export default function useNotification({ id }: { id: number }) {
  const {
    data: notification,
    mutate: mutateNotification,
    isLoading: notificationIsLoading,
  } = useSWR<INotification>(`/api/notifications?id=${id}`);

  return { notification, mutateNotification, notificationIsLoading };
}
