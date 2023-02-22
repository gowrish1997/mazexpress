import { transformer } from './index';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    ValueTransformer,
  } from "typeorm";

@Entity({ name: "verification_tokens" })
export class VerificationTokenEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  token!: string;

  @Column({ type: "varchar" })
  identifier!: string;

  @Column({ type: "varchar", transformer: transformer.date })
  expires!: string;
}