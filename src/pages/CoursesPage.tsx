// src/pages/CoursesPage.tsx
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const CoursesPage = () => {
  const { user } = useAuth();
  // Тут мав би бути fetch даних, але поки імітуємо:
  const courses = [{ id: "1", title: "React + TS", teacherId: "2" }];

  return (
    <div>
      <h1>Курси</h1>
      {(user?.role === "admin" || user?.role === "teacher") && (
        <button>+ Створити курс</button>
      )}
      <div className="course-list">
        {courses.map((course) => (
          <div key={course.id} className="card">
            <h3>{course.title}</h3>
            <Link to={`/courses/${course.id}`}>Детальніше</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CoursesPage;
