import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { transformer } from ".";
import { AccountEntity } from "./Account";
import { SessionEntity } from "./Session";

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

  @Column({ type: "int", width: 9 })
  phone!: number;

  @Column({ type: "enum", enum: UserGender, default: UserGender.UNKNOWN })
  gender!: UserGender;

  @Column({ type: "boolean", default: false })
  is_admin!: boolean;

  @Column({ type: "boolean", default: false })
  is_notifications_enabled!: boolean;

  @Column({ type: "varchar", nullable: true, default: null })
  default_address!: string | null;

  @OneToMany(() => SessionEntity, (session) => session.user_id)
  sessions!: SessionEntity[];

  @OneToMany(() => AccountEntity, (account) => account.user_id)
  accounts!: AccountEntity[];
}
