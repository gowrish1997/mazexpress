import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "notification_config" })
export class NotificationConfig {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  
  @CreateDateColumn()
  created_on!: Date;

  @Column({ type: "varchar" })
  title!: string;

  @Column({ type: "varchar" })
  desc!: string;

  @Column({ type: "boolean", default: false })
  is_enabled!: boolean;

  @Column({ type: "boolean", default: false })
  is_custom!: boolean;

  @Column({ type: "boolean", default: false })
  is_reusable!: boolean;

}
