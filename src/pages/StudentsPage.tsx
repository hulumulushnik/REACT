const StudentsPage = () => {
  // Список мав би приходити з API
  const students = [
    { id: 1, name: "Олексій", course: "React Basic" },
    { id: 2, name: "Марія", course: "UI/UX Design" },
  ];

  return (
    <div className="page">
      <h2>Управління студентами</h2>
      <table>
        <thead>
          <tr>
            <th>Ім'я</th>
            <th>Курс</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.course}</td>
              <td>
                <button style={{ color: "red" }}>Виключити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default StudentsPage;
