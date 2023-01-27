interface IUser {
  isLoggedIn: boolean;
  avatarUrl: string;
  email: string;
  username: string;
  isAdmin: boolean;
  id: number;
  default_address_users: number;
}

export type { IUser };
