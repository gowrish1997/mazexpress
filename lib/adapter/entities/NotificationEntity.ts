import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, ManyToMany } from "typeorm";
import type { Relation } from "typeorm";
import { transformer } from "../transformer";
import { UserEntity } from "@/lib/adapter/entities/UserEntity";

export enum NotificationStatus {
  DL = "deleted",
  RD = "read",
  UN = "unread",
}

@Entity({ name: "notifications" })
export class NotificationEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  content!: string;

  @CreateDateColumn()
  created_on!: Date;

  @Column({
    type: "enum",
    enum: NotificationStatus,
    default: NotificationStatus.UN,
  })
  status!: string;

  @Column({ type: "timestamp", nullable: true, default: null })
  read_on!: string;

  @Column({ type: "varchar" })
  title!: string;

  @ManyToMany(() => UserEntity, (user) => user.notifications)
  users!: Relation<UserEntity>;
}
