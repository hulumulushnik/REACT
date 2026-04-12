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
  id: string;
  title: string;
  description: string;
  teacherId: string; // ID викладача, який створив курс
  studentIds: string[]; // Список ID студентів, записаних на курс
  createdAt: string;
}
