import { pool } from "../../config/dbConnect.js";

export const getAllNotesService = async ({ userId }) => {
  try {
    const [rows] = await pool.query("SELECT * FROM notes WHERE user_id = ? and is_deleted = FALSE", [userId])
    return {
      data: rows
    }
  } catch (err) {
    throw err;
  }
}

export const getNoteService = async ({ userId, noteId }) => {
  try {
    const [rows] = await pool.query("SELECT * FROM notes WHERE id = ?", [noteId])
    if (rows.length < 0) {
      throw new Error("Invalid noteId")
    }
    return {
      data: rows[0]
    }
  } catch (err) {
    throw err;
  }
}

export const addNotesService = async ({ userId, title, content }) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await pool.query("INSERT INTO notes(user_id, title, content) VALUES (?, ?, ?)", [userId, title, content]);
    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

export const deleteNotesService = async ({ userId, noteId }) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await pool.query("UPDATE notes SET is_deleted = TRUE WHERE id = ?", [noteId]);
    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

export const updateNoteService = async ({ userId, noteId, content, title }) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await pool.query("UPDATE notes SET content = ?, title = ? WHERE id = ?", [content, title, noteId]);
    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}