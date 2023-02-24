import { OrderEntity } from './entities/OrderEntity';
import { DataSource } from "typeorm";
import { UserEntity } from "@/lib/adapter/entities/UserEntity";
import { AccountEntity } from "@/lib/adapter/entities/AccountEntity";
import { SessionEntity } from "@/lib/adapter/entities/SessionEntity";
import { VerificationTokenEntity } from "@/lib/adapter/entities/VerificationTokenEntity";

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
      OrderEntity
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
