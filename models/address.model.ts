import { User } from "./user.model";
import { Order } from "./order.model";

export enum City {
  B = "benghazi",
  T = "tripoli",
  M = "misrata",
}

export enum AddressStatus {
  I = "inactive",
  A = "active",
}

export interface Address {
  id: string;

  address_1: string;

  address_2: string;

  city: string;

  country: string;

  phone: number | null | string;

  tag: string;

  status: string;

  user: User;

  orders: Order[];
}
