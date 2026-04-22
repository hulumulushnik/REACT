import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>LMS Panel</h3>
        <p>
          {user?.name} ({user?.role})
        </p>
      </div>

      <nav className="sidebar-nav">
        {/* Доступно всім */}
        <NavLink to="/">Головна (Dashboard)</NavLink>
        <NavLink to="/courses">Курси</NavLink>
        <NavLink to="/profile">Профіль</NavLink>

        {/* Доступно тільки викладачам та адмінам */}
        {(user?.role === "admin" || user?.role === "teacher") && (
          <NavLink to="/students">Студенти</NavLink>
        )}

        {/* Доступно тільки адміну */}
        {user?.role === "admin" && <NavLink to="/admin">Адмін-панель</NavLink>}
      </nav>

      <button onClick={logout} className="logout-btn">
        Вийти
      </button>
    </aside>
  );
};

export default Sidebar;
