import { OrderEntity } from '@/lib/adapter/entities/OrderEntity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import type { Relation } from "typeorm";
import { UserEntity } from './UserEntity';

export enum City {
  B = "benghazi",
  T = "tripoli",
  M = "misrata",
}

@Entity({ name: "warehouses" })
export class WarehouseEntity {
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
}
