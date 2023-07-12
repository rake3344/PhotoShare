import { createPool } from "mysql2/promise";
import { config } from "dotenv";
config();

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  database: process.env.DB,
  port: Number(process.env.DB_PORT),
});

export default pool;
