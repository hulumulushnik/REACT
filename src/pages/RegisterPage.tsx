import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import type { RegisterData } from "../types";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { register: registerInContext } = useAuth(); // Отримуємо функцію
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegisterData>();

  const onSubmit = async (data: RegisterData) => {
    try {
      await registerInContext(data); // Викликаємо функцію з useAuth()
      alert("Реєстрація успішна!");
      navigate("/dashboard");
    } catch (err) {
      alert("Помилка реєстрації. Перевірте дані.");
    }
  };

  return (
    <div className="page">
      <h2>Реєстрація в LMS</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: "Ім'я обов'язкове" })}
          placeholder="Повне ім'я"
        />
        <input
          {...register("email", { required: "Email обов'язковий" })}
          placeholder="Email"
        />
        <input
          type="password"
          {...register("password", { minLength: 6 })}
          placeholder="Пароль"
        />

        <select {...register("role")}>
          <option value="student">Студент</option>
          <option value="teacher">Викладач</option>
          <option value="admin">Адміністратор</option>
        </select>

        <button type="submit">Створити акаунт</button>
      </form>
    </div>
  );
};
export default RegisterPage;
