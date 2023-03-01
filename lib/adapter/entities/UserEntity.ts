import { NotificationEntity } from "./NotificationEntity";
import { OrderEntity } from "@/lib/adapter/entities/OrderEntity";
import { SessionEntity } from "@/lib/adapter/entities/SessionEntity";
import { AccountEntity } from "./AccountEntity";
import { AddressEntity } from "./AddressEntity";
import { CreateDateColumn, ManyToMany, Relation } from "typeorm";
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { transformer } from "../transformer";
import { TrackingEntity } from "./TrackingEntity";

export enum UserGender {
  MALE = "m",
  FEMALE = "f",
  OTHER = "o",
  UNKNOWN = "u",
}

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  first_name!: string;

  @CreateDateColumn()
  created_on!: Date;

  @Column({ type: "varchar" })
  last_name!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar", nullable: true, transformer: transformer.date })
  email_verified!: string | null;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "varchar", default: "default_user.png" })
  avatar_url!: string;

  @Column({ type: "int", nullable: true, default: null, width: 3 })
  age!: string | null;

  @Column({ type: "int", width: 9, nullable: true, default: null })
  phone!: number;

  @Column({ type: "enum", enum: UserGender, default: UserGender.UNKNOWN })
  gender!: UserGender;

  @Column({ type: "boolean", default: false })
  is_admin!: boolean;

  @Column({ type: "boolean", default: true })
  is_notifications_enabled!: boolean;

  @Column({ type: "varchar", nullable: true, default: null })
  default_address!: string | null;

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions!: SessionEntity[];

  @OneToMany(() => AccountEntity, (account) => account.user)
  accounts!: AccountEntity[];

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses!: AddressEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders!: OrderEntity[];

  @OneToMany(() => TrackingEntity, (tracking) => tracking.user)
  tracking!: TrackingEntity[];

  @ManyToMany(() => NotificationEntity, (notification) => notification.users)
  notifications!: NotificationEntity[];
}
