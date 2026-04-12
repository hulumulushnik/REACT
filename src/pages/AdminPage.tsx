// src/pages/AdminPage.tsx
const AdminPage = () => {
  return (
    <div>
      <h1>Адмін-панель</h1>
      <table>
        <thead>
          <tr>
            <th>Ім'я</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {/* Мапінг користувачів */}
          <tr>
            <td>Ivan Student</td>
            <td>ivan@test.com</td>
            <td>student</td>
            <td>
              <button>Змінити роль</button>
              <button style={{ color: "red" }}>Видалити</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default AdminPage;
