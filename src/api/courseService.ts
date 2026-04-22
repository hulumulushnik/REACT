import axiosInstance from "./axiosInstance";
import type { Course } from "../types";

export const courseService = {
  getAll: async (search?: string): Promise<Course[]> => {
    const response = await axiosInstance.get("/courses", {
      params: { search }, // Axios сам додасть ?search=... до URL
    });
    return response.data;
  },

  create: async (data: {
    title: string;
    description: string;
  }): Promise<Course> => {
    const response = await axiosInstance.post("/courses", data);
    return response.data;
  },

  delete: async (id: string) => {
    await axiosInstance.delete(`/courses/${id}`);
  },

  enrollStudent: async (courseId: string, studentId: string) => {
    const response = await axiosInstance.post(`/courses/${courseId}/enroll`, {
      studentId,
    });
    return response.data;
  },
};
