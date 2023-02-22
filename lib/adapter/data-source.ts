import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "@/models/entities/User";
import { AccountEntity } from "@/models/entities/Account";
import { SessionEntity } from "@/models/entities/Session";
import { VerificationTokenEntity } from "@/models/entities/VerificationToken";

const MazDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
  entities: [UserEntity, AccountEntity, SessionEntity, VerificationTokenEntity],
  synchronize: true,
  logging: false,
});

MazDataSource.initialize()
  .then(() => {
    console.log("Maz Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Maz Data Source initialization ", err);
  });

export { MazDataSource };
