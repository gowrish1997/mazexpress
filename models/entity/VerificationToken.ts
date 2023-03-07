import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import { transformer } from "../lib/entity-helper";

@Entity({ name: "verification_tokens" })
export class VerificationToken {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  token!: string;

  @Column({ type: "varchar" })
  identifier!: string;

  @Column({ type: "varchar", transformer: transformer.date })
  expires!: string;
}