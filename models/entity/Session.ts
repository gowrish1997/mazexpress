import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type {
  Relation,
} from "typeorm";
import { transformer } from "../../lib/entity-helper";
import { User } from "./User";

@Entity({ name: "sessions" })
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  session_token!: string;

  @Column({ type: "uuid" })
  user_id!: string;

  @Column({ type: "varchar", transformer: transformer.date })
  expires!: string;

  @ManyToOne(() => User, (user) => user.sessions)
  user!: Relation<User>;
}
