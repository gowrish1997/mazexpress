import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import type { Relation } from "typeorm";
import { User } from "./User";
import { Address } from "./Address";
import { Tracking } from "./Tracking";

export enum OrderStatus {
  I = "in-transit",
  D = "delivered",
  A = "at-warehouse",
  P = "pending",
}

@Entity({ name: "orders" })
export class Order extends BaseEntity {

  constructor(user: Partial<User>) {
    super()
    Object.assign(this, user)
  }

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  maz_id!: string;

  @Column({ type: "uuid" })
  reference_id!: string;

  @Column({ type: "int", nullable: true, default: null })
  shipping_amt!: number;

  @CreateDateColumn()
  created_on!: Date;

  @Column({ type: "timestamp", nullable: true, default: null })
  shipped_on!: Date;

  @Column({ type: "timestamp", nullable: true, default: null })
  delivered_on!: Date;

  @Column({ type: "timestamp", nullable: true, default: null })
  received_on!: Date;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.P })
  status!: string;

  @Column({ type: "varchar" })
  store_link!: string;

  @ManyToOne(() => User, (user) => user.orders, {
    createForeignKeyConstraints: true,
    eager: true
  })
  user!: Relation<User>;

  @ManyToOne(() => Address, (address) => address.orders, {
    createForeignKeyConstraints: true,
    eager: true
  })
  address!: Relation<Address>;

  @OneToMany(() => Tracking, (tracking) => tracking.order)
  tracking!: Tracking[];
}
