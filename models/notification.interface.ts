interface INotification {
  id_notifications?: number;
  user_id: number;
  title_notifications: string;
  content_notifications: string;
  created_on_notifications: string;
  read_on_notifications: string;
  status_notifications: 'read' | 'unread' | 'deleted';
}

interface INotificationConfig {
  title_notification_config: string;
  desc_notification_config: string;
  id_notification_config: number;
  is_enabled_notification_config: boolean | 0 | 1;
  is_custom_notification_config: boolean | 0 | 1
  is_reusable_notification_config: boolean | 0 | 1
}

interface INotificationForm {
  title_notifications: string;
  content_notifications: string;
  users_notifications: string[]
  reusable_notifications: 'on' | 'off'
  files_notifications?: any
}

export type { INotification, INotificationConfig, INotificationForm };
