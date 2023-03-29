//==========================
//     written by: raunak
//==========================

import { Address } from "./address.model";
import { Notification } from "./notification.model";
import { Account } from "./account.model";
import { Order } from "./order.model";
import { Session } from "./session.model";
import { Tracking } from "./tracking.model";

export enum UserGender {
  MALE = "m",
  FEMALE = "f",
  OTHER = "o",
  UNKNOWN = "u",
}

export enum UserTongue {
  E = "english",
  A = "arabic"
}

export interface User {

  id: string;

  created_on: Date;

  updated_on: Date;

  first_name: string;

  last_name: string;

  email: string;

  email_verified: string | null;

  password: string;

  avatar_url: string;

  age: string | null;

  phone: number;

  gender: UserGender;

  is_admin: boolean;

  is_notifications_enabled: boolean;

  default_address: string | null;

  sessions: Session[];

  accounts: Account[];

  addresses: Address[];

  orders: Order[];

  tracking: Tracking[];

  notifications: Notification[];

  lang: UserTongue;
}

 
