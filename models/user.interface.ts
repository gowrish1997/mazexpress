interface IUser {
  avatar_url_users: string;
  email_users: string;
  first_name_users: string;
  last_name_users: string;
  phone_users: string;
  password_users?: string;
  id_users: number;
  default_address_users?: number;
  is_admin_users: 0 | 1;
  is_logged_in_users: 0 | 1;
  is_notifications_enabled_users: boolean | 0 | 1;
}
interface ISignUp {
  first_name_users: string;
  last_name_users: string;
  email_users: string;
  phone_users: number;
  password_users: string;
  confirmPassword_users: string;
}
// type RemoveKindField<Type> = {
//     [Property in keyof Type as Exclude<Property,[ "isAdmin","id_users","default_address_users"]>]: Type[Property];
// };

// type TUserProfile = ISignUp & {
//     avatarURL_users: string;
//     notification_users: string;
//     language_users: string;
// };
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
