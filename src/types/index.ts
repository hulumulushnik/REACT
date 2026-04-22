// Ролі користувачів згідно з ТЗ
export type UserRole = "admin" | "teacher" | "student";

// Користувач
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
}

// Дані для логіну
export interface LoginData {
  email: string;
  password: string;
}

// Дані для реєстрації
export interface RegisterData extends LoginData {
  name: string;
  role: UserRole;
}

// Курс (CRUD модуль 2.2)
export interface Course {
  id: number; // MySQL AI — це число
  title: string;
  description: string;
  teacher_id: number; // Збігається з колонкою в БД
  createdAt: string;
}
