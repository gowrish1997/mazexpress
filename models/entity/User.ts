// author: raunak

import { Notification } from "./Notification";
import { Account } from "./Account";
import { BaseEntity, BeforeInsert, CreateDateColumn, Index, ManyToMany } from "typeorm";
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { transformer } from "../../lib/entity-helper";
import { Address } from "./Address";
import { Order } from "./Order";
import { Session } from "./Session";
import { Tracking } from "./Tracking";
import { hashSync } from 'bcrypt'
import { Exclude, instanceToPlain } from 'class-transformer'

export enum UserGender {
    MALE = "m",
    FEMALE = "f",
    OTHER = "o",
    UNKNOWN = "u",
}

@Entity({ name: "users" })
export class User extends BaseEntity {

    constructor(user: Partial<User>) {
        super()
        Object.assign(this, user)
    }

    // @Exclude()
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @CreateDateColumn()
    created_on!: Date;

    @Column({ type: "varchar" })
    first_name!: string;

    @Column({ type: "varchar" })
    last_name!: string;

    @Index()
    @Column({ type: "varchar", unique: true })
    email!: string;

    @Column({ type: "varchar", nullable: true, transformer: transformer.date })
    email_verified!: string | null;

    // @Exclude()
    @Column({ type: "varchar" })
    password!: string;

    @Column({ type: "varchar", default: "default_user.png" })
    avatar_url!: string;

    @Column({ type: "int", nullable: true, default: null, width: 3 })
    age!: string | null;

    @Column({ type: "int", width: 9, nullable: true, default: null })
    phone!: number;

    @Column({ type: "enum", enum: UserGender, default: UserGender.UNKNOWN })
    gender!: UserGender;

    @Column({ type: "boolean", default: false })
    is_admin!: boolean;

    @Column({ type: "boolean", default: true })
    is_notifications_enabled!: boolean;

    @Column({ type: "varchar", nullable: true, default: null })
    default_address!: string | null;

    @OneToMany(() => Session, (session) => session.user)
    sessions!: Session[];

    @OneToMany(() => Account, (account) => account.user)
    accounts!: Account[];

    @OneToMany(() => Address, (address) => address.user)
    addresses!: Address[];

    @OneToMany(() => Order, (order) => order.user)
    orders!: Order[];

    @OneToMany(() => Tracking, (tracking) => tracking.user)
    tracking!: Tracking[];

    @ManyToMany(() => Notification, (notification) => notification.users)
    notifications!: Notification[];

}
