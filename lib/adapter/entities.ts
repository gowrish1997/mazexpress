import { entities } from "@next-auth/typeorm-legacy-adapter";
import * as typeorm from "typeorm";
import { Address } from "./entity/Address";
import { Order } from "./entity/Order";
import { Tracking } from "./entity/Tracking";

const transformer: Record<"date" | "bigint", typeorm.ValueTransformer> = {
  date: {
    from: (date: string | null) => date && new Date(parseInt(date, 10)),
    to: (date?: Date) => date?.valueOf().toString(),
  },
  bigint: {
    from: (bigInt: string | null) => bigInt && parseInt(bigInt, 10),
    to: (bigInt?: number) => bigInt?.toString(),
  },
};

enum UserGender {
  MALE = "m",
  FEMALE = "f",
  OTHER = "o",
  UNKNOWN = "u",
}

@typeorm.Entity({ name: "users" })
export class UserEntity extends entities.UserEntity {
  constructor(user: Partial<UserEntity>) {
    super();
    Object.assign(this, user);
  }

  @typeorm.CreateDateColumn()
  created_on!: Date;

  @typeorm.Column({ type: "varchar" })
  first_name!: string;

  @typeorm.Column({ type: "varchar" })
  last_name!: string;

  @typeorm.Column({ type: "varchar" })
  password!: string;

  @typeorm.Column({ type: "varchar", default: "default_user.png" })
  avatar_url!: string;

  @typeorm.Column({ type: "int", nullable: true, default: null, width: 3 })
  age!: string | null;

  @typeorm.Column({ type: "int", width: 9, nullable: true, default: null })
  phone!: number;

  @typeorm.Column({
    type: "enum",
    enum: UserGender,
    default: UserGender.UNKNOWN,
  })
  gender!: UserGender;

  @typeorm.Column({ type: "boolean", default: false })
  is_admin!: boolean;

  @typeorm.Column({ type: "boolean", default: true })
  is_notifications_enabled!: boolean;

  @typeorm.Column({ type: "varchar", nullable: true, default: null })
  default_address!: string | null;

  @typeorm.OneToMany(() => Address, (address) => address.user)
  addresses!: Address[];

  @typeorm.OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @typeorm.OneToMany(() => Tracking, (tracking) => tracking.user)
  tracking!: Tracking[];

  @typeorm.ManyToMany(() => NotificationEntity, (notification) => notification.users)
  notifications!: NotificationEntity[];

  @typeorm.BeforeInsert()
  separateNames() {
    if (this.name && this.name !== null) {
      let names = this.name?.split(" ");
      this.first_name = names[0];
      this.last_name = names[1];
    }
  }
}

@typeorm.Entity({ name: "accounts" })
export class AccountEntity extends entities.AccountEntity {
  @typeorm.CreateDateColumn()
  created_on!: Date;
}

@typeorm.Entity({ name: "sessions" })
export class SessionEntity extends entities.SessionEntity {}

@typeorm.Entity({ name: "verification_tokens" })
export class VerificationTokenEntity extends entities.VerificationTokenEntity {}

enum NotificationStatus {
  DL = "deleted",
  RD = "read",
  UN = "unread",
}

@typeorm.Entity({ name: "notifications" })
export class NotificationEntity {
  @typeorm.PrimaryGeneratedColumn("uuid")
  id!: string;

  @typeorm.Column({ type: "varchar" })
  content!: string;

  @typeorm.CreateDateColumn()
  created_on!: Date;

  @typeorm.Column({
    type: "enum",
    enum: NotificationStatus,
    default: NotificationStatus.UN,
  })
  status!: string;

  @typeorm.Column({ type: "timestamp", nullable: true, default: null })
  read_on!: string;

  @typeorm.Column({ type: "varchar" })
  title!: string;

  @typeorm.ManyToMany(() => UserEntity, (user) => user.notifications)
  users!: typeorm.Relation<UserEntity>;
}
