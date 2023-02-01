import { INotification } from "@/models/notification.interface";
import useSWR from "swr";

export default function useNotifications({ userId, id }: { userId: number; id?: number }) {
    //   if (!userId && !id) return [];
    const {
        data: notifications,
        mutate: mutateNotification,
        isLoading: notificationsIsLoading,
    } = useSWR<INotification[]>(`/api/notifications?user=${userId}&id=${id}`, { refreshInterval:1000});

    return { notifications, mutateNotification, notificationsIsLoading };
}
