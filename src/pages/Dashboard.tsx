import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page">
      <h1>Вітаємо, {user?.name}!</h1>
      <p>
        Твоя роль: <strong>{user?.role}</strong>
      </p>

      <div className="stats-grid">
        {user?.role === "student" && <p>Твої активні курси: 3</p>}
        {user?.role === "teacher" && <p>Твої студенти: 45</p>}
        {user?.role === "admin" && <p>Всього користувачів: 120</p>}
      </div>
    </div>
  );
};
export default Dashboard;
