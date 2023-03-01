import { WarehouseEntity } from './entities/WarehouseEntity';
import { NotificationConfigEntity } from './entities/NotificationConfigEntity';
import { NotificationEntity } from './entities/NotificationEntity';
import { AddressEntity } from "./entities/AddressEntity";
import { OrderEntity } from "@/lib/adapter/entities/OrderEntity";
import { DataSource } from "typeorm";
import { UserEntity } from "@/lib/adapter/entities/UserEntity";
import { AccountEntity } from "@/lib/adapter/entities/AccountEntity";
import { SessionEntity } from "@/lib/adapter/entities/SessionEntity";
import { VerificationTokenEntity } from "@/lib/adapter/entities/VerificationTokenEntity";
import { TrackingEntity } from "./entities/TrackingEntity";

const connexion = async () => {
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
      WarehouseEntity
    ],
    synchronize: true,
    logging: false,
  });
  try {
    const MazDataSource = await ConnectionDS.initialize();
    
    console.log("Maz data source initialization complete!");
    return MazDataSource;
  } catch (err) {
    console.error("Error during Data Source initialization", err);
    return null;
  } 
};

export const MazDataSource = connexion();
