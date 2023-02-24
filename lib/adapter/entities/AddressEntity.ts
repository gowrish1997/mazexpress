import { OrderEntity } from "./OrderEntity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import type { Relation } from "typeorm";
import { transformer } from "../transformer";
import { UserEntity } from "./UserEntity";
import { OneToOne } from "typeorm/decorator/relations/OneToOne";
import { OneToMany } from "typeorm/decorator/relations/OneToMany";

@Entity({ name: "addresses" })
export class AddressEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  user_id!: string;

  @Column({ type: "varchar" })
  address_1!: string;

  @Column({ type: "varchar" })
  address_2!: string;

  @Column({ type: "enum" })
  city!: string;

  @Column({ type: "varchar", default: "Libya" })
  country!: string;

  @Column({ type: "int", nullable: true, default: null })
  phone!: number | null;

  @Column({ type: "varchar" })
  tag!: string;

  @ManyToOne(() => UserEntity, (user) => user.addresses, {
    createForeignKeyConstraints: true,
  })
  user!: Relation<UserEntity>;

  @OneToMany(() => OrderEntity, (order) => order.address_id, {
    createForeignKeyConstraints: true,
  })
  orders!: Relation<OrderEntity>;
}
