import React, { useState, useEffect, useMemo } from "react";
import axiosInstance from "../api/axiosInstance";
import { useDebounce } from "../hooks/useDebounce"; // Переконайтеся, що створили цей хук
import type { User, UserRole } from "../types";

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Пагінація
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const debouncedSearch = useDebounce(searchTerm, 500);

  // 1. Завантаження користувачів
  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Можна додати ?search=${debouncedSearch} якщо бекенд підтримує фільтрацію на сервері
      const response = await axiosInstance.get("/users");
      setUsers(response.data);
    } catch (err) {
      console.error("Не вдалося завантажити користувачів", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. Пошук та фільтрація (Client-side для демонстрації)
  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [users, debouncedSearch]);

  // 3. Логіка пагінації
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentTableData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  // 4. Зміна ролі
  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await axiosInstance.patch(`/users/${userId}/role`, { role: newRole });
      setUsers(
        users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)),
      );
      alert("Роль оновлено");
    } catch (err) {
      alert("Помилка при зміні ролі");
    }
  };

  // 5. Видалення користувача з Confirm Dialog (Вимога 6)
  const handleDeleteUser = async (id: string, name: string) => {
    if (
      window.confirm(`Ви впевнені, що хочете видалити користувача ${name}?`)
    ) {
      try {
        await axiosInstance.delete(`/users/${id}`);
        setUsers(users.filter((u) => u.id !== id));
      } catch (err) {
        alert("Не вдалося видалити користувача");
      }
    }
  };

  if (loading) return <div className="page">Завантаження користувачів...</div>;

  return (
    <div className="page" style={{ padding: "20px", color: "white" }}>
      <h1>Адмін-панель: Керування користувачами</h1>

      {/* Пошук (Вимога 9) */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Пошук за ім'ям або email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Скидаємо на 1 сторінку при пошуку
          }}
          style={{
            width: "100%",
            padding: "10px",
            background: "#222",
            border: "1px solid #444",
            color: "white",
            borderRadius: "4px",
          }}
        />
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid #444" }}>
            <th style={{ padding: "10px" }}>Ім'я</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((u) => (
            <tr key={u.id} style={{ borderBottom: "1px solid #333" }}>
              <td style={{ padding: "10px" }}>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) =>
                    handleRoleChange(u.id, e.target.value as UserRole)
                  }
                  style={{
                    background: "#333",
                    color: "white",
                    border: "none",
                    padding: "5px",
                  }}
                >
                  <option value="student">Студент</option>
                  <option value="teacher">Викладач</option>
                  <option value="admin">Адмін</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteUser(u.id, u.name)}
                  style={{
                    color: "#ff4d4d",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Видалити
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Пагінація (Вимога 10) */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Назад
        </button>
        <span>
          Сторінка {currentPage} з {totalPages || 1}
        </span>
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Вперед
        </button>
      </div>

      {filteredUsers.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Користувачів не знайдено 🔍
        </p>
      )}
    </div>
  );
};

export default AdminPage;
