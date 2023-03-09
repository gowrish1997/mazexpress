import type { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";
import { AccountEntity } from "./entity/Account";
import { Address } from "./entity/Address";
import { Notification } from "./entity/Notification";
import { NotificationConfig } from "./entity/NotificationConfig";
import { Order } from "./entity/Order";
import { SessionEntity } from "./entity/Session";
import { Tracking } from "./entity/Tracking";
import { UserEntity } from "./entity/User";
import { VerificationTokenEntity } from "./entity/VerificationToken";
import { Warehouse } from "./entity/Warehouse";

export const dataSourceOptions: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
  synchronize: true,
  logging: false,
  entities: [
    UserEntity,
    // AccountEntity,
    // SessionEntity,
    // Warehouse,
    // VerificationTokenEntity,
    // Notification,
    // NotificationConfig,
    // Address,
    // Order,
    // Tracking,
  ],
};
