import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum City {
  B = "benghazi",
  T = "tripoli",
  M = "misrata",
}

@Entity({ name: "warehouses" })
export class Warehouse {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  address_1!: string;

  @Column({ type: "varchar" })
  address_2!: string;

  @Column({ type: "varchar", nullable: false, default: 'istanbul' })
  city!: string;

  @Column({ type: "varchar", default: "Libya" })
  country!: string;

  @Column({ type: "int", nullable: true, default: null })
  phone!: number | null;

  @Column({ type: "varchar" })
  tag!: string;

  @Column({ type: "varchar" })
  status!: string;
}
