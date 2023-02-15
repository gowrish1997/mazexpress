import { INotificationConfig } from '@/models/notification.interface';
import useSWR from "swr";

export default function useNotificationSettings() {
  const {
    data: notificationSettings,
    mutate: mutateNotificationSettings,
    isLoading: notificationSettingsIsLoading,
  } = useSWR<INotificationConfig[]>(`/api/notification-settings`, {
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

  return {
    notificationSettings,
    mutateNotificationSettings,
    notificationSettingsIsLoading,
  };
}
