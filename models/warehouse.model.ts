import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

export enum City {
  I = "istanbul",
}

export enum WarehouseStatus {
  A = "active",
  I = "inactive",
}

@Entity({ name: "warehouses" })
export class Warehouse extends BaseEntity {
  constructor(warehouse: Partial<Warehouse>) {
    super();
    Object.assign(this, warehouse);
  }

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  address_1!: string;

  @Column({ type: "varchar" })
  address_2!: string;

  @Column({ type: "enum", nullable: false, default: City.I, enum: City })
  city!: string;

  @Column({ type: "varchar", default: "Turkey" })
  country!: string;

  @Column({ type: "int", nullable: true, default: null })
  phone!: number | null;

  @Column({ type: "varchar" })
  tag!: string;

  @Column({ type: "enum", default: WarehouseStatus.A, enum: WarehouseStatus })
  status!: string;
}
