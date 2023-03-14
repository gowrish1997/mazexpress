import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from "typeorm";
import type { Relation } from "typeorm";
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

@Entity({ name: "addresses" })
export class Address extends BaseEntity {
  constructor(address: Partial<Address>) {
    super();
    Object.assign(this, address);
  }

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  address_1!: string;

  @Column({ type: "varchar" })
  address_2!: string;

  @Column({ type: "enum", enum: City, default: City.T })
  city!: string;

  @Column({ type: "varchar", default: "Libya" })
  country!: string;

  @Column({ type: "int", nullable: true, default: null })
  phone!: number | null;

  @Column({ type: "varchar" })
  tag!: string;

  @Column({ type: "enum", enum: AddressStatus, default: AddressStatus.A })
  status!: string;

  @ManyToOne(() => User, (user) => user.addresses, {
    createForeignKeyConstraints: true,
  })
  user!: Relation<User>;

  @OneToMany(() => Order, (order) => order.address)
  orders!: Order[];
}
