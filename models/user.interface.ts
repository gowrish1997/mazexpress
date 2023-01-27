interface IUser {

  avatar_url_users: string;
  email_users: string;
  first_name_users: string;
  last_name_users: string;
  phone_users: string;
  password_users: string;
  isAdmin: 0 | 1;
  id_users: number | null;
  default_address_users: number;
}

export type { IUser };
