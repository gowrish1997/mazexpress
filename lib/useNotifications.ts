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
    // mutate: mutateUser,
    isLoading: notificationsIsLoading,
  } = useSWR<INotification[]>(`/api/notifications?user=${userId}`);

  return { notifications, notificationsIsLoading };
}
