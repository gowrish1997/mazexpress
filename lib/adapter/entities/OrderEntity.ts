import { AddressEntity } from './AddressEntity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import type { Relation } from "typeorm";
import { transformer } from "../transformer";
import { UserEntity } from "./UserEntity";

@Entity({ name: "orders" })
export class OrderEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  user_id!: string;

  @Column({ type: "uuid" })
  address_id!: string;

  @Column({ type: "uuid" })
  reference_id!: string;

  @Column({ type: "int", nullable: true, default: null })
  shipping_amt!: number;

  @Column({ type: "varchar", nullable: true, default: null })
  created_on!: string;

  @Column({ type: "varchar", nullable: true, default: null })
  shipped_on!: string;

  @Column({ type: "varchar", nullable: true, default: null })
  delivered_on!: string;

  @Column({ type: "varchar", nullable: true, default: null })
  received_on!: string | null;

  @Column({ type: "enum", default: "pending" })
  status!: string | null;

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
