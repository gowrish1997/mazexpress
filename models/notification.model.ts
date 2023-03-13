import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    ManyToMany,
  } from "typeorm";
  import type { Relation } from "typeorm";
import { User } from "./user.model";
  
  export enum NotificationStatus {
    DL = "deleted",
    RD = "read",
    UN = "unread",
  }
  
  @Entity({ name: "notifications" })
  export class Notification {
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
  
    @ManyToMany(() => User, (user) => user.notifications)
    users!: Relation<User>;
  }
  