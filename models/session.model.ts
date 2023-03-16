import { User } from "./user.model";

export interface Session {
  id: string;

  session_token: string;

  user_id: string;

  expires: string;

  user: User;
}
