import type { Course } from "../types";

export const courseService = {
  // Отримати всі
  getAll: async (): Promise<Course[]> => {
    const response = await fetch("/api/courses");
    return response.json();
  },
  // Створити (Teacher/Admin)
  create: async (data: Partial<Course>) => {
    return fetch("/api/courses", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  // Видалити
  delete: async (id: string) => {
    return fetch(`/api/courses/${id}`, { method: "DELETE" });
  },
  // Записати студента на курс (Requirement 2.3)
  enrollStudent: async (courseId: string, studentId: string) => {
    return fetch(`/api/courses/${courseId}/enroll`, {
      method: "POST",
      body: JSON.stringify({ studentId }),
    });
  },
};
