import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Sidebar from "./pages/Sidebar"; // 1. Не забудь створити цей файл!

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import CoursesPage from "./pages/CoursesPage";
import CourseDetails from "./pages/CourseDetails";
import StudentsPage from "./pages/StudentsPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import CreateCoursePage from "./pages/CreateCoursePage";
import type { JSX } from "react";

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
  const { isAuthenticated, isLoading } = useAuth();

  // Поки вантажиться стан авторизації — нічого не показуємо
  if (isLoading) return <div>Завантаження...</div>;

  return (
    <div className={isAuthenticated ? "app-layout" : "auth-layout"}>
      {/* 2. Показуємо Sidebar тільки якщо користувач залогінений */}
      {isAuthenticated && <Sidebar />}

      <div className="main-content">
        <Routes>
          {/* Публічні роути */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Захищені роути */}
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

          <Route
            path="/students"
            element={
              <ProtectedRoute allowedRoles={["teacher", "admin"]}>
                <StudentsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/create"
            element={
              <ProtectedRoute allowedRoles={["teacher", "admin"]}>
                <CreateCoursePage />
              </ProtectedRoute>
            }
          />

          {/* Редиректи */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<div>404 - Сторінку не знайдено</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
