interface INotification {
  id_notifications: number;
  user_id: number;
  title_notifications: string;
  content_notifications: string;
  created_on_notifications: string;
  read_on_notifications: string;
  status_notifications: 'read' | 'unread' | 'deleted';
}

interface INotificationConfig {
  title: string;
  is_enabled: boolean;
  desc: string;
  id: string;
}

export type { INotification, INotificationConfig };
