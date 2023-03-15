//==========================
//     written by: raunak
//==========================

import {
  BaseEntity,
  BeforeInsert,
  CreateDateColumn,
  Index,
  ManyToMany,
} from "typeorm";
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { transformer } from "../lib/entity-helper";
import { Address } from "./address.model";
import { Notification } from "./notification.model";
import { hashSync } from "bcrypt";
import { Exclude, instanceToPlain } from "class-transformer";
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
  // constructor(user?: Partial<User>) {
  //   // super();
  //   if(user){

  //     Object.assign(this, user);
  //   }
  // }

  id: string;

  created_on: Date;

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

 
