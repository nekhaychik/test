import { DataSource } from "typeorm";
import { config } from "dotenv";
import {
  Address,
  Block,
  Log,
  TokenTransfer,
  Token,
  Transaction,
} from "./src/model";

config();

export default new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "user",
  password: "mysecretpassword",
  database: "test_db",
  entities: [Address, Block, Log, TokenTransfer, Token, Transaction],
  migrations: ["migrations/*.ts"],
  synchronize: true,
  migrationsRun: true,
});
