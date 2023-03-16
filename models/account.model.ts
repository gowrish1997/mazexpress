//==========================
//     written by: raunak
//==========================

import { User } from "./user.model";

export interface Account {
  id: string;
  created_on: Date;
  type: string;
  provider: string;
  provider_account_id: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
  oauth_token_secret: string | null;
  oauth_token: string | null;
  user: User;
}
