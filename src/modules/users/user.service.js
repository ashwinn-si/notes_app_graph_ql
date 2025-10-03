import { pool } from "../../config/dbConnect.js";

export const getUserService = async ({ userId }) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [userId]);
    return { data: rows[0] };
  } catch (err) {
    throw new Error(err.message);
  }
}

export const loginService = async ({ email, password }) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
    if (rows.length < 0) {
      throw new Error("Email Not Found")
    }
    const isValid = rows[0].password === password;
    if (!isValid) {
      throw new Error("Incorrect Password")
    }
    return {
      userId: rows[0].id
    }
  } catch (err) {
    throw err;
  }
}

export const signupService = async ({ email, password, name }) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
    if (rows.length > 0) {
      throw new Error("Email Already Exists")
    }

    await pool.query("INSERT INTO users(email, password, name) VALUES (?, ?, ?)", [email, password, name]);

    await connection.commit();

  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}