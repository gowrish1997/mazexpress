import { AddressEntity } from "@/lib/adapter/entities/AddressEntity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import { UserEntity } from "@/lib/adapter/entities/UserEntity";

export enum OrderStatus {
  I = "in-transit",
  D = "delivered",
  A = "at-warehouse",
  P = "pending",
}

@Entity({ name: "orders" })
export class OrderEntity {
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

  @ManyToOne(() => UserEntity, (user) => user.orders, {
    createForeignKeyConstraints: true,
  })
  user!: Relation<UserEntity>;

  @ManyToOne(() => AddressEntity, (address) => address.orders, {
    createForeignKeyConstraints: true,
  })
  address!: Relation<AddressEntity>;
}
