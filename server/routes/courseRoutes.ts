import { Router } from "express";
import * as courseController from "../controllers/courseController.js";

const router = Router();

// Курси
router.get("/", courseController.getAllCourses);
router.post("/", courseController.createCourse);

// Студенти та записи (Enrollments)
router.get("/students/all", courseController.getAllStudents); // Для загальної сторінки студентів
router.get("/:id/students", courseController.getCourseStudents); // Для деталей курсу
router.post("/enroll", courseController.enrollInCourse); // Для кнопки "Записатися"

export default router;
