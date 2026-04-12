import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Імпорт сторінок (їх потрібно створити в папці pages)
// Якщо сторінок ще немає, можна тимчасово замінити на <div>Назва сторінки</div>
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import CoursesPage from "./pages/CoursesPage";
import CourseDetails from "./pages/CourseDetails";
import StudentsPage from "./pages/StudentsPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import type { JSX } from "react";

// 1. Компонент для захисту роутів (Protected Route)
const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles?: ("admin" | "teacher" | "student")[];
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Завантаження...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* --- ПУБЛІЧНІ РОУТИ --- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* --- ЗАХИЩЕНІ РОУТИ (Для всіх авторизованих) --- */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <CoursesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses/:id"
          element={
            <ProtectedRoute>
              <CourseDetails />
            </ProtectedRoute>
          }
        />

        {/* --- РОУТИ ДЛЯ TEACHER ТА ADMIN --- */}
        <Route
          path="/students"
          element={
            <ProtectedRoute allowedRoles={["teacher", "admin"]}>
              <StudentsPage />
            </ProtectedRoute>
          }
        />

        {/* --- РОУТИ ТІЛЬКИ ДЛЯ ADMIN --- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* Редирект за замовчуванням */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<div>404 - Сторінку не знайдено</div>} />
      </Routes>
    </div>
  );
}

export default App;
