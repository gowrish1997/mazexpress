import { Entity } from "typeorm";
import { entities } from "@next-auth/typeorm-legacy-adapter";

@Entity({ name: "verification_tokens" })
export class VerificationTokenEntity extends entities.VerificationTokenEntity {
  // @PrimaryGeneratedColumn("uuid")
  // id!: string;
  // @Column({ type: "varchar" })
  // token!: string;
  // @Column({ type: "varchar" })
  // identifier!: string;
  // @Column({ type: "varchar", transformer: transformer.date })
  // expires!: string;
}
