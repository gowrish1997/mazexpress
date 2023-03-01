import { WarehouseEntity } from "./entities/WarehouseEntity";
import { NotificationConfigEntity } from "./entities/NotificationConfigEntity";
import { NotificationEntity } from "./entities/NotificationEntity";
import { AddressEntity } from "./entities/AddressEntity";
import { DataSource } from "typeorm";
import { TrackingEntity } from "./entities/TrackingEntity";
import { AccountEntity } from "./entities/AccountEntity";
import { OrderEntity } from "./entities/OrderEntity";
import { SessionEntity } from "./entities/SessionEntity";
import { UserEntity } from "./entities/UserEntity";
import { VerificationTokenEntity } from "./entities/VerificationTokenEntity";

const connexion = async () => {
  try {
    const ConnectionDS = new DataSource({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DB,
      entities: [
        UserEntity,
        AccountEntity,
        SessionEntity,
        VerificationTokenEntity,
        AddressEntity,
        OrderEntity,
        TrackingEntity,
        NotificationEntity,
        NotificationConfigEntity,
        WarehouseEntity,
      ],
      synchronize: true,
      logging: false,
    });
    
    console.log("MDS init complete!");
    const MazDataSource = await ConnectionDS.initialize();
    return MazDataSource;
  } catch (err) {
    console.error("Error during Data Source initialization", err);
    return null;
  }
};

export const MazDataSource = connexion();
