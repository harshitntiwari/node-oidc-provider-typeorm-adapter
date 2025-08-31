import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const dataSourceOptions: DataSourceOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [__dirname + `/entities/*.js`],
  migrations: [__dirname + `/migrations/*.js`],
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

export default new DataSource(dataSourceOptions);
