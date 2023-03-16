export interface NotificationConfig {
  id: string;

  created_on: Date;

  title: string;

  desc: string;

  is_enabled: boolean;

  is_custom: boolean;

  is_reusable: boolean;
}
