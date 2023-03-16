//==========================
//     written by: raunak
//==========================

import { User } from "./user.model";
import { Order } from "./order.model";

export interface Tracking {
  id: string;

  stage: number;

  created_on: Date;

  user: User;

  order: Order;
}
