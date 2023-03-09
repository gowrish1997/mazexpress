import { Entity } from "typeorm";
import {entities} from "@next-auth/typeorm-legacy-adapter";

@Entity({ name: "sessions" })
export class SessionEntity extends entities.SessionEntity {
  // @PrimaryGeneratedColumn("uuid")
  // id!: string;
  // @Column({ type: "varchar", unique: true })
  // session_token!: string;
  // @Column({ type: "uuid" })
  // user_id!: string;
  // @Column({ type: "varchar", transformer: transformer.date })
  // expires!: string;
  // @ManyToOne(() => User, (user) => user.sessions)
  // user!: Relation<User>;
}
