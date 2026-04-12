import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="page profile-card">
      <h2>Мій профіль</h2>
      <div className="user-details">
        <p>
          <strong>Ім'я:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Статус:</strong> {user?.role}
        </p>
      </div>
      <button onClick={logout} className="logout-btn">
        Вийти з системи
      </button>
    </div>
  );
};
export default ProfilePage;
