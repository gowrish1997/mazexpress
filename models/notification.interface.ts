interface INotification {
  id_notifications: number;
  user_id: number;
  title_notifications: string;
  content_notifications: string;
  created_on_notifications: string;
  read_on_notifications: string;
  status_notifications: 'read' | 'unread' | 'deleted';
}

export type { INotification };
