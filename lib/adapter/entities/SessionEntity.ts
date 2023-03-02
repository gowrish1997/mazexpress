import { transformer } from "../transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type {
  Relation,
} from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity({ name: "sessions" })
export class SessionEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  session_token!: string;

  @Column({ type: "uuid" })
  user_id!: string;

  @Column({ type: "varchar", transformer: transformer.date })
  expires!: string;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  user!: Relation<UserEntity>;
}
