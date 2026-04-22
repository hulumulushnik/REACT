import type { Request, Response } from "express";
import pool from "../config/db.js";

// Отримати всіх користувачів
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute(
      "SELECT id, name, email, role FROM users",
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Помилка при отриманні користувачів" });
  }
};

// Змінити роль
export const updateUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    // Використовуємо 'as any[]' щоб TypeScript не сварився на типи
    await pool.execute("UPDATE users SET role = ? WHERE id = ?", [
      role,
      id,
    ] as any[]);
    res.json({ message: "Роль успішно оновлено" });
  } catch (error) {
    res.status(500).json({ message: "Не вдалося оновити роль" });
  }
};

// Видалити користувача
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.execute("DELETE FROM users WHERE id = ?", [id] as any[]);
    res.json({ message: "Користувача видалено" });
  } catch (error) {
    res.status(500).json({ message: "Помилка при видаленні" });
  }
};
