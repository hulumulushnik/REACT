import React, { useState, useEffect } from "react";
import { courseService } from "../api/courseService";
import { useDebounce } from "../hooks/useDebounce"; // Не забудьте створити цей хук
import type { Course } from "../types";

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Використовуємо наш кастомний хук (затримка 500мс)
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        // Викликаємо сервіс із параметром пошуку
        const data = await courseService.getAll(debouncedSearch);
        setCourses(data);
      } catch (err) {
        console.error("Помилка пошуку:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [debouncedSearch]); // Ефект спрацює тільки коли debouncedSearch зміниться

  return (
    <div className="page" style={{ padding: "20px" }}>
      <h1>Список курсів</h1>

      {/* Поле пошуку */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Пошук курсу за назвою..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #444",
            background: "#222",
            color: "white",
          }}
        />
      </div>

      {isLoading ? (
        <p>Шукаємо...</p>
      ) : (
        <div className="course-list">
          {courses.map((course) => (
            <div key={course.id} className="card">
              <h3>{course.title}</h3>
              {/* ... решта картки ... */}
            </div>
          ))}
          {courses.length === 0 && <p>Нічого не знайдено 🔍</p>}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
