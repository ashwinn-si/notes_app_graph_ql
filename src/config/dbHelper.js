import { pool } from "./dbConnect.js";

export const createTableByDefault = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
      id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL,
      name VARCHAR(100)
    )`)

    await pool.query(`CREATE TABLE IF NOT EXISTS notes (
      id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      title VARCHAR(100),
      content VARCHAR(100),
      is_deleted BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (user_id) REFERENCES users(id) 
      ON DELETE CASCADE 
      ON UPDATE CASCADE
    )`)

    console.log("tables created");
  } catch (err) {
    console.log("error while creating tables ", err.message);
  }
}