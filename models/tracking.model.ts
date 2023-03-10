//==========================
//     written by: raunak
//==========================

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import { User } from "./user.model";
import { Order } from "./order.model";

@Entity({ name: "tracking" })
export class Tracking {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "int" })
  stage!: number;

  @CreateDateColumn()
  created_on!: Date;

  @ManyToOne(() => User, (user) => user.tracking, {
    createForeignKeyConstraints: true,
    eager: true,
  })
  user!: Relation<User>;

  @ManyToOne(() => Order, (order) => order.tracking, {
    createForeignKeyConstraints: true,
    eager: true,
  })
  order!: Relation<Order>;
}
