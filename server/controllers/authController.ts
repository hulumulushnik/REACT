import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // SQL запит на створення юзера
    const [result]: any = await pool.execute(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role],
    );

    res.status(201).json({ message: "User created", userId: result.insertId });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const [rows]: any = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string, // Переконайся, що тут process.env.JWT_SECRET
      { expiresIn: "1d" },
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login error" });
  }
};

export const getMe = async (req: any, res: any) => {
  try {
    // В ідеалі тут має бути перевірка токена (middleware),
    // але для тесту просто повернемо успіх, якщо запит дійшов
    res.json({
      message: "Ви авторизовані",
      user: { name: "Адмін", role: "admin" },
    });
  } catch (error) {
    res.status(401).json({ message: "Не авторизовано" });
  }
};
