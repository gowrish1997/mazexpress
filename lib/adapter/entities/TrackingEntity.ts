import { OrderEntity } from "@/lib/adapter/entities/OrderEntity";
import { UserEntity } from "@/lib/adapter/entities/UserEntity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import type { Relation } from "typeorm";

@Entity({ name: "tracking" })
export class TrackingEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "int" })
  stage!: number;

  @CreateDateColumn()
  created_on!: Date;

  @ManyToOne(() => UserEntity, (user) => user.tracking, {
    createForeignKeyConstraints: true,
    eager: true
  })
  user!: Relation<UserEntity>;

  @ManyToOne(() => OrderEntity, (order) => order.tracking, {
    createForeignKeyConstraints: true,
    eager: true
  })
  order!: Relation<OrderEntity>;
}
