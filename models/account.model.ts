//==========================
//     written by: raunak
//==========================

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import { transformer } from "../lib/entity-helper";
import { User } from "./user.model";

@Entity({ name: "accounts" })
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  created_on!: Date;

  @Column({ type: "varchar" })
  type!: string;

  @Column({ type: "varchar" })
  provider!: string;

  @Column({ type: "varchar" })
  provider_account_id!: string;

  @Column({ type: "varchar", nullable: true })
  refresh_token!: string | null;

  @Column({ type: "varchar", nullable: true })
  access_token!: string | null;

  @Column({
    nullable: true,
    type: "bigint",
    transformer: transformer.bigint,
  })
  expires_at!: number | null;

  @Column({ type: "varchar", nullable: true })
  token_type!: string | null;

  @Column({ type: "varchar", nullable: true })
  scope!: string | null;

  @Column({ type: "varchar", nullable: true })
  id_token!: string | null;

  @Column({ type: "varchar", nullable: true })
  session_state!: string | null;

  @Column({ type: "varchar", nullable: true })
  oauth_token_secret!: string | null;

  @Column({ type: "varchar", nullable: true })
  oauth_token!: string | null;

  @ManyToOne(() => User, (user) => user.accounts, {
    createForeignKeyConstraints: true,
  })
  user!: Relation<User>;
}
