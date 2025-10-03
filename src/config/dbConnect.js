import { config } from "dotenv";
import mysql from "mysql2/promise"
config();

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_NAME = process.env.DB_NAME
const DB_PASS = process.env.DB_PASSWORD
const DB_PORT = process.env.DB_PORT

if (!DB_HOST || !DB_USER || !DB_NAME || !DB_PASS || !DB_PORT) {
  console.log("DB CREDENTIALS NOT FOUND")
}

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function connectDB() {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log("CONNECTED TO DB")
  } catch (err) {
    console.error("Error in Making Connection to DB")
  }
}