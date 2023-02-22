interface IUser {
  avatar_url_users: string;
  email_users: string;
  first_name_users: string;
  last_name_users: string;
  phone_users: string;
  password_users?: string;
  id_users: string;
  default_address_users?: string;
  is_admin_users: boolean;
  // is_logged_in_users: boolean;
  is_notifications_enabled_users: boolean;
  age_users: string,
  gender_users: string,
  created_on_users: string
}

interface ISignUp {
    first_name_users: string;
    last_name_users: string;
    email_users: string;
    phone_users: number;
    password_users: string;
    confirmPassword_users: string;
    age_users: string;
    gender_users: string;
}

interface IUserProfile {
    id_users?: number;

    avatar_url_users: string;
    email_users: string;
    first_name_users: string;
    last_name_users: string;
    phone_users: string;
    password_users?: string;
    newPassword_users?: string;
    is_notifications_enabled_users: boolean | 0 | 1;
    default_language_users?: string;
}

export type { IUser, ISignUp, IUserProfile };
