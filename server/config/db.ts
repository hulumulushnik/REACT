import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "lms_db",
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
