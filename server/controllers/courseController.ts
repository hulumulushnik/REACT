import type { Request, Response } from "express";
import pool from "../config/db.js";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

// 1. Отримати всі курси
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM courses");
    res.status(200).json(rows);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Помилка при отриманні курсів", error: error.message });
  }
};

// 2. Створити новий курс
export const createCourse = async (req: any, res: Response) => {
  try {
    const { title, description, teacher_id } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Назва курсу обов'язкова" });
    }

    // Визначаємо ID вчителя (з токена або з тіла запиту)
    const finalTeacherId = teacher_id || (req.user ? req.user.id : 1);

    const query =
      "INSERT INTO courses (title, description, teacher_id) VALUES (?, ?, ?)";

    // ВИПРАВЛЕННЯ: Додаємо "as any[]", щоб TS не сварився на типи всередині масиву
    const [result] = await pool.execute<ResultSetHeader>(query, [
      title,
      description ?? null, // Замінюємо undefined на null
      finalTeacherId ?? 1,
    ] as any[]);

    res.status(201).json({
      id: result.insertId,
      title,
      description,
      teacher_id: finalTeacherId,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Помилка при створенні курсу", error: error.message });
  }
};

// 3. Отримати ВСІХ студентів
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute(
      "SELECT id, name, email, role FROM users WHERE role = 'student'",
    );
    res.json(rows);
  } catch (error: any) {
    res.status(500).json({ message: "Помилка отримання списку студентів" });
  }
};

// 4. Записати студента на курс (Enrollment)
export const enrollInCourse = async (req: any, res: Response) => {
  const { student_id, course_id } = req.body;

  if (!student_id || !course_id) {
    return res
      .status(400)
      .json({ message: "Необхідно вказати ID студента та курсу" });
  }

  try {
    const query =
      "INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)";

    // ВИПРАВЛЕННЯ: Кастуємо масив значень до any[]
    await pool.execute(query, [student_id, course_id] as any[]);

    res.status(201).json({ message: "Студента успішно записано на курс" });
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ message: "Студент вже записаний на цей курс" });
    }
    res
      .status(500)
      .json({ message: "Помилка при записі на курс", error: error.message });
  }
};

// 5. Отримати список студентів для конкретного курсу
export const getCourseStudents = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT u.id, u.name, u.email 
      FROM users u
      JOIN enrollments e ON u.id = e.student_id
      WHERE e.course_id = ?
    `;

    // ВИПРАВЛЕННЯ: Переконуємося, що передаємо рядок або число, а не undefined
    const [rows] = await pool.execute(query, [id] as any[]);
    res.json(rows);
  } catch (error: any) {
    res.status(500).json({ message: "Помилка отримання студентів курсу" });
  }
};
